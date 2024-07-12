import React from "react";
import { Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

const ShowMoreBtn = ({ to, fontSize, width }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      component={Link}
      to={to}
      sx={{
        width: width || "87px",
        height: "34px",
        borderRadius: "8px",
        whiteSpace: "nowrap",
        textTransform: "none",
        color: colors.text.text1,
        "&:hover": {
          backgroundColor: colors.button.button1,
          color: colors.text.text2,
          cursor: "pointer",
        },
      }}
    >
      <Typography variant={fontSize || "body4"}>Show more</Typography>
    </Button>
  );
};

export default ShowMoreBtn;
