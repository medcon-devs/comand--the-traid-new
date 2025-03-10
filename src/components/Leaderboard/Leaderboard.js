import React, { useEffect, useState } from "react";
import { Modal, Box, IconButton, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { get,post } from "@/handler/api.handler";
import { routeConfig } from "../../constant/route";
import { scoreData } from "../../types/props.types";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  borderRadius: "8px",
  p: 2,
  width: "100%",
  maxWidth: "1400px",
};
 
const Leaderboard = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [scoress, setScoress] = useState([]);
  const loadData = async () => {
    setLoading(true);
 
    try {
      const res = await get(routeConfig.scores, null);
      if (res?.status_code === 200) {
        console.log(res.data);
        setScoress(res.data || []);
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
  const highestScore = Math.max(...scoress.map((user) => user.total_points));
 
  const addpoint = async (team_id) => {
    setScoress((prevScores) => {
      const updatedScores = prevScores.map((score) =>
        score.team_id === team_id
          ? { ...score, total_points: (score.total_points || 0) + 100 }
          : score
      );
      console.log("Updated scores:", updatedScores);
      return updatedScores;
    });
 
    try {
      const res = await post(routeConfig.add_points, { team_id }, "");
      console.log("API response:", res);
      if (res.status_code === 200) {
        console.log("Successfully updated:", res.data);
      }
    } catch (error) {
      console.error("Error:", error.message || "An unexpected error occurred.");
    }
  };
  const removepoint = async (team_id) => {
    let shouldCallApi = false;
 
    setScoress((prevScores) => {
      const updatedScores = prevScores.map((score) => {
        if (score.team_id === team_id) {
          // Check if the score is greater than or equal to 100
          if ((score.total_points || 0) >= 100) {
            shouldCallApi = true;
            return {
              ...score,
              total_points: Math.max((score.total_points || 0) - 100, 0),
            };
          }
        }
        return score;
      });
 
      console.log("Updated scores after removing points:", updatedScores);
      return updatedScores;
    });
 
    // Only call the API if the condition is met
    if (shouldCallApi) {
      try {
        const res = await post(routeConfig.remove_points, { team_id }, "");
        console.log("API response:", res);
        if (res.status_code === 200) {
          console.log("Points removed successfully:", res.data);
        }
      } catch (error) {
        console.error("Error:", error.message || "An unexpected error occurred.");
      }
    } else {
      console.log(`Skipping API call: Team ${team_id} has insufficient points.`);
    }
  };
  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        // Prevent closing when clicking outside the modal
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
      aria-labelledby="popup-image"
      sx={{
        backdropFilter: "blur(8px)", // Apply the blur effect
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Optional: Dim the background
      }}
    >
      <Box>
        <Box sx={style}>
          <img
            src={"/static/images/leaderboard/Score Board.png"}
            alt="Popup"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Box>
       
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: 24,
              borderRadius: "8px",
              height: "70vh",
              p: 2,
              width: "100%",
              maxWidth: "1300px",
            }}
          >
            <IconButton
              onClick={handleClose}
              style={{ scale: 2 }}
              sx={{ position: "absolute", top: 100, right: 100, color: "#fff" }}
            >
              <CloseIcon />
            </IconButton>
            {/* {scoress.map((e)=>(<Typography color="#fff">{e.total_points}</Typography>))} */}
            //{" "}
            <div
              style={{
                padding: "30px",
                textAlign: "center",
                width: "80%",
                maxWidth: "925px",
                height: "60%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                margin: "0 auto",
              }}
            >
              <h1
                style={{
                  fontSize: "24px",
                  alignSelf: "center",
                  fontWeight: "bolder",
                  color: "white",
                  marginTop: "90px",
                }}
              >
                The Commanders
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
                {scoress.map((user) => (
                  <div
                    key={user.id}
                    style={{
                      position: "relative",
                      textAlign: "center",
                      minWidth: "275px",
                      minHeight: "295px",
                      borderRadius: "8px",
                      backgroundImage:
                        "url('/static/images/leaderboard/card background.png')",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        width: "100%",
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {user.total_points === highestScore && (
                         <Box position={"absolute"} top={"-50px"} left={"-30px"} sx={{transform:"rotate(-45deg)" }}>
                           <img
                            src="/static/images/leaderboard/Crown.png"
                            alt="Crown"
                            style={{
                              width: "90px",
                              height: "90px",
                              marginRight: "8px",
                              filter:
                                "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                            }}
                          />
                         </Box>
                        )}
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: "30px",
                            margin: "0",
                            color: "white",
                          }}
                        >
                          {user.team_name}
                        </p>
                      </div>
                      <p
                        style={{
                          fontSize: "30px",
                          margin: "20px 0",
                          color: "white",
                        }}
                      >
                        {user.total_points || 0} points
                      </p>
                    </div>
 
                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundImage:
                          "url('/static/images/leaderboard/icon background.png')",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <Button  onClick={() => removepoint(user.team_id)} sx={{padding:"20px"}}>
                      <img
                        src="/static/images/leaderboard/minus.png"
                        alt="Decrease"
                       
                        style={{
                          cursor: "pointer",
                          width: "30px",
                          height: "4px",
                          marginLeft: "13px",
                        }}
                      />
                      </Button>
                      <Button onClick={() => addpoint(user.team_id)} sx={{padding:"10px"}}>
                      <img
                        src="/static/images/leaderboard/plus.png"
                        alt="Increase"
                       
                        style={{
                          cursor: "pointer",
                          width: "30px",
                          height: "30px",
                          marginRight: "13px",
                        }}
                      />
                      </Button>
                     
                    </div>
                  </div>
                ))}
              </div>
            </div>
            );
          </Box>
        {/* )} */}
      </Box>
    </Modal>
  );
};
 
export default Leaderboard;
