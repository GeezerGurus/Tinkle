import { Paper, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { PieActiveArc } from "../statistics";
import { getRecords } from "../../api/recordsApi";
import { useEffect, useState } from "react";
import { getCategory } from "../../api/categoriesApi";
import { Loader } from "../utils";

export const Chart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState({});

  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

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
        width: isMediumScreen ? "100%" : "32%",
        height: "216px",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: isMediumScreen
          ? "8px 8px"
          : isLargeScreen
          ? "8px 8px"
          : "16px 24px",
        borderRadius: "16px",
        border: `1px solid ${colors.panel.panelBorder}`,
        bgcolor: colors.panel.panel3,
      }}
    >
      <Loader isLoading={isLoading} />
      <PieActiveArc data={summedExpenses} dashboard={true} />
    </Paper>
  );
};

export default Chart;
