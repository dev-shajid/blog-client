import dbConnect from '../../../lib/db'
import nc from "next-connect";
import multer from 'multer'
import { getSession } from 'next-auth/react'
import Post from '../../../models/postSchema';
import path from 'path';
import cloudinary from '../../../lib/cloudinary'

export const config = {
    api: {
        bodyParser: false,
    },
}

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary.v2,
//     params: {
//         folder: 'blog',
//         format: ['png', 'jpg', 'jpeg'],
//         public_id: (req, file) => 'computed-filename-using-request',
//     },
// });

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == '.webp') {
            cb(null, true);
        } else {
            cb(new Error("File type is not supported"), false);
            return new Error("File type is not supported")
        }
    }
})

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.message);
        res.status(500).json({ error: "Something broke!" });
    },
    onNoMatch: (req, res) => {
        res.status(404).json("Page is not found");
    },
})
    .use(upload.single('image'))
    // .post(async (req, res) => {
    //     try {
    //         // console.log(req);
    //         if (req.file) {
    //             if (req.file.size > 1024 * 1024 * 2) {
    //                 res.status(400).json({ error: 'File size should less then 2 MB', size: req.file.size / (1024 * 1024) })
    //             }
    //             // Upload image to cloudinary
    //             const result = await cloudinary.uploader.upload(req.file.path, {
    //                 folder: 'dev-blog'
    //             });

    //             res.json(result);
    //         } else {
    //             res.json({ error: "Select .png/.jpg/.webp image" })
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         res.json({ error: err.message })
    //     }
    // })
    .post(async (req, res) => {
        try {
            await dbConnect()
            const session = await getSession({ req })
            if (session) {
                let { title, description, tags } = req.body
                if (title && description) {
                    const userId = session.user._id

                    if (req.file) {
                        if (req.file.size > 1024 * 1024 * 5) {
                            res.status(400).json({ error: 'File size should be less then 5 MB', size: req.file.size / (1024 * 1024) })
                        } else {
                            // Upload image to cloudinary
                            const result = await cloudinary.uploader.upload(req.file.path, {
                                folder: 'dev-blog'
                            });

                            const imageUrl = result.url ? result.url : ''
                            const post = await Post.create({ title, description, tags: tags || '', image: imageUrl, user: userId })

                            if (post) {
                                res.status(200).json({ message: post })
                            } else {
                                res.status(400).json({ error: 'Something is wrong' })
                            }
                        }
                    } else {
                        res.status(400).json({ error: "Select .png/.jpg/.webp image" })
                    }
                } else {
                    res.status(400).json({ error: "Title and Description are required" })
                }
            } else {
                res.status(400).json({ error: 'Access Denied' })
            }
            // res.json({ body: req.body, file: req.file })
        } catch (err) {
            res.status(400).json({ error: err })
        }
    })

export default handler