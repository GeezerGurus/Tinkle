import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Account from "../../components/settings/Account";

const BalanceAccountSettins = () => {
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
          <Account />
          <Account />
          <Account />
        </Stack>
      </Box>
    </Box>
  );
};

export default BalanceAccountSettins;
