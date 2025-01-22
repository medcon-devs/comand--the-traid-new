import React, { useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  borderRadius: "8px",
  p: 2,
  width: "60%",
  maxWidth: "1300px",
};

const SuccessPopUp = ({ open, handleClose }) => {
  const router = useRouter();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        router.push("/intro"); // Navigate to the home page
        handleClose(); // Close the popup
      }, 2000);

      // Cleanup the timer when the component unmounts or when `open` changes
      return () => clearTimeout(timer);
    }
  }, [open, router, handleClose]);

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
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
        <img
          src={"/static/images/Login/success.png"}
          alt="Popup"
          style={{
            maxWidth: "70%",
            maxHeight: "50vh",
            display: "block",
            margin: "0 auto",
          }}
        />
      </Box>
    </Modal>
  );
};

export default SuccessPopUp;
