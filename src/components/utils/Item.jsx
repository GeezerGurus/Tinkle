import React from "react";
import { Box, Typography } from "@mui/material";

const Item = ({
  icon: Icon,
  text,
  bgColor,
  marginRight,
  iconSize = "24px",
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {Icon && (
        <Icon
          sx={{
            color: "white",
            padding: "2px",
            borderRadius: "50%",
            backgroundColor: bgColor || "black",
            marginRight: marginRight || "10px",
            fontSize: iconSize,
          }}
        />
      )}

      <Typography sx={{ color: "black" }}>{text}</Typography>
    </Box>
  );
};

export default Item;
