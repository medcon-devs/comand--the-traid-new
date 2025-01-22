import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const LOCAL_STORAGE_KEY = "leaderboardScores";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Default data if no data exists in local storage
  const defaultUsers = [
    { name: "Team 1", score: 0 },
    { name: "Team 2", score: 0 },
    { name: "Team 3", score: 0 },
  ];

  // Initialize scores state
  const [scores, setScores] = useState(() => {
    if (isLoggedIn && localStorage.getItem(LOCAL_STORAGE_KEY)!=[]) {
      const storedScores = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedScores ? JSON.parse(storedScores) : defaultUsers;
    }
    return defaultUsers;
  });

  // Save scores to local storage whenever they change
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(scores));
    }
  }, [scores]);

  // Function to update the score for a user
  const updateScore = (index, delta) => {
    setScores((prevScores) =>
      prevScores.map((user, idx) =>
        idx === index ? { ...user, score: (user.score || 0) + delta } : user
      )
    );
  };

  console.log("scores",scores)

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "30px",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: "#fff",
        width: "90%",
        maxWidth: "925px",
        height: "70%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <h3
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          alignSelf: "center",
        }}
      >
        Score Card
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
        {scores.map((user, index) => (
          <div
            key={user.name}
            style={{
              textAlign: "center",
              padding: "15px",
              minWidth: "180px",
              minHeight: "295px",
              backgroundColor: "#f7f7f7",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "18px", margin: "5px 0" }}>
              {user.name}
            </p>
            <p style={{ fontSize: "30px", margin: "50px 0" }}>
              {user.score || 0} points
            </p>
            <div>
              <button
                onClick={() => updateScore(index, -100)}
                style={{
                  margin: "5px 30px",
                  padding: "10px 20px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f44336",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                -
              </button>
              <button
                onClick={() => updateScore(index, 100)}
                style={{
                  margin: "10px 50px 50px 50px",
                  padding: "10px 20px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
