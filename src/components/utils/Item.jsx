import React from "react";
import { Box, Typography,useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Item = ({
  icon: Icon,
  text,
  marginRight,
  iconSize = "24px",
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {Icon && (
        <Icon
          sx={{
            color: colors.text.text1,
            padding: "2px",
            borderRadius: "50%",
            backgroundColor: colors.button.button1,
            marginRight: marginRight || "10px",
            fontSize: iconSize,
          }}
        />
      )}

      <Typography sx={{ color: colors.text.text1 }}>{text}</Typography>
    </Box>
  );
};

export default Item;
