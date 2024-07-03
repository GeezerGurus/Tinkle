import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Stack,
  Modal,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import Debt from "./Debt";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const debts = [
  {
    name: "John Doe",
    purpose: "Car Loan",
    amount: "5,000,000",
    dueDate: "2024-12-31",
    isActive: true,
  },
  {
    name: "Jane Smith",
    purpose: "Mortgage",
    amount: "50,000,000",
    dueDate: "2025-06-15",
    isActive: true,
  },
  {
    name: "Alex Johnson",
    purpose: "Personal Loan",
    amount: "1,200,000",
    dueDate: "2024-09-01",
    isActive: true,
  },
];

const ActivePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: isMediumScreen ? "100%" : "88%",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(3),
        overflowY: "auto",
        padding: theme.spacing(2),
      }}
    >
      {/* Lent part  */}
      <Box>
        {/* I lent  */}
        <Stack alignItems={"center"}>
          <Box
            sx={{
              width: "120px",
              height: "8px",
              backgroundColor: colors.green[400],
            }}
          />
          <Typography variant="h6" gutterBottom>
            I Lent
          </Typography>
        </Stack>
        {/* Active Debt list  */}
        <Stack width={"100%"} gap={2}>
          {debts.map((debt, index) => (
            <Debt
              key={index}
              name={debt.name}
              purpose={debt.purpose}
              amount={debt.amount}
              dueDate={debt.dueDate}
              isActive={debt.isActive}
              action={"lent"}
            />
          ))}
        </Stack>
      </Box>
      {/* Owe Part  */}
      <Box>
        {/* I Owe  */}
        <Stack alignItems={"center"}>
          <Box
            sx={{
              width: "120px",
              height: "8px",
              backgroundColor: colors.extra.red_accent,
            }}
          />
          <Typography variant="h6" gutterBottom>
            I Owe
          </Typography>
        </Stack>
        {/* Closed Debt list  */}
        <Stack width={"100%"} gap={2}>
          {debts.map((debt, index) => (
            <Debt
              key={index}
              name={debt.name}
              purpose={debt.purpose}
              amount={debt.amount}
              dueDate={debt.dueDate}
              isActive={debt.isActive}
              action={"owe"}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ActivePage;
