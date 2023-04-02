import React from 'react'

//MUI imports
import { Typography} from '@mui/material';
import { Box} from '@mui/system';
import { keyframes } from '@emotion/react';

//Assets
import home from '../images/home.jpg'
import home1 from '../images/home1.jpg'
import home2 from '../images/home2.jpg'
import home3 from '../images/home3.jpg'
import home4 from '../images/home4.jpg'
import home5 from '../images/home5.jpg'

const slideIn = keyframes`
  from {
    transform: translateX(-50%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

function Home() {
  return (
    <>
      <Box 
        sx={{marginTop: '0'

        }}>
        <Box component="img" src={home} 
        sx={{
            width:"100%",
            height:"100%",
        }}
        />
        <Box
            sx={{
                position: "absolute",
                // zIndex: "100",
                top:"150px",
                left:"40px",
                textAlign:"left"
            }}>
            <Typography variant="h1" 
                sx={{
                    color:"white",
                    fontWeight:"bolder",
                    fontSize: "75px",
                    animation: `${slideIn} 1s ease-in-out`
                }}>
                <span style={{ backgroundColor: "#2f2f2f" }}>
                <br/> Your dollar is worth <br/> more somewhere.
                </span>
            </Typography>
            <Typography variant="h4" 
                sx={{
                    color:"black",
                    fontSize: "29px",
                    animation: `${slideIn} 2s ease-in-out`
                }}>
                <span style={{ backgroundColor: "white" }}>
                <br/> Empower your currency to help more in need.
                </span>
            </Typography>
        </Box>
      </Box>

    <Box
        sx={{
          zIndex: "100",
          textAlign:"left"
        }}>
        <Typography variant="h3" 
                sx={{
                    color:"black",
                    textAlign: "left",
                    fontWeight: "bold",
                    p: "2rem",
                }}>
                    Our Motivation
        </Typography>
        <Box component="img" src={home1}
        sx={{
            width:"100%",
            height:"100%",
        }}
        />
    <Box component="img" src={home5}
        sx={{
            width:"100%",
            height:"100%",
        }}
        />
        </Box>

      <Box>
        <Typography variant="h3" 
                sx={{
                    color:"black",
                    textAlign: "left",
                    fontWeight: "bold",
                    p: "2rem",
                }}>
                    How does it work?
        </Typography>

        <Box component="img" src={home2}
        sx={{
            width:"100%",
            height:"100%",
        }}
        />

        <Box component="img" src={home3}
        sx={{
            width:"100%",
            height:"100%",
        }}
        />
        <Typography variant= 'h4'
        sx={{
            fontFamily: "Gidugu",
            marginLeft: "240px",
            marginRight: "240px",
            textAlign: "center",
            fontStyle: "italic",
            p: "2rem",
        }}>
       "We ourselves feel that what we are doing is just a drop in the ocean. But the ocean would be less because of that missing drop." 
        </Typography>
        <Typography variant= 'h5'
        sx={{
            fontFamily: "Gidugu",
            marginLeft: "240px",
            marginRight: "240px",
            textAlign: "center",
            fontStyle: "italic",
            p: "2rem",
        }}>
       - Mother Teresa - 
        </Typography>
        <Box component="img" src={home4}
        sx={{
            width:"100%",
            height:"100%",
        }}
        />
      </Box>
    </>
    
    )
}

export default Home
