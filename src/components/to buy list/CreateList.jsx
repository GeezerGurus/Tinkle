import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  useTheme,
  TextField,
  Stack,
} from "@mui/material";
import { tokens } from "../../theme";

const CreateList = ({ onClose, name, description }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [listName, setListName] = useState(name || "");
  const [listDescription, setListDescription] = useState(description || "");

  const handleCreate = () => {
    console.log({
      name: listName,
      description: listDescription,
    });
  };

  return (
    // Container
    <Paper
      sx={{
        padding: "32px 116px",
        width: "710px",
        height: "426px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* Title  */}
      <Typography variant="h4" sx={{ color: colors.purple[900] }}>
        Create a List
      </Typography>

      {/* Form  */}
      <TextField
        placeholder="Enter name"
        label="Name"
        fullWidth
        value={listName || ""}
        onChange={(e) => setListName(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        placeholder="Enter a description (optional)"
        fullWidth
        label="Description"
        multiline
        maxRows={2}
        value={listDescription || ""}
        onChange={(e) => setListDescription(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Buttons  */}
      <Stack gap={1} direction={"row"} justifyContent={"space-between"}>
        <Button
          onClick={handleCreate}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
          }}
        >
          <Typography variant="body2">Create</Typography>
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

export default CreateList;
