import * as React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import FormatOverlineIcon from "@mui/icons-material/FormatOverline";

const transactions = [
  {
    amount: "MMK1000",
    payee: "Ye Yint Naing Oo",
    dueDate: "2024-07-01",
  },
  {
    amount: "MMK5000",
    payee: "Zaw Lin Naing",
    dueDate: "2024-06-30",
  },
  {
    amount: "MMK10000",
    payee: "Sithu",
    dueDate: "2024-07-05",
  },
  {
    amount: "MMK4000",
    payee: "Zayar Naing",
    dueDate: "2024-07-03",
  },
  {
    amount: "MMK2000",
    payee: "Swan Lynn Htun",
    dueDate: "2024-06-28",
  },
];

export const Lend = ({ handleChange, color }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {/* Title  */}
      <Stack
        width={"100%"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="body1" color={color}>
          I Lend
        </Typography>
        <IconButton sx={{ transform: "rotate(180deg)" }} onClick={handleChange}>
          <FormatOverlineIcon
            sx={{ width: "28px", height: "28px", color: color }}
          />
        </IconButton>
      </Stack>
      {/* Map over transactions */}
      <Box sx={{ overflowY: "auto", height: "auto", width: "100%" }}>
        {transactions.map((transaction, index) => (
          <Stack
            key={index}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
            sx={{
              borderBottom: "1px solid",
              height: "auto",
              gap: "8px",
            }}
          >
            <Typography variant="body4">
              {transaction.amount} to {transaction.payee}
            </Typography>
            <Typography variant="body4">Due - {transaction.dueDate}</Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default Lend;
