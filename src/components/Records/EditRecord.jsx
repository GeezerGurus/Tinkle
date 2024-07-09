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
import { getAccounts } from "../../api/accountApi";
import { getBudgets } from "../../api/budgetsApi";
import EditExpense from "./EditExpense";
import EditIncome from "./EditIncome";

const EditRecord = ({ onClose, dataRow, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState("expense");
  const [accounts, setAccounts] = useState([]);
  const [budgets, setBudgets] = useState([]);

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
          <EditExpense
            onClose={onClose}
            accounts={accounts}
            budgets={budgets}
            dataRow={dataRow}
            refresh={refresh}
          />
        );
      case "income":
        return (
          <EditIncome
            onClose={onClose}
            accounts={accounts}
            budgets={budgets}
            dataRow={dataRow}
            refresh={refresh}
          />
        );
      default:
        return null;
    }
  })();

  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      sx={{
        position: "relative",
        padding: isLargest ? "8px 0" : "24px 0",
        width: isMediumScreen ? "95vw" : "686px",
        height: isLargest ? "72vh" : "805px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ color: colors.purple[900] }} gutterBottom>
        Edit Record
      </Typography>
      <ButtonGroup
        sx={{
          width: "80%",
          borderRadius: "16px",
          border: `1px solid ${colors.purple[600]}`,
        }}
      >
        <Button
          key="expense"
          onClick={() => handlePageChange("expense")}
          sx={{
            ...buttonStyles,
            backgroundColor: page === "expense" ? colors.purple[600] : "white",
            color: page === "expense" ? "white" : colors.purple[600],
            "&:hover": {
              backgroundColor:
                page === "expense" ? colors.purple[200] : colors.purple[100],
              color: "white",
            },
          }}
        >
          <Typography variant="body2">Expense</Typography>
        </Button>
        <Button
          key="income"
          onClick={() => handlePageChange("income")}
          sx={{
            ...buttonStyles,
            backgroundColor: page === "income" ? colors.purple[600] : "white",
            color: page === "income" ? "white" : colors.purple[600],
            "&:hover": {
              backgroundColor:
                page === "income" ? colors.purple[200] : colors.purple[100],
              color: "white",
            },
          }}
        >
          <Typography variant="body2">Income</Typography>
        </Button>
        <Button
          key="transfer"
          disabled
          sx={{
            ...buttonStyles,
            backgroundColor: page === "transfer" ? colors.purple[600] : "white",
            color: page === "transfer" ? "white" : colors.purple[600],
            "&:hover": {
              backgroundColor:
                page === "transfer" ? colors.purple[200] : colors.purple[100],
              color: "white",
            },
          }}
        >
          <Typography variant="body2">Transfer</Typography>
        </Button>
      </ButtonGroup>

      {/* Conditional Rendering */}
      {pageComponent}
    </Paper>
  );
};

export default React.memo(EditRecord);
