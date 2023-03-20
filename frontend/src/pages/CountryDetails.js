import React, { useEffect, useState } from "react";
import axios from 'axios';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Country from "./Country";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../state"

import countryImage from "../images/countryImage/1.jpg";



const countrydetails =() =>{
    const dispatch = useDispatch();
    const [value, setValue] = useState("all")
    // const items = useSelector((state)=> state.cart.items)
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [data, setData] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(data)
    
    // async function getItems() {
    //     const items = await fetch(
    //       "http://localhost:8000/api/countries/",
    //       { method: "GET" }
    //     );
    //     const itemsJson = await items.json();
    //     dispatch(setItems(itemsJson.data));
    //   }
    // useEffect(() => {
    //     getItems();
    // },[])// eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        async function getData() {
            const response = await axios.get('http://localhost:8000/api/countries/');
            setData(response.data);
        }
        getData();
      }, []);
    const projectonHealth = data.filter(
        (item) => item.need_help_in === "Health"
    )
    const projectonPoverty = data.filter(
        (item) =>  item.need_help_in === "Poverty"
    )

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
                    }}>
                        Population:
                </Typography>
            </Box>
            
        </Box>
        {/* <Box>
        {data.map((item) => 
        <div key = {item.id}>
            <Typography>
                {item.name}
            </Typography>

        </div>)}
        </Box> */}
        </>
        <Box width = "80%" margin = "80px auto">
            <Typography variant="h3" textAlign="center">
               List of Projects
            </Typography>
            <Tabs 
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered 
                TabIndicatorProps={{sx:{display : isNonMobile? "block" : "none"}}}
                sx={{
                    m: "25px",
                    "& .MuiTabs-flexContainer": {
                      flexWrap: "wrap",
                    },
                }}
                >
                    <Tab label="ALL" value="all"/>
                    <Tab label="HEALTH" value="Health"/>
                    <Tab label="POVERTY" value="Poverty"/>  
            </Tabs>
            <Box
            margin = "0 auto"
            display = "grid"
            gridTemplateColumns="repeat(auto-fill, 300px)"
            //space-between will make it left aligned at smallest size
            justifyContent="space-around"
            rowGap="20px"
            columnGap="1.33%"
            >
            </Box>
            {value === "all" && data.map((item)=>(
                // <Typography key = {item.id} variant="h5" textAlign="center">
                //     {item.name}
                //     </Typography>
                <Country item={item} key={`${item.name}-${item.id}`}/>
            ))}
            {/* {value === "Health" && projectonHealth.map((item)=>(
                <Country item={item} key={`${item.name}-${item.id}`}/>
            ))}
            {value === "Poverty" && projectonPoverty.map((item)=>(
                <Country item={item} key={`${item.name}-${item.id}`}/>
            ))} */}
        </Box>
    </div>
  )
}

export default countrydetails
