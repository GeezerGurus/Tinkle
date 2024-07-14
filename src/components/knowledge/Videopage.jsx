import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Videos from "./Videos";

const subHeaders = [
  { header: "Budget" },
  { header: "Savings" },
  { header: "Business" },
];

const Videopage = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ margin: "0 auto", textAlign: "center", height: "auto" }}>
      {/* Gradient title */}
      <Box
        sx={{
          margin: "0 auto",
          width: "auto",

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
        <Typography variant={isSmallScreen ? "body3" : "h6"}>
          Expand your knowledge on finance and life with our selected videos
        </Typography>
      </Box>

      {/* Video item box */}
      <Box
        sx={{ width: "97%", height: "auto", margin: "0 auto", padding: "8px" }}
      >
        {/* <VideoFavourite header={"Favourites"}/> */}
        {subHeaders.map((header, index) => (
          <Videos key={index} header={header.header} />
        ))}
      </Box>
    </Box>
  );
};

export default Videopage;
