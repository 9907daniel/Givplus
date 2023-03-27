import React, {useState, useEffect, useRef, useMemo} from 'react'
import Axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


//map imports
import CallGoogleMap from './CallGoogleMap'

//MUI imports
import {
    Grid, 
    Typography, 
    Button, 

} from "@mui/material";

import graph from './ARSKRW.png'

//mui imports2
import {alpha} from '@mui/material';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row({item}){
    const navigate=useNavigate()
    const { id, country, currency,currency_abbreviation, today_rate, forex_score, final_score, ppp_log, gdp, gdp_ppp, file_index, coffee} = item;
     const [open, setOpen] = React.useState(false);
     return(
         <React.Fragment>
         <TableRow 
         sx={{ '& > *': { borderBottom: 'unset' } }}>
             <TableCell>
                 <IconButton
                 aria-label="expand row"
                 size="small"
                 onClick={() => setOpen(!open)}
                 >
                 {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                 </IconButton>
             </TableCell>
             <TableCell component="th" scope="row" align="center">
                 {id > 196 ? (id-196):(id)}
             </TableCell>
             <TableCell align="center">{country}</TableCell>
             {forex_score < 0 ? (
                <TableCell style={{ color: 'red' }} align="center">
                    {forex_score}%
                </TableCell>
                ) : (
                <TableCell style={{ color: 'green' }} align="center">+{forex_score}%</TableCell>
                )}
            <TableCell align="center">{coffee} ☕</TableCell>

         </TableRow>


         <TableRow>
             <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                 <Collapse in={open} timeout="auto" unmountOnExit>
                 <Box sx={{ margin: 2 }} >
                     {/* <Typography variant="body1" gutterBottom component="div">
                     {currency}{"("}{currency_abbreviation}{")"}
                     </Typography> */}
                     <Table size="small" aria-label="purchases">
                     <TableBody >
                         <TableRow>
                             <TableCell>{currency}</TableCell>
                             <TableCell>{currency_abbreviation}</TableCell>
                         </TableRow>

                         <TableRow>
                             <TableCell>Today's Rate ({currency_abbreviation})</TableCell>
                             <TableCell> 
                             <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                                  {today_rate} {file_index}
                             </span>    
                            </TableCell>
                         </TableRow>
                         
                         <TableRow>
                             <TableCell>Purchasing Power Parity (PPP)</TableCell>
                             <TableCell>{ppp_log}</TableCell>
                         </TableRow>
                         <TableRow>
                             <TableCell>GDP per Capita</TableCell>
                             <TableCell>{gdp}</TableCell>
                         </TableRow>
                         <TableRow>
                             <TableCell>GDP per Capita (PPP)</TableCell>
                             <TableCell>{gdp_ppp}</TableCell>
                         </TableRow>

                         <TableRow>
                             <TableCell>Givplus Score</TableCell>
                             <TableCell>{final_score}</TableCell>
                         </TableRow>
                         <TableRow>
                             <TableCell>National Emergency</TableCell>
                             <TableCell>None</TableCell>
                         </TableRow>

                         <TableRow align="center">
                             <TableCell align="center">
                                 <img src= {graph} width="330" height="240"/>
                             </TableCell> 
                         </TableRow>

                         <TableRow>
                            <TableCell> </TableCell>
                             <TableCell>
                             <Button onClick={() => navigate(`/countrydetails/${item.id}`,{state: { CountryName: item.country }})} style={{ border: '1px solid black' }}>
                                 Donate
                             </Button>
                             </TableCell>
                         </TableRow>
                     </TableBody>
                     </Table>
                 </Box>
                 </Collapse>
             </TableCell>
         </TableRow>
         </React.Fragment>
 
     )
 }

function Map() {

    const navigate=useNavigate()
    const currency_score = useSelector((state) => state.cart.currency);
    const [data, setData] = useState([]);
    const center = useMemo(()=>({lat: 35.6586, lng: 139.7454}),[])
    const [selectedMarker, setSelectedMarker] = useState("");


    useEffect(() => {
    async function fetchData() {
      const response = await Axios.get(`https://givplus.duckdns.org/api/scores/${currency_score}`);
      setData(response.data);
    }
    fetchData();
  }, [currency_score]);


  return ( 
    <Grid container>
        <Grid item xs={4} 
        >
                <TableContainer component={Paper}
                style={{marginLeft: 0, maxHeight: '800px', overflowY: 'auto'}}
                >
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell />

                            <TableCell align="center"> 
                                Givplus Ranking 
                                <Tooltip title="This is our internal calculation based on your currency's strength and coffee index, in an order that maximizes your giving!">
                                <Box component="span" ml={1}>
                                    <InfoOutlinedIcon fontSize="inherit" sx={{ fontSize: '0.8rem', color: alpha('#000', 0.5) }} />
                                </Box>
                                </Tooltip>
                            </TableCell>

                            <TableCell align="center"> 
                                Country 
                            </TableCell>
                            <TableCell align="center"> 
                                More Giving 
                                <Tooltip title="This is a percent difference between today's exchange rate and weighted moving averages. Positive value means your currency is going relatively strong 🔥">
                                <Box component="span" ml={1}>
                                    <InfoOutlinedIcon fontSize="inherit" sx={{ fontSize: '0.8rem', color: alpha('#000', 0.5) }} />
                                </Box>
                                </Tooltip>                                
                            </TableCell>
                            <TableCell align="center"> 
                                Coffee Index 
                                <Tooltip title="This is calculated by comparing purchasing powr parity. Coffee index tells you how many cups of coffee you can get for the price of one cup in your country.">
                                <Box component="span" ml={1}>
                                    <InfoOutlinedIcon fontSize="inherit" sx={{ fontSize: '0.8rem', color: alpha('#000', 0.5) }} />
                                </Box>
                                </Tooltip>                            
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                         {data.map((item) => (
                           <Row key={item.id} item={item} />
                         ))
                         }
                         </TableBody>
                    </Table>
                </TableContainer>
        </Grid>
        <Grid item xs={8} style={{marginTop: "0"}}>
            <CallGoogleMap />
        </Grid>
    </Grid>
  )

                }
export default Map

