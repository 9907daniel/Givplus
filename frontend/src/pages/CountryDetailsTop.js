import React, { useEffect, useState } from "react";
import axios from 'axios';

import countryImage from "../images/countryImage/LebanonFlag.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function CountryDetailsTop(props) {
    const [data, setData] = useState([]);
    const currency = props.currency
    useEffect(() => {
        async function getData() {
            const response = await axios.get('https://givplus.duckdns.org/api/countries/');
            setData(response.data);
        }
        getData();
      }, []);

      const AllProjects = data.filter(
        (item) => item.currency === currency
        
    )
  
  return (
    <div>
    {AllProjects.map((item)=>(
        
              //  <Country item={item} key={`${item.project_name}-${item.id}`}/>
           
      <Box key={`${item.project_name}-${item.id}`}
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
                    Lebanon
                </Typography>
                <Typography variant="h4" 
                    sx={{
                        color:"white",
                    }}>
                        Population:
                </Typography>
            </Box>
            
        </Box>
         ))}
    </div>
  )
 }

                
export default CountryDetailsTop
