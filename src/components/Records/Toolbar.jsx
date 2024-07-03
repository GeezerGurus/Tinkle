import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {
  FilterList as FilterListIcon,
  DoneAll as DoneAllIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme";

const Toolbar = ({ tableState, setTableState }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Function to handle button click and toggle state
  const handleButtonClick = (action) => {
    if (tableState === action) {
      // Toggle off if the same button is pressed again
      setTableState("");
    } else {
      // Otherwise, set the new state
      setTableState(action);
    }
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
      <Typography
        variant="h4"
        sx={{ borderBottom: `3px solid ${colors.purple[600]}`, height: "100%" }}
      >
        Transactions
      </Typography>
      <Box
        sx={{
          gap: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          size="large"
          onClick={() => handleButtonClick("filter")}
          sx={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            border: `1px solid ${colors.purple[600]}`,
            backgroundColor: tableState === "filter" ? colors.purple[600] : "",
          }}
        >
          <FilterListIcon
            sx={{
              color: tableState === "filter" ? "white" : colors.purple[600],
            }}
          />
        </IconButton>
        <IconButton
          onClick={() => handleButtonClick("edit")}
          size="large"
          sx={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            border: `1px solid ${colors.purple[600]}`,
            backgroundColor: tableState === "edit" ? colors.purple[600] : "",
          }}
        >
          <DoneAllIcon
            sx={{
              color: tableState === "edit" ? "white" : colors.purple[600],
            }}
          />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => handleButtonClick("export")}
          sx={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            border: `1px solid ${colors.purple[600]}`,
            backgroundColor: tableState === "export" ? colors.purple[600] : "",
          }}
        >
          <DescriptionIcon
            sx={{
              color: tableState === "export" ? "white" : colors.purple[600],
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Toolbar;
