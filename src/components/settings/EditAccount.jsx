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
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import HouseIcon from "@mui/icons-material/House";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Item } from "../utils";
import { tokens } from "../../theme";

const EditAccount = ({ onClose, name, balance, type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [accountName, setAccountName] = useState(name || "");
  const [currentBalance, setCurrentBalance] = useState(Number(balance) || 0);
  const [selectedOption, setSelectedOption] = useState(type || "");

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  const handleSave = () => {
    console.log("Saved");
  };

  const types = [
    {
      value: "food",
      icon: <RestaurantIcon />,
      text: "Food and Drinks",
      bgColor: "red",
    },
    {
      value: "shopping",
      icon: <LocalMallIcon />,
      text: "Shopping",
      bgColor: "lightblue",
    },
    {
      value: "housing",
      icon: <HouseIcon />,
      text: "Housing",
      bgColor: "orange",
    },
    {
      value: "transportation",
      icon: <DirectionsBusIcon />,
      text: "Transportation",
      bgColor: "grey",
    },
    {
      value: "vehicle",
      icon: <DirectionsCarIcon />,
      text: "Vehicle",
      bgColor: "purple",
    },
  ];

  return (
    <Paper
      sx={{
        padding: "32px 112px",
        width: "686px",
        height: "418px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
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
      />

      <TextField
        select
        fullWidth
        label="Type"
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
        displayEmpty
        InputLabelProps={{
          shrink: true,
        }}
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
      </TextField>
      {/* Buttons  */}
      <Stack gap={1} direction={"row"} justifyContent={"space-between"}>
        <Button
          onClick={handleSave}
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

export default EditAccount;
