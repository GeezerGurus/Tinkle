import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GridViewIcon from "@mui/icons-material/GridView";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { tokens } from "../../theme";
import { useTheme, Box } from "@mui/material";
import {
  Budget,
  Exchange,
  Debt,
  Chart,
  Transactions,
  Account,
  Statistics,
  NewAccount,
} from "../../components/dashboard";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const accounts = [
    {
      icon: MonetizationOnIcon,
      title: "Wallet",
      amount: "$2190.19",
    },
    {
      icon: AccountBalanceIcon,
      title: "Bank",
      amount: "$2,345.67",
    },
    {
      icon: GridViewIcon,
      title: "Kpay",
      amount: "$3,456.78",
    },
    {
      icon: CreditScoreIcon,
      title: "Saving",
      amount: "$4,567.89",
    },
  ];

  const colorOrder = [
    colors.purple[500],
    colors.mint[500],
    colors.purple[200],
    colors.mint[300],
  ];

  // Ensure the accounts array has exactly 4 elements
  const filledAccounts = [
    ...accounts,
    ...Array(4 - accounts.length).fill({ isPlaceholder: true }),
  ];

  return (
    // Main box
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "946px",
        marginTop: theme.spacing(3),
      }}
    >
      {/* Main, Left */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "912px",
          height: "892px",
          marginRight: "24px",
        }}
      >
        {/* Left side, Top */}
        <Box
          sx={{
            display: "flex",
            height: "211px",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          {filledAccounts.map((account, index) =>
            account.isPlaceholder ? (
              <NewAccount key={index} BgColor={colorOrder[index]} />
            ) : (
              <Account
                key={index}
                Icon={account.icon}
                Title={account.title}
                Amount={account.amount}
                BgColor={colorOrder[index]}
              />
            )
          )}
        </Box>
        {/* Left side, Middle */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "279px",
            marginBottom: "24px",
          }}
        >
          <Statistics />
          <Chart />
        </Box>

        {/* Left side, Bottom */}
        <Transactions />
      </Box>
      {/* Right side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "892px",
          borderRadius: "8px",
        }}
      >
        {/* Budget */}
        <Budget />

        {/* Currency Exchange */}
        <Exchange />

        {/* Debt List */}
        <Debt />
      </Box>
    </Box>
  );
};

export default Dashboard;
