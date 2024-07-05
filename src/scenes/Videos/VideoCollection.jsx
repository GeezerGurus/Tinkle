import React, { useEffect, useRef, useState, } from "react";
import { Box, Typography, useTheme, Paper, Grid,useMediaQuery  } from "@mui/material";
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

  
  const { videoCollection } = useParams();

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallest = useMediaQuery(theme.breakpoints.down("xs"));
  const isExtraSmallest = useMediaQuery(theme.breakpoints.down("xxs"));
  

  return (
    // Main Container
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
        justifyContent: "flex-start",
        position: "relative",
      }}
    >
      {/* Call Back Button */}
      <BackBtn g/>
      {/* Gradient title */}
      <Box
        sx={{
          textAlign:"center",
          marginTop:isMediumScreen?"50px":undefined,
          width: "100%",
          height: "134px",
          borderRadius: "16px",
          alignContent: "center",
          backgroundImage: "linear-gradient(to right, #50B87E, #8884DC)",
          display: "flex",
          alignItems: "center",
          padding: "32px",
          justifyContent: "center",
        }}
      >
        <Typography
          variant={isSmallScreen?"body3":"h6"}
        >
          Expand your knowledge on finance and life with our selected videos
        </Typography>
      </Box>
      {/* Header */}
      <Box
        sx={{
          width:"100%",
          height: "56px",
          display: "flex",
          
          position: "relative",
          padding:"50px"
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
        
        rowSpacing={3}
        columnSpacing={1}
        
        direction={isSmallScreen?"column": "row"}
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          width: "100%",
          height: "auto",
          
          
        
          
        }}
      >
        {favourites.map((item, index) => (
          <Grid item key={index} sm={6} md ={6} lg={4} xl={3}>
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
