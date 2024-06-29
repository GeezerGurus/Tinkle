import * as React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import FormatOverlineIcon from "@mui/icons-material/FormatOverline";

const transactions = [
  { amount: "$120", payer: "Electricity Bill", dueDate: "2024-07-10" },
  { amount: "$75", payer: "Only Fans", dueDate: "2024-07-05" },
  { amount: "$200", payer: "Car Maintenance", dueDate: "2024-07-15" },
  { amount: "$50", payer: "Gym Membership", dueDate: "2024-07-01" },
  { amount: "$150", payer: "Home Cleaning Service", dueDate: "2024-07-08" },
];

export const Owe = ({ handleChange, color }) => {
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
          I Owe
        </Typography>
        <IconButton sx={{ transform: "rotate(180deg)" }} onClick={handleChange}>
          <FormatOverlineIcon
            sx={{ width: "28px", height: "28px", color: color }}
          />
        </IconButton>
      </Stack>
      {/* Map over transactions */}
      {transactions.map((transaction, index) => (
        <Stack
          key={index}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          sx={{ borderBottom: "1px solid", height: "24px", gap: "8px" }}
        >
          <Typography variant="body4">
            {transaction.amount} to {transaction.payer}
          </Typography>
          <Typography variant="body4">Due - {transaction.dueDate}</Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default Owe;
