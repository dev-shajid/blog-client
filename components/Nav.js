import React from 'react'
import style from '../styles/Nav.module.css'
import {Search} from '@mui/icons-material';
import Image from 'next/image';
import HoverButton from './HoverButton/HoverButton';
import Link from 'next/link'

function Nav() {

  return (
    <div className={`${style.container_fluid}container-fluid`}>        
        <div className={`container ${style.main_nav}`}>
            <div className={style.logo_search}>
                {/* LOGO */}
                <div className={style.logo}>
                      <Image src="/images/Logo.png" width="200" height="40" alt="Logo"/>
                </div>
                
                {/* Search Bar */}
                <div className={style.search_bar}>
                    <input type="search" name="" placeholder="Type to search..." />
                    <Search/>
                </div>
            </div>
            
            {/* Account */}
            <div className={style.account}>
                <div className={`${style.login_button}`}>
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </div>
                {/* <div className={`${style.register_button}`}>
                    Create New Account
                </div>       */}
                <HoverButton/> 
            </div>
              
        </div>
    </div>
  )
}

export default Nav