import Link from 'next/link'
import React from 'react'
import { getSession, useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

const Nav = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleLogout = (e) => {
    signOut({ redirect: false })
      .then(res => router.push('/login'))
  }

  return (
    <>
      <header>
        <h1><Link href='/'>LOGO</Link></h1>
        <nav>
          {
            status == 'loading' ?
              <></> :
              (status == 'authenticated' && session?.user?.name) ?
                <>
                  <Link href='/'>Home</Link>
                  <Link href='/post'>Posts</Link>
                  <a onClick={handleLogout}>Logout</a>
                  <div className='profile'>
                    <a>{session.user?.name?.split('')[0]}</a>
                  </div>
                </> :
                <>
                  <Link href='/login'>Login</Link>
                  <Link href='/signup'>Signup</Link>
                </>
          }
        </nav>
      </header>
      <hr style={{ margin: 0, borderColor: '#ffffff40' }} />
    </>
  )
}

export default Nav