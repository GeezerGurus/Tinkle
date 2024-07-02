import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, useTheme, Paper, Grid } from "@mui/material";
import { tokens } from "../../theme";
import { useParams } from "react-router-dom";
import { BackBtn, VideoContents } from "../../components/utils";

const favourites = [
  { img: "", title: "How to get your ex back", avatar: "", author: "Zaw" },
  { img: "", title: "How to talk to girls", avatar: "", author: "Zaw" },
  { img: "", title: "How to make her happy", avatar: "", author: "Zaw" },
  {
    img: "",
    title: "How to make her fall in love with you",
    avatar: "",
    author: "Zaw",
  },
  { img: "", title: "Date ideas", avatar: "", author: "Zaw" },
  { img: "", title: "What to do on your dates", avatar: "", author: "Zaw" },
  { img: "", title: "How to get your ex back", avatar: "", author: "Zaw" },
  { img: "", title: "How to get your ex back", avatar: "", author: "Zaw" },
];

const VideoCollection = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isOverflowing, setIsOverflowing] = useState(false);
  const gridRef = useRef(null);
  const { videoCollection } = useParams();

  useEffect(() => {
    const checkOverflow = () => {
      if (gridRef.current) {
        const hasOverflow =
          gridRef.current.scrollHeight > gridRef.current.clientHeight;
        setIsOverflowing(hasOverflow);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    // Main Container
    <Paper
      sx={{
        width: "100%",
        height: "940px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        position: "relative",
      }}
    >
      {/* Call Back Button */}
      <BackBtn />
      {/* Gradient title */}
      <Box
        sx={{
          margin: "0 auto",
          width: isOverflowing ? "1350px" : "1326px",
          height: "134px",
          borderRadius: "16px",
          alignContent: "center",
          backgroundImage: "linear-gradient(to right, #50B87E, #8884DC)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Rhodium Libre",
            fontWeight: "400",
            fontSize: "35px",
            lineHeight: "49px",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Expand your knowledge on finance and life with our selected videos
        </Typography>
      </Box>
      {/* Header */}
      <Box
        sx={{
          width: isOverflowing ? "1350px" : "1326px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          mt: 2,
        }}
      >
        {/* Title */}
        <Typography variant="h3">
          {videoCollection
            ? videoCollection
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : "Video Collection"}
        </Typography>
      </Box>
      {/* Contents */}
      <Grid
        container
        ref={gridRef}
        rowSpacing={2}
        columnSpacing={1}
        sx={{
          width: isOverflowing ? "1400px" : "1326px",
          height: "769px",
          gap: "49px",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          p: 1,
          overflowY: "auto",
        }}
      >
        {favourites.map((item, index) => (
          <Grid item key={index} sx={{ width: "calc((100% / 3) - 33px)" }}>
            <VideoContents
              title={item.title}
              author={item.author}
              pathImage={item.img}
              vdavatar={item.avatar}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default VideoCollection;
