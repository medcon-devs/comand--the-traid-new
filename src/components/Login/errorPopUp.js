import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  borderRadius: "8px",
  p: 2,
  //   width: "90%",
  //   maxWidth: "1300px",
};

const ErrorPopUp = ({ open, handleClose, message }) => {
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
        backgroundColor: "rgba(191, 16, 10, 0.3)", // Optional: Dim the background
      }}
    >
      <Box>
        <Box sx={style}>
          {/* <IconButton
          onClick={handleClose}
          style={{ scale: 2 }}
          sx={{ position: "absolute", top: 100, right: 100, color: "#fff" }}
        >
          <CloseIcon />
        </IconButton> */}
          <img
            src={"/static/images/Login/error.png"}
            alt="Popup"
            style={{
              maxWidth: "100%",
              maxHeight: "70vh",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Box>
        <Box
          position={"absolute"}
          width={600}
          height={100}
          sx={{
            top: "60%",
            transform: "translate(-50%, -50%)",
            left: "50%",
          }}
        >

            <Typography variant="h6" color="#fff" textAlign={"center"} >{message}</Typography>
            <Box width={1} mt={5}  sx={{ display: "flex",}} justifyContent={"center"} alignContent={"center"}  justifyItems={"center"}>
              
              <Button  onClick={handleClose}  sx={{margin:"0"}}>
            <Typography variant="h5"   sx={{}} color="#fff" textAlign={"center"} >Try again</Typography>
            </Button></Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ErrorPopUp;
