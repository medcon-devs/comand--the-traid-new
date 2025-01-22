// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Leaderboard = () => {
//   const API_BASE_URL = "https://game.medcon.ae/command-the-triad/api/public/api";

//   const defaultUsers = [
//     { id: 1, name: "Alpha", score: 0 },
//     { id: 2, name: "Beta", score: 0 },
//     { id: 3, name: "Gama", score: 0 },
//   ];

//   const [scores, setScores] = useState(defaultUsers);

//   useEffect(() => {
//     const fetchScores = async () => {
//       try {
// const response = await axios.get(`${API_BASE_URL}/get-scores`);
//         if (response.status === 200 && response.data.status) {
//           const apiData = response.data.data;
//           const updatedScores = scores.map((user) => {
//             const apiScore = apiData.find((item) => item.team_id === user.id);
//             return apiScore
//               ? { ...user, score: apiScore.total_points }
//               : user;
//           });

//           setScores(updatedScores);
//         } else {
//           console.error("Failed to fetch scores:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching scores:", error);
//       }
//     };

//     fetchScores();
//   }, []);

//   const highestScore = Math.max(...scores.map((user) => user.score));
//   const updateScore = async (teamId, delta) => {
//     try {
//       const endpoint = delta > 0 ? "/add-points" : "/remove-points";
//       const response = await axios.post(
//         `${API_BASE_URL}${endpoint}`,
//         {
//           team_id: teamId,
//         }
//       );

//       if (response.status === 200) {
//         setScores((prevScores) =>
//           prevScores.map((team) =>
//             team.id === teamId ? { ...team, score: team.score + delta } : team
//           )
//         );
//       } else {
//         console.error("Failed to update score:", response.data);
//       }
//     } catch (error) {
//       console.error("Error updating score:", error);
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "30px",
//         textAlign: "center",
//         width: "80%",
//         maxWidth: "925px",
//         height: "60%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "flex-start",
//         alignItems: "center",
//         margin: "0 auto",
//       }}
//     >
//       <h1
//         style={{
//           fontSize: "24px",
//           alignSelf: "center",
//           fontWeight: "bolder",
//           color: "white",
//           marginTop: "90px",
//         }}
//       >
//         The Commanders
//       </h1>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "20px",
//           flexWrap: "wrap",
//           marginTop: "10px",
//         }}
//       >
//         {scores.map((user) => (
//           <div
//             key={user.id}
//             style={{
//               position: "relative",
//               textAlign: "center",
//               minWidth: "275px",
//               minHeight: "295px",
//               borderRadius: "8px",
//               backgroundImage: "url('/static/images/leaderboard/card background.png')",
//               backgroundSize: "contain",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 textAlign: "center",
//                 width: "100%",
//                 zIndex: 1,
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 {user.score === highestScore && (
//                   <img
//                     src="/static/images/leaderboard/Crown.png"
//                     alt="Crown"
//                     style={{
//                       width: "30px",
//                       height: "30px",
//                       marginRight: "8px",
//                       filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
//                     }}
//                   />
//                 )}
//                 <p
//                   style={{
//                     fontWeight: "bold",
//                     fontSize: "30px",
//                     margin: "0",
//                     color: "white",
//                   }}
//                 >
//                   {user.name}
//                 </p>
//               </div>
//               <p
//                 style={{
//                   fontSize: "30px",
//                   margin: "20px 0",
//                   color: "white",
//                 }}
//               >
//                 {user.score || 0} points
//               </p>
//             </div>

//             <div
//               style={{
//                 position: "absolute",
//                 bottom: "10px",
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 width: "100%",
//                 height: "50px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 backgroundImage:
//                   "url('/static/images/leaderboard/icon background.png')",
//                 backgroundSize: "contain",
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//               }}
//             >
//               <img
//                 src="/static/images/leaderboard/minus.png"
//                 alt="Decrease"
//                 onClick={() => updateScore(user.id, -100)}
//                 style={{
//                   cursor: "pointer",
//                   width: "30px",
//                   height: "4px",
//                   marginLeft: "13px",
//                 }}
//               />
//               <img
//                 src="/static/images/leaderboard/plus.png"
//                 alt="Increase"
//                 onClick={() => updateScore(user.id, 100)}
//                 style={{
//                   cursor: "pointer",
//                   width: "30px",
//                   height: "30px",
//                   marginRight: "13px",
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;

import React, { useEffect, useState } from "react";
import { Modal, Box, IconButton, Typography } from "@mui/material";
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
  const highestScore = Math.max(...scoress.map((user) => user.total_points));

  const addpoint = async (team_id) => {
   
      try {
        const res = await post(routeConfig.add_points, {"team_id":team_id}, "");

          console.log("red" , res)
        if (res.status_code === 200) {
          console.log(res.data)
          loadData();
         
        } 
      }catch (error) {
        console.log(error.message || "An unexpected error occurred.");
      }
    
  };
  const removepoint = async (team_id) => {
   
    try {
      const res = await post(routeConfig.remove_points, {"team_id":team_id}, "");

        console.log("red" , res)
      if (res.status_code === 200) {
        loadData();
      
       
      } 
    }catch (error) {
      console.log(error.message || "An unexpected error occurred.");
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
                      <img
                        src="/static/images/leaderboard/minus.png"
                        alt="Decrease"
                        onClick={() => removepoint(user.team_id)}
                        style={{
                          cursor: "pointer",
                          width: "30px",
                          height: "4px",
                          marginLeft: "13px",
                        }}
                      />
                      <img
                        src="/static/images/leaderboard/plus.png"
                        alt="Increase"
                        onClick={() => addpoint(user.team_id)}
                        style={{
                          cursor: "pointer",
                          width: "30px",
                          height: "30px",
                          marginRight: "13px",
                        }}
                      />
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
