import dbConnect from "../../../lib/db"
import User from '../../../models/userSchema'
import bcrypt from 'bcrypt'
import * as Yup from 'yup'

export const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Name must be at least 2 characters').max(25).required('Please Enter Your Name'),
    email: Yup.string().email('Email is not valid').required('Please Enter Your Email'),
    password: Yup.string().min(5, 'Password must be at least 6 characters').required('Please Enter Your Password'),
})

export default async function create(req, res) {
    if (req.method != 'POST') {
        res.status(402).json({ message: 'Invalid Request' })
    }

    try {
        await dbConnect()
        const { name, email, password } = JSON.parse(req.body)

        if (name && email && password) {
            const hashPassword = await bcrypt.hash(password, 10)

            await validationSchema.validate({ name, email, password })

            const user = await User.findOne({ email })
            if (user) {
                res.status(400).json({ error: 'User already exist', user })
            } else {
                const newUser = await User.create({ name, email, password: hashPassword })

                res.status(200).json({ message: 'Successfully Created User' })
            }
        } else {
            res.status(400).json({ error: "Please fill the input field" })
        }

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}