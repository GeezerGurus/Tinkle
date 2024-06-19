import {
  Paper,
  IconButton,
  Typography,
  FormControl,
  Button,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import HouseIcon from "@mui/icons-material/House";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { EntryBox, EntryInput, EntrySelect, Item } from "../utils";

const CreateAccount = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  const handleCreate = () => {
    console.log("Created!");
  };

  const categories = [
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
      <Typography variant="h4">Create Account</Typography>
      {/* Form */}
      <EntryBox>
        <Typography variant="body1">Account Name:</Typography>
        <FormControl>
          <EntryInput placeholder="Enter name" />
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
        <Typography variant="body1">Category:</Typography>
        <FormControl>
          <EntrySelect
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            displayEmpty
            MenuProps={menuProps}
            renderValue={(selected) =>
              selected ? (
                <Item {...categories.find((cat) => cat.value === selected)} />
              ) : (
                <Typography variant="placeholder">Choose a category</Typography>
              )
            }
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                <Item {...category} />
              </MenuItem>
            ))}
          </EntrySelect>
        </FormControl>
      </EntryBox>
      {/* Save button */}
      <Button
        onClick={handleCreate}
        sx={{
          backgroundColor: "black",
          width: "243px",
          height: "45px",
        }}
      >
        <Typography variant="body1" sx={{ color: "white" }}>
          Create
        </Typography>
      </Button>
    </Paper>
  );
};

export default CreateAccount;
