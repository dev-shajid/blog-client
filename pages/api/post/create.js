import dbConnect from '../../../lib/db'
import nc from "next-connect";
import multer from 'multer'
import { getSession } from 'next-auth/react'
import Post from '../../../models/postSchema';
import path from 'path';
import cloudinary from '../../../lib/cloudinary'
const { CloudinaryStorage } = require('multer-storage-cloudinary');

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
    // storage: multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, path.join(process.cwd(), 'public', 'upload'))
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, new Date().getTime() + '-' + file.originalname)
    //     }
    // })
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);  
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== 'webp') {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
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
    // .post(async (req, res) => {
    //     try {
    //         if(req.file){
    //             // Upload image to cloudinary
    //         const result = await cloudinary.uploader.upload(req.file.path,{
    //             folder: 'dev-blog'
    //         });

    //         res.json(result);
    //         }else{
    //             res.json({error:"Didn't get any file"})
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // })
.post(async (req, res) => {
    await dbConnect()
    try {
        const session = await getSession({ req })
        if (session) {
            const { title, description } = req.body
            if (title && description) {
                const userId = session.user._id
                const result = await cloudinary.uploader.upload(req.file.path,{
                    folder: 'dev-blog'
                });
                const imageUrl = result.url ? result.url : ''
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