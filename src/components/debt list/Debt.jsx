import { Paper } from "@mui/material";
import React from "react";

const ActiveDebt = ({ bgColor }) => {
  return (
    <Paper
      sx={{ width: "1240px", height: "175px", backgroundColor: bgColor }}
    ></Paper>
  );
};

export default ActiveDebt;
