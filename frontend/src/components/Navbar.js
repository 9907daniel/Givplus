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



const Navbar = () => {
  const navigate = useNavigate();
  const { access_token } = getToken()
  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
      sx={{
        backgroundColor: 'white',
      }}>
        <Toolbar>
          <Typography variant='h5' component="div" sx={{ flexGrow: 1 , color: "black"}}>GIVPLUS</Typography>
          <Box 
            sx={{
              marginLeft:"auto",
              marginRight:"18rem",
            }}
            >
            <Button component={NavLink} to='/map' style={({ isActive }) => { 
              return { backgroundColor: isActive ? 'white' : '' } }} 
              sx={{ 
                color: 'inherit', 
                textTransform: 'none',
                marginRight: "4rem" 
                }}
                >
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

            {/* <Button component={NavLink} to='/example' style={({ isActive }) => { 
              return { backgroundColor: isActive ? 'white' : '' } }} 
              sx={{ color: 'black', textTransform: 'none' }}>
              Example
            </Button> */}

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
                marginRight: "2rem" }}>
              Cart
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
                Login
              </Button>}

            </Box>

        </Toolbar>
      </AppBar>
    </Box>
  </>;
};

export default Navbar;
