import React, { useState } from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { CreateList, ListBox } from "../../components/to buy list";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ToBuyList = () => {
  const [open, setOpen] = useState(false);

  const lists = [
    {
      name: "Grocery List",
      description: "Essential items for the week's meals",
    },
    {
      name: "Shopping List",
      description: "Items needed for household supplies",
    },
    {
      name: "Birthday Party Supplies",
      description: "Decorations and party essentials",
    },
    {
      name: "Travel Packing List",
      description: "Items to pack for an upcoming trip",
    },
    {
      name: "School Supplies",
      description: "Books, stationery, and accessories",
    },
    {
      name: "Home Improvement List",
      description: "Tools and materials for DIY projects",
    },
    {
      name: "Fitness Equipment",
      description: "Gear for home workouts",
    },
    {
      name: "Tech Gadgets List",
      description: "Latest gadgets and accessories",
    },
    {
      name: "Christmas Shopping List",
      description: "Gifts and decorations for the holiday season",
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
      }}
    >
      {/* Title  */}
      <Typography variant="title3" gutterBottom>
        Your Lists
      </Typography>
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
        {/* ListBox components */}
        {lists.map((list, index) => (
          <ListBox
            key={index}
            name={list.name}
            description={list.description}
          />
        ))}
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
      {/* Create List Modal*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CreateList onClose={() => setOpen(false)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default ToBuyList;
