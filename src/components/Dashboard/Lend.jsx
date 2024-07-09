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

export const Lend = ({ handleChange, color, items }) => {
  return (
    <Box
      sx={{
        height: "100%",
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
      <Box
        sx={{
          overflowY: "auto",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-around",
          gap: 2,
        }}
      >
        {(!items || items.length === 0) && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body4">The List is Empty Now</Typography>
          </Box>
        )}

        {items.slice(0.5).map((transaction, index) => (
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
              {transaction.amount} to {transaction.name}
            </Typography>
            <Typography variant="body4">
              Due - {new Date(transaction.DueDate).toLocaleDateString()}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default Lend;
