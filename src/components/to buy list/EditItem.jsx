import {
  Paper,
  IconButton,
  Typography,
  FormControl,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { EntryBox, EntryInput } from "../utils";
import { tokens } from "../../theme";
import api from "../../api/api";

const EditItem = ({ onClose, name, quantity, price, description, itemId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [itemName, setItemName] = useState(name || "");
  const [itemQuantity, setItemQuantity] = useState(quantity || "");
  const [itemPrice, setItemPrice] = useState(price || "");
  const [itemDescription, setItemDescription] = useState(description || "");

  const handleSave = async () => {
    try {
      await api.patch(`/users/5faabc3fe0baf627b85e6a2d/itemstobuy/${itemId}`, {
        name: itemName,
        quantity: itemQuantity,
        price: itemPrice,
        description: itemDescription,
      });
      onClose();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/itemstobuy/${itemId}`);
      onClose();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    // Container
    <Paper
      sx={{
        width: "710px",
        height: "580px",
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
      <Typography variant="title3">Edit Item</Typography>

      {/* Form  */}
      <EntryBox>
        <Typography variant="text2">Name:</Typography>
        <FormControl>
          <EntryInput
            placeholder="Enter item name"
            value={itemName || ""}
            onChange={(e) => setItemName(e.target.value)}
          />
        </FormControl>
      </EntryBox>
      <EntryBox>
        <Typography variant="text2">Quantity:</Typography>
        <FormControl>
          <EntryInput
            placeholder="Enter number of items"
            type="number"
            value={itemQuantity || ""}
            onChange={(e) => setItemQuantity(e.target.value)}
          />
        </FormControl>
      </EntryBox>
      <EntryBox>
        <Typography variant="text2">Price:</Typography>
        <FormControl>
          <EntryInput
            placeholder="Enter item price"
            type="number"
            value={itemPrice || ""}
            onChange={(e) => setItemPrice(e.target.value)}
          />
        </FormControl>
      </EntryBox>
      <EntryBox>
        <Typography variant="text2">Description:</Typography>
        <FormControl>
          <EntryInput
            placeholder="Enter a description (optional)"
            value={itemDescription || ""}
            onChange={(e) => setItemDescription(e.target.value)}
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
            Save Item
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
            Delete Ttem
          </Typography>
        </Button>
      </Box>
    </Paper>
  );
};

export default EditItem;
