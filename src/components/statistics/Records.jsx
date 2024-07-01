import { Box, Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import { ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";
import TableData from "./RecordsTable";

const Records = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper
      sx={{
        border: `1px solid ${colors.purple[600]}`,
        height: "100%",
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
        <Typography variant="h4">Records</Typography>
        <ShowMoreBtn to={"/records"} />
      </Box>
      <TableData
        data={[
          {
            date: "2024-06-01",
            fact: "Education and Development",
            method: "Credit Card",
            amount: "-88000 MMK",
          },
          {
            date: "2024-06-02",
            fact: "Food and Drinks",
            method: "Cash",
            amount: "-240000 MMK",
          },
          {
            date: "2024-06-03",
            fact: "Health and Beauty",
            method: "Debit Card",
            amount: "-88000 MMK",
          },
          {
            date: "2024-06-04",
            fact: "Charges, Fees",
            method: "Bank Transfer",
            amount: "-88000 MMK",
          },
          {
            date: "2024-06-04",
            fact: "Charges, Fees",
            method: "Bank Transfer",
            amount: "-88000 MMK",
          },
          {
            date: "2024-06-01",
            fact: "Education and Development",
            method: "Credit Card",
            amount: "-88000 MMK",
          },
          {
            date: "2024-06-02",
            fact: "Food and Drinks",
            method: "Cash",
            amount: "-240000 MMK",
          },
          {
            date: "2024-06-03",
            fact: "Health and Beauty",
            method: "Debit Card",
            amount: "-88000 MMK",
          },
          {
            date: "2024-06-04",
            fact: "Charges, Fees",
            method: "Bank Transfer",
            amount: "-88000 MMK",
          },
          {
            date: "2024-06-04",
            fact: "Charges, Fees",
            method: "Bank Transfer",
            amount: "-88000 MMK",
          },
        ]}
      />
    </Paper>
  );
};

export default Records;
