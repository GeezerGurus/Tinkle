import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import PieActiveArc from "./PieChart";

const pieData = [
  { id: 0, value: 88000, label: "Education and Development" },
  { id: 1, value: 240000, label: "Food and Drinks" },
  { id: 2, value: 88000, label: "Health and Beauty" },
  { id: 3, value: 88000, label: "Charges, Fees" },
];

const Expenses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        maxWidth: "100%",
        border: `1px solid ${colors.purple[600]}`,
        height: "100%",
        borderRadius: "16px",
        padding: isSmallScreen ? "10px" : "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          minHeight: "56px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[600]} 1px solid`,
        }}
      >
        <Typography variant={isSmallScreen ? "h6" : "h4"}>Expenses</Typography>
      </Box>
      <PieActiveArc data={pieData} />
    </Paper>
  );
};

export default Expenses;
