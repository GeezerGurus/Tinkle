import {
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { Item } from "../utils";
import { getAccounts } from "../../api/accountApi";
import { patchLendDebtItem } from "../../api/lendDebtItemsApi";
import { patchOweDebtItem } from "../../api/oweDebtItemsApi";
import { enqueueSnackbar } from "notistack";

const EditDebtRecord = ({
  onClose,
  amount,
  account,
  date,
  debtId,
  id,
  refresh,
  action,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [errors, setErrors] = useState({});
  const [selectedAmount, setSelectedAmount] = useState(amount);
  const [selectedDate, setSelectedDate] = useState(date);

  const validateForm = () => {
    const errors = {};
    if (selectedAmount <= 0) {
      errors.amount = "Amount must be greater than 0";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value);
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const data = {
        amount: selectedAmount,
        Date: selectedDate,
      };
      action === "lend"
        ? await patchLendDebtItem(debtId, id, data)
        : await patchOweDebtItem(debtId, id, data);
      refresh();
      enqueueSnackbar("Edited Successfully", { variant: "success" });
      onClose();
    } catch (error) {
      console.log("Error Patching Items");
      throw error;
    }
  };

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "359px" : "686px",
        height: "427px",
        padding: isSmallScreen ? "16px 26px" : "32px 112px",
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
      <Typography variant="h4" sx={{ color: colors.text.text1 }}>
        Edit Debt Record
      </Typography>
      <TextField
        type="number"
        label="Amount"
        fullWidth
        value={selectedAmount}
        onChange={handleAmountChange}
        inputProps={{ min: "0" }}
        InputProps={{
          sx: { height: isSmallScreen ? "45px" : undefined },
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
        error={!!errors.amount}
        helperText={errors.amount}
      />

      {/* <TextField
        value={selectedAccount}
        onChange={handleAccountChange}
        select
        label="Account"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isSmallScreen ? "45px" : undefined },
        }}
      >
        {accountsData.map((account) => (
          <MenuItem key={account.id} value={account._id}>
            <Item
              // icon={<account.icon />}
              text={account.name}
              // bgColor={account.bgColor}
            />
          </MenuItem>
        ))}
      </TextField> */}

      <TextField
        label="Date"
        type="date"
        fullWidth
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isSmallScreen ? "45px" : undefined },
          inputProps: {
            min: "2020-01-01",
            max: "2030-12-31",
          },
        }}
      />

      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Button
          onClick={handleSave}
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

export default EditDebtRecord;
