import React, { useState } from 'react';
import { IconButton, Grid, Badge, Box, Typography, AppBar, Toolbar, MenuItem, Menu, Tooltip, Avatar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {NavigateBefore, Bookmarks, SearchTwoTone, BookmarksRounded, FileUploadRounded, Settings, LogoutRounded, HomeRounded, AccountCircleRounded } from '@mui/icons-material';
import './navbar.css';

function Navbar({page, search}) {

    const [anchorElUser, setAnchorElUser] = useState(null);
    const history = useHistory();         
    const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);

//-------------------------------* NAVIGATION MENU STATE *-------------------------------//
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
//-------------------------------* NAVIGATION MENU FUNCTIONS *-------------------------------//
    const home = ()=>{
        history.push('/home');
    };
    
    const profile = ()=>{
        history.push('/profile');
    };
    
    const settings = ()=>{
        history.push('/settings');
    };

    const upload = ()=>{
        history.push('/upload');
    };
        
    const saved = ()=>{
        history.push('/saved');
    };
    
    const logout = ()=>{
        localStorage.removeItem('token');
        alert('You have been logged out');
        history.push('/');
    };
  
    
    return (
        <>
            <AppBar id="appbar">
                <Toolbar> 
                    {
                        page==='RECIPES'
                    ?
                        null
                    :
                        <IconButton onClick={()=>{history.goBack()}} edge="start" aria-label="menu" sx={{ mr: 2 }}>
                            <NavigateBefore id="icons"/>
                        </IconButton>
                    }
                    <Typography variant="h6"  component="div" sx={{ flexGrow: 1, textAlign: 'center', fontFamily:'Montserrat' }}>
                        {page}
                    </Typography>
                    {
                        page==='RECIPES'
                    ?
                        (
                            <>
                                <div id="searchIconBar" sx={{ margin: 1 }}>
                                    <div id="searchIconOut">
                                        <SearchTwoTone id="searchIcon" />
                                    </div>
                                    <input
                                    type="search"
                                    id="searchField"
                                    onChange={(e)=>{search(e.currentTarget.value.toLowerCase())}}
                                    placeholder={"Search…"}
                                    />
                                </div>
                                &nbsp;
                            </>
                        )
                    :
                        null
                    }                            
                    {
                        page==='RECIPES'
                    ?
                        (
                            <>
                                <Grid id="Save" sx={{ margin: 1 }} onClick={saved}>
                                <Badge title="Saved">
                                    <Bookmarks id="bookmarks"/>
                                </Badge>    
                                </Grid>
                            </>
                        )
                    :
                        null
                    }
                    {(
                        page==='Error'
                    ?
                        null
                    :
                        <Box sx={{ margin: 1 }}>
                            <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={`${decodedToken.user.file}`} />
                            </IconButton>
                            </Tooltip>
                            <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                                <MenuItem id="menuItemsOut">
                                    <Typography id="menuItemsUser" sx={{ fontFamily:'Montserrat' }} > Hi { decodedToken.user ? decodedToken.user.first_name : null} !&nbsp;<img className='wave' src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" alt='' /></Typography>
                                </MenuItem>
                                {
                                    page==='RECIPES'
                                ?
                                    null
                                :
                                    <MenuItem id="menuItemsOut" onClick={home}>
                                        <HomeRounded id="menuItemsIcon"/> &nbsp; &nbsp;
                                        <Typography id="menuItems" >Home</Typography>
                                    </MenuItem> 
                                }
                                {
                                    page==='Profile'
                                ?
                                    null
                                :
                                    <MenuItem id="menuItemsOut" onClick={profile} >
                                        <AccountCircleRounded id="menuItemsIcon"/> &nbsp; &nbsp;
                                        <Typography id="menuItems" >Profile</Typography>
                                    </MenuItem>                                                      
                                }
                                {
                                    page==='Upload'
                                ?
                                    null
                                :
                                    <MenuItem id="menuItemsOut" onClick={upload}>
                                        <FileUploadRounded id="menuItemsIcon"/> &nbsp; &nbsp;
                                        <Typography id="menuItems" >Upload</Typography>
                                    </MenuItem>                          
                                }
                                {
                                    page==='Saved'
                                ?
                                    null
                                :
                                    <MenuItem id="menuItemsOut" onClick={saved}>
                                        <BookmarksRounded id="menuItemsIcon"/> &nbsp; &nbsp;
                                        <Typography id="menuItems" >Saved</Typography>
                                    </MenuItem>                          
                                }
                                {
                                    page==='Settings'
                                ?
                                    null
                                :
                                    <MenuItem id="menuItemsOut" onClick={settings}>
                                        <Settings id="menuItemsIcon"/> &nbsp; &nbsp;
                                        <Typography id="menuItems" >Settings</Typography>
                                    </MenuItem>                          
                                }
                                <MenuItem id="menuItemsOut" onClick={logout}>
                                    <LogoutRounded id="menuItemsIcon"/> &nbsp; &nbsp;
                                    <Typography id="menuItems" >Logout</Typography>
                                </MenuItem> 
                            </Menu>
                        </Box>
                    )}                 
                </Toolbar>
                    {
                        page==='RECIPES'
                    ?
                        (
                            <>                                
                                <Grid id="SearchBarForMd">
                                    <div id="searchIconBarForMd" sx={{ margin: 1 }}>
                                        <div id="searchIconOutForMd">
                                            <SearchTwoTone id="searchIcon" />
                                        </div>
                                        <input
                                            type="search"
                                            id="searchFieldForMd"
                                            onChange={(e)=>{search(e.currentTarget.value.toLowerCase())}}
                                            placeholder={"Search…"}
                                        />
                                    </div>
                                </Grid>
                            </>
                        )
                    :
                        null
                    }              
            </AppBar>
        </>
    );
}

export default Navbar;