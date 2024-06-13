import { Typography } from "@mui/material";
import React from "react";

const Header = ({ header }) => {
  return (
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
  );
};
export default Header;
