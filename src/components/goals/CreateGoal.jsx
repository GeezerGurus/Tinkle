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
} from "@mui/material";
import { Item } from "../utils";
import { enqueueSnackbar } from "notistack";
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
import { tokens } from "../../theme";
import { postGoal } from "../../api/goals";

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
  bgColor,
  iconF,
  name,
  savedAlready,
  goal,
  dateF,refresh
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [goalName, setGoalName] = useState(name || "");
  const [icon, setIcon] = useState(iconF || "");
  const [color, setColor] = useState(bgColor || "");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(dateF || "no target date");
  const [amount, setAmount] = useState(goal || 0);
  const [saved, setSaved] = useState(savedAlready || 0);
  
  const handleSave =async () => {
    try {
      const newList={
        name: goalName,
        // icon: icon,
        // bgColor: color,
        amount: amount,
        saveamount: saved,
        description: note,
        desireDate: date
      };
      const createdList = await postGoal(newList);
      console.log("New Goal created:", createdList);
      refresh();
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
        height: "auto",
        display: "flex",
        gap: "20px",
        padding: "32px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        position: "relative",
        borderRadius: "8px",
      }}
    >
      {/* Header */}
      <Typography variant="h4">Create Goal</Typography>

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
        />

        {/* Desired Date */}
        <TextField
          type="date"
          label="Desired Date"
          placeholder="To whom have I lent?"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputProps={{
            inputProps: {
              min: "2022-01-01", // Set min and max dates if needed
              max: "2025-12-31",
            },
          }}
        />

        {/* Color Type */}
        <Stack direction={"row"} width={"100%"} gap={2}>
          <FormControl sx={{ width: "80%" }}>
            <InputLabel id="from-account-label" sx={{ color: "black" }}>
              Color
            </InputLabel>
            <Select
              id="from-account-label"
              select
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
            <InputLabel id="icon-label" sx={{ color: "black" }}>
              Icon
            </InputLabel>
            <Select
              id="icon-label"
              value={icon}
              select
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
                return <Item icon={selected} text="" bgColor="black" />;
              }}
            >
              {icons.map((icon) => (
                <MenuItem key={icon} value={icon} sx={{ height: "auto" }}>
                  <Item icon={icon} text="" bgColor="black" iconSize="auto" />
                </MenuItem>
              ))}
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
          onClick={handleSave} refresh={refresh}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
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

export default CreateGoal;
