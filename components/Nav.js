import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getSession, useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import { Avatar, Menu, Divider, ListItemIcon, MenuItem, Tooltip, Button, IconButton, Box, AppBar } from '@mui/material';
import { Logout, PersonAdd, Settings, BorderColor } from '@mui/icons-material';
import SpotlightSearchBar from './SpotlightSearchBar';
import { IconSearch } from '@tabler/icons';
import Image from 'next/image'

export const getServerSideProps = async () => {
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
  const [active, setActive] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' })

  const handleClick = (event) => {
    setOpen(true)
    setAnchorEl(event.currentTarget);
    // document.documentElement.style.overflow = 'clip !important'
  }
  const handleClose = (path) => {
    // if (path?.route) router.push(path.route)
    setAnchorEl(null)
    setOpen(false)
    document.getElementsByTagName("body")[0].style.paddingRight = '0px !important'
    // document.getElementsByTagName("body")[0].style.paddingRight = '0px !important'
    // document.documentElement.style.overflow = 'auto'
  }

  const handleLogout = (e) => {
    signOut({ redirect: false })
    handleClose('/')
  }

  useEffect(() => {
    const onScroll = e => {
      setOpen(false)
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <>
      {
        status == 'loading' ?
          <></> :
          <>
            <SpotlightSearchBar active={active} setActive={setActive} />

            {/* Menu Items */}
            <Menu
              anchorEl={anchorEl}
              disableScrollLock={true}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
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
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            {/* Menu Items */}
            <Box sx={{ backdropFilter: 'blur(10px)', borderBottom: '1px solid lightgray', zIndex: '100' }} position='sticky' top='0'>
              <AppBar sx={{ background: 'none', backdropFilter: 'blur(10px)', boxShadow: 'none' }} position='sticky' top='0'>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Link href='/'>
                    <div style={{ cursor: 'pointer' }}>
                      <Image
                        src='/images/nxt.png'
                        alt='Logo'
                        height={50}
                        width={100}
                        objectFit='contain'
                      />
                    </div>
                  </Link>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {
                      (status == 'authenticated' && session?.user?.name) ?
                        <>
                          <IconSearch onClick={() => setActive(true)} style={{ color: 'black', cursor: 'pointer', marginRight: '1rem' }} />
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
                        </> :
                        <>
                          <Link href='/login'>Login</Link>
                          <Link href='/signup'>Signup</Link>
                        </>
                    }
                  </Box>
                </Box>
                <hr style={{ margin: 0, borderColor: '#ffffff40' }} />
              </AppBar>
            </Box>
          </>
      }
    </>
  )
}

export default Nav