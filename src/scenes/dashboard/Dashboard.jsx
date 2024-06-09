//import React, { Component } from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GridViewIcon from "@mui/icons-material/GridView";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { tokens } from "../../theme";
import { Typography, useTheme } from "@mui/material";
import { Balancecom, Balancetrend } from "../../components";
import { Transactions } from "../../components/Dashboard componentsSLH/transactions";
import { Box } from "@mui/material";
import { Expenses } from "../../components/Dashboard componentsSLH/expenses";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    // mainbox
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "946px",
      }}
    >
      {/* mainbox-Left side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "912px",
          height: "850px",
          marginRight: "24px",
        }}
      >
        {/* Balancecom top 4 components */}
        <Box
          sx={{
            display: "flex",
            height: "211px",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <Balancecom
            Icon={MonetizationOnIcon}
            Reason="Wallet"
            Amount="$1,234.56"
            Color=" #E3D23D"
          />
          <Balancecom
            Icon={AccountBalanceIcon}
            Reason="Bank"
            Amount="$2,345.67"
            Color="#5DE381"
          />
          <Balancecom
            Icon={GridViewIcon}
            Reason="Kpay"
            Amount="$3,456.78"
            Color="#4B47E3"
          />
          <Balancecom
            Icon={CreditScoreIcon}
            Reason="Saving"
            Amount="$4,567.89"
            Color="#E33E32"
          />
        </Box>
        {/* Balancetrend,Expenses middle row components */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "279px",
            marginBottom: "24px",
          }}
        >
          <Balancetrend />
          <Expenses />
        </Box>

        {/* Transactions last row components */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "354px",
          }}
        >
          <Transactions />
        </Box>
      </Box>
      {/* main right side component */}
      <Box
        sx={{
          width: "369px",
          backgroundColor: "lightgray",
          marginBottom: "24px",
          height: "824px",
          borderRadius: "8px",
        }}
      ></Box>
    </Box>
  );
};

export default Dashboard;
