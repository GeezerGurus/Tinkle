import React from "react";
import { Box, Typography, useTheme, Stack, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import Debt from "./Debt";
import { DebtClosedImage } from "../../assets/empty";
const ClosedPage = ({ items, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));

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
          items.length === 0 ? `url(${DebtClosedImage})` : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "40%",
        backgroundPosition: "center",
      }}
    >
      {/* Lent part  */}
      {lendItems.length > 0 && (
        <Box>
          {/* I lent  */}
          <Stack alignItems={"center"}>
            <Box
              sx={{
                width: "120px",
                height: "8px",
                backgroundColor: colors.extra.grey,
              }}
            />
            <Typography variant="h6" gutterBottom>
              I Lent
            </Typography>
          </Stack>
          {/* Active Debt list  */}
          <Stack width={"100%"} gap={2}>
            {lendItems.map((debt, index) => (
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
                isActive={false}
                action={"lend"}
              />
            ))}
          </Stack>
        </Box>
      )}
      {/* Owe Part  */}
      {oweItems.length > 0 && (
        <Box>
          {/* I Owe  */}
          <Stack alignItems={"center"}>
            <Box
              sx={{
                width: "120px",
                height: "8px",
                backgroundColor: colors.extra.grey,
              }}
            />
            <Typography variant="h6" gutterBottom>
              I Owe
            </Typography>
          </Stack>
          {/* Closed Debt list  */}
          <Stack width={"100%"} gap={2}>
            {oweItems.map((debt, index) => (
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
                isActive={false}
                action={"owe"}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ClosedPage;
