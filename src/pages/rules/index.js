import React, { useEffect, useState, useRef } from "react";
import { Grid, Box, Typography, Link, Button } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PopUpBackground from "../../components/popUp";
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
        position: "relative",
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
        {/* <Box
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
        // src="/static/images/Rules/popUp.png" */}
       <PopUpBackground children={
          

          <Box height={1}  >
            <Box height={.9}>
            <Typography fontSize={"2.2vw"} color="#fff">
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
                fontSize: "1.3vw",
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
                    "• Three teams are Racing to Command the TRIAD—the gateway to the NEW ERA",
                },
                {
                  title: "•&nbsp&nbsp&nbsp&nbsp;Help Tokens",
                  description: "• You have 3 gates to conquer and collect miles for your Race.",
                  subItems: [
                    "-  Each gate contains 18 Tiles containing questions, requests, or challenges.",
                    "-  The Tiles are divided into 3 difficulty levels. The tougher the challenge, the more miles you earn to complete the Race and cross the TRIAD.",
                  ],
                },
                {
                  title: "•&nbsp&nbsp&nbsp&nbsp;Scoring:",
                  description:
                    "• The number of questions is carefully designed to ensure equal distribution among the three teams. Each difficulty level also has a set number of questions that are evenly divided across the teams. However, if a team misses their share of high-score questions, it’s their call—strategy matters!",
                },
                {
                  title: "•&nbsp&nbsp&nbsp&nbsp;Leaderboard Tracking:",
                  description:
                    "• This is a rotational game where each team faces a different gate in each round. On their turn, teams select one tile from their gate; once chosen, tiles cannot be revisited. Teams must complete the challenge or task within the tile’s dedicated time—so stay sharp and focused!",
                },
                {
                  title: "•&nbsp&nbsp&nbsp&nbspVictory Conditions:",
                  description:
                    "• Each team will be provided with 3 Help Tokens",
                }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate={textControls}
                  variants={textVariants}
                  style={{
                    marginBottom: "5px",
                    fontSize: "0.85vw",
                    color: "#fff",
                  }}
                >
                  {/* <strong
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  ></strong>{" "} */}
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
                            marginBottom: "10px",
                            fontSize: "0.75vw",
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
            </Box>
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
                                    onClick={()=>{
                                      router.push('/home')
                                    }}
                                    // disabled={loading}
                                    sx={{ width: "100%" }}
                                  >
                                    
                                      <Image
                                        src={"/static/images/Rules/play.png"}
                                        width={500}
                                        height={100}
                                        objectFit="cover"
                                        alt="Login Button"
                                      />
                                    
                                  </Button>
                                </Box>
            
          
          </Box> 
            }
        />
      </Box>
    </Grid>
  );
}

export default Rules;
