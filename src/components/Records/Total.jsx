import { Paper, Typography } from "@mui/material";
import React from "react";

const Total = ({ header, amount, color, percent }) => {
  return (
    <Paper
      sx={{
        width: "400px",
        height: "216px",
        backgroundColor: "white",
        borderRadius: "8px",
      }}
    >
      {/* Header  */}
      <Typography
        sx={{
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "600",
          color: "black",
          marginTop: "24px",
          marginLeft: "24px",
        }}
      >
        {header}
      </Typography>
      {/* Amount */}
      <Typography
        sx={{
          fontSize: "40px",
          lineHeight: "44px",
          fontWeight: "600",
          letterSpacing: "-2%",
          color: color,
          marginTop: "16px",
          marginLeft: "24px",
        }}
      >
        {amount}
      </Typography>
      {/* Percent */}
      <Typography
        sx={{
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "500",
          color: "black",
          marginTop: "16px",
          marginLeft: "24px",
        }}
      >
        {percent}
      </Typography>
    </Paper>
  );
};

export default Total;
