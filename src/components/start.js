import React from "react";
import { Grid, Box, Button } from "@mui/material";
import Image from "next/image";
const Start =({onButtonClick,}) =>{
  return (
    <Grid
      width={1}
      height="100vh"
      sx={{
        position: "relative",
        backgroundImage: `url('/static/images/Welcome/welcome.png')`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        alignContent: "flex-end",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      {/* Main Logo with Scale and Fade-in Animation */}
      <Box
        component="img"
        width={500}
        height={200}
        position="absolute"
        top="35%"
        left="50%"
        sx={{
          transform: "translate(-50%, -90%)", // Centers the element
          objectFit: "contain",
          animation: "fadeInScaleWelcome 1.5s ease-in-out forwards",
        }}
        alt="logo"
        src="/static/images/Welcome/logo.png"
      />

      {/* Floating Smaller Logo Animation */}
      <Box
        component="img"
        width={150}
        height={200}
        position={"absolute"}
        right={50}
        top="0%"
        sx={{
          objectFit: "contain",
          animation: "floatWelcome 3s ease-in-out infinite", // Floating animation
        }}
        alt="EHS"
        src="/static/images/Welcome/novo logo.png"
      />
      <Box
        component="img"
        width={250}
        height={200}
        position={"absolute"}
        left={50}
        top="0%"
        sx={{
          objectFit: "contain",
          animation: "floatWelcome 3s ease-in-out infinite", // Floating animation
        }}
        alt="EHS"
        src="/static/images/Welcome/new logo.png"
      />

      {/* <Button onClick={onButtonClick} sx={{width:350,backgroundColor:"red",justifySelf:"center"}}> */}

      <Box
        component="img"
        width={350}
        height={200}
        //   position={"absolute"}
        //   left={"40%"}
        //   top="50%"
        onClick={onButtonClick}
        sx={{
          cursor: "pointer",
          objectFit: "contain",
          animation: "floatWelcome 5s ease-in-out infinite", // Floating animation
        }}
        src="/static/images/Welcome/Start.png"
      />
      {/* </Button> */}
    </Grid>
  );
};

export default Start;
