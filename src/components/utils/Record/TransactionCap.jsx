import React from "react";
import { Typography } from "@mui/material";

const TransactionCap = () => {
  return (
    <Typography
      sx={{
        fontSize: "32px",
        fontWeight: "600",
        lineHeight: "48px",
        letterSpacing: "1%",
        color: "black",
      }}
    >
      Transactions
    </Typography>
  );
};

export default TransactionCap;
