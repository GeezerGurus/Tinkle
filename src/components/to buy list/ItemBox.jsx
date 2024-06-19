import React, { useState } from "react";
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
import { patchItemToBuy } from "../../api/itemsToBuy";

const ItemBox = ({
  name,
  quantity,
  description,
  price,
  isPurchased,
  itemId,
  refresh,
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = async () => {
    await patchItemToBuy(itemId, {
      isPurchased: !isPurchased,
    });
    refresh();
  };

  return (
    // Container
    <Stack direction={"row"} alignItems={"center"} gap={2}>
      {/* Left icon */}
      <IconButton
        onClick={() => handleChange()}
        size="large"
        sx={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid",
          borderColor: isPurchased === true ? "white" : "black",
          backgroundColor: isPurchased === true ? "black" : "white",
        }}
      >
        <DoneAllIcon sx={{ color: isPurchased === true ? "white" : "black" }} />
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
              sx={{
                textDecoration: isPurchased === true ? "line-through" : "",
              }}
            >
              {name} {quantity ? `(${quantity})` : ""}
            </Typography>
            <Typography variant="text">{description}</Typography>
          </Stack>
          {/* Right text  */}
          <Typography
            variant="title2"
            color={"blue"}
            sx={{ textDecoration: isPurchased === true ? "line-through" : "" }}
          >
            {price && `${price} MMK`}
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
            itemId={itemId}
            refresh={refresh}
          />
        </Box>
      </Modal>
    </Stack>
  );
};

export default ItemBox;
