import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"

//MUI imports
import { Button, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import { Box, ThemeProvider} from '@mui/system';
import { createTheme } from '@mui/material/styles';

//Components
//import Header from './Header';




function Country() {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    
    useEffect(() => {
        async function fetchCountries() {
            const response = await Axios.get('http://localhost:8000/api/scores/');
            setCountries(response.countries);
        }
        fetchCountries();
      }, []);
  return (
    <>
      <Box 
        sx={{

        }}>
        {/* <Box component="img" src={map} 
        sx={{
            width:"100%",
            height:"92vh",
        }}
        /> */}
        <Box
            sx={{
                position: "absolute",
                zIndex: "100",
                top:"150px",
                left:"40px",
                textAlign:"left"
            }}>
            <Typography variant="h1" 
                sx={{
                    color:"white",
                    fontWeight:"bolder",
                }}>
                Your Dollar is worth more somewhere
            </Typography>
            <Typography variant="h4" 
                sx={{
                    color:"white",
                    //fontWeight:"bolder",
                }}>
                Empower your currency to help more in need.
            </Typography>
            {/* <Button variant='contained' 
                sx={{
                    fontSize:"1rem",
                    borderRadius:"10px",
                    backgroundColor:"#76b5c5",
                    marginTop:"4rem",
                    '&:hover': {
                        backgroundColor: '#1e81b0',
                        color: 'white',
                    }
                }}
                onClick={()=>navigate('/listings')}
                >
                LOOK FOR COUNTRIES
            </Button> */}
        </Box>
        
      </Box>
      <Box
        sx={{
          zIndex: "100",
          marginLeft: "2rem",
          textAlign:"left"
      }}>
        <Typography variant="h3" 
          sx={{
              color:"black",
              fontWeight:"bolder",
          }}>
            So how does it work?
        </Typography>
      </Box>
    </>
    )
}

export default Country
