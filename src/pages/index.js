import { Grid, Box } from "@mui/material";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
export default function Welcome() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    setTimeout(() => {
      if (token) {
        router.replace("/intro");
      } else {
        router.replace("/login"); // Navigate to "login" after 5 seconds
      }
    }, 5000); // 5000ms = 5 seconds
  }, []);

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
    </Grid>
  );
}
