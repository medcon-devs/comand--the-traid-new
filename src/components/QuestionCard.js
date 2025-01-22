import React, { useState } from "react";

const QuestionCard = ({ id, onClick, name, titleImage }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if (isDisabled) return; // Do nothing if the card is disabled

    if (!isFlipped) {
      // Flip the card on the first click
      setIsFlipped(true);
    } else {
      // Open the modal when clicking the back side
      onClick(id);
      setIsFlipped(false); // Flip back to the front side
      setIsDisabled(true); // Disable the card after the modal closes
    }
  };
  console.log("titleimage",titleImage)

  return (
    <div
      onClick={handleClick}
      style={{
        perspective: "1000px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        width: "9rem",
        height: "12rem",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s",
        }}
      >
        {/* Front Side */}
        <div
          style={{
            position: "absolute",
            backfaceVisibility: "hidden",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: isDisabled ? "grey" : "#212194", // Change color when disabled
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {name}
        </div>

        {/* Back Side */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            transform: "rotateY(180deg)",
          }}
        >
          <img src={titleImage} alt="Title" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
