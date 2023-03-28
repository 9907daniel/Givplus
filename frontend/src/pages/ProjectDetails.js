import React from 'react';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../components/state";
import image from "../images/countryImage/ILH.jpeg";
import Alert from "@mui/material/Alert"
import { useDispatch , useSelector} from "react-redux";



const ProjectDetails = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [items, setItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const location = useLocation();
  const project_id = location.pathname.split('/').pop();
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
        const response = await axios.get('https://givplus.duckdns.org/api/projects/');
        setData(response.data);
    }
    getData();
  }, []);

    console.log(data)
  const AllProjects = data.filter(
 (item) => item.id === parseInt(project_id)
    )

    // const AllProjects = data.filter((item) => {
    // console.log(item.id, project_id); // add this line to check
    // return item.id === project_id;
    // });
    //console.log(AllProjects)

  //const [project_description, ngo_name, project_name] = data

//   async function getItems() {
//     const items = await fetch(
//       `http://localhost:2000/api/items?populate=image`,
//       {
//         method: "GET",
//       }
//     );
//     const itemsJson = await items.json();
//     setItems(itemsJson.data);
//   }

//   useEffect(() => {
//     getItem();
//     getItems();
//   }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    
    <Box width="80%" m="80px auto">
        {AllProjects.map((item) =>(
    
    <div key={item.id}>
        {showAlert && (
            <Alert onClose={() => setShowAlert(false)}>
            You have added {item.project_name} to the cart
            </Alert>
        )}
    
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
            
          <img width="500px"
          height="500px" src = {image}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>
          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item.project_name}</Typography>
            <Typography>NGO : {item.ngo_name}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {item.project_description}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
                setShowAlert(true);
                
            }}
            >
              ADD TO GIVING JAR
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <Typography variant = "h5">Description</Typography>
            </Box>
            <Typography>{item.description}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      {/* <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item.project_description}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box> */}
      </div>) )}
    </Box>
  );
};

export default ProjectDetails;
