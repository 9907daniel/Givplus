import React, { useEffect, useState } from "react";
import axios from 'axios';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Country from "./Country";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../components/state"
import { useLocation } from 'react-router-dom';
import CountryDetailsTop from "./CountryDetailsTop";



const CountryDetails =(props) =>{
    const dispatch = useDispatch();
    // const items = useSelector((state)=> state.cart.items)
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [data, setData] = useState([]);
    const location = useLocation();
    const CountryId = location.state.CountryId;
    const currency_abbreviation = location.state.currency_abbreviation;
    const [value, setValue] = useState(CountryId)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(data)
    
  
    
    useEffect(() => {
        async function getData() {
            const response = await axios.get('https://givplus.duckdns.org/api/projects/');
            setData(response.data);
        }
        getData();
      }, []);

    const AllProjects = data.filter(
        (item) => item.number === CountryId
    )
    const projectonPoverty = data.filter(
        (item) => item.un_goal === 1
    ).filter(
        (item) => item.number === CountryId
    )
    const projectonHunger = data.filter(
        (item) =>  item.un_goal === 2
    ).filter(
        (item) => item.number === CountryId
    )
    const projectonHealth = data.filter(
        (item) =>  item.un_goal === 3
    ).filter(
        (item) => item.number === CountryId
    )
    const projectonEducation = data.filter(
        (item) =>  item.un_goal === 4
    ).filter(
        (item) => item.number === CountryId
    )
    const projectonEquality = data.filter(
        (item) =>  item.un_goal === 5
    ).filter(
        (item) => item.number === CountryId
    )

  return (
    <div>
        <>
        <CountryDetailsTop currency = {currency_abbreviation} />
        </>
        <>
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
                    <Tab label="ALL" value={CountryId}/>
                    <Tab label="No Poverty" value = {1} />
                    <Tab label="Zero Hunger" value={2}/>  
                    <Tab label="Good Health and Well Being" value={3}/>  
                    <Tab label="Quality Education" value={4}/>  
                    <Tab label="Gender Equality" value={5}/>  
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
            {value === CountryId && AllProjects.map((item)=>(
                <Country item={item} key={`${item.project_name}-${item.order}`}/>
            ))}
            {value === 1 && projectonPoverty.map((item)=>(

                <Country item={item} key={`${item.project_name}-${item.order}`}/>
            ))}
            {value === 2 && projectonHunger.map((item)=>(

                <Country item={item} key={`${item.project_name}-${item.order}`}/>
            ))}
            {value === 3 && projectonHealth.map((item)=>(

                <Country item={item} key={`${item.project_name}-${item.order}`}/>
            ))}
            {value === 4 && projectonEducation.map((item)=>(

                <Country item={item} key={`${item.project_name}-${item.order}`}/>
            ))}
            {value === 5 && projectonEquality.map((item)=>(

                <Country item={item} key={`${item.project_name}-${item.order}`}/>
            ))}
            </Box>
        </Box>
        </>
    </div>
  )
}

export default CountryDetails
