import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import { getAccount } from "../../api/accountApi";
import { getCategory } from "../../api/categoriesApi";
import { getBudget } from "../../api/budgetsApi";
import { CategoryIcons } from "../utils";
import { tokens } from "../../theme";

const RecordsTable = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [categoryDetails, setCategoryDetails] = useState({});
  const [names, setNames] = useState({});

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      const uniqueCategoryIds = [...new Set(data.map((row) => row.category))];
      const categoryDetailsMap = {};

      await Promise.all(
        uniqueCategoryIds.map(async (id) => {
          const category = await getCategory(id);
          categoryDetailsMap[id] = {
            name: category.name,
            color: category.color,
            icon: category.icon,
          };
        })
      );

      setCategoryDetails(categoryDetailsMap);
    };

    const fetchNames = async () => {
      const uniqueIds = [
        ...new Set(
          data.flatMap((row) => [row.accountId, row.budgetId].filter(Boolean))
        ),
      ];
      const namesMap = {};

      await Promise.all(
        uniqueIds.map(async (id) => {
          if (id) {
            const account = await getAccount(id).catch(() => null);
            if (account) {
              namesMap[id] = account.name;
            } else {
              const budget = await getBudget(id).catch(() => null);
              if (budget) {
                namesMap[id] = budget.name;
              }
            }
          }
        })
      );

      setNames(namesMap);
    };

    fetchCategoryDetails();
    fetchNames();
  }, [data]);

  return (
    <Box sx={{ overflow: "auto", height: "100%" }}>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table>
          <TableBody>
            {data.map((row, index) => {
              const category = categoryDetails[row.category] || {};
              const name = names[row.accountId] || names[row.budgetId] || "";
              const IconComponent = category
                ? CategoryIcons[category.icon]
                : null;

              return (
                <TableRow key={index} sx={{ borderBottom: "none" }}>
                  <TableCell sx={{ borderBottom: "none" }}>
                    <Typography variant="body4">
                      {row.date.split("T")[0]}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Stack
                      direction={"row"}
                      gap={1}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {IconComponent && (
                        <IconComponent sx={{ color: category.color }} />
                      )}
                      <Typography variant="body4">{category.name}</Typography>
                    </Stack>
                  </TableCell>
                  {!isSmallScreen && (
                    <TableCell sx={{ borderBottom: "none" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            backgroundColor:
                              row.type === "expense"
                                ? colors.extra.red_accent
                                : colors.green[500],
                            borderRadius: "50%",
                            marginRight: 1,
                          }}
                        />
                        <Typography variant="body4">{name}</Typography>
                      </Box>
                    </TableCell>
                  )}
                  <TableCell sx={{ borderBottom: "none" }} align="right">
                    <Typography
                      variant="body4"
                      sx={{ color: row.type === "expense" ? "red" : "green" }}
                    >
                      {row.type === "expense" ? "- " : "+ "}
                      {row.amount} MMK
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecordsTable;
