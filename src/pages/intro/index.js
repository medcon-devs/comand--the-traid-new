// import React, { useEffect, useState, useRef } from "react";
// import { Grid, Box, Typography, Link, Button } from "@mui/material";
// import { motion, useAnimation } from "framer-motion";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import PopUpBackground from "../../components/popUp";
// function Intro() {
//    const router = useRouter();
//   const fullText =
//     "Hello, Commanders, Welcome to the New Era. Today, you face the ultimate challenge—to COMMAND THE TRIAD. It is the gateway to the future, a realm of endless possibilities, and the battleground for new conquests. But remember this: only ONE team will emerge victorious to claim command of the TRIAD. Are you ready to rise and lead?";
//   const [displayedText, setDisplayedText] = useState(""); // Tracks the current displayed text
//   const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current index of the fullText

//   useEffect(() => {
//     if (currentIndex < fullText.length) {
//       const timer = setTimeout(() => {
//         setDisplayedText((prev) => prev + fullText[currentIndex]);
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//       }, 30); // Typing speed in milliseconds
//       return () => clearTimeout(timer); // Cleanup timeout on unmount or re-render
//     }
//   }, [currentIndex, fullText]);

//   return (
//     <Grid
//       width={1}
//       height={"100vh"}
//       sx={{
//         background: `url('/static/images/Intro/back.png')`,
//         objectFit: "cover",
//         backgroundSize: "cover",
//         overflow: "hidden",
//       }}
//     >
//       {/* <Box
//         component="img"
//         width={400}
//         height={200}
//         position="absolute"
//         top="25%"
//         left="50%"
//         sx={{
//           transform: "translate(-50%, -50%)",
//           objectFit: "contain",
//           animation: "fadeInScaleWelcome 1.5s ease-in-out forwards",
//         }}
//         alt="logo"
//         src="/static/images/Welcome/logo.png"
//       /> */}
//       <Box>
        
//         <PopUpBackground children={<Box width={1} height={1}  justifyContent={"center"} justifyItems={"center"}>

//           <Box height={.9} padding={"0px 30px"} alignContent={"center"} >
//           <Typography fontSize={"1.7vw"} color="#fff" textAlign={"center"}>
//             {displayedText}
//             </Typography>
//           </Box>
//           {/* </Box> */}
//           {/* <Box width={200} height={50} sx={{backgroundColor:"red"}}></Box> */}
//           <Box
//                       justifySelf={"flex-end"}
//                       alignSelf={"flex-end"}
//                       alignItems={"flex-end"}
//                       alignContent={"flex-end"}
//                       sx={{ cursor: "pointer" }}
//                       maxWidth={600}
//                       pr={2}
//                     >
//                       <Button
//                         onClick={()=>{
//                           router.push('/rules')
//                         }}
//                         // disabled={loading}
//                         sx={{ width: "100%" }}
//                       >
                        
//                           <Image
//                             src={"/static/images/Intro/Next.png"}
//                             width={500}
//                             height={100}
//                             objectFit="cover"
//                             alt="Login Button"
//                           />
                        
//                       </Button>
//                     </Box>
//         </Box>}/>
//       </Box>
//     </Grid>
//   );
// }

// export default Intro;

import React, { useRef, useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

function Intro() {
  const router = useRouter();
  const videoRef = useRef(null); // Reference to the video element
  const [showButton, setShowButton] = useState(false); // State to show button after video ends

  // Handle video end
  const handleVideoEnd = () => {
    setShowButton(true);
  };

  // Handle navigation
  const handleButtonClick = () => {
    router.push("/rules");
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Full-Screen Video */}
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/medcon-dam/video/upload/v1737704059/Command_The_Triad_Intro_1.0_tfmgha.mp4" // Replace with your video path
        autoPlay
        // muted={true}
        loop={false}
        onEnded={handleVideoEnd} // Trigger when video ends
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Button to appear after video ends */}
      {showButton && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
            sx={{
              fontSize: "1.5rem",
              padding: "1rem 2rem",
            }}
          >
            Proceed
          </Button>
        </Box>
      )}
    </Grid>
  );
}

export default Intro;
