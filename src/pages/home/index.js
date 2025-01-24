import { useState, useEffect } from "react";
import { Grid, Box, Button } from "@mui/material";
import Image from "next/image";
import HomeGame from "../../components/HomeGame/HomeGame";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import { Howl } from "howler";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isTopBorderFinished, setIsTopBorderFinished] = useState(false);
  const [isBottomBorderReady, setIsBottomBorderReady] = useState(false);
  const router = useRouter();

  const borderTopSound = new Howl({
    src: ["/static/audios/effect/Border - Top.mp3"],
    volume: 0.8,
    preload: true,
  });

  const borderBottomSound = new Howl({
    src: ["/static/audios/effect/Border - Bottom.mp3"],
    volume: 0.8,
    preload: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      router.replace("/login");
    }
    setLoading(false);
  }, [router]);

  const handleTopBorderAnimationEnd = () => {
    setIsTopBorderFinished(true);

    // Start the bottom border animation after 3 seconds
    setTimeout(() => {
      setIsBottomBorderReady(true);
    }, 3000); // 3000ms = 3 seconds
  };

  if (loading) return <Box>Loading...</Box>;
  if (!isLoggedIn) return null;

  return (
    <Grid
      width={1}
      height={"100vh"}
      sx={{
        background: `url('/static/images/Home/background.png')`,
        backgroundSize: "cover",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Floating Stars Animation */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              animation: `float ${4 + Math.random() * 6}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </Box>

      <Box height={"auto"} width={1} sx={{ alignContent: "center", zIndex: 1 }}>
        <Grid
          display={"flex"}
          sx={{
            justifyContent: "space-between",
            padding: "20px 40px 0px 40px",
            zIndex: 1,
            position: "relative",
          }}
        >
          <Box width={100}></Box>
          <Image
            src={"/static/images/Home/title.png"}
            width={200}
            height={50}
            style={{
              animation: "fadeInDown 1.5s ease",
            }}
          />
          <Box display={"flex"} gap={2} sx={{ alignItems: "flex-end" }}>
            <Button onClick={() => setOpen(true)}>
              <Box
                position="relative"
                width={100}
                height={50}
                sx={{ animation: "bounce 2s infinite" }}
              >
                <Image
                  src="/static/images/Home/Leaderboard.png"
                  layout="fill"
                  objectFit="cover"
                  alt="Leaderboard"
                />
              </Box>
            </Button>
            <Button onClick={() => router.push("/rules")}>
              <Box
                position="relative"
                width={40}
                height={40}
                sx={{ animation: "pulse 1.5s infinite" }}
              >
                <Image
                  src="/static/images/Home/info.png"
                  layout="fill"
                  objectFit="cover"
                  alt="Info"
                />
              </Box>
            </Button>
          </Box>
        </Grid>

        {/* Top Border Animation */}
        <Box
          position="absolute"
          top={60}
          left={"2.5%"}
          width={0.95}
          sx={{
            animation: "slideInLeft 2s ease-out",
            animationFillMode: "forwards",
          }}
          onAnimationStart={() => borderTopSound.play()}
          onAnimationEnd={handleTopBorderAnimationEnd} // Trigger when animation ends
        >
          <Image
            src="/static/images/Home/GameBoarderTop.png"
            width={1850}
            height={30}
            objectFit="cover"
            alt="Game Border Top"
          />
        </Box>
      </Box>

      {/* HomeGame Section */}
      <HomeGame />

      {/* Bottom Border Animation */}
      {isBottomBorderReady && ( // Render only after 3 seconds after the top border animation ends
        <Box
          position="absolute"
          bottom={10}
          left={"2.5%"}
          width={0.95}
          sx={{
            animation: "slideInRight 1s ease-out",
            animationFillMode: "forwards",
          }}
          onAnimationStart={() => borderBottomSound.play()}
        >
          <Image
            src="/static/images/Home/GameBoarderBottom.png"
            width={1850}
            height={30}
            objectFit="cover"
            alt="Game Border Bottom"
          />
        </Box>
      )}

      <Leaderboard key={new Date()} open={open} handleClose={() => setOpen(false)} />
    </Grid>
  );
}
