import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Stack,
  Typography,
  Modal,
  Box,
  Divider,
  useTheme,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import EditList from "./EditList";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmModal, Loader } from "../utils";
import { deleteListToBuy } from "../../api/listsToBuy";
import { getItemsToBuy } from "../../api/itemsToBuy";

const ListBox = ({ id, name, description, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState([]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const fetchItems = async () => {
    setIsLoading(true);
    const res = await getItemsToBuy(id);
    const purchasedItems = res.filter((item) => !item.ispurchased);
    setItems(purchasedItems || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Paper
      sx={{
        backgroundColor: colors.purple[100],
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: isSmallScreen ? "90%" : isMediumScreen ? "90vw" : "88%",
        minHeight: "153px",
        borderRadius: "16px",
      }}
    >
      <Loader isLoading={isLoading} />
      {/* Top  */}
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* Left  */}
        <Stack>
          <Typography variant={isSmallScreen ? "body3" : "h6"}>
            {name}
          </Typography>
          <Typography variant={isSmallScreen ? "body4" : "body2"}>
            {description}
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"baseline"} gap={1}>
          <Typography variant={isSmallScreen ? "body3" : "h6"}>
            {items.length}
          </Typography>
          <Typography variant={isSmallScreen ? "body3" : "body1"}>
            {items.length > 1 ? "items" : "item"}
          </Typography>
        </Stack>
      </Stack>
      <Divider />

      {/* Bottom  */}
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button
          component={Link}
          to={`/lists/to-buy-lists/${id}`}
          sx={{
            borderRadius: "8px",
            color: "white",
            width: "106px",
            height: "29px",
            textTransform: "none",
            backgroundColor: colors.purple[600],
            ":hover": {
              backgroundColor: colors.purple[200],
            },
          }}
        >
          <Typography variant="body2">See List</Typography>
        </Button>
        <Stack direction={"row"}>
          <IconButton
            onClick={() => {
              setModal("edit");
              setOpenModal(true);
            }}
          >
            <EditIcon
              fontSize="large"
              sx={{
                color: colors.vibrant.light_blue,
              }}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              setModal("delete");
              setOpenModal(true);
            }}
          >
            <DeleteIcon
              fontSize="large"
              sx={{
                color: colors.extra.red_accent,
              }}
            />
          </IconButton>
        </Stack>
      </Stack>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {modal === "edit" ? (
            <EditList
              onClose={() => setOpenModal(false)}
              id={id}
              name={name}
              description={description}
              refresh={refresh}
            />
          ) : (
            <ConfirmModal
              onClick={() => {
                deleteListToBuy(id);
              }}
              snackbarText={"List deleted!"}
              refresh={refresh}
              highlight={"Delete"}
              color={colors.extra.red_accent}
              promptText={"Do you really want to Delete?"}
              description={
                "This action will delete your whole list, including all the items and details."
              }
              onClose={() => setOpenModal(false)}
            />
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default ListBox;
