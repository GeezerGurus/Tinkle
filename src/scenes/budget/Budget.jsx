import React from "react";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import { BudgetBox } from "../../components/budget";

const Budget = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    // Container
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
        paddingTop: "32px",
      }}
    >
      {/* Main */}
      <Box
        sx={{
          width: "987px",
          height: "855px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "39px",
          backgroundColor: "red",
        }}
      >
        <BudgetBox />
        <BudgetBox />
        <BudgetBox />
        <BudgetBox />
      </Box>
    </Box>
  );
};

export default Budget;
