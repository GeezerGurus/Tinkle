import React, { useState } from "react";
import {
  Paper,
  IconButton,
  Typography,
  FormControl,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { EntryBox, EntryInput } from "../utils";
import { tokens } from "../../theme";

const EditList = ({ onClose, name, description }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [listName, setListName] = useState(name || "");
  const [listDescription, setListDescription] = useState(description || "");

  const handleSave = () => {
    console.log({
      name: listName,
      description: listDescription,
    });
  };

  const handleDelete = () => {
    console.log("List deleted");
  };

  return (
    // Container
    <Paper
      sx={{
        width: "710px",
        height: "426px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* Close button  */}
      <IconButton
        onClose={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
        onClick={onClose}
      >
        <CloseIcon fontSize="large" />
      </IconButton>

      {/* Title  */}
      <Typography variant="title3">Edit List</Typography>

      {/* Form  */}
      <EntryBox>
        <Typography variant="text2">Name:</Typography>
        <FormControl>
          <EntryInput
            placeholder="Enter name"
            value={listName || ""}
            onChange={(e) => setListName(e.target.value)}
          />
        </FormControl>
      </EntryBox>
      <EntryBox>
        <Typography variant="text2">Description:</Typography>
        <FormControl>
          <EntryInput
            placeholder="Enter a description (optional)"
            value={listDescription || ""}
            onChange={(e) => setListDescription(e.target.value)}
          />
        </FormControl>
      </EntryBox>

      {/* Buttons  */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(4),
        }}
      >
        <Button
          sx={{
            backgroundColor: "black",
            width: "243px",
            height: "45px",
          }}
          onClick={handleSave}
        >
          <Typography variant="text2" sx={{ color: "white" }}>
            Save List
          </Typography>
        </Button>
        <Button
          sx={{
            backgroundColor: "red",
            width: "243px",
            height: "45px",
          }}
          onClick={handleDelete}
        >
          <Typography variant="text2" sx={{ color: "white" }}>
            Delete List
          </Typography>
        </Button>
      </Box>
    </Paper>
  );
};

export default EditList;
