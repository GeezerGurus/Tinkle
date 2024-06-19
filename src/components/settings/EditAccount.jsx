import {
  Paper,
  IconButton,
  Typography,
  FormControl,
  Button,
  InputAdornment,
  MenuItem,
  Box,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import HouseIcon from "@mui/icons-material/House";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { EntryBox, EntryInput, EntrySelect, Item } from "../utils";
import { tokens } from "../../theme";

const EditAccount = ({ onClose, name, balance, type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [accountName, setAccountName] = useState(name || "");
  const [currentBalance, setCurrentBalance] = useState(balance || "");
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

  const handleDelete = () => {
    console.log("Item deleted");
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
        width: "710px",
        height: "426px",
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
      <EntryBox>
        <Typography variant="body1">Account Name:</Typography>
        <FormControl>
          <EntryInput
            placeholder="Enter name"
            value={accountName || ""}
            onChange={(e) => {
              setAccountName(e.target.value);
            }}
          />
        </FormControl>
      </EntryBox>
      <EntryBox>
        <Typography variant="body1">Current Balance:</Typography>
        <FormControl>
          <EntryInput
            type="number"
            placeholder="Enter amount"
            inputProps={{ min: "0" }}
            startAdornment={
              <InputAdornment position="start" sx={{ color: "green" }}>
                <Typography
                  sx={{ color: "green", fontWeight: "400", fontSize: "24px" }}
                >
                  +
                </Typography>
              </InputAdornment>
            }
            endAdornment={<InputAdornment position="end">MMK</InputAdornment>}
          />
        </FormControl>
      </EntryBox>
      <EntryBox>
        <Typography variant="body1">Type:</Typography>
        <FormControl>
          <EntrySelect
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            displayEmpty
            MenuProps={menuProps}
            renderValue={(selected) =>
              selected ? (
                <Item {...types.find((type) => type.value === selected)} />
              ) : (
                <Typography variant="placeholder">Choose a category</Typography>
              )
            }
          >
            {types.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                <Item {...type} />
              </MenuItem>
            ))}
          </EntrySelect>
        </FormControl>
      </EntryBox>
      {/* Buttons  */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(4),
        }}
      >
        <Button
          sx={{
            backgroundColor: "black",
            width: "243px",
            height: "45px",
          }}
          onClick={handleSave}
        >
          <Typography variant="text2" sx={{ color: "white" }}>
            Save Item
          </Typography>
        </Button>
        <Button
          sx={{
            backgroundColor: "red",
            width: "243px",
            height: "45px",
          }}
          onClick={handleDelete}
        >
          <Typography variant="text2" sx={{ color: "white" }}>
            Delete Item
          </Typography>
        </Button>
      </Box>
    </Paper>
  );
};

export default EditAccount;
