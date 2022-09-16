import Link from 'next/link'
import React, { useState } from 'react'
import { getSession, useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Avatar, Menu, Divider, ListItemIcon, MenuItem, Tooltip, Button, IconButton, Box } from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import SpotlightSearchBar from './SpotlightSearchBar';

const Nav = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)

  const handleClick = (event) => {
    setOpen(true)
    setAnchorEl(event.currentTarget);
    document.documentElement.style.overflow = 'hidden'
  }
  const handleClose = ({ route }) => {
    route ? router.push(route) : null
    setAnchorEl(null)
    setOpen(false)
    document.getElementsByTagName("body")[0].style.paddingRight = '0px !important'
    document.documentElement.style.overflow = 'auto'
  }

  const handleLogout = (e) => {
    handleClose()
    signOut({ redirect: false })
      .then(res => router.push('/login'))
  }

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
                      <SpotlightSearchBar/>
                      <Link href='/post'><Button className={'create_post_button'} sx={{ textTransform: 'inherit' }} variant='outlined'>Create Posts</Button></Link>
                      <Tooltip title="Account settings">
                        <div className='profile'>
                        <IconButton
                          onClick={handleClick}
                          size="small"
                          // sx={{ ml: 2 }}
                          aria-controls={open ? 'account-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          >
                          <Avatar sx={{ background:'none', padding:'5px'}} alt={session.user.name} src={'/'}/>
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
                            <PersonAdd fontSize="small" />
                          </ListItemIcon>
                          Create a New Post
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