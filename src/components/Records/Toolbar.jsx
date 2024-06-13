import {
  Box,
  IconButton,
  InputBase,
  Collapse,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";

const RecordBar = () => <Box></Box>;

const FilterBar = () => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "882px",
        height: "48px",
        display: "flex",
        justifyContent: "flex-end",
        //backgroundColor: "green",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "291px",
          height: "100%",
          padding: "0px 0px",
        }}
      >
        <Typography
          sx={{
            lineHeight: "24px",
            fontWeight: "400",
            fontSize: "16px",
            padding: "8px 0px",
          }}
        >
          Sort By
        </Typography>
        <FormControl
          sx={{ width: "222px", height: "45px", padding: "0px 8px" }}
        >
          <InputLabel id="sort-by-label">Select Option</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortOption}
            label="Select Option"
            onChange={handleSortChange}
          >
            <MenuItem value={"option1"}>Time(Newest first)</MenuItem>
            <MenuItem value={"option2"}>Time(Latest first)</MenuItem>
            <MenuItem value={"option3"}>Amount(Highest first)</MenuItem>
            <MenuItem value={"option4"}>Amount(Lowest first)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

const DeleteBar = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      width: "782px",
      height: "48px",
      borderRadius: "8px",
      alignItems: "center",
      border: "1px solid black",
      padding: "0 8px",
    }}
  >
    {/* cancle button */}
    <Button
      sx={{
        width: "86px",
        height: "38px",
        backgroundColor: "#413EC5",
        color: "white",
        fontSize: "16px",
        lineHeight: "24px",
      }}
    >
      Cancel
    </Button>
    <Typography
      sx={{
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: "600",
      }}
    >
      Total Change - +0 MMK
    </Typography>
    <IconButton
      size="large"
      sx={{
        width: "32px",
        height: "31px",
      }}
    >
      <DeleteIcon
        sx={{
          color: "red",
        }}
        fontSize="large"
      />
    </IconButton>
  </Box>
);

const Toolbar = () => {
  const [activeBar, setActiveBar] = useState(null);
  const [search, setSearch] = useState(false);

  const handleClick = (btn) => {
    if (activeBar === btn) {
      setActiveBar(null); // Close the active bar if the same button is clicked
    } else {
      setActiveBar(btn);
    }
  };

  const handleSearchToggle = () => {
    setSearch((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        width: "1296px",
        height: "48px",
        backgroundColor: "white",
        color: "black",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "181px",
          height: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: "600",
            lineHeight: "48px",
            letterSpacing: "1%",
            color: "black",
          }}
        >
          Transactions
        </Typography>
      </Box>
      {activeBar === "record" && <RecordBar />}
      {activeBar === "filter" && <FilterBar />}
      {activeBar === "delete" && <DeleteBar />}
      {/* Button Box */}
      <Box
        sx={{
          gap: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          //backgroundColor: "red",
        }}
      >
        {/* Search Icon */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Collapse in={search} orientation="horizontal">
            <Box
              sx={{
                width: "221px",
                border: "1px solid black",
                borderRadius: "8px",
                display: "flex",
                gap: "12px",
                padding: "0 12px",
                transition: "width 0.3s",
              }}
            >
              <IconButton
                size="large"
                onClick={handleSearchToggle}
                sx={{
                  width: "24px",
                  height: "38px",
                  borderRadius: "8px",
                }}
              >
                <SearchIcon sx={{ color: "black" }} fontSize="large" />
              </IconButton>
              <InputBase
                sx={{ flex: 1, color: "black" }}
                placeholder="Search..."
              />
            </Box>
          </Collapse>
          {!search && (
            <IconButton
              size="large"
              onClick={handleSearchToggle}
              sx={{
                width: "24px",
                height: "38px",
                borderRadius: "8px",
              }}
            >
              <SearchIcon sx={{ color: "black" }} fontSize="large" />
            </IconButton>
          )}
        </Box>
        <Button
          onClick={() => handleClick("record")}
          sx={{
            width: "97px",
            height: "38px",
            borderRadius: "8px",
            backgroundColor: activeBar === "record" ? "darkgray" : "black",
            color: "white",
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: "500",
          }}
        >
          +Record
        </Button>
        <IconButton
          size="large"
          onClick={() => handleClick("filter")}
          sx={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        >
          <FilterListIcon sx={{ color: "black" }} />
        </IconButton>
        <IconButton
          onClick={() => handleClick("delete")}
          size="large"
          sx={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        >
          <DoneAllIcon sx={{ color: "black" }} />
        </IconButton>
        <IconButton
          size="large"
          sx={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        >
          <DescriptionIcon sx={{ color: "black" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Toolbar;
