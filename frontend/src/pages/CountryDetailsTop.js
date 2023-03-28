import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function CountryDescription({item, countryId}) {
    const[news, setNews] = useState([]);
    const navigate = useNavigate();
    const imagePath = "/images/article/";
    const Lira = "/article/Lira.webp"
    console.log(countryId)
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
    <>
    {/* <Box sx={{ position: "relative", height: "90vh" }}>
        <Box
          component="img"
          src={`/flags/${countryId}.png`}
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
               
            </Grid>
            </Box>
        </Box> */}
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(/flags/${countryId}.png)`,
            }}
            >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={`/flags/${countryId}.png`} alt= "flag image" />}
            <Box
                sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,.4)',
                }}
            />
        <Grid container>
            <Grid item md={8}>
            <Box
                sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
                }}
            >
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {item.name}
                </Typography>
                <Typography variant="h6" color="inherit" paragraph
                sx={{
                    fontSize: '18px',
                }}>
                {item.description.Summary}
                </Typography>
                <Typography variant="h6" color="inherit" paragraph
                sx={{
                    fontSize: '18px',
                }}>
                {item.description.Humanity}
                </Typography>
                <Typography variant="h6" color="inherit" paragraph
                sx={{
                    fontSize: '18px',
                }}
                >
                {item.description.Economy_and_Politics}
                </Typography>
                
                {/* <Link variant="subtitle1" href="#">
                {item.linkText}
                </Link> */}
            </Box>
            </Grid>
            <Grid item md={4}>
            <Box
                sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                mt: 9,
                pr: { md: 0 },
                }}
            >
                <Typography variant="h6" color="inherit" paragraph
                sx={{
                    fontSize: '18px',
                }}>
                Continent : {item.continent}
                </Typography>
                <Typography variant="h6" color="inherit" paragraph
                sx={{
                    fontSize: '18px',
                }}>
                Population : {item.population}
                </Typography>
                <Typography variant="h6" color="inherit" paragraph
                sx={{
                    fontSize: '18px',
                }}>
                GDP : {item.gdp}
                </Typography>
                <Typography variant="h6" color="inherit" paragraph
                sx={{
                    fontSize: '18px',
                }}>
                Language : {item.language}
                </Typography>
                <Typography variant="h6" color="inherit" paragraph
                sx={{
                    fontSize: '18px',
                }}>
                Religion : {item.religion}
                </Typography>
                <Typography variant="h6" color="inherit" paragraph
                sx={{
                    fontSize: '20px',
                }}>
                Need Help In : {item.need_help_in}
                </Typography>
            
            </Box>
            </Grid>
        </Grid>
    </Paper>
    <Grid container spacing={4}>
        {news.slice(0, 3).map((article, index) => (
            //<FeaturedPost key={post.title} post={post} />
            <Grid key={article.Title} item xs={12} md={4}>
                <CardActionArea component="a" href={article.Link}>
                    <Card 
                    sx={{ 
                        //display: 'flex',

                     }}
                    >
                    <CardMedia
                        component="img"
                        sx={{ height: 250, display: { xs: 'none', sm: 'block' } }}
                        image= {index === 0 ? Lira : (index === 1 ? IMF : daylight)}
                        alt={article.Title}
                    />
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h6">
                        {article.Title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                        {article.Published}
                        </Typography>
                        {/* <Typography variant="subtitle1" paragraph>
                        {article.Link}
                        </Typography> */}
                        <Typography variant="subtitle1" color="primary">
                        Continue reading...
                        </Typography>
                    </CardContent>
                    
                    </Card>
                </CardActionArea>
            </Grid>
        ))}
    </Grid>

        </>



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
            
              <CountryDescription item={item} countryId = {item.number} key={item.number}/>
           
      
         ))}
    </div>
  )
 }

                
export default CountryDetailsTop
