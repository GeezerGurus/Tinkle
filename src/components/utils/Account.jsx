import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CustomArrowIcon from "./CustomArrowIcon";

export const Account = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("all");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen); // Toggle the open state
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    handleClose(); // Close the menu after selecting an option
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          width: "186px",
        }}
      >
        <MenuItem>
          <FormControlLabel
            value="all"
            control={
              <Radio
                checked={selectedValue === "all"}
                onChange={handleRadioChange}
              />
            }
            label="All Accounts"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            value="cash"
            control={
              <Radio
                checked={selectedValue === "cash"}
                onChange={handleRadioChange}
              />
            }
            label="Cash"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            value="bank"
            control={
              <Radio
                checked={selectedValue === "bank"}
                onChange={handleRadioChange}
              />
            }
            label="Bank Account"
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};
