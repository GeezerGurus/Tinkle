import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GridViewIcon from "@mui/icons-material/GridView";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { tokens } from "../../theme";
import { useTheme, Box, useMediaQuery } from "@mui/material";
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

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const sidebarWidth = 84;

  const accounts = [
    {
      icon: MonetizationOnIcon,
      title: "Wallet",
      amount: 219019,
    },
    {
      icon: AccountBalanceIcon,
      title: "Banking",
      amount: 234567,
    },
    {
      icon: GridViewIcon,
      title: "Kpay",
      amount: 345678,
    },
    // {
    //   icon: CreditScoreIcon,
    //   title: "Saving",
    //   amount: 456789,
    // },
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
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        width: isSmallScreen ? "80%  " : `calc(100% - ${sidebarWidth}px)`,
        height: isSmallScreen ? "auto" : "946px",
        marginTop: theme.spacing(3),
        ml: 5,
        overflowX: "hidden",
      }}
    >
      {/* Main, Left */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: isSmallScreen ? "100%" : "912px",
          height: isSmallScreen ? "auto" : "892px",
          marginRight: isSmallScreen ? 0 : "24px",
          overflowX: "hidden",
        }}
      >
        {/* Left side, Top */}
        <Box
          sx={{
            display: "flex",
            height: isSmallScreen ? "156px" : "211px",
            justifyContent: "space-between",
            marginBottom: "24px",
            flexWrap: isSmallScreen ? "wrap" : "nowrap",
            overflow: "hidden",
          }}
        >
          {filledAccounts.map((account, index) =>
            account.isPlaceholder ? (
              <NewAccount
                key={index}
                BgColor={colorOrder[index]}
                isSmallScreen={isSmallScreen}
              />
            ) : (
              <Account
                key={index}
                Icon={account.icon}
                Title={account.title}
                Amount={account.amount}
                BgColor={colorOrder[index]}
                isSmallScreen={isSmallScreen}
              />
            )
          )}
        </Box>
        {/* Left side, Middle */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: isSmallScreen ? "550px" : "279px",
            marginBottom: "24px",
            overflowX: "hidden",
          }}
        >
          <Statistics isSmallScreen={isSmallScreen} />
          <Chart isSmallScreen={isSmallScreen} />
        </Box>

        {/* Left side, Bottom */}
        <Transactions isSmallScreen={isSmallScreen} />
      </Box>
      {/* Right side */}
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: isSmallScreen ? "920px" : "892px",
          borderRadius: "8px",
          overflowX: "hidden",
        }}
      >
        {/* Budget */}
        <Budget isSmallScreen={isSmallScreen} />

        {/* Currency Exchange */}
        <Exchange isSmallScreen={isSmallScreen} />

        {/* Debt List */}
        <Debt isSmallScreen={isSmallScreen} />
      </Box>
    </Box>
  );
};

export default Dashboard;
