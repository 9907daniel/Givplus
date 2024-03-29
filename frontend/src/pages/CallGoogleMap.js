import React, {useState, useEffect, useMemo} from 'react'
import Axios from "axios";
import { useNavigate } from 'react-router-dom';



//MUI imports
import {
    Box,
    Typography, 
    Button, 
} from "@mui/material";

//map imports
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import tempMarker from '../images/tempMarker.png';
import tempMarker1 from '../images/tempMarker1.png';



function CallGoogleMap() {
    const [data, setData] = useState([]);
    const navigate=useNavigate()

    const [selectedMarker, setSelectedMarker] = useState("");
    const center = useMemo(()=>({lat: 35.6586, lng: 139.7454}),[])

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, 
    });
    useEffect(() => {
        async function fetchData() {
          const response = await Axios.get('https://givplus.duckdns.org/api/countries/');
          setData(response.data);
        }
        fetchData();
      }, []);
      console.log(data)

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
                {data && data.map((item) => {
                    return(
                        <div key = {item.id}>
                            <Marker style ={{
                            width: 20,
                            height: 20
                        }}
                                position = {item.location}
                                icon={item.national_emergency === 'None' ? tempMarker : tempMarker1}
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
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'left'
                        }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontSize: 20}}>{selectedMarker.name}</Typography>
                            <Typography sx={{marginLeft: '5px', fontSize: 12}} >{selectedMarker.continent}</Typography>
                        </Box>
                        <Typography sx={{ marginTop: '1px', marginBottom: '6px', fontSize: 16}} >Need Help In :  {selectedMarker.need_help_in}</Typography>
                        <img style ={{
                            width: 250,
                            height: 200
                        }}src={`/flags/${selectedMarker.number}.png`} onClick={() => navigate(`/countrydetails/${selectedMarker.number}`,{state: { CountryId: selectedMarker.number , currency_abbreviation: selectedMarker.currency}})}/>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <Button sx={{marginRight: 'auto' }}onClick={() => setSelectedMarker('')}>Close</Button>
                            <Button sx={{marginLeft: 'auto' }}onClick={() => navigate(`/countrydetails/${selectedMarker.number}`,{state: { CountryId: selectedMarker.number , currency_abbreviation: selectedMarker.currency}})}>Donate</Button>
                        </Box>
                    </Box>
                    </InfoWindow>
                )}

            </GoogleMap>
  )
}

export default CallGoogleMap
