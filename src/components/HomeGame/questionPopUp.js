import React, { useState, useEffect } from "react";
import { Modal, Box, IconButton, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StyledRadioButtons from "./radioBtn";
import AudioPlayer from "./audioPlayer";
import { Howl } from "howler";
import PauseIcon from "@mui/icons-material/Pause";
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
  const [timerPaused, setTimerPaused] = useState(true);
  const [selectedOption, setSelectedOption] = useState(""); // Track selected option
  const [radioAnswer, setRadioAnswer] = useState(""); // Track selected option

  const timeIsOverSound = new Howl({
    src: ["/static/audios/effect/Time Up Fail.wav"],
    volume: 0.5,
    preload: true,
  });

  const timerSound = new Howl({
    src: ["/static/audios/effect/Timer Ticks.mp3"],
    volume: 0.5,
    loop: true,
    preload: true,
  });

  const handleSelectionChange = (value) => {
    setSelectedOption(value); // Update state with the selected value
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
      handleStartTimer(); // Automatically start the timer if options exist
    }
  }, [card?.options]);

  useEffect(() => {
    let timer;

    if (timerRunning && !timerPaused) {
      timerSound.play();
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setTimerRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      timerSound.stop();
    }

    return () => {
      clearInterval(timer);
      timerSound.stop();
    };
  }, [timerRunning, timerPaused]);



  useEffect(() => {
    if (timeLeft === 0 && timerRunning === false && open && radioAnswer === "") {
      timeIsOverSound.play();
    }
  }, [timeLeft, timerRunning]);

  const handleStartTimer = () => {
    if (card?.timer) {
      setTimerRunning(true); // Start the timer
      setTimerPaused(false);
    }
  };

  const handleModalClose = () => {
    timerSound.stop(); // Stop the timer sound when the modal is closed
    handleClose();
  };
  const handlePauseTimer = () => {
    setTimerPaused(!timerPaused); // Toggle pause state
  };
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  
  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        // Prevent closing when clicking outside the modal
        if (reason !== "backdropClick") {
          // timerSound.stop();
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
            <Box display={"flex"}  alignItems={"center"}>
            {timerPaused ?  <Button onClick={handleStartTimer}>
                <img src="/static/images/Timer button.png" width={50} />
                {/* </Button> */}
              </Button>: <Button onClick={handlePauseTimer}>
                <img src="/static/images/Timer Pause.png" width={50} />
                {/* </Button> */}
              </Button> }
             
              <Typography
                ml={2}
                variant="h3"
                color={timeLeft < 10 ? "red" : "#fff"}
              >
                {formatTime(timeLeft)}
              </Typography>
            </Box>
            {card?.options?.length === 0 && card.correctAnswer != "" ? (
              <Button  onClick={()=>{
                setTimeLeft(0);
              }}>
               <img src="/static/images/Answer.png" width={200} />
              </Button>
            ) : (
              <Box></Box>
            )}
            {/* <Button onClick={()=>{timerSound.stop()}}> */}
            
           
            <IconButton
              onClick={handleModalClose}
              style={{ scale: 2 }}
              sx={{ color: "#fff",ml:20 }}
            >
              <CloseIcon />
            </IconButton>
            
            {/* </Button> */}
            {/* <IconButton
            onClick={handleClose}
            style={{ scale: 2 }}
            sx={{ color: "#fff" }}
          >
            <CloseIcon />
          </IconButton> */}
          </Box>
          {radioAnswer === "correct_answer" ? (
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
                  {radioAnswer === "wrong_answer" ? (
                    <Typography
                      variant="h2"
                      color="red"
                      mt={12}
                      textAlign={"center"}
                    >
                      YOUR ANSWER IS WRONG
                    </Typography>
                  ) : (
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
                    variant={card?.type === 7 ? "h5" : "h4"}
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
                      width={card?.type === 7 ? 380 : 500}
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


// import React, { useState, useEffect } from "react";
// import { Modal, Box, IconButton, Typography, Button } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import StyledRadioButtons from "./radioBtn";
// import AudioPlayer from "./audioPlayer";
// import { Howl } from "howler";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   boxShadow: 24,
//   borderRadius: "8px",
//   p: 2,
//   width: "90%",
//   maxWidth: "1300px",
// };

// const QuestionsPopUp = ({ open, handleClose, card, roundIndex }) => {
//   const [timeLeft, setTimeLeft] = useState(card?.timer || 0); // Initialize with card.timer or 0
//   const [timerRunning, setTimerRunning] = useState(false); // Track if the timer is running
//   const [selectedOption, setSelectedOption] = useState(""); // Track selected option
//   const [radioAnswer, setRadioAnswer] = useState(""); // Track selected option

//   const timeIsOverSound = new Howl({
//     src: ["/static/audios/effect/Time Up Fail.wav"],
//     volume: 0.5,
//     preload: true,
//   });

//   const timerSound = new Howl({
//     src: ["/static/audios/effect/Timer Ticks.mp3"],
//     volume: 0.5,
//     loop: true,
//     preload: true,
//   });

//   const handleSelectionChange = (value) => {
//     setSelectedOption(value); // Update state with the selected value
//     if (value === card?.correctAnswer) {
//       setRadioAnswer("correct_answer");
//     } else {
//       setTimeLeft(0);
//       setRadioAnswer("wrong_answer");
//     }
//   };

//   useEffect(() => {
//     if (card?.timer) {
//       setTimeLeft(card.timer); // Update timeLeft when card.timer changes
//     }
//   }, [card]);

//   useEffect(() => {
//     if (card?.options?.length > 0) {
//       handleStartTimer(); // Automatically start the timer if options exist
//     }
//   }, [card?.options]);

//   useEffect(() => {
//     let timer;

//     if (timerRunning) {
//       timerSound.play(); // Start the timer sound
//       timer = setInterval(() => {
//         setTimeLeft((prevTime) => {
//           if (prevTime <= 1) {
//             clearInterval(timer);
//             setTimerRunning(false); // Stop the timer
//             return 0;
//           }
//           return prevTime - 1;
//         });
//       }, 1000);
//     } else {
//       timerSound.stop(); // Stop the timer sound
//     }

//     return () => {
//       clearInterval(timer);
//       timerSound.stop(); // Ensure sound stops when component unmounts or timer stops
//     };
//   }, [timerRunning]);

//   useEffect(() => {
//     if (timeLeft === 0 && timerRunning === false && open && radioAnswer === "") {
//       timeIsOverSound.play();
//     }
//   }, [timeLeft, timerRunning]);

//   const handleStartTimer = () => {
//     if (card?.timer) {
//       setTimerRunning(true); // Start the timer
//     }
//   };

//   const handleModalClose = () => {
//     timerSound.stop(); // Stop the timer sound when the modal is closed
//     handleClose();
//   };

//   // Format time as MM:SS
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={(event, reason) => {
//         if (reason !== "backdropClick") {
//           handleModalClose();
//         }
//       }}
//       aria-labelledby="popup-image"
//       sx={{
//         backdropFilter: "blur(8px)", // Apply the blur effect
//         backgroundColor: "rgba(0, 0, 0, 0.3)", // Optional: Dim the background
//       }}
//     >
//       <Box>
//         <Box sx={style}>
//           <img
//             src={"/static/images/Home/popUp.png"}
//             alt="Popup"
//             style={{
//               maxWidth: "100%",
//               maxHeight: "70vh",
//               display: "block",
//               margin: "0 auto",
//             }}
//           />
//         </Box>
//         <Box
//           width="60%"
//           height={500}
//           sx={{
//             top: "50%",
//             position: "absolute",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         >
//           <Box
//             justifyContent={"space-between"}
//             width={1}
//             display={"flex"}
//             padding={"0px 20px"}
//           >
//             <Box display={"flex"} alignItems={"center"}>
//               <Button onClick={handleStartTimer}>
//                 <img src="/static/images/Timer button.png" width={50} />
//               </Button>
//               <Typography
//                 ml={2}
//                 variant="h3"
//                 color={timeLeft < 10 ? "red" : "#fff"}
//               >
//                 {formatTime(timeLeft)}
//               </Typography>
//             </Box>
//             {card?.options?.length === 0 && card.correctAnswer !== "" ? (
//               <Button
//                 sx={{ backgroundColor: "red", color: "#fff" }}
//                 onClick={() => {
//                   setTimeLeft(0);
//                 }}
//               >
//                 Show Answer
//               </Button>
//             ) : null}
//             <IconButton
//               onClick={handleModalClose}
//               style={{ scale: 2 }}
//               sx={{ color: "#fff" }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default QuestionsPopUp;
