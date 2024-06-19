import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Slider,
  Typography,
  Menu,
  IconButton,
  Button,
} from "@mui/material";
import CustomArrowIcon from "./CustomArrowIcon";

const NumberRangePicker = ({
  startValue: initialStartValue,
  endValue: initialEndValue,
  onStartChange,
  onEndChange,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [startValue, setStartValue] = useState(initialStartValue);
  const [endValue, setEndValue] = useState(initialEndValue);

  // Effect to update internal state when props change
  useEffect(() => {
    setStartValue(initialStartValue);
    setEndValue(initialEndValue);
  }, [initialStartValue, initialEndValue]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleSliderChange = (event, newValue) => {
    setStartValue(newValue[0]);
    setEndValue(newValue[1]);
    onStartChange(newValue[0]);
    onEndChange(newValue[1]);
  };

  const handleStartInputChange = (event) => {
    const value = parseInt(event.target.value);
    setStartValue(isNaN(value) ? 0 : value);
    if (value > endValue) {
      setEndValue(value);
      onEndChange(value);
    }
    onStartChange(value);
  };

  const handleEndInputChange = (event) => {
    const value = parseInt(event.target.value);
    setEndValue(isNaN(value) ? 100 : value);
    onEndChange(value);
  };

  const handleReset = () => {
    setStartValue(0); // Reset startValue to 0
    setEndValue(0); // Reset endValue to 0
    onStartChange(0); // Trigger onStartChange with 0
    onEndChange(0); // Trigger onEndChange with 0
  };

  return (
    <Box>
      <IconButton
        color="inherit"
        onClick={handleClick}
        aria-controls={open ? "number-range-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <CustomArrowIcon open={open} />
      </IconButton>
      <Menu
        id="number-range-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "number-range-menu" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ width: "1500px", textAlign: "center" }}
      >
        <Box p={2}>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <TextField
              type="number"
              value={startValue}
              onChange={handleStartInputChange}
              inputProps={{ min: 0, max: endValue }}
              variant="outlined"
              sx={{ mr: 2 }}
            />
            <TextField
              type="number"
              value={endValue}
              onChange={handleEndInputChange}
              inputProps={{ min: startValue, max: 100 }}
              variant="outlined"
            />
          </Box>
          <Slider
            value={[startValue, endValue]}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={endValue} // Dynamically set max value of slider
          />

          <Box mt={2}>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default NumberRangePicker;
