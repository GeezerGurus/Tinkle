import React from "react";
import { Box, Typography } from "@mui/material";

const Item = ({ icon, text, bgColor }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {icon &&
        React.cloneElement(icon, {
          sx: {
            color: "white",
            backgroundColor: bgColor,
            marginRight: "10px",
          },
        })}
      <Typography sx={{ color: "black" }}>{text}</Typography>
    </Box>
  );
};

export default Item;
