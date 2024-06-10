import React from "react";
import { tokens } from "../../theme";
import { Typography, useTheme } from "@mui/material";

const Budget = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Typography color={colors.greenAccent[500]} variant="h1">
      Budget
    </Typography>
  );
};

export default Budget;
