import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { Loader, ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";
import { LineChart } from "../statistics";
import { getRecords } from "../../api/recordsApi";

const labels = Array.from({ length: 31 }, (_, i) => i + 1);
export const Statistics = ({ isMediumScreen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const processData = (type) => {
    const dailyAmounts = Array(31).fill(0);
    records
      .filter((record) => record.type === type)
      .forEach((record) => {
        const day = new Date(record.date).getDate() - 1; // getDate returns 1-31
        dailyAmounts[day] += record.amount;
      });
    return dailyAmounts;
  };

  const data = {
    income: processData("income"),
    expenses: processData("expense"),
  };

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

  return (
    <Paper
      sx={{
        display: "flex",
        width: isMediumScreen ? "100%" : "60%",
        height: isMediumScreen ? "252px" : "100%",
        marginRight: isMediumScreen ? 0 : "24px",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px 24px",
        borderRadius: "16px",
      }}
    >
      <Loader isLoading={isLoading} />
      <Box
        sx={{
          height: "48px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[600]} 1px solid`,
        }}
      >
        <Typography variant="h6">Balance Trend</Typography>
        <ShowMoreBtn to={"/statistics"} />
      </Box>
      <LineChart data={data} labels={labels} height="200px" />
    </Paper>
  );
};

export default Statistics;
