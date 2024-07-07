import { Box, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Account, AddAccount } from "../../components/settings";
import { tokens } from "../../theme";
import { getAccounts } from "../../api/accountApi";
import { Loader } from "../../components/utils";

const BalanceAccountSettings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //responsive
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //datafetch
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
      <Loader isLoading={isLoading} />
      {/* Main box  */}
      <Box
        sx={{
          mt: 3,
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Title  */}
        <Typography
          variant={isSmallScreen ? "h6" : "h4"}
          gutterBottom
          sx={{
            borderBottom: `2px solid ${colors.purple[600]}`,
            alignSelf: isSmallScreen ? undefined : "flex-start",
            alignContent: isSmallScreen ? "center" : undefined,
          }}
        >
          Your Balance Accounts
        </Typography>
        {/* Accounts  */}
        <Stack gap={1} width={"100%"}>
          {accounts.map((account, index) => (
            <Account
              key={index}
              name={account.name}
              balance={account.balance}
              id={account._id}
              // icon={account.icon}
              // backgroundColor={account.backgroundColor}
              type={account.type}
              refresh={fetchAccounts}
            />
          ))}
          {accounts.length < 4 && <AddAccount refresh={fetchAccounts} />}
        </Stack>
      </Box>
    </Box>
  );
};

export default BalanceAccountSettings;
