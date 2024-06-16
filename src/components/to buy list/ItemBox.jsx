import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Paper,
  Stack,
  Typography,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { DoneAll as DoneAllIcon } from "@mui/icons-material";
import EditItem from "./EditItem";

const ItemBox = ({ name, quantity, description, price, state }) => {
  const [open, setOpen] = useState(false);

  return (
    // Container
    <Stack direction={"row"} alignItems={"center"} gap={2}>
      {/* Left icon */}
      <IconButton
        // onClick={() => handleClick("delete")}
        size="large"
        sx={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid",
          borderColor: state === "closed" ? "white" : "black",
          backgroundColor: state === "closed" ? "black" : "white",
        }}
      >
        <DoneAllIcon sx={{ color: state === "closed" ? "white" : "black" }} />
      </IconButton>

      {/* Right box */}
      <Paper>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            width: "787px",
            height: "85.64px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            textTransform: "none",
          }}
        >
          {/* Left text*/}
          <Stack direction={"column"} alignItems={"flex-start"}>
            <Typography
              variant="title2"
              sx={{ textDecoration: state === "closed" ? "line-through" : "" }}
            >
              {name} {quantity ? `(${quantity})` : ""}
            </Typography>
            <Typography variant="text">{description}</Typography>
          </Stack>
          {/* Right text  */}
          <Typography
            variant="title2"
            color={"blue"}
            sx={{ textDecoration: state === "closed" ? "line-through" : "" }}
          >
            {price} $
          </Typography>
        </Button>
      </Paper>
      {/* Edit Item Modal*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <EditItem
            onClose={() => setOpen(false)}
            name={name}
            quantity={quantity}
            price={price}
            description={description}
          />
        </Box>
      </Modal>
    </Stack>
  );
};

ItemBox.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  state: PropTypes.oneOf(["active", "closed"]).isRequired,
};

export default ItemBox;
