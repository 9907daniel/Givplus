// import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

import React, {useState, useContext} from 'react'
import {Link, useNavigate} from "react-router-dom"
import Axios from 'axios';
//MUI imports
import { Button, Typography, Grid, AppBar, Toolbar, Menu, MenuItem } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, ThemeProvider} from '@mui/system';
import { createTheme } from '@mui/material/styles';


import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';

//Assets
import logo from '../images/logo.png'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const { access_token } = getToken()
  return <>
  <AppBar position="fixed">
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
      sx={{
        backgroundColor: 'white',
      }}>
        <Toolbar>
        <Button component={NavLink} to='/'> 
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

            <Button component={NavLink} to='/' style={({ isActive }) => { 
              return { backgroundColor: isActive ? 'white' : '' } }} 
              sx={{ 
                color: 'inherit', 
                textTransform: 'none',
                marginRight: "4rem", }}>
              <Typography  variant= "h6" color = "black">
                Organization
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
          <Button component={NavLink} to='/' style={({ isActive }) => { 
              return { backgroundColor: isActive ? 'white' : '' } }} 
              sx={{ 
                color: 'black', 
                textTransform: 'none',
                marginRight: "1rem" }}>
              Cart
            </Button>

          <Button component={NavLink} to='/login' 
                style={({ isActive }) => { 
                  return { backgroundColor: isActive ? 'white' : '' }}} 
                  sx={{ 
                    color: 'black', 
                    textTransform: 'none',
                    marginRight: "1rem" }}>
                Sign in
              </Button>  

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
