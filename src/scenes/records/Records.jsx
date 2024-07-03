import React, { useState } from "react";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginTop: theme.spacing(3),
          width: "72%",
          height: "899px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
