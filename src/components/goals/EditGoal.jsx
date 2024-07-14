import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import {
  Paper,
  Box,
  Button,
  Typography,
  InputAdornment,
  MenuItem,
  TextField,
  Stack,
  useTheme,
  Select,
  InputLabel,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import { Item } from "../utils";

import { tokens } from "../../theme";
import { patchGoal } from "../../api/goals";
import { CategoryIcons } from "../utils";

const input_colors = [
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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

export const EditGoal = ({
  onClose,
  id,
  bgColor,
  iconF,
  savedAlready,
  goal,
  name,
  dateF,
  description,
  refresh,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [errors, setErrors] = useState({});
  const [goalName, setGoalName] = useState(name || "");
  const [icon, setIcon] = useState(iconF || "");
  const [color, setColor] = useState(bgColor || "");
  const [note, setNote] = useState(description || "");
  const [date, setDate] = useState(formatDate(dateF) || "no target date");
  const [amount, setAmount] = useState(goal || 0);
  const [saved, setSaved] = useState(savedAlready || 0);

  const validateForm = () => {
    const errors = {};
    if (goalName.length < 1) {
      errors.goalName = "Please Enter a Goal Name";
    }
    if (saved <= 0) {
      errors.saved = "Amount must be greater than 0";
    } else if (saved > amount) {
      errors.saved = "Amount must not be larger than the goal";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const newList = {
        name: goalName,
        icon: icon,
        color: color,
        amount: amount,
        saveamount: saved,
        description: note,
        desireDate: date,
      };
      const createdList = await patchGoal(id, newList);
      console.log("New Goal Saved:", createdList);
      refresh();
      enqueueSnackbar("Goal Saved!", { variant: "success" });
      onClose();
    } catch (error) {
      console.error("Error editing Goal:", error);
    }
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("xs"));


  return (
    <Paper
      sx={{
        width: isSmallScreen ? "350px" : "686px",
        height: "auto",
        display: "flex",
        gap: "20px",
        padding: "32px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        position: "relative",
        borderRadius: "8px",
        backgroundColor: colors.backGround,
        border: `1px solid  ${colors.panel.panelBorder}`,
      }}
    >
      {/* Header */}
      <Typography variant="h4">Edit Goal</Typography>

      {/* Middle Section */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          padding: isSmallScreen ? "0px" : "0 80px",
          gap: "10px",
        }}
      >
        {/* Goal Name */}
        <TextField
          fullWidth
          label="Name"
          placeholder="What are you saving for?"
          InputLabelProps={{
            shrink: true,
          }}
          value={goalName || ""}
          onChange={(e) => setGoalName(e.target.value)}
          error={!!errors.goalName}
          helperText={errors.goalName}
        />

        {/* Target Amount */}
        <TextField
          fullWidth
          type="number"
          label="Target Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputProps={{ min: "0" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.amount}
          helperText={errors.amount}
        />

        {/* Saved Already */}
        <TextField
          type="number"
          label="Saved Already"
          fullWidth
          value={saved}
          onChange={(e) => setSaved(e.target.value)}
          inputProps={{ min: "0" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.saved}
          helperText={errors.saved}
        />

        {/* Desired Date */}
        <TextField
          type="text"
          label="Desired Date"
          placeholder="To whom have I lent?"
          fullWidth
          value={formatDate(date)}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Color Type */}
        <Stack direction={"row"} width={"100%"} gap={2}>
          <FormControl sx={{ width: "80%" }}>
            <InputLabel
              id="from-account-label"
              sx={{ color: colors.text.text1 }}
            >
              Color
            </InputLabel>
            <Select
              id="from-account-label"
              label="From Account"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Choose your color"
              displayEmpty
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 32 * 4.5,
                    width: 250,
                  },
                },
              }}
              renderValue={(selected) => {
                return (
                  <Box
                    sx={{
                      width: "100%",
                      height: "30px",
                      backgroundColor: selected,
                    }}
                  />
                );
              }}
            >
              {input_colors.map((color) => (
                <MenuItem key={color} value={color}>
                  <Box
                    sx={{
                      backgroundColor: color,
                      width: "100%",
                      height: "32px",
                    }}
                  ></Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Icon Selection */}
          <FormControl sx={{ flexGrow: 1 }}>
            <InputLabel id="icon-label" sx={{ color: colors.text.text1 }}>              
            Icon
            </InputLabel>
            <Select
              id="icon-label"
              value={icon}
              label="Icon"
              onChange={(e) => setIcon(e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 32 * 4.5,
                    width: 48,
                  },
                },
              }}
              renderValue={(selected) => {
                return (
                  <Item
                    icon={CategoryIcons[selected]}
                    text=""
                    bgColor="black"
                  />
                );
              }}
            >
              {Object.keys(CategoryIcons).map((key) => {
                const IconComponent = CategoryIcons[key];
                return (
                  <MenuItem key={key} value={key}>
                    <IconComponent />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>

        {/* Note */}
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Description"
          multiline
          maxRows={4}
          placeholder="Enter a description (optional)"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </Box>

      {/* Bottom Section */}
      <Stack
        gap={isSmallerScreen ? 1 : 2}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Button
          onClick={handleSave}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
            borderRadius: "8px",
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
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default EditGoal;
