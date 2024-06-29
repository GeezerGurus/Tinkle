import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { BudgetBox } from "../../components/budget";

const Budget = () => {
  const theme = useTheme();
  return (
    // Container
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        }}
      >
        <BudgetBox period={"Monthly"} />
        <BudgetBox period={"Weekly"} />
        <BudgetBox period={"Yearly"} />
        <BudgetBox period={"One Time"} />
        {/* <ShowMoreBox header={"One Time"} /> */}
      </Box>
    </Box>
  );
};

export default Budget;
