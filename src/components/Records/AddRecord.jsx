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

const AddRecord = ({ onClose }) => {
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
      const accountsData = await getBudgets();
      setBudgets(accountsData);
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
          <Expense onClose={onClose} accounts={accounts} budgets={budgets} />
        );
      case "income":
        return (
          <Income onClose={onClose} accounts={accounts} budgets={budgets} />
        );
      case "transfer":
        return (
          <Transfer onClose={onClose} accounts={accounts} budgets={budgets} />
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
              backgroundColor: page === type ? colors.purple[600] : "white",
              color: page === type ? "white" : colors.purple[600],
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
