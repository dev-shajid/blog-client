import dbConnect from '../../../lib/db'
import nc from "next-connect";
import { getSession } from 'next-auth/react'
import Post from '../../../models/postSchema';

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(400).json({ error: "Invalid Request" })
    }

    try {
        await dbConnect()
        const { key } = req.query
        if (key) {
            const posts1 = await Post.find({ title: { $regex: key, $options: 'i' } }).sort({ createdAt: -1 })
            const posts2 = await Post.find({
                $and: [
                    { title: { $not: { $regex: key, $options: 'i' } } },
                    { description: { $regex: key, $options: 'i' } },
                ]
            }).sort({ createdAt: -1 })
            const posts = [...posts1, ...posts2]
            res.status(200).json({ length: posts.length, posts })
        } else {
            res.status(400).json({ error: 'Give a key' })
        }

    } catch (err) {
        console.log({ error: err.message });
        res.status(500).json({ error: err.message })
    }
}

export default handler