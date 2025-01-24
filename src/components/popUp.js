import {Box, } from "@mui/material";
 export default function PopUpBackground({children}){

    return(
      <Box position={"relative"} width={"100vw"} height={"100vh"}  alignContent={"flex-end"} justifyContent={"center"} justifyItems={"center"}> 

       <Box
              component="img"
              width={400}
              mt={20}
              height={200}
              position="absolute"
              top="20px"
              left="50%"
              sx={{
                transform: "translate(-50%, -50%)",
                objectFit: "contain",
                animation: "fadeInScaleWelcome 1.5s ease-in-out forwards",
                // backgroundColor:"red",
              }}
              alt="logo"
              src="/static/images/Welcome/logo.png"
            />
        <Box
          // component="img"
          // position={"absolute"}
          margin={"0px auto"}
          // top="15%"
          // left="26%"
          width={"60vw"}
          height={"85vh"}
          // alignContent={"space-between"}
          // maxWidth={1050}
          padding={"60px 100px 70px 100px"}
          maxWidth={"1290px"}
          maxHeight={"1000px"}
          sx={{
            // backgroundColor:"blue",
            backgroundImage: `url(/static/images/Rules/popUp.png)`,
            backgroundSize: "cover",
            backgroundPosition:"center",
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
        </Box>
    );
}