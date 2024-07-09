import React, { useState } from "react";
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
import { Item } from "../utils";
import dayjs from "dayjs";
import { useTheme } from "@emotion/react";
import { postRecord } from "../../api/recordsApi";

const getCurrentTimeString = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const Transfer = ({ onClose, accounts }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [fromAcc, setFromAcc] = useState("");
  const [toAcc, setToAcc] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState(getCurrentTimeString());
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [transactor, setTransactor] = useState("");

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

    try {
      if (fromAcc !== "out-of-wallet") {
        await postRecord(expenseData);
      }
      if (toAcc !== "out-of-wallet") {
        await postRecord(incomeData);
      }
      if (
        window.location.pathname === "/records" ||
        window.location.pathname === "/settings/balance-accounts"
      ) {
        window.location.reload();
      }
      onClose();
    } catch (error) {
      console.error("Error posting records:", error);
    }
  };

  return (
    <Box
      sx={{
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
          }}
          fullWidth
          select
          value={fromAcc}
          onChange={(event) =>
            handleAccountChange(setFromAcc, event.target.value)
          }
          InputProps={{
            sx: {
              height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
            },
          }}
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
          InputLabelProps={{
            shrink: true,
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
        }}
      />

      <TextField
        type="time"
        fullWidth
        placeholder="Enter time"
        label="Time"
        InputLabelProps={{
          shrink: true,
        }}
        value={time}
        onChange={(event) => setTime(event.target.value)}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
        }}
      />

      <TextField
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
        }}
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
