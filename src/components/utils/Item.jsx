import React from "react";
import { Box, Typography } from "@mui/material";

const Item = ({
  icon,
  text,
  bgColor = "black",
  marginRight,
  iconSize = "24px",
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {icon &&
        React.cloneElement(icon, {
          sx: {
            color: "white",
            backgroundColor: bgColor,
            marginRight: marginRight || "10px",
            fontSize: iconSize,
          },
        })}
      <Typography sx={{ color: "black" }}>{text}</Typography>
    </Box>
  );
};

export default Item;
