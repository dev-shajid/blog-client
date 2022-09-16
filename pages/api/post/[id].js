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
        const { id } = req.query
        console.log(id);
        if (id) {
            try {
                const post = await Post.findById({ _id: id }).populate({ path: 'user', select: ['name', 'email', 'profile'] })
                // console.log(post);
                res.status(200).json({ message: post })
            }catch(err){
                console.log({error:err.message});
                res.status(400).json({error:err.message})
            }
        } else {
            res.status(400).json({ error: 'Not id' })
        }

    } catch (err) {
        console.log({error:err.message});
        res.status(500).json({ error: err.message })
    }
}

export default handler