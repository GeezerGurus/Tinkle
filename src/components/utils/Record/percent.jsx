import { Typography } from "@mui/material";
import React from "react";

const Percent = ({ percent }) => {
  return (
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
  );
};

export default Percent;
