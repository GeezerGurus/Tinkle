import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import LineChart from "./LineChart";

const data = {
  income: Array.from({ length: 31 }, (_, i) => Math.random() * 1000),
  expenses: Array.from({ length: 31 }, (_, i) => Math.random() * -1000),
};

const labels = Array.from({ length: 31 }, (_, i) => i + 1);

const BalanceTrend = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        border: `1px solid ${colors.purple[600]}`,
        height: isSmallScreen ? "252px" :"100%",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
        <Typography variant={isSmallScreen ? "h6" : "h4"}>
          Balance Trend
        </Typography>
      </Box>
      <LineChart data={data} labels={labels} height="300px" />
    </Paper>
  );
};

export default BalanceTrend;
