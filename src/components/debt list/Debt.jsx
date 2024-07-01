import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import CreateDebtRecord from "./CreateDebtRecord";
import { ConfirmModal } from "../utils";
import { Link, useLocation } from "react-router-dom";
import EditDebtList from "./EditDebtList";

const Debt = ({ name, purpose, amount, dueDate, isActive, action }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");

  return (
    <Paper
      sx={{
        width: "100%",
        height: "160px",
        padding: "16px 32px",
        backgroundColor: colors.purple[100],
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left  */}
        <Stack>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" sx={{ color: colors.extra.grey_accent }}>
            {purpose}
          </Typography>
        </Stack>
        <Stack>
          <Stack direction={"row"} alignItems={"flex-end"} gap={1}>
            <Typography variant="body1">{amount}</Typography>
            <Typography
              variant="body2"
              sx={{ color: colors.extra.grey_accent }}
            >
              MMK
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"flex-end"} gap={1}>
            <Typography
              variant="body2"
              sx={{ color: colors.extra.grey_accent }}
            >
              Due -
            </Typography>
            <Typography variant="body2">{dueDate}</Typography>
          </Stack>
        </Stack>
      </Box>
      {/* Top  */}
      <Divider
        sx={{
          backgroundColor: "#00000033",
          width: "100%",
          height: "2px",
        }}
      />
      {/* Bottom  */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => {
            setModal("create-record");
            setOpenModal(true);
          }}
          disabled={!isActive}
          sx={{
            width: "93px",
            height: "32px",
            borderRadius: "8px",
            color: colors.extra.faint_white,
            backgroundColor: colors.purple[600],
            "&:hover": {
              backgroundColor: colors.purple[200],
            },
            textTransform: "none",
          }}
        >
          <Typography variant="body2">+ Add</Typography>
        </Button>
        <Button
          component={Link}
          to={`${location.pathname}/${name.toLowerCase()}`}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": { backgroundColor: colors.purple[300] },
          }}
        >
          <Typography variant="body2">See Details</Typography>
        </Button>
        <Stack direction={"row"}>
          <IconButton
            onClick={() => {
              setModal("edit-debtlist");
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
              setModal("Delete_Confirm");
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
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {modal === "create-record" ? (
            <CreateDebtRecord
              onClose={() => {
                setOpenModal(false);
              }}
              // refresh={fetchItems}
            />
          ) : modal === "edit-debtlist" ? (
            <EditDebtList
              action={action}
              onClose={() => {
                setOpenModal(false);
              }}
            />
          ) : (
            <ConfirmModal
              onClose={() => {
                setOpenModal(false);
              }}
              color={colors.extra.red_accent}
              highlight={"Delete"}
              description={
                "This action will delete your whole Debt and its records."
              }
              promptText={"Do you really want to Delete?"}
            />
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default Debt;
