import {
  Paper,
  IconButton,
  Typography,
  Button,
  InputAdornment,
  MenuItem,
  useTheme,
  TextField,
  Stack,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Item } from "../utils";
import { tokens } from "../../theme";
import { enqueueSnackbar } from "notistack";
import { patchAccount } from "../../api/accountApi";
import AccountIcons from "../utils/AccountIcons";

const EditAccount = ({ onClose, name, balance, type, id, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [errors, setErrors] = useState({});
  const [accountName, setAccountName] = useState(name || "");
  const [currentBalance, setCurrentBalance] = useState(Number(balance) || "");
  const [selectedOption, setSelectedOption] = useState(type || "");

  const validateForm = () => {
    const errors = {};
    if (!accountName) {
      errors.name = "Name is required";
    }
    if (!currentBalance) {
      errors.amount = "Amount is required";
    } else if (currentBalance <= 0) {
      errors.amount = "Amount must be greater than 0";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const EditedAccount = {
        name: accountName,
        balance: currentBalance,
        type: selectedOption,
      };
      const createdAccount = await patchAccount(id, EditedAccount);
      console.log("Account Edited:", createdAccount);
      refresh();
      enqueueSnackbar("Saved!", { variant: "info" });
      onClose();
    } catch (error) {
      console.error("Error editing list:", error);
    }
  };

  const types = [
    { value: "Cash", icon: AccountIcons[0], text: "Cash" },
    { value: "Bank", icon: AccountIcons[1], text: "Bank" },
    { value: "Saving", icon: AccountIcons[2], text: "Saving" },
    { value: "General", icon: AccountIcons[3], text: "General" },
    { value: "Investment", icon: AccountIcons[4], text: "Investment" },
    { value: "Loan", icon: AccountIcons[5], text: "Loan" },
    { value: "Card", icon: AccountIcons[6], text: "Card" },
    { value: "Insurance", icon: AccountIcons[7], text: "Insurance" },
    { value: "Bonus", icon: AccountIcons[8], text: "Bonus" },
    { value: "EMoney", icon: AccountIcons[9], text: "EMoney" },
  ];
  return (
    <Paper
      sx={{
        padding: isSmallScreen ? "33px 28px" : "32px 112px",
        width: isSmallScreen ? "97vw" : "686px",
        bgcolor: colors.backGround,
        border: "2px solid",
        borderColor: colors.panel.panelBorder,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: theme.spacing(3),
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      {/* Title */}
      <Typography variant="h4">Edit Account</Typography>
      {/* Form */}
      <TextField
        placeholder="Enter a name"
        label="Name"
        fullWidth
        onChange={(e) => {
          setAccountName(e.target.value);
        }}
        value={accountName || ""}
        inputProps={{ min: "0" }}
        InputLabelProps={{
          shrink: true,
        }}
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        type="number"
        label="Current Balance"
        value={currentBalance}
        onChange={(e) => {
          setCurrentBalance(Number(e.target.value));
        }}
        fullWidth
        inputProps={{ min: "0" }}
        InputProps={{
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

      <TextField
        select
        fullWidth
        label="Type"
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        SelectProps={{ MenuProps: menuProps }}
      >
        {types.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            <Item {...type} />
          </MenuItem>
        ))}
      </TextField>
      {/* Buttons  */}
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
            color: colors.text.text1,
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
            color: colors.text.text2,
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default EditAccount;
