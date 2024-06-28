import React from "react";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { BudgetBox } from "../../components/budget";

import ShowMoreBox from "../../components/budget/ShowMoreBox";

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
      }}
    >
      {/* Main */}
      <Box
        sx={{
          marginTop: theme.spacing(3),
          width: "987px",
          height: "855px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "39px",
          backgroundColor: "red",
        }}
      >
        <BudgetBox header={"Monthly"} />
        <BudgetBox header={"Weekly"} />
        <BudgetBox header={"Yearly"} />
        <ShowMoreBox header={"One Time"} />
      </Box>
    </Box>
  );
};

export default Budget;
