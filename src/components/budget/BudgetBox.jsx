import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Paper,
  Button,
  Modal,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import ShowMoreBtn from "../utils/ShowMoreBtn";
import CreateBudget from "./CreateBudget";
import { getBudgetPeriodically } from "../../api/budgetsApi";
import { Loader } from "../utils";

const Progress = ({ content, dollar, percent, period, budgetId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const progressValue = parseFloat(percent);

  const getBarColor = () => {
    if (progressValue < 20) {
      return colors.category.red; // overspent
    }
    if (progressValue < 50) {
      return colors.category.orange; // normal spending or risk of overspent
    }
    return colors.green[100]; // in limit
  };

  // Calculate remaining percentage
  const remainingPercent = progressValue;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 1 }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1">{content}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Typography variant="body3">{dollar} MMK</Typography>
          <Typography variant="body2">{percent}%</Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <LinearProgress
            variant="determinate"
            value={remainingPercent}
            sx={{
              height: 17,
              bgcolor: "#D9D9D9B2",
              direction: "rtl",
              "& .MuiLinearProgress-bar": {
                bgcolor: getBarColor(),
              },
            }}
          />
        </Box>
        <IconButton
          component={Link}
          to={`/budget/${period
            .toLowerCase()
            .replace(/\s+/g, "-")}/${budgetId}`}
        >
          <ArrowForwardIosIcon sx={{ color: colors.purple[600] }} />
        </IconButton>
      </Box>
    </Box>
  );
};

const BudgetBox = ({ period }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const periodString = period.trim().toLowerCase().replace(/\s+/g, "-");

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const boxWidth = isSmallScreen ? "100%" : "474px";

  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBudgets = async () => {
    setIsLoading(true);
    try {
      const res = await getBudgetPeriodically(periodString);
      setBudgets(res || []);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [periodString]);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <Paper
      sx={{
        borderRadius: "8px",
        width: boxWidth,
        height: isSmallScreen ? "100%" : 408,
        display: "flex",
        padding: "16px 48px",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.panel.panel1,
        border: `1px solid ${colors.panel.panelBorder}`,
      }}
    >
      <Loader isLoading={isLoading} />
      <Typography
        variant={isSmallScreen ? "h4" : "h3"}
        sx={{
          borderBottom: `${colors.purple[600]} 1px solid`,
          height: 69,
          alignSelf: "flex-start",
          width: "100%",
        }}
      >
        {period}
      </Typography>

      {budgets.length > 0 && (
        <Box sx={{ flexGrow: 1, width: "100%", padding: "24px 0" }}>
          {budgets.slice(0, 3).map((budget, index) => (
            <Progress
              key={index}
              content={budget.name}
              dollar={budget.amount}
              percent={Math.round((budget.amount / budget.initial) * 100)}
              period={period}
              budgetId={budget._id}
            />
          ))}
        </Box>
      )}

      {budgets.length < 3 && (
        <Button
          onClick={handleOpenModal}
          component="a"
          href="#create-budget"
          sx={{
            width: "100%",
            borderRadius: "16px",
            border: `2px dashed ${colors.purple[600]}`,
            height: isMediumScreen ? 55 : "25%",
            display: "flex",
            mt: isMediumScreen ? 2 : undefined,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AddIcon
              sx={{ width: 32, height: 32, color: colors.purple[600] }}
            />
            <Typography
              variant={isSmallScreen ? "body1" : "body2"}
              sx={{ color: colors.purple[600] }}
            >
              Tap to add budget
            </Typography>
          </Box>
        </Button>
      )}

      {budgets.length >= 3 && (
        <ShowMoreBtn
          fontSize="body1"
          width="133px"
          to={`/budget/${period.toLowerCase().replace(/\s+/g, "-")}`}
        />
      )}

      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CreateBudget
            onClose={handleCloseModal}
            periodProp={periodString}
            refresh={fetchBudgets}
          />
        </Box>
      </Modal>
    </Paper>
  );
};

export default BudgetBox;
