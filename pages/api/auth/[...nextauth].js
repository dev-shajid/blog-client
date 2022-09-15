import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from "next-auth/providers/email";
import NextAuth from 'next-auth'
import User from '../../../models/userSchema'
import bcrypt from 'bcrypt'
import * as Yup from 'yup'
import dbConnect from '../../../lib/db'
import sendEmail from '../../../lib/sendEmail';

export const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Name must be at least 2 characters').max(25).required('Please Enter Your Name'),
    email: Yup.string().email('Email is not valid').required('Please Enter Your Email'),
    password: Yup.string().min(5, 'Password must be at least 6 characters').required('Please Enter Your Password'),
})

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                await dbConnect()
                const { name, email, password } = req.body
                // Login
                if (req.body.login) {
                    if (!email || !password) {
                        throw new Error("Email and Password is required")
                    } else {
                        const user = await User.findOne({ email })
                        if (user && user.verified) {
                            const hashPassword = await bcrypt.compare(password, user.password)

                            if (hashPassword) {
                                return user
                            } else {
                                throw new Error("Invalid Password")
                            }
                        } else {
                            throw new Error('User Does not exist')
                        }
                    }
                }
                // Signup
                else if (req.body.signup) {
                    if (!email || !password || !name) {
                        throw new Error("Please fill the input field")
                    } else {
                        const hashPassword = await bcrypt.hash(password, 10)

                        try {
                            await validationSchema.validate({ name, email, password })

                            const user = await User.findOne({ email })
                            if (user && user.verified==true) {
                                throw new Error("User already exist")
                            } else if (user && user.verified!=false) {
                                const otp = genOtp()
                                await user.update({ token: otp })
                                await sendEmail({ userEmail: email, subject: 'Verify your account', otp })
                                return 'A OTP has send to your gmail'
                            } else {
                                const otp = genOtp()
                                await User.create({ name, email, password: hashPassword, verified: false, token: otp })
                                await sendEmail({ userEmail: email, subject: 'Verify your account', otp })
                                return 'A OTP has send to your gmail'
                            }
                        } catch (err) {
                            throw new Error(err.message)
                        }
                    }
                }
                // Verify OTP
                else if (req.body.verification) {
                    const { otp, email } = req.body

                    if (otp && email) {
                        const user = await User.findOne({ email, verified: false })
                        if (user && !user.verified && user.token == otp) {
                            await user.update({ verified: true })
                            return user
                        } else {
                            throw new Error('OTP is not correct')
                        }
                    } else {
                        throw new Error('Please fill the filed correctly')
                    }
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: 'helloshajibadminhere'
    },
    callbacks: {
        async session({ session, user, token }) {
            // console.log('Session', {session, user, token});
            session.user._id = token._id
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user && user._id) {
                token._id = user._id;
            }
            // console.log('Token', { token, user });
            return token
        }
    }
})

// Generate OTP
const genOtp = () => {
    let otp = ''
    for (let i = 0; i < 6; i++) {
        let r = Math.floor(Math.random() * 10)
        if (i == 0 && r == 0) {
            otp = otp + 7
        } else {
            otp = otp + r
        }
    }
    return otp
}