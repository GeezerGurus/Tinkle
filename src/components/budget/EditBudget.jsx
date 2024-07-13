import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  MenuItem,
  InputAdornment,
  Button,
  TextField,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import dayjs from "dayjs";
import { patchBudget } from "../../api/budgetsApi";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const EditBudget = ({ onClose, budget, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); // Hook for navigation

  const [period, setPeriod] = useState(budget.period);
  const [descript, setDescript] = useState(budget.description || "");
  const [startDate, setStartDate] = useState(
    budget.startDate || dayjs().format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    budget.endDate || dayjs().format("YYYY-MM-DD")
  );
  const [amount, setAmount] = useState(budget.amount || 0);
  const [name, setName] = useState(budget.name || "");

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Reset form fields when budget prop changes
    setPeriod(budget.period);
    setDescript(budget.description || "");
    setStartDate(budget.startDate || dayjs().format("YYYY-MM-DD"));
    setEndDate(budget.endDate || dayjs().format("YYYY-MM-DD"));
    setAmount(budget.amount || 0);
    setName(budget.name || "");
  }, [budget]);

  const handleSubmit = async () => {
    const budgetData = {
      amount: amount,
      name: name,
      period: period,
      startDate: period === "one-time" ? startDate : undefined,
      endDate: period === "one-time" ? endDate : undefined,
      description: descript,
    };

    try {
      await patchBudget(budget._id, budgetData);
      refresh();
      enqueueSnackbar("Saved!", { variant: "success" });
      onClose();
      if (budget.period !== period) {
        navigate("/budget"); // Navigate to '/budget' if period is changed
      }
    } catch (error) {
      console.error("Error editing budget:", error);
      enqueueSnackbar("Failed to save", { variant: "error" });
    }
  };

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "360px" : "686px",
        height:
          period === "one-time"
            ? isSmallScreen
              ? "650px"
              : "702px"
            : isSmallScreen
            ? "500px"
            : "536px",
        padding: isSmallScreen ? "19px 10px" : "32px 112px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
        backgroundColor: colors.backGround,
        border: `1px solid ${colors.panel.panelBorder}`,
      }}
    >
      {/* Title  */}
      <Typography variant={isSmallScreen ? "h5" : "h4"}>Edit Budget</Typography>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ sx: { height: isSmallScreen ? "75%" : "100%" } }}
        />

        <TextField
          type="number"
          label="Amount"
          fullWidth
          inputProps={{ min: "0" }}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{
            sx: { height: isSmallScreen ? "75%" : "100%" },
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "green" }}>
                <Typography
                  sx={{ color: "green", fontWeight: "400", fontSize: "24px" }}
                >
                  +
                </Typography>
              </InputAdornment>
            ),
            endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          select
          label="Period"
          fullWidth
          InputProps={{ sx: { height: isSmallScreen ? "75%" : "100%" } }}
        >
          <MenuItem value="monthly">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ color: colors.text.text1 }}>Monthly</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="weekly">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ color: colors.text.text1 }}>Weekly</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="yearly">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ color: colors.text.text1 }}>Yearly</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="one-time">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ color: colors.text.text1 }}>
                One-Time
              </Typography>
            </Box>
          </MenuItem>
        </TextField>

        {/* Start-Date */}
        {period === "one-time" && (
          <TextField
            type="date"
            fullWidth
            label="Start Date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            InputProps={{
              sx: { height: isSmallScreen ? "75%" : "100%" },
              inputProps: {
                min: "2022-01-01", // Set min and max dates if needed
                max: "2025-12-31",
              },
            }}
          />
        )}
        {/* End-Date */}
        {period === "one-time" && (
          <TextField
            type="date"
            value={endDate}
            label="End Date"
            fullWidth
            onChange={(event) => setEndDate(event.target.value)}
            InputProps={{
              sx: { height: isSmallScreen ? "75%" : "100%" },
              inputProps: {
                min: "2022-01-01", // Set min and max dates if needed
                max: "2025-12-31",
              },
            }}
          />
        )}

        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Note"
          multiline
          maxRows={4}
          placeholder="Enter a description (optional)"
          value={descript}
          onChange={(e) => setDescript(e.target.value)}
        />
      </Box>

      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Button
          onClick={handleSubmit}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.button.button1,
            textTransform: "none",
            color: "white",
          }}
        >
          <Typography variant="body2">Save</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.button.button2,
            textTransform: "none",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default EditBudget;
