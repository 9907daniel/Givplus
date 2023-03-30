import React, { useEffect, useState } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography, Button } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";

import { useDispatch, useSelector } from "react-redux";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 10,
    label: "10%",
  },
  {
    value: 20,
    label: "20%",
  },
  {
    value: 30,
    label: "30%",
  },
  {
    value: 40,
    label: "40%",
  },
  {
    value: 50,
    label: "50%",
  },
  {
    value: 60,
    label: "60%",
  },
  {
    value: 70,
    label: "70%",
  },
  {
    value: 80,
    label: "80%",
  },
  {
    value: 90,
    label: "90%",
  },
  {
    value: 100,
    label: "100%",
  },
];

function valuetext(value) {
  return `${Math.round(value)}%`;
}

const minDistance = 10;
function SetPrice() {

  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const [number, setNumber] = useState("");
  const currency_score = useSelector((state) => state.cart.currency);
  const handle_Change = (event) => {
    setNumber(event.target.value);
  };
  //percent
  const [valuesArray, setValuesArray] = useState([]);
  const [percentArray, setPercentArray] = useState([]);
  const [forexScores, setForexScores] = useState([]);
  //submit related const
  const [submittedValue, setSubmittedValue] = React.useState("");
  const [price, setPrice] = React.useState("");
  const handleSubmit = (values, actions) => {
    console.log("Form submitted");
    setPrice(submittedValue);
    //actions.setSubmitting(false);
  };
  const handleChange = (event) => {
    console.log("handlechange");
    setSubmittedValue(event.target.value);
  };

  const [sliderValues, setSliderValues] = useState(
    Array.from({ length: cart.length }, () => 10)
  );

  const totalPrice = sliderValues.reduce((acc, val) => (acc = acc + val), 0);

//   const handleChangeTemp = (index) => (event, newValue) => {
//     // Round the newValue to the nearest multiple of 10
//     newValue = Math.round(newValue / 10) * 10;
  
//     let updatedValues = [...sliderValues];
//     updatedValues[index] = newValue;
//     const totalUpdatedValues = updatedValues.reduce((acc, val) => acc + val, 0);
//     const updatedPercentage = (newValue / totalUpdatedValues) * 100;
//     updatedValues[index] = updatedPercentage;
  
//     if (totalUpdatedValues > 100) {
//       const difference = totalUpdatedValues - 100;
//       let counter = difference;
//       for (let i = 0; i < updatedValues.length; i++) {
//         if (counter === 0) {
//           break;
//         }
//         if (i === index) {
//           continue;
//         }
//         if (updatedValues[i] - counter >= 10) {
//           updatedValues[i] -= counter;
//           counter = 0;
//         } else {
//           counter -= updatedValues[i] - 10;
//           updatedValues[i] = 10;
//         }
//       }
//     }
  
//     setSliderValues(updatedValues);
//   };
const handleChangeTemp = (index, value, CountryNumber) => (event, newValue) => {
    if (newValue === 0){
        newValue = 10
    }
    setSliderValues((prevValues) => [
        ...prevValues.slice(0, index),
        newValue,
        ...prevValues.slice(index + 1)
      ]);
      const updatedValuesArray = [...valuesArray];
      updatedValuesArray[index] = CountryNumber;
      setValuesArray(updatedValuesArray);

      const updatedPercentArray = [...percentArray];
      updatedPercentArray[index] = newValue;
      setPercentArray(updatedPercentArray);
      console.log(valuesArray)
      console.log(percentArray)

    };
  const validationSchema = Yup.object().shape({
    number: Yup.number()
      //.min(10000, 'Number must be greater than or equal to 1')
      .required("required"),
  });
  const currency = useSelector((state) => state.cart.currency);

  const [pieData, setPieData] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    const data = cart.map((item, index) => ({
      argument: item.project_name,
      value: sliderValues[index],
    }));
    setPieData(data);
  }, [cart, sliderValues]);
  
  useEffect(() => {
    async function fetchData() {
        const response = await Axios.get(`https://givplus.duckdns.org/api/scores/${currency_score}`);
        const filteredData = response.data.filter(item => valuesArray.includes(item.country_id));
        setData(filteredData);

        const forexScores = filteredData.map(item => item.forex_score);
        setForexScores(forexScores);
    }
    fetchData();
  }, [sliderValues]);

  console.log(data)
  console.log(forexScores)
  //percentage calculation
    let result = 0;
    

  if (data){
  for (let i = 0; i < percentArray.length; i++){
    result += ( (percentArray[i])/(parseFloat(forexScores[i])+100)) ;
  }}


  console.log( (percentArray[0])/(parseFloat(forexScores[0])+100))
  console.log( (percentArray[1])/(parseFloat(forexScores[1])+100))
  console.log( (percentArray[2])/(parseFloat(forexScores[2])+100))
  console.log(result)
  console.log(((1/result-1)*100).toFixed(0))
  
  const finalPercentage = (((1/result-1)*100).toFixed(0));

  return (
    <>
      <Box padding={4}>
        <Typography variant="h3" align="center" >
          You are effectively donating <span style={{color: 'green'}}>{ !isFinite(finalPercentage) || finalPercentage < 0 || isNaN(finalPercentage) ? ' ' : finalPercentage}%</span> more
        </Typography> 
        <br />

        <Typography align="center">
          We will get back to you with a transparent report on how your fund was
          actually used.
        </Typography>
        
        {/* <Typography>Your chosen currency is: {currency}</Typography> */}
      </Box>
      <Grid container spacing={2} align="center">
        <Grid xs={6} sx={{borderRight: "1px solid gray"}}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8} 
            sx={{
                ml: 4
            }}>
              <TextField
                width = "80%"
                type="text"
                value={number}
                inputProps={{ inputMode: "numeric" }}
                onChange={handle_Change}
                sx = {{height : "100%"}}
             />
            
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx ={{height: "100%"}}
                >
                    Submit
                </Button>
  
            </Grid>
            {/* <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid> */}
          </Grid>
          <Box>
            <Chart data={pieData}>
              <PieSeries valueField="value" argumentField="argument" />
              <Title text="Donation Graph" />
            </Chart>
          </Box>
        </Grid>
        <Grid align="center" xs={6}>
          {sliderValues.map((value, index) => (
            <Box key={index} sx={{ width: 450, p: 3 }}>
              <Typography>{cart[index].project_name}</Typography>
              <Slider
                aria-label="Always visible"
                value={value}
                onChange={handleChangeTemp(index, value, cart[index].number)}
                valueLabelDisplay="on"
                step={10}
                marks={marks}
                track={false}
              />
              <Typography>
                For this Project : $ {number * (value / 100)}
              </Typography>

            </Box>
          ))}
          <Box align="Center">
            <Typography variant="h5">
              Total price is {((totalPrice / 100) * number).toFixed(2)} $
            </Typography>
            {totalPrice > 100 && (
              <Typography variant="h5" color="red">
                Total price exceeded {number} $
              </Typography>
            )}
          </Box>
          <Box align="right" sx={{ mr: 7 }}>
            <Button
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default SetPrice;
