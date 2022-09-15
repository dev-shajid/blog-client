import dbConnect from '../../../lib/db'
import nc from "next-connect";
import multer from 'multer'
import { getSession } from 'next-auth/react'
import Post from '../../../models/postSchema';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
}

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(process.cwd(), 'public', 'upload'))
        },
        filename: function (req, file, cb) {
            cb(null, new Date().getTime() + '-' + file.originalname)
        }
    })
})

const handler = nc({
    onError: (err, req, res, next) => {
        // console.error(err.message);
        // res.status(500).json({ error: "Something broke!" });
        next()
    },
    onNoMatch: (req, res) => {
        res.status(404).json("Page is not found");
    },
})
    .use(upload.single('image'))
    .post(async (req, res) => {
        await dbConnect()
        try {
            const session = await getSession({ req })
            if (session) {
                const { title, description } = req.body
                if (title && description) {
                    const userId = session.user._id
                    const imageUrl = req.file ? `${process.env.CLIENT_URL}/upload/${req.file.filename}` : ''
                    const post = await Post.create({ title, description, image: imageUrl, user: userId })

                    if (post) {
                        res.status(200).json({ message: post })
                    } else {
                        res.status(400).json({ error: 'Something is wrong' })
                    }
                } else {
                    res.status(400).json({ error: "Title and Description are required" })
                }
            } else {
                res.status(400).json({ error: 'Access Denied' })
            }
            // res.json({ body: req.body, file: req.file })
        } catch (err) {
            res.status(520).json({ error: err.message })
        }
    })

export default handler