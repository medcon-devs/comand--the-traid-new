import React, { useEffect, useState, useRef } from "react";
import { Grid, Box, Typography, Link, Button } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
        <Box
          component="img"
          position={"absolute"}
          top="20%"
          left="24%"
          width={1000}
          height={750}
          maxWidth={1050}
          sx={{
            // backgroundColor:"blue",

            transform: "translate(-50%, -50%)",
            objectFit: "contain",
            animation: "floatWelcome 3s ease-in-out infinite",
          }}
          alt="logo"
          src="/static/images/Rules/popUp.png"
        ></Box>
        <Box
          position={"absolute"}
          top="30%"
          left="30%"
          width={800}
          height={600}
          maxWidth={900}
          justifyContent={"center"}
          justifyItems={"center"}
          sx={{
            // backgroundColor:"red",
            transform: "translate(-50%, -50%)",
            objectFit: "contain",
            animation: "floatWelcome 3s ease-in-out infinite",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "800px",
              height:"400px",
              // margin: "0 auto",
              // alignSelf:"self-end",
              mt:10,
              mb:3,
              padding: "30px 30px",
            }}
          >
            <Typography variant="h4" color="#fff" textAlign={"center"}>
            {displayedText}
            </Typography>
          </Box>
          {/* <Box width={200} height={50} sx={{backgroundColor:"red"}}></Box> */}
          <Box
            justifySelf={"flex-end"}
            sx={{ cursor: "pointer" }}
            pt={2}
            pr={2}
          >
            <Button
              onClick={() => {
                router.push("/rules");
              }}
            >
              <Image
                src={"/static/images/Intro/Next.png"}
                width={500}
                height={100}
                objectFit="cover"
              />
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default Intro;
