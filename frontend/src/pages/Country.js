import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../components/state";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert"
import {setProject} from "../components/state"

const Country= ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  const { project_name, ngo_name } = item;
  const [showAlert, setShowAlert] = useState(false);

  const project = useSelector((state) => state.cart.project);
  const handleProjectClick = (newproject) => {
    dispatch(setProject(newproject));
    console.log(newproject)
    //navigate(`/projectdetails/${item.id}`);
  };

  return (
    <>
    {<Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <Box sx={{
            position: "absolute",
        }}>
        {showAlert && (
                <Alert onClose={() => setShowAlert(false)}>
                You have added {item.project_name} to the cart
                </Alert>
        )}
        </Box>
        <img
          alt={item.project_name}
          width="300px"
          height="300px"
          src={`/projects/${item.order}.jpeg`}
          //src="/projects/10.jpeg"
          onClick={() => 
          //handleProjectClick({item})}
            navigate(`/projects/${item.order}`)}
        //   { state: {project_name : item.project_name, project_decription: item.project_decription, ngo_name: item.ngo_name} })
        
            //onClick={()=> <Projects item={item}/>}
          style={{ cursor: "pointer" }}
        />
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
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >

            <Button
            onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
                setShowAlert(true);
                
            }}
            sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
            Add to Cart
            </Button>
            <Button
            onClick={() => navigate(`/projectdetails/${item.order}`)}
            sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
             Details
            </Button>

         
              {/* <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton> */}
            </Box>
            {/* <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button> */}
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color="black">
            {item.un_goal === 1 && "SDG : No Poverty"}
            {item.un_goal === 2 && "SDG : Zero Hunger"}
            {item.un_goal === 3 && "SDG : Good Health and Well-Being"}
            {item.un_goal === 4 && "SDG : Quality Education"}
            {item.un_goal === 5 && "SDG : Gender Equality"}
        </Typography>
        <Typography>{project_name}</Typography>
        <Typography fontWeight="bold">{ngo_name}</Typography>
      </Box>
    </Box>}
    </>
  );
};

export default Country;