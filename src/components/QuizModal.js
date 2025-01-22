import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const QuizModal = ({ isOpen, onClose, question }) => {
  const [result, setResult] = useState(null); // Track result (correct/incorrect)

  const handleAnswer = (answer) => {
    const isCorrect = answer === question.correctAnswer;
    setResult(isCorrect ? "correct" : "incorrect"); // Set result state
    if (isCorrect) {
      playSuccessSound(); // Play success sound
  } else {
      playErrorSound(); // Play error sound
  }
  };

  const closeResultModal = () => {
    setResult(null); // Reset result state
    onClose(); // Close the question modal
  };

  const playErrorSound = () => {
    const audio = new Audio("/static/images/fail-234710.mp3"); // Replace with the path to your sound file
    audio.play();
  };

  const playSuccessSound = () => {
    const audio = new Audio("/static/images/tada-234709.mp3"); // Replace with the path to your sound file
    audio.play();
  };
  if (!question) return null;

  return (
    <>
      {/* Question Modal */}
      <Modal
        isOpen={isOpen && result === null}
        onRequestClose={onClose}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "30px", // Increased padding for more space inside
            width: "80%",  // Adjust width as needed (percentage or fixed size)
            maxWidth: "900px", // Set a max width to prevent it from getting too large on big screens
            height: "70%",  // Adjust height as needed (percentage or fixed size)
            maxHeight: "600px", // Set a max height to prevent it from getting too large on big screens
          },
        }}
      >
        <h2>{question.question}</h2>
        <img
          src={question.image}
          alt="Question related"
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
        />
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              style={{
                padding: "10px 20px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f0f0f0",
                cursor: "pointer",
                marginTop: "30px",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </Modal>

      {/* Result Modal */}
      <Modal
        isOpen={result !== null}
        onRequestClose={closeResultModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            textAlign: "center",
          },
        }}
      >
        {result === "correct" ? (
          <h2 style={{ color: "green" }}>The answer is correct!</h2>
        ) : (
          <h2 style={{ color: "red" }}>The answer is incorrect!</h2>
        )}
        <button
          onClick={closeResultModal}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default QuizModal;
