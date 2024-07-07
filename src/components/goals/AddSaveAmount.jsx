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

const AddSaveAmount = ({ onClose,currentAmount,id,  refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [amount, setAmount] = useState("");

  const handleAmount = (amount) => {
    setAmount(amount.target.value);
  };
  const handleSave = async () => {
    const newAmount = parseFloat(amount);
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
