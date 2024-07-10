import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  useTheme,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";
import { getSettings } from "../../api/generalSettings";
import { getBudgetPeriodically } from "../../api/budgetsApi";

const Progress = ({ content, dollar, percent }) => {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 1,
        width: "100%",
      }}
    >
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
      </Box>
    </Box>
  );
};

const Budget = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [budgets, setBudgets] = useState([]);

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));

  const fetchBudgets = async () => {
    try {
      const settings = await getSettings();
      if (settings && settings.length > 0) {
        const firstSetting = settings[0];
        const res = await getBudgetPeriodically(firstSetting.default_interval);
        setBudgets(res || []);
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <Paper
      sx={{
        width: isLaptop ? "100%" : "369px",
        height: isMediumScreen ? "278px" : "267px",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "16px",
      }}
    >
      {/* Header box of Budget */}
      <Box
        sx={{
          height: "48px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[600]} 1px solid`,
        }}
      >
        <Typography variant="h6">Budgets</Typography>
        <ShowMoreBtn to={"/budget"} />
      </Box>
      {Array.isArray(budgets) &&
        budgets.slice(0, 3).map((budget) => {
          return (
            <Progress
              content={budget.name}
              dollar={budget.amount}
              percent={Math.round((budget.amount / budget.initial) * 100)}
            />
          );
        })}

      {/* Indicators  */}
      <Box
        sx={{
          width: "100%",
          height: "36px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Box
            sx={{
              width: "16px",
              height: "16px",
              backgroundColor: colors.green[100],
            }}
          ></Box>
          <Typography variant="body4">In Limit</Typography>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Box
            sx={{
              width: "16px",
              height: "16px",
              backgroundColor: colors.category.orange,
            }}
          ></Box>
          <Typography variant="body4">Normal</Typography>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Box
            sx={{
              width: "16px",
              height: "16px",
              backgroundColor: colors.category.red,
            }}
          ></Box>
          <Typography variant="body4">Risk of Overspent</Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Budget;
