import React from "react";
import { Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DescriptionIcon from "@mui/icons-material/Description";

const ButtonBox = ({ activeBar, setActiveBar }) => {
  const handleClick = (bar) => {
    if (activeBar === bar) {
      setActiveBar(null); // Close the active bar if the same button is clicked
    } else {
      setActiveBar(bar);
    }
  };

  return (
    <Box
      sx={{
        height: "38px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "5px",
      }}
    >
      <Button
        onClick={() => handleClick("search")}
        sx={{
          width: "38px",
          height: "38px",
        }}
      >
        <SearchIcon sx={{ width: "24px", height: "24px", marginTop: "7px" }} />
      </Button>
      <Button
        onClick={() => handleClick("record")}
        sx={{
          marginLeft: "9px",
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
      <Button
        onClick={() => handleClick("filter")}
        sx={{
          width: "38px",
          height: "38px",
          marginLeft: "9px",
          borderRadius: "8px",
          border: "1px solid black",
        }}
      >
        <FilterListIcon />
      </Button>
      <Button
        sx={{
          width: "38px",
          height: "38px",
          marginLeft: "9px",
          borderRadius: "8px",
          border: "1px solid black",
        }}
      >
        <DoneAllIcon />
      </Button>
      <Button
        sx={{
          width: "38px",
          height: "38px",
          marginLeft: "9px",
          borderRadius: "8px",
          border: "1px solid black",
        }}
      >
        <DescriptionIcon />
      </Button>
    </Box>
  );
};

export default ButtonBox;
