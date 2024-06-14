import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Collapse,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  DoneAll as DoneAllIcon,
  Description as DescriptionIcon,
  DeleteOutlined as DeleteOutlinedIcon,
} from "@mui/icons-material";
import { RecordBtn } from "../utils";

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
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "291px",
          height: "100%",
          alignItems: "center",
          gap: "17px",
          marginRight: "24px",
        }}
      >
        <Typography
          sx={{
            lineHeight: "24px",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          Sort By
        </Typography>
        <FormControl>
          <Select
            value={sortOption}
            onChange={handleSortChange}
            sx={{
              color: "#828282",
              width: "222px",
              height: "45px",
              padding: "0px 8px",
            }}
          >
            <MenuItem value="option1">Time (Newest first)</MenuItem>
            <MenuItem value="option2">Time (Latest first)</MenuItem>
            <MenuItem value="option3">Amount (Highest first)</MenuItem>
            <MenuItem value="option4">Amount (Lowest first)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

const DeleteBar = ({ handleClick }) => (
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
    <Button
      onClick={() => handleClick("delete")}
      sx={{
        width: "86px",
        height: "38px",
        backgroundColor: "#413EC5",
        borderRadius: "8px",
        color: "white",
        fontSize: "16px",
        lineHeight: "24px",
        textTransform: "none",
      }}
    >
      Cancel
    </Button>
    <Typography
      sx={{
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: 600,
      }}
    >
      Total Change - <span style={{ color: "#43BC63" }}>+0 MMK</span>
    </Typography>
    <IconButton
      size="large"
      onClick={() => handleClick("delete")} // Ensure handleClick is passed down correctly
      sx={{
        width: "32px",
        height: "31px",
      }}
    >
      <DeleteOutlinedIcon
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
    if (btn !== "search" && search) {
      setSearch(false);
    }
    setActiveBar((prev) => (prev === btn ? null : btn));
  };

  const handleSearchToggle = () => {
    if (activeBar !== null) {
      setActiveBar(null);
    }
    setSearch((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: "1296px",
        height: "48px",
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
            fontWeight: 600,
            lineHeight: "48px",
            letterSpacing: "1%",
            color: "black",
          }}
        >
          Transactions
        </Typography>
      </Box>
      {activeBar === "filter" && <FilterBar />}
      {activeBar === "delete" && <DeleteBar handleClick={handleClick} />}{" "}
      {/* Pass handleClick function to DeleteBar */}
      <Box
        sx={{
          gap: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Collapse
            in={search}
            orientation="horizontal"
            collapsedSize={40}
            sx={{ transition: "width 0.5s ease-in" }}
          >
            <Box
              sx={{
                width: "221px",
                border: search ? "1px solid black" : "none",
                borderRadius: "8px",
                display: "flex",
                gap: "12px",
                padding: "0 12px",
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
        </Box>
        <RecordBtn />
        <IconButton
          size="large"
          onClick={() => handleClick("filter")}
          sx={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            border: "1px solid black",
            backgroundColor: activeBar === "filter" ? "black" : "white",
            borderColor: activeBar === "filter" ? "white" : "black",
          }}
        >
          <FilterListIcon
            sx={{ color: activeBar === "filter" ? "white" : "black" }}
          />
        </IconButton>
        <IconButton
          onClick={() => handleClick("delete")}
          size="large"
          sx={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            border: "1px solid",
            borderColor: activeBar === "delete" ? "white" : "black",
            backgroundColor: activeBar === "delete" ? "black" : "white",
          }}
        >
          <DoneAllIcon
            sx={{ color: activeBar === "delete" ? "white" : "black" }}
          />
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
