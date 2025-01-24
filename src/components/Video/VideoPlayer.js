import React, { useRef, useState } from "react";
import { Grid, Box } from "@mui/material";

function VideoPlayer({ videoUrl, buttonImageUrl, onButtonClick }) {
  const videoRef = useRef(null); // Reference to the video element
  const [showButton, setShowButton] = useState(false); // State to show button after video ends

  // Handle video end
  const handleVideoEnd = () => {
    setShowButton(true);
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
        src={videoUrl} // Video URL passed as a prop
        autoPlay
        muted={false} // Set to true if autoplay with sound is blocked
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
            top: "90%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            
            zIndex: 10,
          }}
        >
          <img
            src={buttonImageUrl} // Button image URL passed as a prop
            alt="Proceed Button"
            onClick={onButtonClick} // Callback for button click
            style={{
              cursor: "pointer",
              width: "650px", // Customize button size as needed
              height: "auto",
            }}
          />
        </Box>
      )}
    </Grid>
  );
}

export default VideoPlayer;
