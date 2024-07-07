import React, { useState } from "react";
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
import { postBudget } from "../../api/budgetsApi"; // Import the postBudget function
import { enqueueSnackbar } from "notistack";

const CreateBudget = ({ onClose, periodProp, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [period, setPeriod] = useState(periodProp);
  const [descript, setDescript] = useState("");
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async () => {
    const budgetData = {
      amount,
      name,
      period,
      startDate: period === "one-time" ? startDate : undefined,
      endDate: period === "one-time" ? endDate : undefined,
      description: descript,
    };

    try {
      await postBudget(budgetData);
      refresh();
      enqueueSnackbar("Budget created!", { variant: "success" });
      onClose();
    } catch (error) {
      console.error("Error adding new budget:", error);
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
              : " 702px"
            : isSmallScreen
            ? "500px"
            : "536px",
        padding: isSmallScreen ? "19px 10px" : "32px 112px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      {/* Title  */}
      <Typography variant={isSmallScreen ? "h5" : "h4"}>
        Create Budget
      </Typography>

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
          placeholder="Enter budget name"
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
              <Typography sx={{ color: "black" }}>Monthly</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="weekly">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ color: "black" }}>Weekly</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="yearly">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ color: "black" }}>Yearly</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="one-time">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ color: "black" }}>One-Time</Typography>
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
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
          }}
        >
          <Typography variant="body2">Create</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[200],
            textTransform: "none",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default CreateBudget;
