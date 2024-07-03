import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { Account, AddAccount } from "../../components/settings";
import { Home, AccountBalance, CreditCard } from "@mui/icons-material";
import { tokens } from "../../theme";

const BalanceAccountSettings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const accounts = [
    {
      icon: Home,
      name: "Home Account",
      balance: "1,234,567",
      backgroundColor: "#1E90FF",
    },
    {
      icon: AccountBalance,
      name: "Savings Account",
      balance: "9,876,543",
      backgroundColor: "#32CD32",
    },
    {
      icon: CreditCard,
      name: "Credit Card",
      balance: "123,456",
      backgroundColor: "#FF4500",
    },
  ];

  return (
    // Container
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Main box  */}
      <Box
        sx={{
          mt: 3,
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Title  */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            borderBottom: `2px solid ${colors.purple[600]}`,
            alignSelf: "flex-start",
          }}
        >
          Your Balance Accounts
        </Typography>
        {/* Accounts  */}
        <Stack gap={1} width={"100%"}>
          {accounts.map((account, index) => (
            <Account
              key={index}
              icon={account.icon}
              name={account.name}
              balance={account.balance}
              backgroundColor={account.backgroundColor}
            />
          ))}
          {accounts.length < 4 && <AddAccount />}
        </Stack>
      </Box>
    </Box>
  );
};

export default BalanceAccountSettings;
