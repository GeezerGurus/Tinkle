import { Typography } from "@mui/material";
import React from "react";

const Amount = ({ amount, color }) => {
  return (
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
  );
};

export default Amount;
