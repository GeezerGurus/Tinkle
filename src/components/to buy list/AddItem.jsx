import React, { useCallback, useEffect, useState } from "react";
import {
  Paper,
  IconButton,
  Typography,
  FormControl,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { EntryBox, EntryInput } from "../utils";
import { postItemsToBuy } from "../../api/itemsToBuy";

const AddItem = ({ onClose, refresh }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSaveItem = useCallback(async () => {
    try {
      await postItemsToBuy({ name, quantity, price, description });
      refresh();
      onClose();
    } catch (error) {
      console.error("Error adding new item:", error);
      throw error;
    }
  }, [name, quantity, price, description, refresh, onClose]);

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

  return (
    <Paper
      sx={{
        width: "710px",
        height: "426px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
        onClick={onClose}
      >
        <CloseIcon fontSize="large" />
      </IconButton>

      <Typography variant="h6">Add Item</Typography>

      <EntryBox>
        <Typography variant="body1">Name:</Typography>
        <FormControl>
          <EntryInput
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
      </EntryBox>
      <EntryBox>
        <Typography variant="body1">Quantity:</Typography>
        <FormControl>
          <EntryInput
            placeholder="Enter number of items"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </FormControl>
      </EntryBox>
      <EntryBox>
        <Typography variant="body1">Price:</Typography>
        <FormControl>
          <EntryInput
            placeholder="Enter item price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
      </EntryBox>
      <EntryBox>
        <Typography variant="body1">Description:</Typography>
        <FormControl>
          <EntryInput
            placeholder="Enter a description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
      </EntryBox>

      <Button
        variant="contained"
        onClick={handleSaveItem}
        sx={{
          backgroundColor: "black",
          width: "100%",
          maxWidth: "243px",
          height: "45px",
          alignSelf: "center",
          mt: 2,
        }}
      >
        <Typography variant="body1" sx={{ color: "white" }}>
          Save Item
        </Typography>
      </Button>
    </Paper>
  );
};

export default AddItem;