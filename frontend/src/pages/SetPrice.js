import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from '@mui/material/Slider';
import { Typography, Button } from "@mui/material";
import Grid from '@mui/system/Unstable_Grid';
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  Chart,
  PieSeries,
  Title
} from '@devexpress/dx-react-chart-material-ui';
import { setItems } from "../components/state"


const marks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 10,
      label: '0%',
    },
    {
      value: 20,
      label: '20%',
    },
    {
      value: 30,
      label: '30%',
    },
    {
      value: 40,
      label: '40%',
    },
    {
      value: 50,
      label: '50%',
    },
    {
      value: 60,
      label: '60%',
    },
    {
      value: 70,
      label: '70%',
    },
    {
      value: 80,
      label: '80%',
    },
    {
      value: 90,
      label: '90%',
    },
    {
      value: 100,
      label: '100%',
    },
  ];

function valuetext(value) {
    return `${value}%`;
  }
  
  const minDistance = 10;

function SetPrice() {
    const navigate = useNavigate();

    const data = [
        { argument:'Monday', value:10 },
        { argument:'Tuesday', value:40 },
        { argument:'Wednesday', value:10 },
        { argument:'Thursday', value:20 },
        { argument:'Friday', value:20 },
      ];
    const cart = useSelector((state) => state.cart.cart);
  const [value1, setValue1] = React.useState(30);
  const [value2, setValue2] = React.useState(30);
  const [value3, setValue3] = React.useState(40);
  const [price, setPrice] = React.useState(100);

  const handleChange1 = (event, newValue) => {
    if (newValue === 0){
        setValue1(value1)
    }
    else if ((newValue + value2 + value3) > 100){
        setValue1(value1)
    }
    else {setValue1(newValue)};
  
    }
  const handleChange2 = (event, newValue) => {
    if (newValue === 0){
        setValue2(value2)
    }
    else if ((newValue + value1 + value3) > 100){
        setValue2(value2)
    }
    else {setValue2(newValue)};
    }
  const handleChange3 = (event, newValue) => {
    if (newValue === 0){
        setValue3(value3)
    }
    else if ((newValue + value1 + value2) > 100){
        setValue3(value3)
    }
    else {setValue3(newValue)};
    }
  

  return (
    <>
    <Box padding = {4}>
        <Typography variant = "h3" align= "center">You are effectively donating % more</Typography>
        <Typography align= "center">
            We will get back to you with a transparent report on how your fund was actually used.
        </Typography>
    </Box>
    <Grid container spacing ={2}>
        <Grid xs={5}>
            <Box>
                <Chart
                data={data}
                >
                    <PieSeries valueField="value" argumentField="argument" />
                    <Title text="Studies per day"/>
                </Chart>
            </Box>
        </Grid>
        <Grid align = "center" xs={7}>
        <Box sx={{ width: 450 }}>
            <Typography>
                Project 1
            </Typography>
        <Slider 
            //getAriaLabel={() => 'Minimum distance'}
            aria-label="Always visible"
            value={value1}
            //defaultValue={20}
            onChange={handleChange1}
            valueLabelDisplay="on"
            getAriaValueText={valuetext}
            step={10}
            marks={marks}
            track = {false}
        />
        </Box>
    
    
        
        <Box sx={{ width: 450 }}>
            <Typography>
                Project 2
            </Typography>
            <Slider
                //getAriaLabel={() => 'Minimum distance'}
                aria-label="Always visible"
                value={value2}
                //defaultValue={20}
                onChange={handleChange2}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                step={10}
                marks={marks}
                track = {false}
            />
        </Box>
        <Box sx={{ width: 450 }}>
            <Typography>
                Project 3
            </Typography>
            <Slider
                //getAriaLabel={() => 'Minimum distance'}
                aria-label="Always visible"
                value={value3}
                //defaultValue={20}
                onChange={handleChange3}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                step={10}
                marks={marks}
                track = {false}
            />
        </Box>
        <Box align="left" ml={30}>
            <Typography>
                project 1: $ {price*(value1/100)}  
            </Typography>
            <Typography>
                project 2: $ {price*(value2/100)}  
            </Typography>
            <Typography>
                project 3: $ {price*(value3/100)}  
            </Typography>
        </Box>
        <Box align="right">
        <Button onClick={() => {
                navigate("/checkout");
              }}>
            Checkout
        </Button>
        </Box>
        </Grid>
    </Grid>
    </>
  );
}

export default SetPrice
