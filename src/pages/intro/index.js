import React, { useEffect, useState, useRef } from "react";
import { Grid, Box, Typography, Link, Button } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PopUpBackground from "../../components/popUp";
function Intro() {
   const router = useRouter();
  const fullText =
    "Hello, Commanders, Welcome to the New Era. Today, you face the ultimate challenge—to command the TRIAD. It is the gateway to the future, a realm of endless possibilities, and the battleground for new conquests. But remember this: only ONE team will emerge victorious to claim command of the TRIAD. Are you ready to rise and lead?";
  const [displayedText, setDisplayedText] = useState(""); // Tracks the current displayed text
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current index of the fullText

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 30); // Typing speed in milliseconds
      return () => clearTimeout(timer); // Cleanup timeout on unmount or re-render
    }
  }, [currentIndex, fullText]);

  return (
    <Grid
      width={1}
      height={"100vh"}
      sx={{
        background: `url('/static/images/Intro/back.png')`,
        objectFit: "cover",
        backgroundSize: "cover",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        width={400}
        height={200}
        position="absolute"
        top="25%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
          objectFit: "contain",
          animation: "fadeInScaleWelcome 1.5s ease-in-out forwards",
        }}
        alt="logo"
        src="/static/images/Welcome/logo.png"
      />
      <Box>
        
        <PopUpBackground children={<Box width={1} height={1}  justifyContent={"center"} justifyItems={"center"}>

          <Box height={.9} alignContent={"center"} >
          <Typography fontSize={"1.7vw"} color="#fff" textAlign={"center"}>
            {displayedText}
            </Typography>
          </Box>
          {/* </Box> */}
          {/* <Box width={200} height={50} sx={{backgroundColor:"red"}}></Box> */}
          <Box
                      justifySelf={"flex-end"}
                      alignSelf={"flex-end"}
                      alignItems={"flex-end"}
                      alignContent={"flex-end"}
                      sx={{ cursor: "pointer" }}
                      maxWidth={600}
                      pr={2}
                    >
                      <Button
                        onClick={()=>{
                          router.push('/rules')
                        }}
                        // disabled={loading}
                        sx={{ width: "100%" }}
                      >
                        
                          <Image
                            src={"/static/images/Intro/Next.png"}
                            width={500}
                            height={100}
                            objectFit="cover"
                            alt="Login Button"
                          />
                        
                      </Button>
                    </Box>
        </Box>}/>
      </Box>
    </Grid>
  );
}

export default Intro;
