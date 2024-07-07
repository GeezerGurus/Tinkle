import React, { useState, useCallback } from "react";
import {
  Paper,
  Typography,
  useTheme,
  Button,
  ButtonGroup,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import Expense from "./Expense";
import Income from "./Income";
import Transfer from "./Transfer";

const AddRecord = ({ onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [page, setPage] = useState("expense");

  const handlePageChange = useCallback((value) => {
    setPage(value);
  }, []);

  const buttonStyles = {
    borderRadius: "16px",
    height: "40px",
    flexGrow: 1,
    textTransform: "none",
  };

  const pageComponent = (() => {
    switch (page) {
      case "expense":
        return <Expense />;
      case "income":
        return <Income />;
      case "transfer":
        return <Transfer />;
      default:
        return null;
    }
  })();

  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        position: "relative",
        padding: isLargest ? "8px 0" : "24px 0",
        width: isMediumScreen ? "95vw" : "686px",
        height: isLargest ? "95vh" : "805px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ color: colors.purple[900] }}>
        Add Record
      </Typography>
      <ButtonGroup
        sx={{
          width: "80%",
          borderRadius: "16px",
          border: `1px solid ${colors.purple[600]}`,
        }}
      >
        {["expense", "income", "transfer"].map((type) => (
          <Button
            key={type}
            onClick={() => handlePageChange(type)}
            sx={{
              ...buttonStyles,
              backgroundColor: page === type ? colors.purple[600] : "white",
              color: page === type ? "white" : colors.purple[600],
              "&:hover": {
                backgroundColor:
                  page === type ? colors.purple[200] : colors.purple[100],
                color: "white",
              },
            }}
          >
            <Typography variant="body2">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Typography>
          </Button>
        ))}
      </ButtonGroup>

      {/* Conditional Rendering */}
      {pageComponent}

      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
      >
        <Button
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
          }}
        >
          <Typography variant="body2">Add</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[200],
            textTransform: "none",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default React.memo(AddRecord);
