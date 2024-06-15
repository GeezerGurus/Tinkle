import React from "react";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import { Table, Chart, Toolbar, Total } from "../../components/records";

const Records = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    // Container
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
      }}
    >
      {/* Main Box */}
      <Box
        sx={{
          marginTop: "18px",
          width: "1296px",
          height: "899px",
          backgroundColor: "red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Total />
          <Total />
          <Chart />
        </Box>
        {/* Middle */}
        <Toolbar />
        {/* Bottom */}
        <Table />
      </Box>
    </Box>
  );
};

export default Records;
