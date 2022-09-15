import dbConnect from "../../../lib/db"
import User from '../../../models/userSchema'
import * as Yup from 'yup'
import bcrypt from 'bcrypt'

export default async function create(req, res) {
    if (req.method != 'POST') {
        res.status(402).json({ message: 'Invalid Request' })
    }

    try {
        await dbConnect()
        const { email, password } = JSON.parse(req.body)

        if (email && password) {
            const user = await User.findOne({ email })
            if (!user) {
                res.status(400).json({ error: 'User does not exist' })
            } else {
                const hashPassword = await bcrypt.compare(password, user.password)
                if (hashPassword) {
                    res.status(200).json({ message: 'Login Successful' })
                } else {
                    res.status(400).json({ error: 'Error info' })
                }
            }
        } else {
            res.status(400).json({ error: "Please fill the input field" })
        }

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}