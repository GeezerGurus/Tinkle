import React, { useEffect, useState } from "react";
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Stack,
  useMediaQuery,
  Button,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import { CategoryIcons, Item } from "../utils";
import dayjs from "dayjs";
import { useTheme } from "@emotion/react";
import { postRecord } from "../../api/recordsApi";
import { getAccount } from "../../api/accountApi";

const getCurrentTimeString = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const Transfer = ({ onClose, accounts, categories }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [accountData, setAccountData] = useState([]);
  const [errors, setErrors] = useState({});
  const [fromAcc, setFromAcc] = useState("");
  const [toAcc, setToAcc] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState(getCurrentTimeString());
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [transactor, setTransactor] = useState("");

  const fetchAccounts = async (acc) => {
    const res = await getAccount(acc);
    setAccountData(res);
  };
  useEffect(() => {
    fetchAccounts(fromAcc);
  }, [fromAcc]);

  const validateForm = () => {
    const errors = {};
    if (!fromAcc) {
      errors.fromAcc = "Select an account";
    }
    if (!toAcc) {
      errors.toAcc = "Account is required";
    }
    if (!amount) {
      errors.amount = "Amount is required";
    } else if (amount <= 0) {
      errors.amount = "Amount must be greater than 0";
    } else if (amount > accountData.balance) {
      errors.amount = "Amount must not be greater than balance in account";
    }
    if (!time) {
      errors.time = "Time is required";
    }
    if (!date) {
      errors.date = "Date is required";
    }
    if (!category) {
      errors.category = "Select a category";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAccountChange = (setter, value) => {
    if (value === fromAcc) {
      setFromAcc(toAcc);
      setToAcc(value);
    } else if (value === toAcc) {
      setToAcc(fromAcc);
      setFromAcc(value);
    } else {
      setter(value);
    }
  };

  const handleSubmit = async () => {
    const expenseData = {
      type: "expense",
      accountId: fromAcc,
      amount,
      category,
      time,
      date,
      transactor,
      notes,
    };
    const incomeData = {
      type: "income",
      accountId: toAcc,
      amount,
      category,
      time,
      date,
      transactor,
      notes,
    };
    if (!validateForm()) {
      return;
    }

    try {
      if (fromAcc !== "out-of-wallet") {
        await postRecord(expenseData);
      }
      if (toAcc !== "out-of-wallet") {
        await postRecord(incomeData);
      }
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error posting records:", error);
    }
  };

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        padding: isSmallScreen
          ? "16px 26px"
          : isLargest
          ? "16px 68px"
          : "16px 112px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        gap={2}
      >
        <TextField
          label="From Account"
          InputLabelProps={{
            shrink: true,
            required: true,
          }}
          fullWidth
          select
          value={fromAcc}
          onChange={(event) =>
            handleAccountChange(setFromAcc, event.target.value)
          }
          disabled={accounts.length === 0}
          InputProps={{
            sx: {
              height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
            },
          }}
          error={!!errors.fromAcc}
          helperText={errors.fromAcc}
        >
          {accounts.map((account) => (
            <MenuItem key={account._id} value={account._id}>
              <Item text={account.name} />
            </MenuItem>
          ))}
          <MenuItem value="out-of-wallet">Out of Wallet</MenuItem>
        </TextField>

        <TextField
          label="To Account"
          required
          InputLabelProps={{
            shrink: true,
            required: true,
          }}
          fullWidth
          select
          value={toAcc}
          onChange={(event) =>
            handleAccountChange(setToAcc, event.target.value)
          }
          InputProps={{
            sx: {
              height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
            },
          }}
          error={!!errors.toAcc}
          helperText={errors.toAcc}
          disabled={accounts.length === 0}
        >
          {accounts.map((account) => (
            <MenuItem key={account._id} value={account._id}>
              <Item text={account.name} />
            </MenuItem>
          ))}
          <MenuItem value="out-of-wallet">Out of Wallet</MenuItem>
        </TextField>
      </Stack>

      <TextField
        label="Amount"
        type="number"
        required
        fullWidth
        placeholder="Enter amount"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        inputProps={{ min: "0" }}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
          endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
        }}
        InputLabelProps={{
          shrink: true,
          required: true,
        }}
        error={!!errors.amount}
        helperText={errors.amount}
      />

      <TextField
        fullWidth
        select
        required
        InputLabelProps={{
          shrink: true,
          required: true,
        }}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
        }}
        label="Category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        disabled={categories.length === 0}
        error={!!errors.category}
        helperText={errors.category}
      >
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            <Item
              icon={CategoryIcons[category.icon]}
              text={category.name}
              bgColor={category.color}
            />
          </MenuItem>
        ))}
      </TextField>

      <TextField
        type="time"
        required
        fullWidth
        placeholder="Enter time"
        label="Time"
        InputLabelProps={{
          shrink: true,
          required: true,
        }}
        value={time}
        onChange={(event) => setTime(event.target.value)}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
        }}
        error={!!errors.time}
        helperText={errors.time}
      />

      <TextField
        required
        type="date"
        label="Date"
        fullWidth
        placeholder="Enter date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
          inputProps: {
            min: "2022-01-01",
            max: "2025-12-31",
          },
        }}
        InputLabelProps={{
          shrink: true,
          required: true,
        }}
        error={!!errors.date}
        helperText={errors.date}
      />

      <TextField
        label="Transactor"
        placeholder="Enter transactor name"
        fullWidth
        value={transactor}
        onChange={(event) => setTransactor(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
        }}
      />

      <TextField
        label="Notes"
        placeholder="Enter notes (optional)"
        multiline
        fullWidth
        maxRows={2}
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
        }}
      />
      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
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
          <Typography variant="body2">Add</Typography>
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
    </Box>
  );
};

export default Transfer;
