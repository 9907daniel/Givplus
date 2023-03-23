import React, {useState, useEffect, useRef, useMemo} from 'react'
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

//map imports
import { GoogleMap, InfoWindow, Marker, useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import tempMarker from '../images/tempMarker.png';
import CallGoogleMap from './CallGoogleMap'
// import Parked from "../assets/images/parked.png";
// import Incident from "../assets/images/IncidentsDrones.png";
// import InAir from "../assets/images/IntheAirDrones.png";
// import Mission from "../assets/images/missionmarker.png";
// import Offline from "../assets/images/offlinedrones.png";
// import "./Map.css";
// import ChangeMapType from "./Layers/ChangeMapType";


//MUI imports
import {
    Grid, 
    AppBar, 
    Typography, 
    Button, 
    Card, 
    CardHeader, 
    CardMedia, 
    CardContent,
    CircularProgress,

} from "@mui/material";


//mui imports2
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
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


function Map() {

    const navigate=useNavigate()
   
    // const [allListings, setAllListings] = useState([])
    // const [dataIsLoading, setDataIsLoading] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [dense, setDense] = React.useState(true);
    const [data, setData] = useState([]);
    //const [countries, setCountries] = useState([]);
    const center = useMemo(()=>({lat: 35.6586, lng: 139.7454}),[])
    const [selectedMarker, setSelectedMarker] = useState("");
    // const {isLoaded} = useJsApiLoader({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //     })

    
    useEffect(() => {
    async function fetchData() {
      const response = await Axios.get('https://givplus.duckdns.org/api/scores/');
      setData(response.data);
    }
    fetchData();
  }, []);

//     useEffect(() => {
//     async function fetchData() {
//         const response = await Axios.get('http://localhost:8000/api/countries/');
//         setData(response.data);
//     }
//     fetchData();
//   }, []);

  

    // if (!isLoaded) {
    //     return <Typography> Loading...</Typography>
    //   }

    
  return ( 
    <Grid container>
        <Grid item xs={4} 
        >
        {/* <Typography variant = "h6" align="center" marginTop ="1rem">
            Ranking
        </Typography>   */}
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
                            // <Row key={listing.id} row={listing} />
                            <React.Fragment key = {item.id}>
                            <TableRow  sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                                    {item.id}
                                </TableCell>
                                <TableCell align="center">{item.country}</TableCell>
                                <TableCell align="center">{item.final_score}</TableCell>
                                {/* <TableCell align="center">
                                    <Button onClick={()=>navigate("/foundations")}>
                                        View
                                    </Button>
                                </TableCell> */}
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Box sx={{ margin: 2 }} >
                                        <Typography variant="body1" gutterBottom component="div">
                                        {item.currency}{"("}{item.currency_abbreviation}{")"}
                                        </Typography>
                                        <Table size="small" aria-label="purchases">
                                        {/* <TableHead>
                                            <TableRow>
                                            <TableCell>Customer</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Total price ($)</TableCell>
                                            </TableRow>
                                        </TableHead> */}
                                        <TableBody >
                                            
                                            <TableRow>
                                                {/* <TableCell component="th" scope="row">
                                                {historyRow.date}
                                                </TableCell> */}
                                                <TableCell>GDP(ppp){"  "}{item.ppp_log}</TableCell>
                                                {/* <TableCell align="right">{historyRow.amount}</TableCell>
                                                <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                                </TableCell> */}
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Population{"  "}</TableCell>
                                                <Button
                                                    onClick={() => navigate(`/countrydetails/${item.id}`)}
                                                >
                                                    Details
                                                </Button>
                                            </TableRow>
                                            {/* <TableRow>
                                                <Button onClick={()=>navigate("/country")}>
                                                    Donate
                                                </Button>
                                            </TableRow> */}
                                            
                                        </TableBody>
                                        </Table>
                                    </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                            </React.Fragment>
                         ))
                         }

                        {/* {rows.map((row) => (
                            <Row key={row.country} row={row} />
                        ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
        </Grid>
        <Grid item xs={8} style={{marginTop: "0"}}>
            <CallGoogleMap />

            {/* <GoogleMap 
            center ={center} 
            zoom ={2}
            mapContainerStyle={{
                width:"100%",
                height:"100%"
            }} >
                {data.map((item) => {
                    return(
                        <div key = {item.id}>
                            <Marker
                                position = {{lat: 35.6586, lng: 139.7454}}
                                icon = {tempMarker}
                                onClick={() => {
                                    setSelectedMarker(item);
                                  }}
                            />
                        </div>
                    )
                })}
                {selectedMarker&& (
                    <InfoWindow
                    //position={data.location}
                    position={{lat: 35.6586, lng: 139.7454}}
                    options={{
                        pixelOffset: new window.google.maps.Size(0, -40),
                    }}
                    >
                    <div>
                        <h1>location -{selectedMarker.country}</h1>
                        <h1>status - {selectedMarker.currency}</h1>
                        <button onClick={() => setSelectedMarker("")}>close</button>
                    </div>
                    </InfoWindow>
                )}

            </GoogleMap> */}
        
        </Grid>
    </Grid>
  )

                }
export default Map

