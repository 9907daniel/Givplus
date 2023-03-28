import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import countryImage from "../images/countryImage/LebanonFlag.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography, Grid } from "@mui/material";
import { CSVFile, readString } from 'react-papaparse';
import Papa from 'papaparse'
import { useDispatch, useSelector } from "react-redux";
import newsFile from "../files/Lebanon_news.csv"
//import Lira from "../images/article/Lira.webp"
import IMF from "../images/article/IMF.jpg"
import daylight from "../images/article/daylight.jpg"


function CountryDescription({item}) {
    const[news, setNews] = useState([]);
    const navigate = useNavigate();
    const imagePath = "/images/article/";
    const Lira = "/article/Lira.webp"

    useEffect(() => {
        // Load news data from CSV file
        Papa.parse(newsFile, {
          download: true,
          header: true,
          complete: function (results) {
            const records = results.data;
            console.log(records);
            setNews(records);
          },
        });
      }, []);
    return(
    <Box sx={{ position: "relative", height: "90vh" }}>
        <Box
          component="img"
          src={countryImage}
          sx={{ width: "100%", height: "100%" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
            <Box 
                sx={{
                    position: "absolute",
                    // zIndex: "100",
                    top:"70px",
                    left:"70px",
                    width: "90%",
                    textAlign:"left",

                }}>
                <Typography variant="h2" 
                    sx={{
                        color:"white",
                        fontWeight:"bolder",
                        mb: 2
                    }}>
                    {item.name}
                </Typography>
                <Typography variant="h6" 
                    sx={{
                        color:"white",
                    }}>
                        Population : {item.population}
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
                    top:"10px",
                    width: "100%",
                    align : "center",
                    pt: 4,
                }}>
            <Grid container spacing={3} justifyContent="center"  sx={{p : 4}}>
            {news.slice(0, 3).map((article, index) => (
                <Grid key ={article.Title} item xs={4} >
                    <Box sx={{ width: "100%", height: "100%", position: "absolute", top: "380px" }}>
                    <a href={article.Link} target="_blank" rel="noopener noreferrer">
                    <img style={{width: "40vh", height: "25vh"}} 
                        src={index === 0 ? Lira : (index === 1 ? IMF : daylight)}
                        alt={article.Title}/>
                    </a>
                    </Box>
                    <Box border={1} p={1} 
                    sx={{
                        position: "absolute",
                        top:"580px",
                        width: "40vh",
                        borderColor: "white",
                    }}>
                    <Typography  
                    sx={{
                        color:"white",
                    }}>
                        {article.Title}
                    </Typography>
                    <Typography  
                    sx={{
                        color:"white", fontSize: "10px", textAlign: "right" 
                    }}>
                        {article.Published}
                    </Typography>
                    </Box>
                </Grid>
            ))}
                {/* <Grid item xs={4}>
                    <Box border={1} p={2}>
                    <Typography variant="h6" 
                    sx={{
                        color:"white",
                    }}>
                        News 2
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box border={1} p={2}>
                    <Typography variant="h6" 
                    sx={{
                        color:"white",
                    }}>
                        News 3
                    </Typography>
                    </Box>
                </Grid> */}
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
    
     //console.log("Filtered data:", AllProjects);
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
