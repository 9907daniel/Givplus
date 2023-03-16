import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"

//MUI imports
import { Button, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import { Box, ThemeProvider} from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
//Components
//import Header from './Header';

//Assets
import map from '../images/home.jpg'

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
    const navigate = useNavigate();

  return (
    <>
      <Box 
        sx={{marginTop: '64px'

        }}>
        <Box component="img" src={map} 
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
        //   zIndex: "100",
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
      <Box
        sx={{
          zIndex: "100",
          marginLeft: "2rem",
          textAlign:"left"
      }}>
        <Typography variant="h3" 
          sx={{
              color:"black",
              fontFamily: "Gidugu",
          }}>
            Our Motivation
        </Typography>
        <Typography variant = "h5"
        sx={{
            fontFamily: "Gidugu",
        }}>
            A single tweet turned viral in Korea. After the catastrophic 2023 earthquake in Turkey, Turkish tweeted in Korean: 
        </Typography>
        <Typography variant ="h4"
        sx={{
            frontWeight: "Bolder",
            textIndent: "10%",
            color: "#e69191",
            fontFamily: "Gidugu",
        }}>
            “The price of 3 cups of coffee in Korea can buy you 5 blankets in Turkey.”
        </Typography>
        <Typography variant = "h5"
        sx={{
            fontFamily: "Gidugu",
        }}>
            Our understanding from this tweet was that value of currency differs in each country - a penny in a certain state could be a valuable dollar somewhere else.
        </Typography>
        <Typography variant = "h5"
         sx={{
            fontFamily: "Gidugu",
        }}>
            Our service calculates ever-changing exchange rates and each nation’s price level to recommend you where your currency would be valued more. Not a single penny from your pocket would be wasted with our service.
        </Typography>
      </Box>
      <Box
      sx={{
        zIndex: "100",
        marginLeft: "2rem",
        textAlign:"left"
    }}>
        <Typography variant = "h3"
        sx= {{
            fontFamily: "Gidugu",
        }}>
            How to use our service 100%
        </Typography>
        <Typography variant='h5'
        sx={{
            fontFamily: "Gidugu",
        }}>
Visit our “Navigate the World” page. You may see the rankings of nations. Next to each country is the percentage value. It indicates how weak the country’s currency value is compared to yours. 
        </Typography>
        <Typography variant= 'h5'
        sx={{
            fontFamily: "Gidugu",
        }}>
Do the rankings of nations not follow the order of the percentage values? Do not worry- it isn’t an error. 
Our ranking system does not directly show the percentage order. Rather, it implements our special grading system that calculates the trend of where exchange rate is heading to and each nation’s living conditions. 
Thus, unless there is a sudden disaster, we will recommend you nations that continuously needs your help.
        </Typography>
        <Typography variant= 'h5'
        sx={{
            fontFamily: "Gidugu",
        }}>
After choosing a country, you would be sent to our “Organization” Page. Are you passionate about a certain issue? Our service made a partnership with various charity foundations tackling problems of 17 different United Nation’s SDG goals. You may use our filter function to find your interest. 
        </Typography>
        <Typography variant = 'h5'
        sx = {{
            fontFamily: "Gidugu",
        }}>
            If you choose your organization, you would be sent to the project page. Choose your project and move on to donation page. Hooray, you saved the world today!
        </Typography>
      </Box>
      <Box
      sx={{
        zIndex: "100",
        marginLeft: "2rem",
        textAlign:"left"
    }}>
        <Typography variant='h3'
        sx={{
            fontFamily: "Gidugu",
        }}>
        !IMPORTANT! things to note before donating
        </Typography>
        <Typography variant= 'h5'
        sx={{
            fontFamily: "Gidugu",
        }}>
            To make our economic theories easily understandable, we chose a cup of coffee to compare the price level of each nation. However, please note that the coffee is just a metaphor for the price level of a myriads of items in the market. 
        </Typography>
    </Box>
    </>
    
    )
}

export default Home
