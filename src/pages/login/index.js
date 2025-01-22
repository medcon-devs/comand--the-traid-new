import React, { useState, useRef } from "react";
import { Grid, Box, TextField, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
import { post } from "@/handler/api.handler";
import { routeConfig } from "../../constant/route";
import Image from "next/image";
import SuccessPopUp from "../../components/Login/successPopUp";
import ErrorPopUp from "../../components/Login/errorPopUp";

function Login() {
  const componentRef = useRef(null);
  const router = useRouter();
  const [openSuceess, setOpenSuceess] = useState(false);
  const [openError, setOpenError] = useState(false);
  // const [successMessage, setsuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = ()=> {
    setOpenSuceess(false)
    setOpenError(false)
  };
  // Login State
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const handleLoginChange = (key, value) => {
    setLoginInfo({
      ...loginInfo,
      [key]: value,
    });
  };

  // Validation Function
  const validateLoginFields = () => {
    const errors = { email: "", password: "" };

    if (!loginInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInfo.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (loginInfo.password.length < 3) {
      errors.password = "Password must be at least 3 characters long.";
    }

    setLoginErrors(errors);

    return Object.values(errors).every((error) => !error);
  };
// const handleLoginSubmit = async ()=> {
//   setOpenError(true)
// }
  // Handle Login Submission
  const handleLoginSubmit = async () => {
    if (validateLoginFields()) {
      setLoading(true);
      try {
        const res = await post(routeConfig.login, loginInfo, "");
        setLoading(false);
          console.log("red" , res)
        if (res.status_code === 200) {
          // Save the token in localStorage
          localStorage.setItem("token", res.data.token);
          // router.replace("/home")
          setOpenSuceess(true)
          // Show success dialog
          // Swal.fire({
          //   icon: "success",
          //   title: "Login successful",
          //   text: "You have been logged in successfully.",
          //   timer: 2000,
          //   showConfirmButton: false,
          // }).then(() => {
          //   // Navigate to the rules page
          //   router.replace("/rules");
          // });
        } else if(res.status_code === 201) {
          setErrorMessage(res.message)
          setOpenError(true)
          // Show error dialog
          // Swal.fire({
          //   icon: "error",
          //   title: "Login Failed",
          //   text: res.message || "Login failed. Please try again.",
          //   confirmButtonText: "Close",
          // });
        }else
        {
          setErrorMessage("something went worong")
          setOpenError(true)
        } 
      }catch (error) {
        setLoading(false);
        setErrorMessage(error.message || "An unexpected error occurred.");

          setOpenError(true)
        // Handle unexpected errors
        // Swal.fire({
        //   icon: "error",
        //   title: "Unexpected Error",
        //   text: error.message || "An error occurred. Please try again later.",
        //   confirmButtonText: "Close",
        // });
      }
    }
  };

  return (
    <Grid
      ref={componentRef}
      width={1}
      height={"100vh"}
      sx={{
        background: `url('/static/images/Rules/back.png')`,
        objectFit: "cover",
        backgroundSize: "cover",
        overflow: "hidden",
        maxWidth:1920
      }}
    >
      <Box
        component="img"
        width={400}
        height={200}
        position="absolute"
        top="30%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
          objectFit: "contain",
          animation: "fadeInScaleWelcome 1.5s ease-in-out forwards",
        }}
        alt="logo"
        src="/static/images/Welcome/logo.png"
      />
      <Box>
        <Box
          component="img"
          position={"absolute"}
          top="25%"
          left="27%"
          width={850}
          height={700}
          maxWidth={900}
          maxHeight={900}
          sx={{
            transform: "translate(-50%, -50%)",
            objectFit: "contain",
            animation: "floatWelcome 3s ease-in-out infinite",
          }}
          alt="logo"
          src="/static/images/Rules/popUp.png"
        ></Box>
        <Box
          position={"absolute"}
          top="37%"
          left="33%"
          width={680}
          height={500}
          maxWidth={900}
          justifyContent={"center"}
          justifyItems={"center"}
          sx={{
            transform: "translate(-50%, -50%)",
            objectFit: "contain",
            animation: "floatWelcome 3s ease-in-out infinite",
          }}
        >
          <Box
            width={"90%"}
            height={"90%"}
            maxHeight={900}
            maxWidth={900}
            alignContent={"center"}
          >
            {/* Email Input */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={loginInfo.email}
              onChange={(e) => handleLoginChange("email", e.target.value)}
              error={!!loginErrors.email}
              helperText={loginErrors.email}
              sx={{
                pb: 3,
                marginBottom: 2,
                input: { color: "#fff" },
                label: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFD700",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FFD700",
                  },
                },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />

            {/* Password Input */}
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={loginInfo.password}
              onChange={(e) => handleLoginChange("password", e.target.value)}
              error={!!loginErrors.password}
              helperText={loginErrors.password}
              sx={{
                marginBottom: 2,
                input: { color: "#fff" },
                label: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFD700",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FFD700",
                  },
                },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
          </Box>

          {/* Login Button */}
          <Box
            justifySelf={"flex-end"}
            alignSelf={"flex-end"}
            alignItems={"flex-end"}
            alignContent={"flex-end"}
            sx={{ cursor: "pointer" }}
            maxWidth={600}
            pr={2}
          >
            <Button
              onClick={handleLoginSubmit}
              disabled={loading}
              sx={{ width: "100%" }}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                <Image
                  src={"/static/images/Login/login.png"}
                  width={500}
                  height={100}
                  objectFit="cover"
                  alt="Login Button"
                />
              )}
            </Button>
          </Box>
        </Box>
      </Box>
      <SuccessPopUp open={openSuceess} handleClose={handleClose}/>
      <ErrorPopUp open={openError} handleClose={handleClose} message={errorMessage}/>
    </Grid>
  );
}

export default Login;
