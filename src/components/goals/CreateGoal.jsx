import React, { useState } from "react";
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
  FormHelperText,
} from "@mui/material";
import { Item } from "../utils";
import { enqueueSnackbar } from "notistack";
import CategoryIcons from "../utils/CategoryIcons";
import { tokens } from "../../theme";
import { postGoal } from "../../api/goals";

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

export const CreateGoal = ({
  onClose,
  bg,
  iconF,
  name,
  savedAlready,
  goal,
  dateF,
  refresh,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [errors, setErrors] = useState({});
  const [goalName, setGoalName] = useState(name || "");
  const [icon, setIcon] = useState(iconF || "");
  const [color, setColor] = useState(bg || "");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(dateF || "");
  const [amount, setAmount] = useState(goal || "");
  const [saved, setSaved] = useState(savedAlready || "");

  const validateForm = () => {
    const errors = {};
    if (!goalName) {
      errors.goalName = "Goal Name is required";
    }
    if (!amount) {
      errors.amount = "Amount is required";
    } else if (amount <= 0) {
      errors.amount = "Amount must be greater than 0";
    }
    if (!saved) {
      errors.saved = "Saved Amount is required";
    }
    if (!date) {
      errors.date = "Date is required";
    }
    if (!color) {
      errors.color = "Please select a color";
    }
    if (!icon) {
      errors.icon = "Please select an icon";
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
      const createdList = await postGoal(newList);
      console.log("New Goal created:", createdList);
      window.location.reload();
      enqueueSnackbar("Goal created!", { variant: "success" });
      onClose();
    } catch (error) {
      console.error("Error creating new Goal:", error);
    }
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "350px" : "686px",
        height: isSmallScreen ? "90%" : "auto",
        display: "flex",
        gap: "20px",
        padding: isSmallScreen ? "8px" : "32px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        position: "relative",
        borderRadius: "8px",
        backgroundColor: colors.backGround,
        border: `1px solid ${colors.panel.panelBorder}`,
      }}
    >
      <Typography variant="h4">Create Goal</Typography>

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
        <TextField
          fullWidth
          label="Name"
          placeholder="What are you saving for?"
          required
          InputLabelProps={{
            shrink: true,
            required: true,
          }}
          value={goalName || ""}
          onChange={(e) => setGoalName(e.target.value)}
          error={!!errors.goalName}
          helperText={errors.goalName}
          InputProps={{
            sx: { height: isSmallScreen ? "42px" : undefined },
          }}
        />

        <TextField
          fullWidth
          type="number"
          label="Target Amount"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputProps={{ min: "0" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
            sx: { height: isSmallScreen ? "42px" : undefined },
          }}
          InputLabelProps={{
            shrink: true,
            required: true,
          }}
          error={!!errors.amount}
          helperText={errors.amount}
        />

        <TextField
          type="number"
          label="Saved Already"
          required
          fullWidth
          value={saved}
          onChange={(e) => setSaved(e.target.value)}
          inputProps={{ min: "0" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
            sx: { height: isSmallScreen ? "42px" : undefined },
          }}
          InputLabelProps={{
            shrink: true,
            required: true,
          }}
          error={!!errors.saved}
          helperText={errors.saved}
        />

        <TextField
          type="date"
          label="Desired Date"
          required
          placeholder="To whom have I lent?"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputProps={{
            sx: { height: isSmallScreen ? "42px" : undefined },

            inputProps: {
              min: "2022-01-01",
              max: "2025-12-31",
            },
          }}
          InputLabelProps={{
            required: true,
            shrink: true,
          }}
          error={!!errors.date}
          helperText={errors.date}
        />

        <Stack direction={"row"} width={"100%"} gap={2}>
          <FormControl sx={{ width: "80%" }}>
            <InputLabel id="color-label" sx={{ color: colors.text.text1 }}>
              Color
            </InputLabel>
            <Select
              labelId="color-label"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              displayEmpty
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 32 * 4.5,
                    width: 250,
                  },
                },
              }}
              error={!!errors.color}
              renderValue={(selected) => (
                <Box
                  sx={{
                    width: "100%",
                    height: "30px",
                    backgroundColor: selected,
                  }}
                />
              )}
            >
              {input_colors.map((color) => (
                <MenuItem key={color} value={color}>
                  <Box
                    sx={{
                      backgroundColor: color,
                      width: "100%",
                      height: "32px",
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
            {errors.color && (
              <FormHelperText sx={{ color: "red" }}>
                Select a color
              </FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ flexGrow: 1 }}>
            <InputLabel id="icon-label" sx={{ color: colors.text.text1 }}>
              Icon
            </InputLabel>
            <Select
              labelId="icon-label"
              value={icon}
              required
              onChange={(e) => setIcon(e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 32 * 4.5,
                    width: 48,
                  },
                },
              }}
              renderValue={(selected) => (
                <Item icon={CategoryIcons[selected]} text="" bgColor="black" />
              )}
              error={!!errors.icon}
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
            {errors.icon && (
              <FormHelperText sx={{ color: "red", display: "flex" }}>
                Select an Icon
              </FormHelperText>
            )}
          </FormControl>
        </Stack>

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
          InputProps={{
            sx: { height: isSmallScreen ? "42px" : undefined },
          }}
        />
      </Box>

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
            backgroundColor: colors.button.button1,
            textTransform: "none",
            color: "white",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2">Create</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.button.button2,
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

export default CreateGoal;
