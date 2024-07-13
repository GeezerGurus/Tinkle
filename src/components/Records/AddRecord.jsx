import React, { useState, useCallback, useEffect } from "react";
import {
  Paper,
  Typography,
  useTheme,
  Button,
  ButtonGroup,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import Expense from "./Expense";
import Income from "./Income";
import Transfer from "./Transfer";
import { getAccounts } from "../../api/accountApi";
import { getBudgets } from "../../api/budgetsApi";
import { getCategories } from "../../api/categoriesApi";

const AddRecord = ({ onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState("expense");
  const [accounts, setAccounts] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);

  const handlePageChange = useCallback((value) => {
    setPage(value);
  }, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      const accountsData = await getAccounts();
      setAccounts(accountsData);
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchBudgets = async () => {
      const budgetsData = await getBudgets();
      setBudgets(budgetsData);
    };
    fetchBudgets();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const buttonStyles = {
    borderRadius: "16px",
    height: "40px",
    flexGrow: 1,
    textTransform: "none",
  };

  const pageComponent = (() => {
    switch (page) {
      case "expense":
        return (
          <Expense
            onClose={onClose}
            accounts={accounts}
            budgets={budgets}
            categories={categories}
          />
        );
      case "income":
        return (
          <Income
            onClose={onClose}
            accounts={accounts}
            budgets={budgets}
            categories={categories}
          />
        );
      case "transfer":
        return (
          <Transfer
            onClose={onClose}
            accounts={accounts}
            budgets={budgets}
            categories={categories}
          />
        );
      default:
        return null;
    }
  })();

  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));

  return (
    <Paper
      sx={{
        position: "relative",
        padding: isLargest ? "8px 0" : "24px 0",
        width: isMediumScreen ? "95vw" : "686px",
        // height: isLaptop ? "95vh" : isLargest ? "72vh" : "805px",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: colors.backGround,
        border: `1px solid ${colors.panel.panelBorder}`,
      }}
    >
      <Typography variant="h4" sx={{ color: colors.text.text1 }} gutterBottom>
        Add Record
      </Typography>
      <ButtonGroup
        sx={{
          width: "80%",
          borderRadius: "16px",
          border: `1px solid ${colors.purple[600]}`,
        }}
      >
        {["expense", "income", "transfer"].map((type) => (
          <Button
            key={type}
            onClick={() => handlePageChange(type)}
            sx={{
              ...buttonStyles,
              backgroundColor: page === type ? colors.button.button1 : "white",
              color: page === type ? "white" : colors.button.button1,
              "&:hover": {
                backgroundColor:
                  page === type ? colors.purple[200] : colors.purple[100],
                color: "white",
              },
            }}
          >
            <Typography variant="body2">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Typography>
          </Button>
        ))}
      </ButtonGroup>

      {/* Conditional Rendering */}
      {pageComponent}
    </Paper>
  );
};

export default React.memo(AddRecord);
