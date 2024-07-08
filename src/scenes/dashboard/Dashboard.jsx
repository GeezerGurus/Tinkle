import React,{useState,useEffect} from "react";
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
import { getAccounts } from "../../api/accountApi";
import { Loader } from "../../components/utils";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));
  const sidebarWidth = 84;

  //for account data fetch
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAccounts = async () => {
    setIsLoading(true);
    const res = await getAccounts();
    setAccounts(res || []);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchAccounts();
  }, []);
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
        flexDirection: isMediumScreen ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        width: isSmallScreen
          ? "80%"
          : isLaptop
          ? "88vw"
          : isLargest
          ? `92vw`
          : "100%",
        height: isMediumScreen ? "auto" : "946px",
        marginTop: theme.spacing(3),
        ml: isSmallScreen ? 5 : isMediumScreen ? 1 : 3,
        overflowX: "hidden",
      }}
    >
      {/* Main, Left */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: isSmallScreen ? "100%" : isLargest ? "80%" : "912px",
          height: isLargest ? "auto" : "892px",
          marginRight: isMediumScreen ? 0 : "24px",
          overflowX: "hidden",
        }}
      >
        {/* Left side, Top */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: isMediumScreen ? "auto" : "211px",
            justifyContent: "space-between",
            marginBottom: "24px",
            flexWrap: isMediumScreen ? "wrap" : "nowrap",
            overflow: "hidden",
            column: 3,
            rowGap: 5,
          }}
        >
          <Loader isLoading={isLoading} />
          {filledAccounts.map((account, index) =>
            account.isPlaceholder ? (
              <NewAccount
                key={index}
                refresh={fetchAccounts}
                BgColor={colorOrder[index]}
                isMediumScreen={isMediumScreen}
              />
            ) : (
              <Account
                key={index}
                id={account._id}
                type={account.type}
                Title={account.name}
                Amount={account.balance}
                BgColor={colorOrder[index]}
                refresh = {fetchAccounts}
                isMediumScreen={isMediumScreen}
              />
            )
          )}
        </Box>
        {/* Left side, Middle */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: isMediumScreen ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: isMediumScreen ? "550px" : "279px",
            marginBottom: "24px",
            overflowX: "hidden",
          }}
        >
          <Statistics isMediumScreen={isMediumScreen} />
          <Chart />
        </Box>

        {/* Left side, Bottom */}
        <Transactions isMediumScreen={isMediumScreen} />
      </Box>
      {/* Right side */}
      <Box
        sx={{
          width: isSmallScreen ? "100%" : isMediumScreen ? "80%" : "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: isLargeScreen ? "24px" : "",
          height: isMediumScreen ? "920px" : isLargeScreen ? "auto" : "892px",
          borderRadius: "8px",
          overflowX: "hidden",
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
