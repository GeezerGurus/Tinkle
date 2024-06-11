import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

export const Budget = ({ content, dollar, percent }) => {
  const progressValue = parseInt(percent, 10); // Convert percent to integer

  const isOverspent = progressValue < 0; // Check if overspent

  return (
    <Box
      sx={{ display: "flex", width: "100%", flexDirection: "column", mb: 2 }}
    >
      <Box sx={{ display: "flex", width: "100%", alignItems: "center", mb: 1 }}>
        {/* Content box */}
        <Box sx={{ width: "217.5px" }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              letterSpacing: "1%",
              color: "black",
            }}
          >
            {content}
          </Typography>
        </Box>
        {/* Dollar box */}
        <Box sx={{ width: "60px", textAlign: "right" }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              letterSpacing: "1%",
              color: "black",
            }}
          >
            {dollar}
          </Typography>
        </Box>
        {/* Percent box */}
        <Box sx={{ width: "40px", textAlign: "right" }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              letterSpacing: "1%",
              color: "black",
            }}
          >
            {percent}
          </Typography>
        </Box>
      </Box>
      {/* Progress Bar */}
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={isOverspent ? 100 : 100 - progressValue}
          sx={{
            height: 17,
            bgcolor: " #D9D9D9B2",
            direction: isOverspent ? "rtl" : "ltr", // Reverse direction for overspent values only
            "& .MuiLinearProgress-bar": {
              bgcolor: isOverspent
                ? "red" // Red for overspent
                : progressValue < 50
                ? "#FF8844" // Orange for normal spending
                : "#00F79E", // Green for staying within the limit
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Budget;
