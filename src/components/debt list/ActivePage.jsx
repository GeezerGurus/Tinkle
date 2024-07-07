import React from "react";
import { Box, Typography, useTheme, Stack, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import Debt from "./Debt";
import { DebtActiveImage } from "../../assets/empty";

const ActivePage = ({ items, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const lendItems = items?.filter((debt) => debt.type === "lend") || [];
  const oweItems = items?.filter((debt) => debt.type === "owe") || [];

  return (
    <Box
      sx={{
        width: isMediumScreen ? "100%" : "88%",
        height: items.length === 0 ? "100%" : undefined,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(3),
        overflowY: "auto",
        padding: theme.spacing(2),
        backgroundImage:
          items.length === 0 ? `url(${DebtActiveImage})` : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "52%",
        backgroundPosition: "center",
      }}
    >
      {/* Lend part */}
      {lendItems.length > 0 && (
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
            {lendItems
              .filter((debt) => debt.type === "lend")
              .map((debt, index) => (
                <Debt
                  key={index}
                  account={debt.accountId}
                  // date={debt.Date}
                  date={new Date(debt.Date).toISOString().split("T")[0]}
                  refresh={refresh}
                  id={debt._id}
                  name={debt.name}
                  purpose={debt.purpose}
                  amount={debt.amount}
                  dueDate={new Date(debt.DueDate).toISOString().split("T")[0]}
                  isActive={true}
                  action={"lend"}
                />
              ))}
          </Stack>
        </Box>
      )}
      {/* Owe part */}
      {oweItems.length > 0 && (
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
            {oweItems
              .filter((debt) => debt.type === "owe")
              .map((debt, index) => (
                <Debt
                  key={index}
                  account={debt.accountId}
                  // date={debt.Date}
                  date={new Date(debt.Date).toISOString().split("T")[0]}
                  refresh={refresh}
                  id={debt._id}
                  name={debt.name}
                  purpose={debt.purpose}
                  amount={debt.amount}
                  dueDate={new Date(debt.DueDate).toISOString().split("T")[0]}
                  isActive={true}
                  action={"owe"}
                />
              ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ActivePage;
