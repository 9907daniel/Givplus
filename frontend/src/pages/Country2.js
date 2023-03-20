import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { IconButton, Box, Typography, useTheme, Button, Grid, AppBar, Toolbar } from "@mui/material";
import {Link, useNavigate} from "react-router-dom"
import Axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../components/state";


//MUI imports
import { ThemeProvider} from '@mui/system';
import { createTheme } from '@mui/material/styles';

//Components
import { shades } from "../theme";

const Country = ({country, width}) =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const {
        palette:{neutral},
    } = useTheme();
    
    const {name, description, population} = country.attributes;
    // const {
    //     data: {
    //       attributes: {
    //         formats: {
    //           medium: { url },
    //         },
    //       },
    //     },
    //   } = image;
    return(
        <Box width={width}>
            <Box
                position="relative"
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >
            
                {/* <img
                    alt={country.name}
                    width="300px"
                    height="400px"
                    src={`http://localhost:2000${url}`}
                    onClick={() => navigate(`/country/${country.id}`)}
                    style={{ cursor: "pointer" }}
                /> */}
                <Box
                    display={isHovered ? "block" : "none"}
                    position="absolute"
                    bottom="10%"
                    left="0"
                    width="100%"
                    padding="0 5%"
                >
                <Box display="flex" justifyContent="space-between">
                    <Box
                        display="flex"
                        alignItems="center"
                        // backgroundColor={shades.neutral[100]}
                        backgroundColor={"green"}
                        borderRadius="3px"
                    >
                    <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                        <RemoveIcon />
                    </IconButton>
                    <Typography color={"red"}>{count}</Typography>
                    <IconButton onClick={() => setCount(count + 1)}>
                        <AddIcon />
                    </IconButton>
                    </Box>
                    
                    <Button
                        onClick={() => {
                            dispatch(addToCart({ country: { ...country, count } }));
                        }}
                        sx={{ backgroundColor: "blue", color: "white" }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Box>
        </Box>

        <Box mt="3px">
        {/* <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography> */}
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${population}</Typography>
      </Box>
    </Box>
    )
}

export default Country
