import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { AddItem, ItemBox } from "../../components/to buy list";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useParams } from "react-router-dom";

const ToBuyItems = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("active");

  let { listId } = useParams();

  // Items for active and closed states
  const activeItems = [
    {
      name: "Laptop",
      quantity: 1,
      description: "High-performance laptop for gaming and work",
      price: 1200,
      state: "active",
    },
    {
      name: "Headphones",
      quantity: 2,
      description: "Wireless headphones with noise cancellation",
      price: 250,
      state: "active",
    },
    {
      name: "Bookshelf",
      quantity: 1,
      description: "Wooden bookshelf with multiple shelves",
      price: 150,
      state: "active",
    },
    {
      name: "Smartphone",
      quantity: 1,
      description: "Latest model with 5G connectivity",
      price: 900,
      state: "active",
    },
    {
      name: "Chair",
      quantity: 4,
      description: "Comfortable office chair with adjustable height",
      price: 200,
      state: "active",
    },
  ];

  const closedItems = [
    {
      name: "Monitor",
      quantity: 2,
      description: "27-inch IPS monitor for professional use",
      price: 300,
      state: "closed",
    },
    {
      name: "Keyboard",
      quantity: 1,
      description: "Mechanical keyboard with RGB backlighting",
      price: 100,
      state: "closed",
    },
    {
      name: "Mouse",
      quantity: 1,
      description: "Wireless gaming mouse with programmable buttons",
      price: 80,
      state: "closed",
    },
    {
      name: "Desk",
      quantity: 1,
      description: "Solid wood desk with ample storage",
      price: 350,
      state: "closed",
    },
    {
      name: "External Hard Drive",
      quantity: 2,
      description: "1TB external SSD drive for fast data transfer",
      price: 120,
      state: "closed",
    },
    {
      name: "Printer",
      quantity: 1,
      description: "All-in-one printer with WiFi connectivity",
      price: 150,
      state: "closed",
    },
    {
      name: "Scanner",
      quantity: 1,
      description: "High-resolution scanner for documents and photos",
      price: 180,
      state: "closed",
    },
    {
      name: "Desk Lamp",
      quantity: 2,
      description: "LED desk lamp with adjustable brightness",
      price: 40,
      state: "closed",
    },
    {
      name: "Plant",
      quantity: 3,
      description: "Indoor plants for decoration",
      price: 30,
      state: "closed",
    },
    {
      name: "Whiteboard",
      quantity: 1,
      description: "Magnetic whiteboard for office meetings",
      price: 50,
      state: "closed",
    },
  ];

  return (
    // Container
    <Box
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
      }}
    >
      {/* Title  */}
      <Typography variant="title3" gutterBottom>
        {listId}
      </Typography>
      {/* Nav Buttons  */}
      <ButtonGroup variant="contained" sx={{ backgroundColor: "black" }}>
        <Button
          value="active"
          onClick={() => setPage("active")}
          sx={{
            width: "433px",
            height: "42px",
            backgroundColor: page === "active" ? "black" : "white",
            color: page === "active" ? "white" : "black",
            "&:hover": {
              backgroundColor: page === "active" ? "grey" : "darkgrey",
            },
          }}
        >
          Active
        </Button>
        <Button
          value="closed"
          onClick={() => setPage("closed")}
          sx={{
            width: "433px",
            height: "42px",
            backgroundColor: page === "closed" ? "black" : "white",
            color: page === "closed" ? "white" : "black",
            "&:hover": {
              backgroundColor: page === "closed" ? "grey" : "darkgrey",
            },
          }}
        >
          Closed
        </Button>
      </ButtonGroup>
      {/* Contents */}
      <Box
        sx={{
          width: "900px",
          height: "781px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflowY: "auto",
          gap: "14px",
        }}
      >
        {/* ItemBox components */}
        {page === "active" && (
          <>
            {activeItems.map((item, index) => (
              <ItemBox
                key={index}
                name={item.name}
                quantity={item.quantity}
                description={item.description}
                price={item.price}
                state={item.state}
              />
            ))}
          </>
        )}
        {page === "closed" && (
          <>
            {closedItems.map((item, index) => (
              <ItemBox
                key={index}
                name={item.name}
                quantity={item.quantity}
                description={item.description}
                price={item.price}
                state={item.state}
              />
            ))}
          </>
        )}
      </Box>
      {/* Speed Dial  */}
      <IconButton
        onClick={() => setOpen(true)}
        size="large"
        sx={{
          position: "absolute",
          right: 16,
          bottom: 16,
          width: "116px",
          height: "116px",
        }}
      >
        <AddCircleIcon
          fontSize="large"
          sx={{
            color: "#2099DD",
            width: "116px",
            height: "116px",
          }}
        />
      </IconButton>
      {/* Create Item Modal*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <AddItem onClose={() => setOpen(false)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default ToBuyItems;
