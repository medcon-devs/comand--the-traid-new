import React, { useEffect, useState, useRef } from "react";
import { Grid, Box, Typography,Link, Button } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
function Rules() {
  const textControls = useAnimation();
  const componentRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const router = useRouter();
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          textControls.start("visible");
        }
      },
      { threshold: 0.2 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [hasAnimated, textControls]);

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
      }}
    >
      <Box
        component="img"
        width={400}
        height={200}
        position="absolute"
        top="25%"
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
          top="20%"
          left="24%"
          width={1000}
          height={750}
          maxWidth={1050}
          sx={{
            // backgroundColor:"blue",

            transform: "translate(-50%, -50%)",
            objectFit: "contain",
            animation: "floatWelcome 3s ease-in-out infinite",
          }}
          alt="logo"
          src="/static/images/Rules/popUp.png"
        ></Box>
        <Box
          position={"absolute"}
          top="30%"
          left="30%"
          width={800}
          height={600}
          maxWidth={900}
          justifyContent={"center"}
          justifyItems={"center"}
          sx={{
            // backgroundColor:"red",
            transform: "translate(-50%, -50%)",
            objectFit: "contain",
            animation: "floatWelcome 3s ease-in-out infinite",
          }}
        >
          <Typography variant="h4" color="#fff">
            Game Rules & Mechanics
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <ul
              style={{
                textAlign: "left",
                fontSize: "1.5rem",
                lineHeight: "1.6",
                color: "#fff",
                listStyleType: "none",
                padding: 0,
              }}
            >
              {[
                {
                  title: "•&nbsp&nbsp&nbsp&nbsp;Tile Selection:",
                  description:
                    "Teams select tiles on their turn; tiles cannot be revisited.",
                },
                {
                  title: "•&nbsp&nbsp&nbsp&nbsp;Scoring:",
                  description:
                    "Teams select tiles on their turn; tiles cannot be revisited.",
                },
                {
                  title: "•&nbsp&nbsp&nbsp&nbsp;Help Tokens",
                  description: "Use 6 futuristic tools:",
                  subItems: [
                    "•  2 Power Surge: Hint Cards",
                    "•  2 Tactical Override: Challenge Cards",
                    "•  2 Quantum Reset: Second Chance Cards",
                  ],
                },
                {
                  title: "•&nbsp&nbsp&nbsp&nbsp;Leaderboard Tracking:",
                  description:
                    "Live updates on a fantastic race track leaderboard.",
                },
                {
                  title: "•&nbsp&nbsp&nbsp&nbspVictory Conditions:",
                  description:
                    "Highest meters win! Ties decided by role play performance.",
                },
                {
                  title: "•&nbsp&nbsp&nbsp&nbsp;Strategy Planning:",
                  description: "Teams can strategize for optimal scoring.",
                },
                {
                  title: "•&nbsp&nbsp&nbsp&nbsp;Time Management:",
                  description:
                    "Each team is given a limited time to make decisions.",
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate={textControls}
                  variants={textVariants}
                  style={{
                    marginBottom: "20px",
                    fontSize: "1.3rem",
                    color: "#fff",
                  }}
                >
                  <strong
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  ></strong>{" "}
                  {item.description}
                  {item.subItems && (
                    <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
                      {item.subItems.map((subItem, subIndex) => (
                        <motion.li
                          key={subIndex}
                          custom={index + subIndex * 0.1}
                          initial="hidden"
                          animate={textControls}
                          variants={textVariants}
                          style={{
                            marginBottom: "5px",
                            fontSize: "1.1rem",
                            color: "#FFF",
                          }}
                        >
                          {subItem}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>
          </Box>
          {/* <Box width={200} height={50} sx={{backgroundColor:"red"}}></Box> */}
          <Box justifySelf={"flex-end"}  sx={{cursor:"pointer",}} pt={2} pr={2}>
          <Button onClick={()=>{
           router.push('/home')
          }}>
          
          <Image src={"/static/images/Rules/play.png"} width={500} height={100} objectFit="cover" />
         
          </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default Rules;
