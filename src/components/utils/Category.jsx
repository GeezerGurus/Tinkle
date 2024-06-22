import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Box, Checkbox, FormControlLabel } from "@mui/material";
import CustomArrowIcon from "./CustomArrowIcon";

export const Category = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    AllCategory: false,
    FoodandBeverages: false,
    Shopping: false,
    Housing: false,
    Transportation: false,
    Vehicle: false,
    LifeandEntertainment: false,
    CommunicationPc: false,
    FinicialExpenses: false,
    Investments: false,
    Income: false,
    Others: false,
    Unknown: false,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen); // Toggle the open state
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false); // Ensure menu closes when an item is clicked or outside click
  };

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box>
      <IconButton
        color="inherit"
        id="resources-button"
        onClick={handleClick}
        aria-controls={open ? "category-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <CustomArrowIcon open={open} />
      </IconButton>
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "resources-button",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          width: "313px",
          height: "520px",
          border: "1px solid transparent",
          backgroundColor: "transparent",
        }}
      >
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.AllCategory}
                onChange={handleCheckboxChange}
                name="AllCategory"
              />
            }
            label="All Category"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.FoodandBeverages}
                onChange={handleCheckboxChange}
                name="FoodandBeverages"
              />
            }
            label="Food & Beverages"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.Shopping}
                onChange={handleCheckboxChange}
                name="Shopping"
              />
            }
            label="Shopping"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.Housing}
                onChange={handleCheckboxChange}
                name="Housing"
              />
            }
            label="Housing"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.Transportation}
                onChange={handleCheckboxChange}
                name="Transportation"
              />
            }
            label="Transportation"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.Vehicle}
                onChange={handleCheckboxChange}
                name="Vehicle"
              />
            }
            label="Vehicle"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.LifeandEntertainment}
                onChange={handleCheckboxChange}
                name="LifeandEntertainment"
              />
            }
            label="Life & Entertainment"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.CommunicationPc}
                onChange={handleCheckboxChange}
                name="CommunicationPc"
              />
            }
            label="Communication, Pc"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.FinicialExpenses}
                onChange={handleCheckboxChange}
                name="FinicialExpenses"
              />
            }
            label="Finicial expenses"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.Investments}
                onChange={handleCheckboxChange}
                name="Investments"
              />
            }
            label="Investments"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.Income}
                onChange={handleCheckboxChange}
                name="Income"
              />
            }
            label="Income"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.Others}
                onChange={handleCheckboxChange}
                name="Others"
              />
            }
            label="Others"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.Unknown}
                onChange={handleCheckboxChange}
                name="Unknown"
              />
            }
            label="Unknown"
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};
