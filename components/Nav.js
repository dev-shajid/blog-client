import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getSession, useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import { Avatar, Menu, Divider, ListItemIcon, MenuItem, Tooltip, Button, IconButton, Box } from '@mui/material';
import { Logout, PersonAdd, Settings, BorderColor } from '@mui/icons-material';
import SpotlightSearchBar from './SpotlightSearchBar';

export const getServerSideProps= async ()=>{
  const session = await getSession(ctx)
  if (session?.user?.name) {
    return {
      props: {}
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/login`
      }
    }
  }
}

const Nav = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' })

  const handleClick = (event) => {
    setOpen(true)
    setAnchorEl(event.currentTarget);
    document.documentElement.style.overflow = 'hidden'
  }
  const handleClose = (path) => {
    if(path?.route)router.push(path.route)
    setAnchorEl(null)
    setOpen(false)
    document.getElementsByTagName("body")[0].style.paddingRight = '0px !important'
    document.documentElement.style.overflow = 'auto'
  }

  const handleLogout = (e) => {
    signOut({ redirect: false })
    handleClose('/')
  }

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden'
      if(!isMobile){
          document.documentElement.style.paddingRight = '8px'
      }
    } else {
      document.documentElement.style.overflow = 'auto'
      document.documentElement.style.paddingRight = '0'
    }
  }, [open])

  return (
    <>
      {
        status == 'loading' ?
          <></> :
          <>
            <header>
              <h1><Link href='/'>LOGO</Link></h1>
              <nav>
                {
                  (status == 'authenticated' && session?.user?.name) ?
                    <>
                      <SpotlightSearchBar />
                      <Button className={'create_post_button'} sx={{ textTransform: 'inherit' }} variant='outlined'><Link href='/post'>Create Posts</Link></Button>
                      <Tooltip title="Account settings">
                        <div className='profile'>
                          <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ color: 'white', textTransform: 'uppercase' }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                          >
                            <Avatar sx={{ background: 'none', padding: '5px' }} alt={session.user.name} src={'/'} />
                          </IconButton>
                        </div>
                      </Tooltip>

                      {/* Menu Items */}
                      <Menu
                        anchorEl={anchorEl}
                        // disableScrollLock={false}
                        // id="account-menu"
                        open={open}
                        onClose={handleClose}
                        // onClick={handleClose}
                        PaperProps={{
                          elevation: 1,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem onClick={handleClose} >
                          <Avatar /> Profile
                        </MenuItem>
                        <MenuItem onClick={() => handleClose({ route: 'post' })} >
                          <ListItemIcon>
                            <BorderColor fontSize="small" />
                          </ListItemIcon>
                          Create New Post
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose} >
                          <ListItemIcon>
                            <Settings fontSize="small" />
                          </ListItemIcon>
                          Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogout} >
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                      {/* Menu Items */}
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
      }
    </>
  )
}

export default Nav