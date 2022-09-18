import { AppBar, Avatar, Badge, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { AccountCircle, Logout, Mail, More, Notifications, PersonAdd, Search, Settings } from '@mui/icons-material'
import SearchBar from './SearchBar'
import SpotlightSearchBar from '../SpotlightSearchBar'

const Nav2 = () => {
  const [openSearch, setOpenSearch] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)

  const handleClick = (event) => {
    setOpen(true)
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
    document.getElementsByTagName("body")[0].style.paddingRight='0px !important'
  }

  useEffect(()=>{
    document.documentElement.style.overflowY=openSearch?'hidden':'auto'
  },[openSearch])

  useEffect(()=>{
    document.getElementsByTagName("body")[0].style.paddingRight=open?'0px !important':'0'
  },[open])

  return (
    <>
      <AppBar position='sticky' top='0' className='z-10'>
        <div className='flex justify-between'>
          <Typography
            component='div'
            className='logo text-3xl text-white font-semibold'
          >
            Logo
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <IconButton onClick={() => setOpenSearch(true)} size="large" aria-label="show 4 new mails" color="inherit">
              <Search />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </div>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        disableScrollLock={ true }
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
      {/* Appear Search Bar on Click */}
      <SpotlightSearchBar setActive={setOpenSearch} active={openSearch} />
    </>
  )
}

export default Nav2