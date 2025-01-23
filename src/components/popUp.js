import {Box, } from "@mui/material";
 export default function PopUpBackground({children}){

    return(
        <Box
          // component="img"
          position={"absolute"}
          margin={"0px auto"}
          top="20%"
          left="28%"
          width={"50vw"}
          height={"70vh"}
          // alignContent={"space-between"}
          // maxWidth={1050}
          padding={"60px 100px 70px 100px"}
          maxWidth={"850px"}
          maxHeight={"800px"}
          sx={{
            // backgroundColor:"blue",
            backgroundImage: `url(/static/images/Rules/popUp.png)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            transform: "translate(-50%, -50%)",
            // objectFit: "contain",
            animation: "floatWelcome 3s ease-in-out infinite",
          }}
          alt="logo"
        // src="/static/images/Rules/popUp.png"
        >
            {children}

        </Box>
    );
}