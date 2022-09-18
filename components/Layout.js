import React from 'react'
import { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react'
import NextNProgress from "nextjs-progressbar";
import Nav from '../components/Nav'
import Loader from './Loader/Loader';
import Transitions from './Transitions';

const Layout = ({ children }) => {
    const { data: session, status } = useSession()

    if (status == 'loading') {
        return <Transitions><Loader /></Transitions>
    }
    console.log(status);
    return (
        <>
            <Transitions>
                {children}
            </Transitions>
        </>
    )
}

export default Layout