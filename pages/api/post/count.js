import dbConnect from '../../../lib/db';
import Post from '../../../models/postSchema';

const handler = async (req, res)=>{
    if (req.method !== 'GET') {
        res.status(400).json({ error: "Invalid Request" })
    }

    try{
        await dbConnect()
        const number = await Post.count()

        res.status(200).json({number})
    }catch(err){
        res.status(500).json({ error: err.message })
    }
}

export default handler