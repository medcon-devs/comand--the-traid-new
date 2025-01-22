import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Image from "next/image";

const FlippingCard = ({
  card,
  roundIndex,
  cardIndex,
  isCardOpend,
  // boxShadowsColor,
  flippedCardIndex,
  setFlippedCardIndex,
  setOpen,
  handleCardClick2,
  clickCard,
  animationDelay,
}) => {
  const isFlipped = flippedCardIndex === `${roundIndex}-${cardIndex}`;
  const [showBackImage, setShowBackImage] = useState(false);
  const handleCardClick = () => {
    if (!isCardOpend(roundIndex, card.id)) {
      if (flippedCardIndex === null || flippedCardIndex === `${roundIndex}-${cardIndex}`) {
        setFlippedCardIndex(isFlipped ? null : `${roundIndex}-${cardIndex}`);
      }
      
    }
    if (isFlipped) {
      setOpen(true);
      handleCardClick2(card, roundIndex);
      clickCard(card.id, roundIndex + 1); 
    }
  };
  useEffect(() => {
    if (isFlipped) {
      // Delay showing the back image by 1 second
      const timer = setTimeout(() => setShowBackImage(true), 100);
      return () => clearTimeout(timer); // Cleanup the timer
    } else {
      setShowBackImage(false); // Hide the back image when not flipped
    }
  }, [isFlipped]);
  return (
    <Grid container item md={4} justifyContent="center"  sx={{
      opacity: 0, // Start hidden
      transform: "scale(0.8)", // Start smaller
      animation: `fadeInScale 0.6s ease-in-out ${animationDelay}s forwards`,
    }}>
      <Grid item md={10} height={110}>
        <Box
          onClick={handleCardClick}
          sx={{
            position: "relative",
            height: 100,
            width: "100%",
            perspective: "1000px", // Enables 3D perspective
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
              transition: "transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), box-shadow 0.6s",
              borderRadius: "12px",
              // boxShadow: isCardOpend(roundIndex, card.id)
              //   ? null
              //   : boxShadowsColor[roundIndex],
              cursor:isCardOpend(roundIndex, card.id)?"not-allowed": "pointer",
              "&:hover":isCardOpend(roundIndex, card.id)?null: {
                transform: isFlipped
                  ? "rotateY(180deg) scale(1.05)"
                  : "rotateY(0) scale(1.06)",
              },
            }}
          >
            {/* Front Side */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                // backfaceVisibility: "hidden",
                backgroundColor: "#1e293b",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
              }}
            >
              <Image
                src={isCardOpend(roundIndex,card.id)?"/static/images/card/Square tile case done.png": "/static/images/card/Square tile case.png"}
                layout="fill"
                alt="Front Side"
              />
            </Box>

            {/* Back Side */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                transform: isFlipped? "rotateY(180deg)":null,
                // backfaceVisibility: "hidden",
                // backgroundColor: "#0f172a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
              }}
            >
             
              {showBackImage ? (
                <Image
                  src={
                    `/static/images/type/${card.type}.png`
                  }
                  layout="intrinsic"
                  width={140}
                  height={80}
                  alt="Back Side"
                />
              ):(<Box > <Image
                src={
               isCardOpend(roundIndex, card.id)?`/static/images/card/done.png`:  `/static/images/card/${
                        card.id > 12
                          ? "300"
                          : card.id > 6
                          ? "200"
                          : "100"
                      }m.png`
                }
                layout="intrinsic"
                // layout="fill"
                objectFit="cover"
                width={140}
                height={20}
                alt="Back Side"
              /></Box>)}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FlippingCard;
