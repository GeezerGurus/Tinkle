import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useParams } from "react-router-dom";
import { AddItem, ItemBox } from "../../components/to buy list";
import api from "../../api/api";
import toDoListImage from "../../assets/to_do_list.png";

const ToBuyItems = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("active");
  const [items, setItems] = useState([]);
  const { listId } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/itemstobuy");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const filteredItems =
    page === "active"
      ? items.filter((item) => !item.isPurchased)
      : items.filter((item) => item.isPurchased);

  return (
    <Box
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
        backgroundImage:
          filteredItems.length === 0 ? `url(${toDoListImage})` : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "50%",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* To remove later */}
      <Typography
        variant="h3"
        sx={{
          position: "absolute",
          top: "75%",
          left: "40%",
          fontWeight: "bold",
          opacity: 0.7,
        }}
      >
        There is no list! Try Adding One!
      </Typography>
      <Typography variant="h4" gutterBottom>
        {listId}
      </Typography>

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
        {filteredItems.map((item, index) => (
          <ItemBox
            key={index}
            name={item.name}
            quantity={item.quantity}
            description={item.description}
            price={item.price}
            isPurchased={item.isPurchased}
            itemId={item._id}
          />
        ))}
      </Box>

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

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <AddItem
            onClose={() => {
              setOpen(false);
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ToBuyItems;
