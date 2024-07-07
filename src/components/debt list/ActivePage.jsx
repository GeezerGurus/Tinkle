import React from "react";
import { Box, Typography, useTheme, Stack, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import Debt from "./Debt";

const ActivePage = ({ items }) => {
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
      {/* Lend part */}
      <Box>
        <Stack alignItems={"center"}>
          <Box
            sx={{
              width: "120px",
              height: "8px",
              backgroundColor: colors.green[400],
            }}
          />
          <Typography variant="h6" gutterBottom>
            I lend
          </Typography>
        </Stack>
        {/* Active Debt list for lend */}
        <Stack width={"100%"} gap={2}>
          {items &&
            items
              .filter((debt) => debt.type === "lend")
              .map((debt, index) => (
                <Debt
                  key={index}
                  name={debt.name}
                  purpose={debt.purpose}
                  amount={new Date(debt.amount).toISOString().split("T")[0]}
                  dueDate={new Date(debt.DueDate).toISOString().split("T")[0]}
                  isActive={true}
                  action={"lend"}
                />
              ))}
        </Stack>
      </Box>
      {/* Owe part */}
      <Box>
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
        {/* Active Debt list for owe */}
        <Stack width={"100%"} gap={2}>
          {items &&
            items
              .filter((debt) => debt.type === "owe")
              .map((debt, index) => (
                <Debt
                  key={index}
                  name={debt.name}
                  purpose={debt.purpose}
                  amount={new Date(debt.amount).toISOString().split("T")[0]}
                  dueDate={new Date(debt.DueDate).toISOString().split("T")[0]}
                  isActive={true}
                  action={"owe"}
                />
              ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ActivePage;
