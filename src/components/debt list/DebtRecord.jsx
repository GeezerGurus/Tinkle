import React, { useState } from "react";
import {
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
  Modal,
  Box,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDebtRecord from "./EditDebtRecord";
import { ConfirmModal } from "../utils";
import { deleteLendDebtItem } from "../../api/lendDebtItemsApi";
import { deleteOweDebtItem } from "../../api/oweDebtItemsApi";

const DebtRecord = ({
  id,
  amount,
  currency = "MMK",
  dueDate,
  Icon,
  refresh,
  debtId,
  action,
  debtAmount,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDelete = async () => {
    const res =
      action === "lend"
        ? await deleteLendDebtItem(debtId, id)
        : await deleteOweDebtItem(debtId, id);
    if (res.status === 200) {
      refresh();
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Paper
      sx={{
        padding: isMediumScreen ? "16px 8px" : "24px",
        width: "96%",
        minHeight: "118px",
        backgroundColor: colors.panel.panel1,
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
              width: isSmallScreen ? "70px" : "72px",
              height: isSmallScreen ? "70px" : "72px",
              color: colors.extra.yellow_accent,
            },
          })}
        <Stack>
          <Stack direction={"row"} alignItems={"baseline"} gap={1}>
            <Typography
              variant={isSmallScreen ? "body3" : "body1"}
              sx={{ color: colors.extra.red_accent }}
            >
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
              variant={isSmallScreen ? "body3" : "body2"}
              sx={{ color: colors.extra.grey_accent }}
            >
              Due -
            </Typography>
            <Typography
              variant={isSmallScreen ? "body3" : "body2"}
              sx={{ color: colors.text.text1 }}
            >
              {formatDate(dueDate)}
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
            fontSize={isSmallScreen ? "23px" : "large"}
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
            fontSize={isSmallScreen ? "23px" : "large"}
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
              amount={amount}
              debtAmount={debtAmount}
              date={new Date(dueDate).toISOString().split("T")[0]}
              id={id}
              debtId={debtId}
              refresh={refresh}
              action={action}
              onClose={() => {
                setOpenModal(false);
              }}
            />
          ) : (
            <ConfirmModal
              onClick={handleDelete}
              onClose={() => {
                setOpenModal(false);
              }}
              color={colors.extra.red_accent}
              highlight={"Delete"}
              description={
                "This action will delete this Debt record and make changes to your debt."
              }
              promptText={"Do you really want to Delete?"}
              refresh={refresh}
              snackbarText={
                action === "lend" ? "Lend Item Deleted" : "Owe Item Deleted"
              }
            />
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default DebtRecord;
