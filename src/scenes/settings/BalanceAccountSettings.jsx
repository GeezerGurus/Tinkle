import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Account, AddAccount } from "../../components/settings";
import { Home, AccountBalance, CreditCard } from "@mui/icons-material";

const BalanceAccountSettings = () => {
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
          width: "1292px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "56px",
        }}
      >
        {/* Title  */}
        <Typography variant="title3" sx={{ borderBottom: "1px solid black" }}>
          Balance Account Settings
        </Typography>
        {/* Accounts  */}
        <Stack gap={1}>
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
