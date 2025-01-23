import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import FlippingCard from "./Card";
import { Round1 } from "@/utlis/round1";
import { Round2 } from "@/utlis/round2";
import { Round3 } from "@/utlis/round3";
import QuestionPopUp from "./questionPopUp";
import { get,post } from "@/handler/api.handler";
import { routeConfig } from "../../constant/route";
// const boxShadowsColor = [
//   "0 0 15px 5px rgba(54, 206, 255, 0.6), 0 0 30px 10px rgba(54, 206, 255, 0.9)",
//   "0 0 15px 5px rgba(242, 161, 22, 0.6), 0 0 30px 10px rgba(242, 161, 22, 0.9)",
//   "0 0 15px 5px rgba(226, 0, 33, 0.6), 0 0 30px 10px rgba(226, 0, 33, 0.9)",
// ];

function HomeGame() {
  // const opened = [
  //   { round: 1, data: [1] },
  //   { round: 2, data: [2, 3,4,13]},
  //   { round: 3, data: []},
  // ];

  const isRoundOpened = (roundIndex, round) => {
    const currentRound = opened.find((o) => o.round === roundIndex + 1);
    return currentRound && currentRound.data.length === round.length;
  };

  const isCardOpened = (roundIndex, card) => {
    const currentRound = opened.find((o) => o.round === roundIndex + 1);
    return currentRound && currentRound.data.includes(card);
  };

  const [flippedCardIndex, setFlippedCardIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedRoundIndex, setSelectedRoundIndex] = useState(null);
  const [opened, setOpened] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadData = async () => {
    setLoading(true);
  
    try {
      const res = await get(routeConfig.get_clicked, null);
      if (res?.status_code === 200) {
        console.log(res.data);
        setOpened(res.data || []);
        // setEvent(res.data);
      }
    } catch (e) {
      console.error("Error loading data:", e);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  const handleClose = ()=> {
    setOpen(false)
    setSelectedCard(null)
    setSelectedRoundIndex(null)
  };

  const handleCardClick = (card, roundIndex) => {
    setOpen(true);
    setSelectedCard(card);
    setSelectedRoundIndex(roundIndex);
   
  };

 
  const checkGameFinished = () => {
  const requiredData = Array.from({ length: 18 }, (_, i) => i + 1); // [1, 2, ..., 18]

  return opened.every(round => 
    requiredData.every(num => round.data.includes(num))
  );
  // return false;
};

const clickCard = async (card_id,round_id) => {
   
  try {
    const res = await post(routeConfig.card_clicked, {"card_id":card_id,"round":round_id}, "");

      console.log("red" , res)
    if (res.status_code === 200) {
      console.log(res.data)
      loadData();
     
    } 
  }catch (error) {
    console.log(error.message || "An unexpected error occurred.");
  }

};

  return (
    <Box>
   {loading?(<Box></Box>):( <Box width={1} >
      {checkGameFinished()?(<Box  
      // height={910}
      top= {0}
      position={"fixed"}
      zIndex={1000}
      height={"100vh"}
      width={"100vw"}
      sx={{
        backgroundImage: `url('/static/images/Home/Game Over.png')`,
        backgroundSize:"cover",
        // backgroundPosition
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center"

        // overflow: "hidden",
        // position: "relative",
      }}></Box>):(
      <Grid
        display="flex"
        // flexDirection="row"
        // justifyContent="space-between"
        // padding="0px 20px 0px 20px"
        justifySelf="center"
        justifyContent={"center"}
        width={1}
      >
        {[Round1, Round2, Round3].map((round, roundIndex) => (
          <Grid
            container
            margin={0}
            key={roundIndex}
            sx={{
              backgroundColor:"",
              backgroundImage: `url("/static/images/Home/Gate${
                // isRoundOpened(roundIndex, round) ? "0" :
                 roundIndex + 1
              }.png")`,
              backgroundSize:"cover",
              backgroundPosition:"center",
              // backgroundPosition:"center",
              // objectFit:"cover",
              backgroundRepeat: "no-repeat",
              // height:800,
              // width:"35%",
              pt: 12,
              // pt:10,
              // pb:3.3,
              pb: 2,
              pl: 4,
              pr:1,
              // pb:3
              // width: "30%",
            }}
            // flex={1}
          >
            {round.map((card, cardIndex) => {
               const uniqueCardId = `round-${roundIndex}-card-${cardIndex}-${card.id}`;

              return (
                <FlippingCard
                  key={uniqueCardId}
                  card={card}
                  roundIndex={roundIndex}
                  cardIndex={cardIndex}
                  isCardOpend={isCardOpened}
                  // boxShadowsColor={boxShadowsColor}
                  flippedCardIndex={flippedCardIndex}
                  setFlippedCardIndex={setFlippedCardIndex}
                  setOpen={setOpen}
                  handleCardClick2={handleCardClick}
                  clickCard={clickCard} 
                  animationDelay={cardIndex * 0.2} 
                />
              );
            })}
          </Grid>
        ))}
      </Grid>)}
      
    </Box>)}
    <QuestionPopUp
        key={new Date}
        open={open}
        handleClose={handleClose}
        card={selectedCard}
        roundIndex={selectedRoundIndex}
        
      />
    
    </Box>
  );
}

export default HomeGame;
