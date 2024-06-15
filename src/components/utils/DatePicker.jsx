import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  ButtonGroup,
  Button,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CustomArrowIcon from "./CustomArrowIcon";
import WeekPicker from "../utils/WeekPicker";
import MonthPicker from "../utils/MonthPicker";
import YearPicker from "../utils/YearPicker";
export const DatePicker = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  //for button
  const [range, clickRange] = useState(false);
  const [week, clickWeek] = useState(false);
  const [month, clickMonth] = useState(false);
  const [year, clickYear] = useState(false);

  // for range radio
  const [selectedValue, setSelectedValue] = useState("all");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen); // Toggle the open state
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false); // Ensure menu closes when an item is clicked or outside click
  };

  // for buttons
  const rangeClick = () => {
    clickRange((prevRange) => !prevRange);
    clickWeek(false);
    clickMonth(false);
    clickYear(false);
  };
  const weekClick = () => {
    clickRange(false);
    clickWeek((prevWeeks) => !prevWeeks);
    clickMonth(false);
    clickYear(false);
  };
  const monthClick = () => {
    clickRange(false);
    clickWeek(false);
    clickMonth((prevMonths) => !prevMonths);
    clickYear(false);
  };
  const yearClick = () => {
    clickRange(false);
    clickWeek(false);
    clickMonth(false);
    clickYear((prevYears) => !prevYears);
  };

  // for range
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Box>
      <IconButton
        color="inherit"
        id="resources-button"
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <CustomArrowIcon open={open} />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "resources-button",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          width: "1500px",
          textAlign: "center",
        }}
      >
        <ButtonGroup variant="outlined" color="primary">
          <Button onClick={rangeClick}>Range</Button>
          <Button onClick={weekClick}>Weeks</Button>
          <Button onClick={monthClick}>Months</Button>
          <Button onClick={yearClick}>Years</Button>
        </ButtonGroup>

        {range && (
          <Box display="flex">
            <Box>
              <MenuItem>
                <FormControlLabel
                  value="LsevenDay"
                  control={
                    <Radio
                      checked={selectedValue === "LsevenDay"}
                      onChange={handleRadioChange}
                    />
                  }
                  label="Last 7 days"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  value="Lthirtyday"
                  control={
                    <Radio
                      checked={selectedValue === "Lthirtyday"}
                      onChange={handleRadioChange}
                    />
                  }
                  label="Last 30 days"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  value="Lnintyday"
                  control={
                    <Radio
                      checked={selectedValue === "Lnintyday"}
                      onChange={handleRadioChange}
                    />
                  }
                  label="Last 90 days"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  value="Ltewlvemonths"
                  control={
                    <Radio
                      checked={selectedValue === "Ltewlvemonths"}
                      onChange={handleRadioChange}
                    />
                  }
                  label="Last 12 months"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  value="All"
                  control={
                    <Radio
                      checked={selectedValue === "All"}
                      onChange={handleRadioChange}
                    />
                  }
                  label="All"
                />
              </MenuItem>
            </Box>
            <Box>
              <MenuItem>
                <FormControlLabel
                  value="Today"
                  control={
                    <Radio
                      checked={selectedValue === "Today"}
                      onChange={handleRadioChange}
                    />
                  }
                  label="Today"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  value="ThisWeek"
                  control={
                    <Radio
                      checked={selectedValue === "ThisWeek"}
                      onChange={handleRadioChange}
                    />
                  }
                  label="This Week"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  value="ThisMonth"
                  control={
                    <Radio
                      checked={selectedValue === "ThisMonth"}
                      onChange={handleRadioChange}
                    />
                  }
                  label="This Month"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  value="This year"
                  control={
                    <Radio
                      checked={selectedValue === "This year"}
                      onChange={handleRadioChange}
                    />
                  }
                  label="This year"
                />
              </MenuItem>
            </Box>
          </Box>
        )}
        {week && <WeekPicker />}
        {month && <MonthPicker />}
        {year && <YearPicker />}
      </Menu>
    </Box>
  );
};
