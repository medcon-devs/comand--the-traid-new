import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";

const AudioPlayer = ({sound}) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!audio) {
      const newAudio = new Audio(sound); // Replace with your audio file path
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);

      // Add event listener to reset state when the audio ends
      newAudio.addEventListener("ended", () => setIsPlaying(false));
    } else {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <Box width={1} mt={2} >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <img src="/static/images/Song Icon.png" width={350} />
        {/* <Button onClick={handlePlayPause}>
        <img
          src={
            isPlaying ? "/static/images/Pause Button.png" : "/static/images/Play Button.png"
          }
          height={160}
          width={320}
        />
      </Button> */}
      
      </Box>
      <Button onClick={handlePlayPause}>
      <img
        src={isPlaying ? "/static/images/Pause Button.png" : "/static/images/Play Button.png"}
        width={100}
      />
      </Button>
    </Box>
  );
};

export default AudioPlayer;
