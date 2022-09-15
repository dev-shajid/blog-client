import Link from 'next/link'
import React, { useState } from 'react'
import style from '../../styles/Login.module.css'
import toast from 'react-hot-toast';
import { signIn, useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import LoadingOverlay from '../../components/LoadingOverlay';
import Transitions from '../../components/Transitions';

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session?.user?.name) {
        return {
            props: {}
        }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: `/`
            }
        }
    }
}

const Signup = () => {
    const router = useRouter()
    const [value, setValue] = useState({ name: '', email: '', password: '' })
    const [active, setActive] = useState({ overlay: false, otpBox: false })

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }
    const { data: session, status } = useSession()

    const handleSubmit = async (e) => {
        const toastId = toast.loading('Loading...')
        e.preventDefault()
        setActive({ otpBox: false, overlay: true })
        const res = await signIn('credentials', { ...value, redirect: false, signup: true })

        if (res.ok) {
            toast.dismiss(toastId)
            setActive({ otpBox: true, overlay: true })
            // setValue({ name:'', email: '', password: '' })
            toast.success('Check your email to verify the account')
            // router.push('/')
        } else {
            toast.dismiss(toastId)
            setActive({ otpBox: false, overlay: false })
            toast.error(res.error)
        }
    }


    // if (status == 'authenticated' && session?.user?.name) {
    //     router.push('/')
    // }

    return (
        <>
            <LoadingOverlay overlay={active.overlay} otpBox={active.otpBox} setActive={setActive} email={value.email} />
            <Transitions>
                <section className={style.login}>
                    <div className={style.container}>
                        <h1>Signup</h1>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <input
                                type='name'
                                onChange={handleChange}
                                name='name'
                                value={value.name}
                                placeholder="Enter your Fullname"
                            />
                            <input
                                type='email'
                                onChange={handleChange}
                                name='email'
                                value={value.email}
                                placeholder="Enter your Email"
                            />
                            <input
                                type='password'
                                onChange={handleChange}
                                name='password'
                                value={value.password}
                                placeholder="Enter your Password"
                            />
                            <input
                                type='submit'
                                value='Submit'
                            />
                            <p>Already have  an account? <Link href='/login'>Login</Link></p>
                        </form>
                    </div>
                </section>
            </Transitions>
        </>
    )
}

export default Signup