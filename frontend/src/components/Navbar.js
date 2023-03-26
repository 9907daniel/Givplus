// import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

import React, {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import Axios from 'axios';

//MUI imports
import { Button, Typography, Grid, AppBar, Toolbar, Badge } from '@mui/material';
import { Box} from '@mui/system';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';

import { setIsCartOpen } from './state';
import { setCurrency } from './state';

//Assets
import logo from '../images/logo.png'
import GivingJar from '../images/GivingJar.png';
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const { access_token } = getToken()
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart)
  const handleCurrencyClick = (currencyValue) => {
    dispatch(setCurrency(currencyValue));
  };

  //dropdown menu
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get('https://givplus.duckdns.org/api/scores/');
      setData(response.data);
    }
    fetchData();
  }, []);


  return <>
  <AppBar className='classes.appBar' position='relative'>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
      sx={{
        backgroundColor: 'white',
      }}>
        <Toolbar style={{ width: '100%' }}>
        <Button component={NavLink} to='/' style={{marginLeft: '0', padding: 0, border: 'none'}}> 
                <img src={logo} alt = "logo" className='logo'/>
        </Button>
          <Box 
            sx={{
              marginLeft:"8rem",
              marginRight:"11rem",
            }}
            >
            <Button component={NavLink} to='/map' style={({ isActive }) => { 
              return { backgroundColor: isActive ? 'white' : '' } }} 
              sx={{ 
                color: 'inherit', 
                textTransform: 'none',
                marginRight: "4rem",}}>
              <Typography  variant= "h6" color = "black">
                Navigate the World
              </Typography>
            </Button>

            <Button component={NavLink} to='/partners' style={({ isActive }) => { 
              return { backgroundColor: isActive ? 'white' : '' } }} 
              sx={{ 
                color: 'inherit', 
                textTransform: 'none',
                marginRight: "4rem", }}>
              <Typography  variant= "h6" color = "black">
                Partners
              </Typography>
            </Button>

            <Button component={NavLink} to='/contact' style={({ isActive }) => { 
              return { backgroundColor: isActive ? 'white' : '' } }} 
              sx={{ 
                color: 'inherit', 
                textTransform: 'none',
                marginRight: "2rem", }}>
                <Typography  variant= "h6" color = "black">
                  Contact Us
                </Typography>
            </Button>
          </Box>
          <Box>
            <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="black"
              >
                <LanguageIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* {data.map((item) => (
                           <MenuItem onClick={handleClose} key ={item.id}>{item.currency}</MenuItem>
                ))
                } */}
                {/* <MenuItem onClick={() => navigate(`/map`,  dispatch(setCurrency('krw')))}
                >
                  Korean Won ₩
                </MenuItem> */}
                <MenuItem onClick={() => handleCurrencyClick("krw")}>
                  Korean Won ₩
                </MenuItem>
                <MenuItem onClick={() => handleCurrencyClick("jpy")}>
                  Japanese Yen ¥
                </MenuItem>
                <MenuItem onClick={() => handleCurrencyClick("eur")}>
                  Euro €
                </MenuItem>
                <MenuItem onClick={() => handleCurrencyClick("usd")}>
                  US Dollar $
                </MenuItem>
                <MenuItem onClick={() => handleCurrencyClick("aud")}>
                  Australian Dollar $
                </MenuItem>
              </Menu>
            </Box>
            <Box mr={3}>  
              <Badge
                badgeContent = {cart.length}
                color="secondary"
                invisible={cart.length === 0}
                sx = {{
                  "& .MuiBadge-badge": {
                    right: 5,
                    top: 5,
                    padding: "0 2px",
                    height: "14px",
                    minWidth: "13px",
                    marginLeft: "0.5rem",
                  }
                }}
              >
              {/* <Button component={NavLink} to='/' style={({ isActive }) => { 
                return { backgroundColor: isActive ? 'white' : '' } }} 
                sx={{ 
                  color: 'black', 
                  textTransform: 'none',
                  // marginRight: "0.5rem" 
                }}
                onClick={()=>
                  dispatch(setIsCartOpen({}))
                }>
                Give Jar
              </Button> */}
              <Button mr = {10} onClick={()=>
                  dispatch(setIsCartOpen({}))
                }
                
              > 
                  <img width="30px" mr={7} src={GivingJar} alt = "GivingJar" className='Givingjar'/>
              </Button>
              </Badge>
            </Box>
            <Box sx={{marginRight : "0"}}>
            {access_token ? 
              <Button component={NavLink} to='/dashboard' 
                style={({ isActive }) => { 
                  return { backgroundColor: isActive ? '#6d1b7b' : '' } 
                  }} 
                  sx={{ color: 'white', textTransform: 'none' }}>
                Dashboard
              </Button> 
              : 
              <Button variant="outlined"  component={NavLink} to='/login' 
                style={({ isActive }) => { 
                  return { backgroundColor: isActive ? 'white' : '' } 
                  }} sx={{ color: 'black', textTransform: 'none' , borderColor : "black"}}>
                Sign up
              </Button>}
            </Box>

        </Toolbar>
      </AppBar>
    </Box>
  </AppBar>
  </>;
};

export default Navbar;
