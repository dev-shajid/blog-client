import React from 'react'
import style from '../styles/Nav.module.css'
import { Search } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link'

function Nav() {

    const hoverHandle = (e) => {
        e.target.style.setProperty('--x', e.clientX - e.target.offsetLeft + 'px')
        e.target.style.setProperty('--y', e.clientY - e.target.offsetTop + 'px')
    }

    return (
        <div className={`${style.container_fluid}container-fluid`}>
            <div className={`container ${style.main_nav}`}>
                <div className={style.logo_search}>
                    {/* LOGO */}
                    <div className={style.logo}>
                        <Link href='/'><Image src="/images/Logo.png" width="200" height="40" alt="Logo" /></Link>
                    </div>

                    {/* Search Bar */}
                    <div className={style.search_bar}>
                        <input type="search" name="" placeholder="Type to search..." />
                        <Search />
                    </div>
                </div>

                {/* Account */}
                <div className={style.account}>
                    <div className={`${style.login_button}`}>
                        <Link href='/login'>Login</Link>
                    </div>
                    <div onMouseMove={hoverHandle} className={`${style.register_button}`} >
                        Create New Account
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Nav