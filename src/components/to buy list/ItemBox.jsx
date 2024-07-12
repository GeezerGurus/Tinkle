import React, { useState } from "react";
import {
  Paper,
  Stack,
  Typography,
  Modal,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditItem from "./EditItem";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import { patchItemToBuy, deleteItemToBuy } from "../../api/itemsToBuy";
import { tokens, useMode } from "../../theme";
import { ConfirmModal } from "../utils";
import { enqueueSnackbar } from "notistack";

const ItemBox = ({
  name,
  listId,
  description,
  ispurchased,
  itemId,
  refresh,
  date,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mode = useMode();

  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");

  const handleChange = async () => {
    await patchItemToBuy(listId, itemId, {
      ispurchased: !ispurchased,
    });
    refresh();
    enqueueSnackbar("Saved", { variant: "info" });
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    // Container
    <Paper
      sx={{
        backgroundColor:
          theme.palette.mode === "dark"
            ? colors.panel.panel1
            : ispurchased === true
            ? colors.extra.grey
            : colors.purple[100],
        padding: isSmallScreen ? "8px" : "12px 16px",
        // backgroundColor: colors.panel.panel1,
        borderRadius: "16px",
        width: "100%",
        minHeight: "88px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction={"row"} width={"100%"} alignItems={"center"} gap={2}>
        {/* Left icon */}
        <IconButton
          onClick={() => handleChange()}
          size="large"
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid",
            backgroundColor:
              ispurchased === true ? colors.purple[600] : "white",
            color: "white",
          }}
        >
          {ispurchased === false ? <CircleIcon /> : <CheckIcon />}
        </IconButton>

        {/* Right box */}
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {/* Left text*/}
          <Stack direction={"column"} alignItems={"flex-start"}>
            <Typography
              variant="h6"
              sx={{
                textDecoration: ispurchased === true ? "line-through" : "",
              }}
            >
              {name}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </Stack>
          {/* Right text  */}
          <Stack alignItems={"center"}>
            <Typography variant="body2">{date}</Typography>
            <Stack direction={"row"} alignItems="center">
              {!ispurchased && (
                <IconButton
                  onClick={() => {
                    setModal("edit");
                    setOpenModal(true);
                  }}
                >
                  <EditIcon
                    fontSize={isSmallScreen ? "26px" : "large"}
                    sx={{
                      color: colors.vibrant.light_blue,
                    }}
                  />
                </IconButton>
              )}

              <IconButton
                onClick={() => {
                  setModal("delete");
                  setOpenModal(true);
                }}
              >
                <DeleteIcon
                  fontSize={isSmallScreen ? "26px" : "large"}
                  sx={{
                    color: colors.extra.red_accent,
                  }}
                />
              </IconButton>
            </Stack>
          </Stack>
          {/* </Button> */}
        </Stack>
        {/* Edit Item Modal*/}
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
              <EditItem
                onClose={() => setOpenModal(false)}
                snackbarText={"Item deleted!"}
                name={name}
                listId={listId}
                description={description}
                itemId={itemId}
                refresh={refresh}
              />
            ) : (
              <ConfirmModal
                onClose={() => setOpenModal(false)}
                onClick={() => deleteItemToBuy(listId, itemId)}
                snackbarText={"Item deleted!"}
                refresh={refresh}
                highlight={"Delete"}
                promptText={"Do you really want to Delete?"}
                color={colors.extra.red_accent}
                description={
                  "This action will delete the items and all the details of it."
                }
              />
            )}
          </Box>
        </Modal>
      </Stack>
    </Paper>
  );
};

export default ItemBox;
