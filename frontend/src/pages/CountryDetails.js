import React, { useEffect, useState } from "react";
import axios from 'axios';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
//import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../state"

import countryImage from "../images/countryImage/1.jpg";



const countrydetails =() =>{
    const dispatch = useDispatch();
    const [value, setValue] = useState("all")
    const items = useSelector((state)=> state.cart.items)
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    //const [data, setData] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log("items",items)
    
    async function getItems() {
        const items = await fetch(
          "http://localhost:8000/api/countries/",
          { method: "GET" }
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
      }
    useEffect(() => {
        getItems();
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await axios.get('http://localhost:8000/api/countries/');
    //         setData(response.data);
    //     }
    //     fetchData();
    //   }, []);
  return (
    <div>
         <>
      <Box 
        sx={{

        }}>
        <Box component="img" src={countryImage} 
        sx={{
            width:"100%",
            height:"70vh",
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
                }}>
                Botswana
            </Typography>
            <Typography variant="h4" 
                sx={{
                    color:"white",
                    //fontWeight:"bolder",
                }}>
                    Population:
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
          marginLeft: "0",
          textAlign:"left"
      }}>
        <Typography variant="h3" 
          sx={{
              color:"black",
              fontWeight:"bolder",
          }}>
            List of Projects 
        </Typography>
      </Box>
    </>
      Project lists
    </div>
  )
}

export default countrydetails
