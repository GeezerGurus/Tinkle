import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import LineChart from "./Linechart";
import { getRecords } from "../../api/recordsApi";
import { Loader } from "../utils";

// const data = {
//   income: Array.from({ length: 31 }, (_, i) => Math.random() * 1000),
//   expenses: Array.from({ length: 31 }, (_, i) => Math.random() * -1000),
// };

const labels = Array.from({ length: 31 }, (_, i) => i + 1);

const BalanceTrend = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchRecordData = async () => {
    try {
      setIsLoading(true);
      const res = await getRecords();
      setRecords(res);
      setIsLoading(false);
    } catch (error) {
      console.log("Error Catching Data");
      throw error;
    }
  };

  useEffect(() => {
    fetchRecordData();
  }, []);

  const processData = (type, negate = false) => {
    const dailyAmounts = Array(31).fill(0);
    records
      .filter((record) => record.type === type)
      .forEach((record) => {
        const day = new Date(record.date).getDate() - 1; // getDate returns 1-31
        dailyAmounts[day] += negate ? -record.amount : record.amount;
      });
    return dailyAmounts;
  };

  const data = {
    income: processData("income"),
    expenses: processData("expense", true),
  };

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "90vw" : undefined,
        border: `1px solid ${colors.purple[600]}`,
        height: "100%",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Loader isLoading={isLoading} />
      <Box
        sx={{
          minHeight: "56px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[600]} 1px solid`,
        }}
      >
        <Typography variant={isSmallScreen ? "h6" : "h4"}>
          Balance Trend
        </Typography>
      </Box>
      <LineChart data={data} labels={labels} height="300px" />
    </Paper>
  );
};

export default BalanceTrend;
