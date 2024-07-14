import {
  Box,
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
import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import { Item } from "../utils";
import { postDebtRecord } from "../../api/debtRecordApi";
import { enqueueSnackbar } from "notistack";
import { getAccounts } from "../../api/accountApi";
import dayjs from "dayjs";

const AddDebt = ({ onClose, action, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedDueDate, setSelectedDueDate] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [errors, setErrors] = useState({});

  console.log(errors);

  useEffect(() => {
    const fetchAccounts = async () => {
      const accountsData = await getAccounts();
      setAccounts(accountsData);
    };
    fetchAccounts();
  }, []);

  const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value);
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const newDebt = {
        type: action,
        accountId: selectedAccount,
        name: name,
        purpose: purpose,
        amount: parseInt(selectedAmount),
        Date: selectedDate,
        DueDate: selectedDueDate,
      };
      await postDebtRecord(newDebt);
      refresh();
      enqueueSnackbar("Debt list created!", { variant: "success" });
      onClose();
    } catch (error) {
      console.error("Error creating new list:", error);
    }
  };

  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const validateForm = () => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!purpose) {
      errors.purpose = "Purpose is required";
    }
    if (!selectedAmount) {
      errors.amount = "Amount is required";
    } else if (selectedAmount <= 0) {
      errors.amount = "Amount must be greater than 0";
    }
    if (!selectedAccount) {
      errors.account = "Account is required";
    }
    if (!selectedDate) {
      errors.date = "Date is required";
    }
    if (!selectedDueDate) {
      errors.dueDate = "Due Date is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "44vh" : isMediumScreen ? "65vh" : "686px",
        height: isLaptop ? "95vh" : "739px",
        padding: isSmallScreen
          ? "16px 28px"
          : isLaptop
          ? "16px 112px"
          : "32px 112px",
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
        Add Debt
      </Typography>
      {action === "lend" ? (
        <Stack alignItems={"center"} gap={1}>
          <Box
            sx={{
              width: "120px",
              height: "8px",
              backgroundColor: colors.green[400],
            }}
          />
          <Typography variant="h6" gutterBottom>
            I lend
          </Typography>
        </Stack>
      ) : (
        <Stack alignItems={"center"} gap={1}>
          <Box
            sx={{
              width: "120px",
              height: "8px",
              backgroundColor: colors.extra.red_accent,
            }}
          />
          <Typography variant="h6" gutterBottom>
            I Owe
          </Typography>
        </Stack>
      )}
      <Stack
        justifyContent={"space-around"}
        alignItems={"center"}
        sx={{ width: "100%", height: "100%" }}
      >
        <TextField
          label="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          placeholder={
            action === "lend"
              ? "To whom have I lend?"
              : "From whom did I borrow?"
          }
          fullWidth
          InputLabelProps={{
            shrink: true,
            required: true,
          }}
          InputProps={{
            sx: { height: isLaptop ? "42px" : undefined },
          }}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Purpose"
          placeholder="What was it for?"
          required
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
            required: true,
          }}
          InputProps={{
            sx: { height: isLaptop ? "42px" : undefined },
          }}
          error={!!errors.purpose}
          helperText={errors.purpose}
        />

        <TextField
          type="number"
          label="Amount"
          required
          fullWidth
          value={selectedAmount}
          onChange={handleAmountChange}
          inputProps={{ min: "0" }}
          InputProps={{
            sx: { height: isLaptop ? "42px" : undefined },
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "green" }}>
                {action === "lend" ? (
                  <Typography
                    sx={{ color: "red", fontWeight: "400", fontSize: "24px" }}
                  >
                    -
                  </Typography>
                ) : (
                  <Typography
                    sx={{ color: "green", fontWeight: "400", fontSize: "24px" }}
                  >
                    +
                  </Typography>
                )}
              </InputAdornment>
            ),
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
          value={selectedAccount}
          onChange={handleAccountChange}
          required
          select
          label="Account"
          fullWidth
          InputLabelProps={{
            shrink: true,
            required: true,
          }}
          InputProps={{
            sx: { height: isLaptop ? "42px" : undefined },
          }}
          error={!!errors.account}
          helperText={errors.account}
        >
          {accounts.map((account) => (
            <MenuItem key={account.id} value={account._id}>
              <Item
                // icon={<account.icon />}
                text={account.name}
                // bgColor={account.bgColor}
              />
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Date"
          type="date"
          required
          fullWidth
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
            required: true,
          }}
          InputProps={{
            sx: { height: isLaptop ? "42px" : undefined },
            inputProps: {
              min: "2020-01-01",
              max: "2030-12-31",
            },
          }}
          error={!!errors.date}
          helperText={errors.date}
        />

        <TextField
          label="Due Date"
          type="date"
          required
          fullWidth
          value={selectedDueDate}
          onChange={(e) => setSelectedDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
            required: true,
          }}
          InputProps={{
            sx: { height: isLaptop ? "42px" : undefined },
            inputProps: {
              min: "2020-01-01",
              max: "2030-12-31",
            },
          }}
          error={!!errors.dueDate}
          helperText={errors.dueDate}
        />

        <Stack
          gap={1}
          direction={isSmallScreen ? "column" : "row"}
          justifyContent={"space-between"}
        >
          <Button
            onClick={handleCreate}
            sx={{
              width: isSmallScreen
                ? "208px"
                : isMediumScreen
                ? "190px"
                : "208px",
              height: isMediumScreen ? "35px" : "40px",
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
              width: isSmallScreen
                ? "208px"
                : isMediumScreen
                ? "190px"
                : "208px",
              height: isMediumScreen ? "35px" : "40px",
              backgroundColor: colors.button.button2,
              textTransform: "none",
            }}
          >
            <Typography variant="body2">Cancel</Typography>
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AddDebt;
