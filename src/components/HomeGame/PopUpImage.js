import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

const PopupImage = ({ open, handleClose, imageUrl }) => {
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
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          style={{ scale: 2 }}
          sx={{ position: "absolute", top: 100, right: 100, color: "#fff" }}
        >
          <CloseIcon />
        </IconButton>
        <img
          src={imageUrl}
          alt="Popup"
          style={{
            maxWidth: "100%",
            maxHeight: "70vh",
            display: "block",
            margin: "0 auto",
          }}
        />
      </Box>
    </Modal>
  );
};

export default PopupImage;
