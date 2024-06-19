import React, { useState } from "react";
import {
  Paper,
  Box,
  Button,
  Typography,
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowBackIos as ArrowBackIosIcon } from "@mui/icons-material";
import { EntryInput, EntryBox, Item } from "../utils";
import {
  Home as HomeIcon,
  DirectionsCar as DirectionsCarIcon,
  ConnectingAirports as ConnectingAirportsIcon,
  School as SchoolIcon,
  Payments as PaymentsIcon,
  HealthAndSafety as HealthAndSafetyIcon,
  WineBar as WineBarIcon,
  CardGiftcard as CardGiftcardIcon,
  Settings as SettingsIcon,
  Pets as PetsIcon,
  Celebration as CelebrationIcon,
  ChildFriendly as ChildFriendlyIcon,
  Computer as ComputerIcon,
} from "@mui/icons-material";

const menuProps = {
  PaperProps: {
    style: {
      width: "80px",
      maxHeight: "144px",
      backgroundColor: "white",
      border: "1px solid black",
    },
  },
};

const icons = [
  <HomeIcon />,
  <DirectionsCarIcon />,
  <ConnectingAirportsIcon />,
  <SchoolIcon />,
  <PaymentsIcon />,
  <HealthAndSafetyIcon />,
  <WineBarIcon />,
  <CardGiftcardIcon />,
  <SettingsIcon />,
  <PetsIcon />,
  <CelebrationIcon />,
  <ChildFriendlyIcon />,
  <ComputerIcon />,
];

const colors = [
  "red",
  "blue",
  "green",
  "purple",
  "orange",
  "brown",
  "teal",
  "pink",
  "grey",
  "yellow",
  "lightblue",
  "lightgreen",
  "magenta",
];

export const EditGoal = ({
  onClose,
  bgColor,
  iconF,
  name,
  savedAlready,
  goal,
  dateF,
}) => {
  const [goalName, setGoalName] = useState(name || "");
  const [icon, setIcon] = useState(iconF || "");
  const [color, setColor] = useState(bgColor || "");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(dateF || "no target date");
  const [amount, setAmount] = useState(goal || 0);
  const [saved, setSaved] = useState(savedAlready || 0);
  const handleSave = () => {
    console.log({
      name: goalName,
      icon: icon,
      bgColor: color,
      amount: amount,
      saved: saved,
      note: note,
    });
  };
  return (
    <Paper
      sx={{
        width: "823px",
        height: "521px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        position: "relative",
      }}
    >
      {/* Header Section */}
      {/* Cancel Button */}
      <Button
        onClick={onClose}
        variant="outlined"
        startIcon={<ArrowBackIosIcon />}
        sx={{
          border: "none",
          position: "absolute",
          top: 0,
          left: 0,
          margin: "16px",
        }}
      >
        <Typography variant="title2">Back</Typography>
      </Button>
      {/* Header */}
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "32px",
          color: "black",
          lineHeight: "150%",
          letterSpacing: "-1%",
        }}
      >
        Edit Goal
      </Typography>
      {/* Close Button */}
      <CloseIcon
        onClick={onClose}
        sx={{
          margin: "16px",
          top: "0",
          right: "0",
          position: "absolute",
          color: "black",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          "&:hover": {
            color: "white",
            backgroundColor: "black",
          },
          "&:active": {
            color: "white",
            backgroundColor: "grey",
          },
        }}
      />
      {/* Middle Section */}
      <Box
        sx={{
          width: "643px",
          height: "317px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* Goal Name */}
        <EntryBox>
          <Typography variant="text2">Goal Name:</Typography>
          <FormControl>
            <EntryInput
              value={goalName || ""}
              onChange={(e) => setGoalName(e.target.value)}
            />
          </FormControl>
        </EntryBox>
        {/* Target Amount */}
        <EntryBox>
          <Typography variant="text2">Amount:</Typography>
          <FormControl>
            <EntryInput
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputProps={{ min: "0" }}
              endAdornment={<InputAdornment position="end">MMK</InputAdornment>}
            />
          </FormControl>
        </EntryBox>
        {/* Saved Already */}
        <EntryBox>
          <Typography variant="text2">Saved Already:</Typography>
          <FormControl>
            <EntryInput
              type="number"
              value={saved}
              onChange={(e) => setSaved(e.target.value)}
              inputProps={{ min: "0" }}
              endAdornment={<InputAdornment position="end">MMK</InputAdornment>}
            />
          </FormControl>
        </EntryBox>
        {/* Desired Date */}
        <EntryBox>
          <Typography variant="text2">Desired Date:</Typography>
          <FormControl>
            <EntryInput
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputProps={{
                inputProps: {
                  min: "2022-01-01", // Set min and max dates if needed
                  max: "2025-12-31",
                },
              }}
            />
          </FormControl>
        </EntryBox>
        {/* Color Type */}
        <EntryBox>
          <Typography variant="text2">Type Color:</Typography>
          <Select
            sx={{
              width: "343px",
              height: "40px",
              backgroundColor: color,
              "&:hover": {
                borderColor: "black",
              },
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
              },
            }}
            value={color}
            onChange={(e) => setColor(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Typography variant="placeholder">
                    Choose your color
                  </Typography>
                );
              }
              return (
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: selected,
                    borderRadius: "50%",
                  }}
                />
              );
            }}
          >
            {colors.map((color) => (
              <MenuItem
                key={color}
                value={color}
                sx={{ backgroundColor: color, height: "30px" }}
              />
            ))}
          </Select>
          {/* Icon Selection */}
          <Typography variant="text2">Icon:</Typography>
          <Select
            value={icon}
            MenuProps={menuProps}
            onChange={(e) => setIcon(e.target.value)}
            sx={{
              width: "57px",
              height: "40px",
              border: "1.5px solid black",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              color: "black",
              "&:hover": {
                borderColor: "black",
              },
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
              "& .MuiSelect-icon": {
                color: "black", // Change the dropdown icon color here
                position: "absolute",
                top: "28%",
                left: "70%",
              },
            }}
            displayEmpty
            renderValue={(selected) => {
              return <Item icon={selected} text="" bgColor="black" />;
            }}
          >
            {icons.map((icon) => (
              <MenuItem
                key={icon}
                value={icon}
                sx={{ color: "black", height: "50px" }}
              >
                <Item icon={icon} text="" bgColor="black" iconSize="35px" />
              </MenuItem>
            ))}
          </Select>
        </EntryBox>
        {/* Note */}
        <EntryBox>
          <Typography variant="text2">Note:</Typography>
          <FormControl>
            <EntryInput
              multiline
              rows={2}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              variant="outlined"
              sx={{
                height: "65px",
              }}
            />
          </FormControl>
        </EntryBox>
      </Box>
      {/* Bottom Section */}
      <Button
        onClick={handleSave}
        variant="contained"
        sx={{
          width: "243px",
          height: "44px",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        Create
      </Button>
    </Paper>
  );
};

export default EditGoal;
