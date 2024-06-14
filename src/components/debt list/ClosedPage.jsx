import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Debt from "./Debt";

const ClosedPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(3) }}
    >
      {/* Lent part  */}
      <Box>
        {/* I lent  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "yellow",
          }}
        >
          <Box
            sx={{ width: "120px", height: "8px", backgroundColor: "#00F79E" }}
          />
          <Typography variant="title2">I Lent</Typography>
        </Box>
        {/*Active Debt list  */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(1),
          }}
        >
          <Debt bgColor="purple" />
          <Debt bgColor="purple" />
        </Box>
      </Box>
      {/* Owe Part  */}
      <Box>
        {/* I Owe  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "yellow",
          }}
        >
          <Box
            sx={{ width: "120px", height: "8px", backgroundColor: "#FF0000" }}
          />
          <Typography variant="title2">I Owe</Typography>
        </Box>
        {/*Closed Debt ;ist  */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(1),
          }}
        >
          <Debt bgColor="purple" />
          <Debt bgColor="purple" />
        </Box>
      </Box>
    </Box>
  );
};

export default ClosedPage;
