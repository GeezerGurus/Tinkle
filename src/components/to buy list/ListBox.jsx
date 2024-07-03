import React, { useState } from "react";
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
} from "@mui/material";
import EditList from "./EditList";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmModal } from "../utils";

const ListBox = ({ name, description }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");

  return (
    // Container
    <Paper
      sx={{
        backgroundColor: colors.purple[100],
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "88%",
        minHeight: "153px",
        borderRadius: "16px",
      }}
    >
      {/* Top  */}
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* Left  */}
        <Stack>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2">{description}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"baseline"} gap={1}>
          <Typography variant="h6">6</Typography>
          <Typography variant="body1">Items</Typography>
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
          to={`/lists/to-buy-lists/${name}`}
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
              name={name}
              description={description}
            />
          ) : (
            <ConfirmModal
              highlight={"Delete"}
              color={colors.extra.red_accent}
              promptText={"Do you really want to Delete?"}
              description={
                "This action will delete your whole list, including all the items and details."
              }
            />
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default ListBox;
