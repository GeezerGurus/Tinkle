import {
  Paper,
  Typography,
  Button,
  useTheme,
  TextField,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import { patchItemToBuy } from "../../api/itemsToBuy";

const EditItem = ({ onClose, name, description, itemId, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [itemName, setItemName] = useState(name || "");
  const [itemDescription, setItemDescription] = useState(description || "");

  const handleSave = async () => {
    await patchItemToBuy(itemId, {
      name: itemName,
      description: itemDescription,
    });
    refresh();
    onClose();
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
        Edit Item
      </Typography>

      {/* Form  */}
      <TextField
        fullWidth
        label="Name"
        placeholder="What is it?"
        value={itemName || ""}
        onChange={(e) => setItemName(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        maxRows={2}
        placeholder="Enter a description (optional)"
        value={itemDescription || ""}
        onChange={(e) => setItemDescription(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* Buttons  */}
      <Stack gap={1} direction={"row"} justifyContent={"space-between"}>
        <Button
          onClick={handleSave}
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

export default EditItem;
