import React, { useCallback, useEffect, useState } from "react";
import {
  Paper,
  Typography,
  useTheme,
  TextField,
  Stack,
  Button,
  useMediaQuery,
} from "@mui/material";
import { postItemsToBuy } from "../../api/itemsToBuy";
import { tokens } from "../../theme";

const AddItem = ({ onClose, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSaveItem = useCallback(async () => {
    try {
      await postItemsToBuy({ name, description });
      refresh();
      onClose();
    } catch (error) {
      console.error("Error adding new item:", error);
      throw error;
    }
  }, [name, description, refresh, onClose]);

  // Enter or Esc key pressed handling
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSaveItem(event);
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSaveItem, onClose]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        padding: isSmallScreen ? "16px 26px" : "32px 116px",
        width: isSmallScreen ? "359px" : "710px",
        height: isSmallScreen ? "416px" : "426px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* Title  */}
      <Typography variant="h4" sx={{ color: colors.purple[900] }}>
        Add Item
      </Typography>

      {/* Form  */}
      <TextField
        fullWidth
        label="Name"
        placeholder="What is it?"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isSmallScreen ? "42px" : undefined },
        }}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        maxRows={2}
        placeholder="Enter a description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Buttons  */}
      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Button
          onClick={handleSaveItem}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
          }}
        >
          <Typography variant="body2">Save</Typography>
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

export default AddItem;
