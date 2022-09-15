import Link from 'next/link'
import React, { useState } from 'react'
import style from '../../styles/Login.module.css'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { signIn, getSession, useSession } from 'next-auth/react'
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

const Login = () => {
    const router = useRouter()
    const [value, setValue] = useState({ email: '', password: '' })
    const [active, setActive] = useState(false)
    const { data: session, status } = useSession()

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!value.email) {
            toast.error('Email is required')
        } else if (!value.password) {
            toast.error('Password is required')
        } else {
            new Promise(resolve => {
                setActive(true)
                const toastId = toast.loading('Loading...')
                resolve()
                setTimeout(async () => {
                    const res = await signIn('credentials', { ...value, redirect: false, login: true })
                    if (res.ok) {
                        toast.dismiss(toastId)
                        toast.success('Login Successful')
                        setValue({ email: '', password: '' })
                        router.push('/')
                    } else {
                        toast.dismiss(toastId)
                        toast.error(res.error)
                    }
                    setActive(false)
                }, 1000)
            })
        }
    }

    // if (status === 'authenticated' && session?.user?.name) {
    //     router.push('/')
    // }

    return (
        <>
            <LoadingOverlay overlay={active} />
            <Transitions>
                <section className={style.login}>
                    <div className={style.container}>
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit} autoComplete="off">
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
                            <p>Don't have an account? <Link href='/signup'>Signup</Link></p>
                        </form>
                    </div>
                </section>
            </Transitions>
        </>
    )

}

export default Login