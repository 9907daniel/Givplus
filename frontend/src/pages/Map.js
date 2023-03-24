import React, {useState, useEffect, useRef, useMemo} from 'react'
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

//map imports
import CallGoogleMap from './CallGoogleMap'

//MUI imports
import {
    Grid, 
    Typography, 
    Button, 

} from "@mui/material";


//mui imports2
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

import { useJsApiLoader } from '@react-google-maps/api';


function Row({item}){
    const navigate=useNavigate()
    const { id, country, currency,currency_abbreviation, final_score, ppp_log } = item;
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
                 {id}
             </TableCell>
             <TableCell align="center">{country}</TableCell>
             <TableCell align="center">{final_score}</TableCell>
         </TableRow>
         <TableRow>
             <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                 <Collapse in={open} timeout="auto" unmountOnExit>
                 <Box sx={{ margin: 2 }} >
                     <Typography variant="body1" gutterBottom component="div">
                     {currency}{"("}{currency_abbreviation}{")"}
                     </Typography>
                     <Table size="small" aria-label="purchases">
                     <TableBody >
                         
                         <TableRow>
 
                             <TableCell>GDP(ppp){"  "}{ppp_log}</TableCell>
                         </TableRow>
                         <TableRow>
                             <TableCell>Population{"  "}</TableCell>
                             <Button
                                 onClick={() => navigate(`/countrydetails/${item.id}`)}
                             >
                                 Details
                             </Button>
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
   
    // const [allListings, setAllListings] = useState([])
    // const [dataIsLoading, setDataIsLoading] = useState(true)
;
    const [data, setData] = useState([]);
    //const [countries, setCountries] = useState([]);
    const center = useMemo(()=>({lat: 35.6586, lng: 139.7454}),[])
    const [selectedMarker, setSelectedMarker] = useState("");
    const {isLoaded} = useJsApiLoader({
         googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
         })

    
    useEffect(() => {
    async function fetchData() {
      const response = await Axios.get('https://givplus.duckdns.org/api/scores/');
      setData(response.data);
    }
    fetchData();
  }, []);


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
                            {/* <TableCell align="center">Ranking</TableCell> */}
                            <TableCell align="center">{" "}</TableCell>
                            <TableCell align="center">Score</TableCell>
                            <TableCell align="center">View List</TableCell>
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

