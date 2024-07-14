import {
  Box,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { tokens } from "../../theme";
import { Loader, Progress } from "../utils";
import { getRecords } from "../../api/recordsApi";
import { getCategory } from "../../api/categoriesApi";

const colorMap = {
  0: "#7772F2",
  1: "#F5ADA8",
  2: "#A8BCF5",
  3: "#F5EEA8",
  4: "#FFC107",
  5: "#4CAF50",
  6: "#E91E63",
  7: "#795548",
};

const TopSpendings = () => {
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
          console.log("Error Getting Category Names");
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
      console.log("Error catching records");
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  const expenses = records?.filter((expense) => expense.type === "expense");
  const total = expenses.reduce((total, expense) => total + expense.amount, 0);

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

  const modifiedData = Object.values(groupAndSumByCategory(expenses));

  return (
    <Paper
      sx={{
        border: `1px solid ${colors.purple[600]}`,
        height: "100%",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 2,
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
          Top Spendings
        </Typography>
      </Box>

      {/* Categories */}
      <Box
        sx={{
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {modifiedData.map((category, index) => (
          <Stack minHeight={isSmallScreen ? "auto" : "64px"} key={index}>
            <Stack
              direction={"row"}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <Typography variant={isSmallScreen ? "body2" : "body1"}>
                {category.label}
              </Typography>
              <Typography
                variant={isSmallScreen ? "body2" : "body1"}
              >{`${category.value} MMK`}</Typography>
            </Stack>
            <Progress
              percent={`${(category.value / total) * 100}%`} // Example calculation based on max value (300000 MMK)
              height={"35px"}
              barColor={colorMap[category.id]}
            />
          </Stack>
        ))}
      </Box>
    </Paper>
  );
};

export default TopSpendings;
