import React, { useState } from "react";
import {
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
  Modal,
  Box,
} from "@mui/material";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDebtRecord from "./EditDebtRecord";
import { ConfirmModal } from "../utils";

const DebtRecord = ({ amount, currency, dueDate, Icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");
  return (
    <Paper
      sx={{
        padding: "24px",
        width: "96%",
        minHeight: "118px",
        backgroundColor: colors.purple[100],
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "16px",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        {/* Icon  */}
        {Icon &&
          React.cloneElement(Icon, {
            sx: {
              width: "72px",
              height: "72px",
              color: colors.extra.yellow_accent,
            },
          })}
        <Stack>
          <Stack direction={"row"} alignItems={"baseline"} gap={1}>
            <Typography variant="body1" sx={{ color: colors.extra.red_accent }}>
              {amount}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: colors.extra.grey_accent }}
            >
              {currency}
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"baseline"} gap={1}>
            <Typography
              variant="body2"
              sx={{ color: colors.extra.grey_accent }}
            >
              Due -
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: colors.extra.faint_black }}
            >
              {dueDate}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={"row"} alignItems="center">
        <IconButton
          onClick={() => {
            setModal("edit-debtrecord");
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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {modal === "edit-debtrecord" ? (
            <EditDebtRecord
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
                "This action will delete this Debt record and make changes to your debt."
              }
              promptText={"Do you really want to Delete?"}
            />
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default DebtRecord;
