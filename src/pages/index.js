import React, { useState } from "react";
import Start from "@/components/start";
import VideoPlayer from "../components/Video/VideoPlayer";
import { useRouter } from "next/navigation";
import { Grid, Box } from "@mui/material";

export default function Welcome() {
  const router = useRouter();
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Handle button click for navigation and component switching
  const handleButtonClick = () => {
    if (currentComponentIndex === 2) {
      setIsExiting(true);
      setTimeout(() => {
        router.push("/home");
      }, 1000); // Match the animation duration
    } else {
      setIsExiting(true);
      setTimeout(() => {
        setIsExiting(false);
        setCurrentComponentIndex((prevIndex) => prevIndex + 1);
      }, 1000); // Match the animation duration
    }
  };

  // Array of components to render with animations
  const allWidgets = [
    <Start onButtonClick={handleButtonClick} key="start" />,
    <VideoPlayer
      key="video1"
      videoUrl="https://res.cloudinary.com/medcon-dam/video/upload/v1737704059/Command_The_Triad_Intro_1.0_tfmgha.mp4"
      buttonImageUrl="/static/images/Intro/Next.png"
      onButtonClick={handleButtonClick}
    />,
    <VideoPlayer
      key="video2"
      videoUrl="https://res.cloudinary.com/medcon-dam/video/upload/v1737706849/Command_The_Triad_Rules_1.1_qudnma.mp4"
      buttonImageUrl="/static/images/Rules/play.png"
      onButtonClick={handleButtonClick}
    />,
  ];

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
      <Box
        sx={{
          width: "100%",
          height: "100%",
          animation: isExiting
            ? `fadeOutScale 1s ease-in-out`
            : `fadeInSlide 1s ease-in-out`,
        }}
      >
        {allWidgets[currentComponentIndex]}
      </Box>

      <style jsx global>{`
        @keyframes fadeInSlide {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeOutScale {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
        }
      `}</style>
    </Grid>
  );
}
