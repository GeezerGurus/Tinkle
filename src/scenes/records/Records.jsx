import React, { useState } from "react";
import { tokens } from "../../theme";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import {
  Chart,
  Toolbar,
  Total,
  TransactionsTable,
} from "../../components/records";

const Records = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tableState, setTableState] = useState("");

  const isLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));

  return (
    <Box
      sx={{
        width: isSmallScreen
          ? "100%"
          : isMediumScreen
          ? `90vw`
          : isLaptop
          ? `92vw`
          : "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          marginTop: theme.spacing(3),
          width: isSmallScreen ? "100%" : isLargeScreen ? "95%" : "72%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isMediumScreen ? "column" : "row",
            gap: isMediumScreen ? 2 : undefined,
          }}
        >
          <Total type={"income"} />
          <Total type={"expense"} />
          <Chart />
        </Box>
        <Toolbar tableState={tableState} setTableState={setTableState} />
        <TransactionsTable action={tableState} />
      </Box>
    </Box>
  );
};

export default Records;
