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
import { tokens } from "../../theme";
import { ConfirmModal } from "../utils";

const ItemBox = ({
  name,
  quantity,
  description,
  price,
  isPurchased,
  itemId,
  refresh,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");

  const handleChange = async () => {
    await patchItemToBuy(itemId, {
      isPurchased: !isPurchased,
    });
    refresh();
  };

  const handleDelete = async () => {
    await deleteItemToBuy(itemId);
    refresh();
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    // Container
    <Paper
      sx={{
        backgroundColor:
          isPurchased === true ? colors.extra.grey : colors.purple[100],
        padding: isSmallScreen ? "8px" : "12px 16px",
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
              isPurchased === true ? colors.purple[600] : "white",
            color: "white",
          }}
        >
          {isPurchased === false ? <CircleIcon /> : <CheckIcon />}
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
                textDecoration: isPurchased === true ? "line-through" : "",
              }}
            >
              {name}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </Stack>
          {/* Right text  */}
          <Stack alignItems={"center"}>
            <Typography variant="body2">12/ 02/24</Typography>
            <Stack direction={"row"} alignItems="center">
              {!isPurchased && (
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
                name={name}
                quantity={quantity}
                price={price}
                description={description}
                itemId={itemId}
                refresh={refresh}
              />
            ) : (
              <ConfirmModal
                onClose={() => setOpenModal(false)}
                onClick={() => handleDelete}
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
