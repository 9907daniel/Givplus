import React, { useEffect, useState } from "react";
import axios from 'axios';

import countryImage from "../images/countryImage/LebanonFlag.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function CountryDescription({item}) {
    return(
    <Box 
            sx={{

            }}>
            <Box component="img" src={countryImage} 
            sx={{
                width:"100%",
                height:"90vh",
            }}
            />
            {/* <Box backgroundColor="rgba(0, 0, 0, 0.4)"
            sx={{
                position: "absolute",
                top: "140px",
                left: "40px",
                width:"95%",
                height:"50vh",
            }}
            /> */}
            <Box backgroundColor="rgba(0, 0, 0, 0.4)"
                sx={{
                    position: "absolute",
                    // zIndex: "100",
                    top:"150px",
                    left:"70px",
                    width: "90%",
                    textAlign:"left"
                }}>
                <Typography variant="h2" 
                    sx={{
                        color:"white",
                        fontWeight:"bolder",
                    }}>
                    {item.name}
                </Typography>
                <Typography variant="h6" 
                    sx={{
                        color:"white",
                    }}>
                        Population :{item.population}
                </Typography>
                <Typography variant="h6" 
                    sx={{
                        color:"white",
                    }}>
                        Need Help In : {item.need_help_in}
                </Typography>
                <Typography variant="h6" 
                    sx={{
                        color:"white",
                    }}>
                        Description : {item.description.Summary}:
                </Typography>
            </Box>
            <Box sx={{
                    position: "absolute",
                    // zIndex: "100",
                    top:"600px",
                    width: "100%",
                    align : "center",
                }}>
            <Grid container spacing={3} justifyContent="center"  sx={{p : 4}}>
                <Grid item xs={4}>
                    <Box border={1} p={2} >
                    News 1
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box border={1} p={2}>
                    News 2
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box border={1} p={2}>
                    News 3
                    </Box>
                </Grid>
            </Grid>
            </Box>
        </Box>

    )

}
function CountryDetailsTop(props) {
    const [data, setData] = useState([]);
    const currencyVal = props.currency
    useEffect(() => {
        async function getData() {
            const response = await axios.get('https://givplus.duckdns.org/api/countries/');
            setData(response.data);
        }
        getData();
      }, []);
      //console.log(data[0].currency)
      const AllProjects = data.filter(
        (item) => item.currency === currencyVal   
    )
    
     console.log("Filtered data:", AllProjects);
    // console.log(data[0].currency, currency)
  return (
    <div>
    {AllProjects.map((item)=>(
            
              <CountryDescription item={item} key={item.id}/>
           
      
         ))}
    </div>
  )
 }

                
export default CountryDetailsTop
