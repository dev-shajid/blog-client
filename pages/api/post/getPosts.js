import dbConnect from '../../../lib/db'
import Post from '../../../models/postSchema';

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(400).json({ error: "Invalid Request" })
    }

    try {
        await dbConnect()
        const { _limit, _page } = req.query
        let skip = (_page - 1) * _limit
        const posts = await Post.find().sort({ createdAt: -1 }).limit(_limit).skip(skip).populate({path:'user', select:['name', 'email', 'profile']})
        res.status(200).json({ message: posts })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export default handler