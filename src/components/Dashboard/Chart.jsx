import React, { useState, useEffect, useCallback } from "react";
import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";
import { getCategory } from "../../api/categoriesApi";
import { getRecords } from "../../api/recordsApi";

export const Chart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState({});

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));

  const fetchCategoryNames = async (categoryIds) => {
    const categoryMap = {};
    await Promise.all(
      categoryIds.map(async (id) => {
        try {
          const res = await getCategory(id);
          categoryMap[id] = { name: res.name, color: res.color };
        } catch (error) {
          console.log("Error Getting Category Name");
        }
      })
    );
    return categoryMap;
  };

  const fetchRecord = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getRecords();
      const expenseCategories = [
        ...new Set(
          res
            .filter((record) => record.type === "expense")
            .map((record) => record.category)
        ),
      ];
      const categoryNames = await fetchCategoryNames(expenseCategories);
      setCategories(categoryNames);
      setRecords(res);
      setIsLoading(false);
    } catch (error) {
      console.log("Error in fetching Records");
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  const expenses =
    records?.filter((expense) => expense.type === "expense") || [];

  // Function to group and sum the expenses by category
  const groupAndSumByCategory = (expenses) => {
    return expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      if (!acc[category]) {
        const categoryData = categories[category] || {
          name: category,
          color: "gray",
        };
        acc[category] = {
          label: `${categoryData.name}`,
          color: `${categoryData.color}`,
          value: 0,
        };
      }
      acc[category].value += amount;
      return acc;
    }, {});
  };

  const summedExpenses = Object.values(groupAndSumByCategory(expenses));

  return (
    <Paper
      sx={{
        display: "flex",
        width: isMediumScreen ? "100%" : "40%",
        height: isMediumScreen ? "278px" : "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px 24px",
        borderRadius: "16px",
        bgcolor: colors.panel.panel1,
      }}
    >
      <Box
        sx={{
          height: "48px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[600]} 1px solid`,
        }}
      >
        <Typography variant="h6">Expenses</Typography>
        <ShowMoreBtn to={"/statistics"} />
      </Box>

      <Box
        sx={{
          width: isLargeScreen ? `calc(100%-84px)` : "100%",
          height: "90%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <PieChart
          // width={isMediumScreen ? 320 : 500}
          series={[
            {
              data: summedExpenses,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: {
                innerRadius: isLargest ? 50 : 30,
                additionalRadius: isLargest ? -50 : -30,
              },
              cx: isSmallScreen
                ? "80%"
                : isMediumScreen
                ? "65%"
                : isLargeScreen
                ? "90%"
                : isLargest
                ? "35%"
                : "30%",
              cy: isMediumScreen ? "60%" : isLargeScreen ? "70%" : "50%",
              outerRadius: isMediumScreen
                ? 65
                : isLargeScreen
                ? 60
                : isLargest
                ? 55
                : 60,
            },
          ]}
          // height={isMediumScreen ? 250 : 300}
          label={({ dataEntry }) => (
            <text>{`${dataEntry.label} (${dataEntry.value.toFixed(
              2
            )} MMK)`}</text>
          )}
          slotProps={{
            legend: {
              direction: isLargeScreen ? "row" : "column",
              position: {
                vertical: isLargeScreen ? "top" : "middle",
                horizontal: isLargeScreen ? "middle" : "right",
              },
              labelStyle: {
                fontSize: isMediumScreen
                  ? "8px"
                  : isLargeScreen
                  ? "8px"
                  : "10px",
              },
              itemMarkWidth: isMediumScreen ? 10 : 15,
              itemMarkHeight: isMediumScreen ? 10 : 15,
              padding: isLargeScreen
                ? isMediumScreen
                  ? isMediumScreen
                    ? -1
                    : 10
                  : 0
                : -11,
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default Chart;
