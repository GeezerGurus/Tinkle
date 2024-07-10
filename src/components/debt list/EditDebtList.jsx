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
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { Item } from "../utils";
import { patchDebtRecord } from "../../api/debtRecordApi";
import { getAccounts } from "../../api/accountApi";
import { enqueueSnackbar } from "notistack";

const EditDebtList = ({
  onClose,
  action,
  name,
  purpose,
  amount,
  date,
  dueDate,
  account,
  isActive,
  id,
  refresh,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const [accounts, setAccounts] = useState([]);
  const [errors, setErrors] = useState({});
  const [chosenName, setchosenName] = useState(name);
  const [chosenPurppose, setChosenPurppose] = useState(purpose);
  const [selectedAmount, setSelectedAmount] = useState(amount);
  const [selectedAccount, setSelectedAccount] = useState(account);
  const [AccountsData, setAccountsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(date);
  const [DueDate, setDueDate] = useState(dueDate);

  const validateForm = () => {
    const errors = {};
    if (selectedAmount <= 0) {
      errors.amount = "Amount must be greater than 0";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const newDebt = {
        type: action,
        accountId: selectedAccount,
        name: chosenName,
        purpose: chosenPurppose,
        amount: parseInt(selectedAmount),
        Date: selectedDate,
        DueDate: DueDate,
      };
      await patchDebtRecord(id, newDebt);
      refresh();
      enqueueSnackbar("Debt list Updated!", { variant: "success" });
      onClose();
    } catch (error) {
      console.error("Error creating new list:", error);
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      const AccountsData = await getAccounts();
      setAccountsData(AccountsData);
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

  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

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
      }}
    >
      {/* Title  */}
      <Typography variant="h4" sx={{ color: colors.purple[900] }}>
        Edit Debt
      </Typography>
      {action === "lent" ? (
        <Stack alignItems={"center"} gap={1}>
          <Box
            sx={{
              width: "120px",
              height: "8px",
              backgroundColor: colors.green[400],
            }}
          />
          <Typography variant="h6" gutterBottom>
            I Lent
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

      <TextField
        label="Name"
        value={chosenName}
        onChange={(e) => setchosenName(e.target.value)}
        placeholder={
          action === "lent" ? "To whom have I lent?" : "From whom did I borrow?"
        }
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isLaptop ? "42px" : undefined },
        }}
      />

      <TextField
        label="Purpose"
        value={chosenPurppose}
        onChange={(e) => setChosenPurppose(e.target.value)}
        placeholder="What was it for?"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isLaptop ? "42px" : undefined },
        }}
      />

      <TextField
        type="number"
        label="Amount"
        fullWidth
        value={selectedAmount}
        onChange={handleAmountChange}
        inputProps={{ min: "0" }}
        InputProps={{
          sx: { height: isLaptop ? "42px" : undefined },
          startAdornment: (
            <InputAdornment position="start" sx={{ color: "green" }}>
              {action === "lent" ? (
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
        }}
        error={!!errors.amount}
        helperText={errors.amount}
      />

      <TextField
        value={selectedAccount}
        onChange={handleAccountChange}
        select
        label="Account"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isLaptop ? "42px" : undefined },
        }}
      >
        {AccountsData.map((account) => (
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
        fullWidth
        value={selectedDate}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isLaptop ? "42px" : undefined },
          inputProps: {
            min: "2020-01-01",
            max: "2030-12-31",
          },
        }}
      />

      <TextField
        label="Due Date"
        type="date"
        fullWidth
        value={DueDate}
        onChange={(e) => setDueDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isLaptop ? "42px" : undefined },
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
            width: isSmallScreen ? "208px" : isMediumScreen ? "190px" : "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
          }}
        >
          <Typography variant="body2">Save</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: isSmallScreen ? "208px" : isMediumScreen ? "190px" : "208px",
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

export default EditDebtList;
