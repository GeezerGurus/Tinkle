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
import { postLendDebtItem } from "../../api/lendDebtItem";
import { postOweDebtItem } from "../../api/oweDebtItems";
import { enqueueSnackbar } from "notistack";

const CreateDebtRecord = ({ onClose, debtId, action, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [errors, setErrors] = useState({});
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accountsData, setAccountsData] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOption(typeof value === "string" ? value.split(",") : value);
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const validateForm = () => {
    const errors = {};

    if (!amount) {
      errors.amount = "Amount is required";
    } else if (amount <= 0) {
      errors.amount = "Amount must be greater than 0";
    }
    if (!date) {
      errors.date = "Date is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      const AccountsData = await getAccounts();
      setAccountsData(AccountsData);
    };
    fetchAccounts();
  }, []);

  const postItem = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const data = {
        debtId: debtId,
        amount: parseInt(amount),
        Date: date,
      };

      action === "lend"
        ? await postLendDebtItem(debtId, data)
        : await postOweDebtItem(debtId, data);

      refresh();
      enqueueSnackbar(
        action === "lend" ? "Lend List Item created!" : "Owe List Item created",
        { variant: "success" }
      );
      onClose();
    } catch (error) {
      console.error("Error creating new list:", error);
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
      }}
    >
      {/* Title  */}
      <Typography variant="h4" sx={{ color: colors.purple[900] }}>
        Create Debt Record
      </Typography>
      <TextField
        type="number"
        label="Amount"
        value={amount}
        required
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
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
          required: true,
        }}
        error={!!errors.amount}
        helperText={errors.amount}
      />

      {/* <TextField
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
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
        value={date}
        required
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        InputLabelProps={{
          shrink: true,
          required: true,
        }}
        InputProps={{
          sx: { height: isSmallScreen ? "45px" : undefined },
          inputProps: {
            min: "2020-01-01",
            max: "2030-12-31",
          },
        }}
        error={!!errors.date}
        helperText={errors.date}
      />

      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Button
          onClick={() => {
            postItem();
          }}
          sx={{
            width: "208px",
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

export default CreateDebtRecord;
