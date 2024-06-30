import React from "react";
import { Box, Typography } from "@mui/material";
import Videos from "./Videos";

const subHeaders = [
  { header: "Favourites" },
  { header: "Budgets" },
  { header: "Saving" },
  { header: "Business" },
  { header: "Tinkle" },
  { header: "Life" },
];

const Videopage = () => {
  return (
    <Box sx={{ margin: "0 auto", textAlign: "center" }}>
      {/* Gradient title */}
      <Box
        sx={{
          margin: "0 auto",
          width: "1294px",
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
 
      {/* Video item box */}
      <Box sx={{ width: "1326px", margin: "0 auto", padding: "8px" }}>
        {subHeaders.map((header, index) => (
          <Videos key={index} header={header.header} />
        ))}
      </Box>
    </Box>
  );
};

export default Videopage;
