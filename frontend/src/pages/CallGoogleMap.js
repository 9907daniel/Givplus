import React, {useState, useEffect, useRef, useMemo} from 'react'
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import CountryImage from "../images/countryImage/1.jpg";

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

//map imports
import { GoogleMap, InfoWindow, Marker, useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import tempMarker from '../images/tempMarker.png';


function CallGoogleMap() {
    const [data, setData] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState("");
    const center = useMemo(()=>({lat: 35.6586, lng: 139.7454}),[])

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: '' 
    });
    useEffect(() => {
        async function fetchData() {
          const response = await Axios.get('http://localhost:8000/api/countries/');
          setData(response.data);
        }
        fetchData();
      }, []);

    if (!isLoaded) {
    return <Typography> Loading...</Typography>
    }

  return (
    
    <GoogleMap 
            center ={center} 
            zoom ={2}
            mapContainerStyle={{
                width:"100%",
                height:"100%"
            }} >
                {/* <Marker position={{lat: 35.6586, lng: 139.7454}}/>  */}
                {data && data.map((item) => {
                    return(
                        <div key = {item.id}>
                            <Marker
                                position = {item.location}
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
                    position={selectedMarker.location}
                    options={{
                        pixelOffset: new window.google.maps.Size(0, -40),
                    }}
                    >
                    <div>
                        <h1>location -{selectedMarker.name}</h1>
                        <h1>status - {selectedMarker.continent}</h1>
                        <img style ={{
                            width: 250,
                            height: 200
                        }}src={CountryImage} />
                        <button onClick={() => setSelectedMarker("")}>close</button>
                    </div>
                    </InfoWindow>
                )}

            </GoogleMap>
  )
}

export default CallGoogleMap
