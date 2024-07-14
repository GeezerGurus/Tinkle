import React, { useState } from "react";
import {
  Paper,
  Typography,
  InputAdornment,
  Button,
  Stack,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { tokens } from "../../theme";
import { patchGoal } from "../../api/goals";

const AddSaveAmount = ({
  onClose,
  currentAmount,
  id,
  refresh,
  goal,
  saved,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [errors, setErrors] = useState({});
  const [amount, setAmount] = useState("");
  const total = parseInt(amount) + saved;

  const validateForm = () => {
    const errors = {};
    if (!amount) {
      errors.amount = "Amount is required";
    } else if (amount <= 0) {
      errors.amount = "Amount must be greater than 0";
    } else if (total > goal) {
      errors.amount = "Amount cannot be greater than goal amount";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAmount = (amount) => {
    setAmount(amount.target.value);
  };
  const handleSave = async () => {
    const newAmount = parseFloat(amount);
    if (!validateForm()) {
      return;
    }
    if (newAmount > 0) {
      const updatedAmount = currentAmount + newAmount;
      await patchGoal(id, { saveamount: updatedAmount });
      refresh();
      onClose();
    }
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //   Container
  return (
    <Paper
      sx={{
        width: isSmallScreen ? "356px" : "686px",
        height: "260px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isSmallScreen ? "32px 50px" : "32px 112px",
        borderRadius: "8px",
        backgroundColor: colors.backGround,
        border: `1px solid ${colors.panel.panelBorder}`,
      }}
    >
      {/* Header Section */}
      <Typography variant={isSmallScreen ? "h5" : "h4"}>
        Add Saving Amount
      </Typography>

      {/* Middle Section */}
      <TextField
        type="number"
        label="Amount"
        fullWidth
        value={amount}
        onChange={handleAmount}
        inputProps={{ min: "0" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        error={!!errors.amount}
        helperText={errors.amount}
      />

      {/* Bottom Section */}
      <Stack gap={1} direction={"row"} justifyContent={"space-between"}>
        <Button
          onClick={handleSave}
          sx={{
            width: isSmallScreen ? "134px" : "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2">Add</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: isSmallScreen ? "134px" : "208px",
            height: "40px",
            backgroundColor: colors.purple[200],
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default AddSaveAmount;
