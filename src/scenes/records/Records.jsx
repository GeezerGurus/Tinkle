import React from "react";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import { Table, Chart, Toolbar, Total } from "../../components/Records";

const totalValues = [
  {
    header: "Total Income",
    amount: "$45678",
    color: "#43BC63",
    percent: "+20% month over month",
  },
  {
    header: "Total Expense",
    amount: "$2405",
    color: "#FE3F2F",
    percent: "+33% month over month",
  },
];
const Records = () => {
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
      {/* Main Box */}
      <Box
        sx={{
          marginTop: "18px",
          width: "1296px",
          height: "899px",
          backgroundColor: "red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {totalValues.map((total, index) => (
            <Total
              key={index}
              header={total.header}
              amount={total.amount}
              color={total.color}
              percent={total.percent}
            />
          ))}

          <Chart />
        </Box>
        {/* Middle */}
        <Toolbar />
        {/* Bottom */}
        <Table />
      </Box>
    </Box>
  );
};

export default Records;
