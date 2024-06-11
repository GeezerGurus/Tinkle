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
  Balance,
  Statistics,
} from "../../components/Dashboard";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    // Main box
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "946px",
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
          <Balance
            Icon={MonetizationOnIcon}
            Title="Wallet"
            Amount="$1,234.56"
            Color=" #E3D23D"
          />
          <Balance
            Icon={AccountBalanceIcon}
            Title="Bank"
            Amount="$2,345.67"
            Color="#5DE381"
          />
          <Balance
            Icon={GridViewIcon}
            Title="Kpay"
            Amount="$3,456.78"
            Color="#4B47E3"
          />
          <Balance
            Icon={CreditScoreIcon}
            Title="Saving"
            Amount="$4,567.89"
            Color="#E33E32"
          />
        </Box>
        {/* Left side, Middle*/}
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
      {/* Right side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "892px",
          borderRadius: "8px",
          backgroundColor: "white",
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
