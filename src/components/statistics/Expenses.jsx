import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import PieActiveArc from "./PieActiveArc";
import { getRecords } from "../../api/recordsApi";
import { getCategory } from "../../api/categoriesApi";

const pieData = [
  { id: 0, value: 88000, label: "Education and Development" },
  { id: 1, value: 240000, label: "Food and Drinks" },
  { id: 2, value: 88000, label: "Health and Beauty" },
  { id: 3, value: 88000, label: "Charges, Fees" },
];

const Expenses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState({});

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

  const fetchRecord = async () => {
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
  };

  useEffect(() => {
    fetchRecord();
  }, []);

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
          label: `${categoryData.name} `,
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
        maxWidth: "100%",
        border: `1px solid ${colors.purple[600]}`,
        height: "100%",
        borderRadius: "16px",
        padding: isSmallScreen ? "10px" : "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          minHeight: "56px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[600]} 1px solid`,
        }}
      >
        <Typography variant={isSmallScreen ? "h6" : "h4"}>Expenses</Typography>
      </Box>
      <PieActiveArc data={summedExpenses} />
    </Paper>
  );
};

export default Expenses;
