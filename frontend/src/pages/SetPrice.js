import React,{ useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from '@mui/material/Slider';
import { Typography, Button } from "@mui/material";
import Grid from '@mui/system/Unstable_Grid';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";

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
  const cart = useSelector((state) => state.cart.cart);
    const data = [
        { argument:'Monday', value:10 },
        { argument:'Tuesday', value:40 },
        { argument:'Wednesday', value:10 },
        { argument:'Thursday', value:20 },
        { argument:'Friday', value:20 },
      ];
  const [value1, setValue1] = React.useState(10);
 
  const [number, setNumber] = useState('');
  const handle_Change = (event) => {
    setNumber(event.target.value);
  };

  //submit related const
  const [submittedValue, setSubmittedValue] = React.useState('');
  const [price, setPrice] = React.useState("")
  const handleSubmit = (values, actions) => {
    actions.preventDefault();
    console.log("Form submitted");
    setPrice(submittedValue);
    //actions.setSubmitting(false);
  };
    const handleChange = (event) => {
        console.log("handlechange")
        setSubmittedValue(event.target.value);
    };
        // get the query string from the current URL
    const queryString = window.location.search;

    // create a new URLSearchParams object from the query string
    const urlParams = new URLSearchParams(queryString);

    // get the value of the "number" parameter
    const Number = urlParams.get('number');
    console.log(`The number is ${Number}`);

    const [sliderValues, setSliderValues] = useState(
        Array.from({ length: cart.length }, () => 10)
      );
      
    const totalPrice = sliderValues.reduce((acc, val) => acc = acc + val, 0);

    const handleChangeTemp = (index) => (event, newValue) => {
        // {totalPrice > 100 && (
        //     alert("Total Price is over 100")
        //   )}
        if (newValue === 0){
            newValue = 10
        }

        setSliderValues((prevValues) => [
          ...prevValues.slice(0, index),
          newValue,
          ...prevValues.slice(index + 1)
        ]);
      };


    const validationSchema = 
        Yup.object().shape({
        number: Yup.number()
        //.min(10000, 'Number must be greater than or equal to 1')
        .required('required'),
      });
    const currency = useSelector((state) => state.cart.currency);

  return (
    <>
    <Box padding = {4}>
        <Typography variant = "h3" align= "center">You are effectively donating % more</Typography>
        <Typography align= "center">
            We will get back to you with a transparent report on how your fund was actually used.
        </Typography>
        <Typography>
            Your chosen currency is: {currency}
        </Typography>
    </Box>
    <Grid container spacing ={2} align = "center" >
        <Grid xs={5}>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
                <TextField
                fullWidth
                type="text"
                value={number}
                inputProps={{ inputMode: 'numeric' }}
                onChange={handle_Change}
                />
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
                </Button>
            </Grid>
        </Grid>
            {/* <Box>
                <Formik
                    initialValues={{ number: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                    alert(JSON.stringify(values))

                        actions.setSubmitting(false);
                    }}
                    >
                    {({ values, errors, touched, handleChange, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                        <Field name="number">
                            {({ field }) => (
                            <TextField
                                {...field}
                                width="80%"
                                type="text"
                                label="Amount"
                                inputProps={{ inputMode: "numeric" }}
                                error={touched.number && Boolean(errors.number)}
                                helperText={touched.number && errors.number}
                                onChange={handleChange}
                            />
                            )}
                        </Field>
                        <Button type="submit" //disabled={isSubmitting}
                        >
                            Submit
                        </Button>
                        </form>
                    )}
                    </Formik>
                    <Box>
                        {submittedValue}
                        {Number}
                        <p>Item name: {itemName}</p> 
                    </Box>
            </Box> */}
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
            {sliderValues.map((value, index) => (
            <Box key={index} sx={{ width: 450, p: 3}}>
            <Typography>{cart[index].project_name}</Typography>
            <Slider
                aria-label="Always visible"
                value={value}
                onChange={handleChangeTemp(index)}
                valueLabelDisplay="on"
                step={10}
                marks={marks}
                track={false}
            />
            <Typography>{cart[index].project_name}: $ {number*(value/100)}</Typography>
            </Box>
            ))}
            <Box align="Center">
            <Typography variant = "h5">
                Total price is {totalPrice/100*number}
            </Typography>
            {totalPrice > 100 && (
                <Typography variant = "h5" color = "red">
                    Total price cannot exceed {number}
                </Typography>
            )}
            </Box>
        <Box align="right" sx={{mr: 7}}>
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
