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
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Item } from "../utils";
import { tokens } from "../../theme";
import { postAccount } from "../../api/accountApi";
import { enqueueSnackbar } from "notistack";
import AccountIcons from "../utils/AccountIcons";

const CreateAccount = ({ onClose, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [errors, setErrors] = useState({});
  const [name, setAccountName] = useState("");
  const [balance, setCurrentBalance] = useState("");
  const [type, setSelectedOption] = useState("");

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (balance <= 0) {
      errors.balance = "Balance must be greater than 0";
    } else if (!balance) {
      errors.balance = "Balance is required";
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
  const handleSaveAccount = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      await postAccount({
        name,
        balance,
        type,
      });
      refresh();
      enqueueSnackbar("Account created!", { variant: "success" });
      onClose();
    } catch (error) {
      console.error("Error adding new account:", error);
      throw error;
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
    { value: "EMoney", icon: AccountIcons[9], text: "E Money" },
  ];
  return (
    <Paper
      sx={{
        padding: isSmallScreen ? "33px 28px" : "32px 112px",
        width: isSmallScreen ? "97vw" : "686px",
        height: "",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: theme.spacing(3),
        bgcolor: colors.backGround,
        border: `1px solid ${colors.panel.panelBorder}`,
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
      <Typography variant="h4">Create Account</Typography>
      {/* Form */}
      <TextField
        placeholder="Enter a name"
        label="Name"
        required
        fullWidth
        onChange={(e) => {
          setAccountName(e.target.value);
        }}
        value={name || ""}
        inputProps={{ min: "0" }}
        InputLabelProps={{
          shrink: true,
          required: true,
        }}
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        type="number"
        label="Current Balance"
        required
        value={balance}
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
          required: true,
        }}
        error={!!errors.balance}
        helperText={errors.balance}
      />

      {/* <TextField
        select
        fullWidth
        label="Type"
        value={type}
        onChange={(event) => setSelectedOption(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        // MenuProps={menuProps}
        SelectProps={{ MenuProps: menuProps }}
        renderValue={(selected) => (
          <Item {...types.find((type) => type.value === selected)} />
        )}
      >
        {types.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            <Item {...type} />
          </MenuItem>
        ))}
      </TextField> */}
      <FormControl fullWidth>
        <InputLabel shrink>Type</InputLabel>
        <Select
          label="Type"
          value={type}
          onChange={(event) => setSelectedOption(event.target.value)}
          MenuProps={menuProps}
          renderValue={(selected) => (
            <Item {...types.find((type) => type.value === selected)} />
          )}
        >
          {types.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              <Item {...type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Buttons  */}
      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Button
          onClick={handleSaveAccount}
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

export default CreateAccount;
