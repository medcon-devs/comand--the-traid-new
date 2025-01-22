import React, { useState, useEffect } from "react";
import { Modal, Box, IconButton, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StyledRadioButtons from "./radioBtn";
import AudioPlayer from "./audioPlayer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  borderRadius: "8px",
  p: 2,
  width: "90%",
  maxWidth: "1300px",
};

const QuestionsPopUp = ({ open, handleClose, card, roundIndex }) => {
  const [timeLeft, setTimeLeft] = useState(card?.timer || 0); // Initialize with card.timer or 0
  const [timerRunning, setTimerRunning] = useState(false); // Track if the timer is running
  const [selectedOption, setSelectedOption] = useState(""); // Track selected option
  const [radioAnswer, setRadioAnswer] = useState(""); // Track selected option

  const handleSelectionChange = (value) => {
    setSelectedOption(value); // Update state with the selected value
    // console.log("Selected Option:", value); // Debug or use this value as needed
    if (value === card?.correctAnswer) {
      setRadioAnswer("correct_answer");
    } else {
        setTimeLeft(0);
      setRadioAnswer("wrong_answer");

    }
  };
  useEffect(() => {
    if (card?.timer) {
      setTimeLeft(card.timer); // Update timeLeft when card.timer changes
    }
  }, [card]);
  useEffect(() => {
    if (card?.options?.length > 0) {
      setTimerRunning(true); // Automatically start the timer if options exist
    }
  }, [card?.options]);
  useEffect(() => {
    let timer;

    if (timerRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setTimerRunning(false); // Stop the timer
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup timer on unmount or when the timer stops
  }, [timerRunning]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartTimer = () => {
    if (card?.timer) {
      setTimerRunning(true); // Start the timer
    }
  };

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        // Prevent closing when clicking outside the modal
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
      aria-labelledby="popup-image"
      sx={{
        backdropFilter: "blur(8px)", // Apply the blur effect
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Optional: Dim the background
      }}
    >
      <Box>
        <Box sx={style}>
          <img
            src={"/static/images/Home/popUp.png"}
            alt="Popup"
            style={{
              maxWidth: "100%",
              maxHeight: "70vh",
              display: "block",
              margin: "0 auto",
            }}
          />
          {/* <Typography color="#fff">{card?.id??""}</Typography>
        <Typography color="#fff">{roundIndex??""}</Typography> */}
        </Box>
        <Box
          width="60%"
          height={500}
          sx={{
            top: "50%",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* <Typography>asdasbidasi d</Typography> */}
          <Box
            justifyContent={"space-between"}
            width={1}
            display={"flex"}
            padding={"0px 20px"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Button onClick={handleStartTimer}>
                <img src="/static/images/Timer button.png" width={50} />
              </Button>
              <Typography
                ml={2}
                variant="h3"
                color={timeLeft < 10 ? "red" : "#fff"}
              >
                {formatTime(timeLeft)}
              </Typography>
            </Box>
            <IconButton
              onClick={handleClose}
              style={{ scale: 2 }}
              sx={{ color: "#fff" }}
            >
              <CloseIcon />
            </IconButton>
            {/* <IconButton
            onClick={handleClose}
            style={{ scale: 2 }}
            sx={{ color: "#fff" }}
          >
            <CloseIcon />
          </IconButton> */}
          </Box>
          {radioAnswer==="correct_answer" ? (
            <Typography variant="h2" color="green" mt={12} textAlign={"center"}>
              YOUR ANSWER IS CORRECT
            </Typography>
          ) : (
            <Box>
              {timeLeft === 0 ? (
                <Box>
                {/* <Typography mt={2} textAlign={"center"} variant={card?.type ===7?"h5": "h3"} color="#fff">
              {card?.question ?? ""}
            </Typography>

            */}
                {radioAnswer ==="wrong_answer" ? (
                 <Typography variant="h2" color="red" mt={12} textAlign={"center"}>
                 YOUR ANSWER IS WRONG
               </Typography>
                ):(
                <Typography
                  variant="h2"
                  color="red"
                  mt={12}
                  textAlign={"center"}
                >
                  TIME IS OVER
                </Typography>
                )}
                {card?.correctAnswer != "" && (
                  <Typography
                    mt={6}
                    textAlign={"center"}
                    fontWeight={"bold"}
                    variant="h3"
                    color="green"
                  >
                    The correct answer is: {card?.correctAnswer ?? ""}
                  </Typography>
                )}
              </Box>
              ) : (
                <Box
                  alignContent={"space-between"}
                  justifyContent={"center"}
                  justifyItems={"center"}
                >
                  {" "}
                  <Typography
                    textAlign="center"
                    variant={card?.type === 7 ? "h5" : "h3"}
                    color="#fff"
                    sx={{ whiteSpace: "pre-line" }}
                    mb={1}
                  >
                    {card?.question ?? ""}
                  </Typography>
                  {card?.options?.length > 0 && (
                    <StyledRadioButtons
                      options={card?.options ?? []}
                      onSelectionChange={handleSelectionChange}
                      correctAnswer={card.correctAnswer}
                    />
                  )}
                  {card?.image != "" && (
                    <img
                      src={card?.image}
                      width={card?.type === 7 ? 280 : 500}
                      height={200}
                    />
                  )}
                  {card?.audio != "" && <AudioPlayer sound={card?.audio} />}
                  {/* <AudioPlayer /> */}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default QuestionsPopUp;
