import React from 'react';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { addToCart } from "../components/state";
import Alert from "@mui/material/Alert"
import { useDispatch , useSelector} from "react-redux";



const ProjectDetails = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
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
 (item) => item.order === parseInt(project_id)
    )


  return (
    
    <Box width="80%" m="80px auto">
        {AllProjects.map((item) =>(
    
    <div key={item.order}>
        {showAlert && (
            <Alert onClose={() => setShowAlert(false)}>
            You have added {item.project_name} to the cart
            </Alert>
        )}
    
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
            
          <img width="500px"
          height="500px" src = {`/projects/${project_id}.jpeg`}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
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
      </div>) )}
    </Box>
  );
};

export default ProjectDetails;
