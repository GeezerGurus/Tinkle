import {
  Paper,
  IconButton,
  Typography,
  FormControl,
  Button,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { EntryBox, EntryInput } from "../utils";

const CreateList = ({ onClose }) => {
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
      <Typography variant="title3">Create a List</Typography>

      {/* Form  */}
      <EntryBox>
        <Typography variant="text2">Name:</Typography>
        <FormControl>
          <EntryInput placeholder="Enter name" />
        </FormControl>
      </EntryBox>
      <EntryBox>
        <Typography variant="text2">Description:</Typography>
        <FormControl>
          <EntryInput placeholder="Enter a description (optional)" />
        </FormControl>
      </EntryBox>

      {/* Save button  */}
      <Button
        sx={{
          backgroundColor: "black",
          width: "243px",
          height: "45px",
        }}
      >
        <Typography variant="text2" sx={{ color: "white" }}>
          Save List
        </Typography>
      </Button>
    </Paper>
  );
};

export default CreateList;
