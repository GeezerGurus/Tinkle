import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useParams } from "react-router-dom";
import { AddItem, ItemBox } from "../../components/to buy list";
import { getItemsToBuy } from "../../api/itemsToBuy";
import toDoListImage from "../../assets/to_do_list.png";

const ToBuyItems = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("active");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { listId } = useParams();

  const fetchItems = async () => {
    setIsLoading(true);
    let timeoutId;

    const res = await getItemsToBuy();

    timeoutId = setTimeout(() => {
      setItems(res);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
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
        backgroundSize: "40%",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Loading  */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

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
            refresh={fetchItems}
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
            items={items}
            refresh={fetchItems}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ToBuyItems;
