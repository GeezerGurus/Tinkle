import { Box } from "@mui/material";
import React from "react";
import Amount from "../utils/Record/amount";
import Percent from "../utils/Record/percent";
import Header from "../utils/Record/header";
const Total = ({ header, amount, color, percent }) => {
  return (
    <Box
      sx={{
        width: "400px",
        height: "216px",
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
        borderRadius: "8px",
      }}
    >
      <Header header={header} />
      <Amount amount={amount} color={color} />
      <Percent percent={percent} />
    </Box>
  );
};

export default Total;
