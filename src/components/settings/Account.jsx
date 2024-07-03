import {
  Paper,
  Stack,
  Typography,
  Box,
  Modal,
  useTheme,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import EditAccount from "./EditAccount";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import { ConfirmModal } from "../utils";

const Account = ({ icon: Icon, name, balance, backgroundColor }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");
  return (
    <Paper
      sx={{
        width: "100%",
        height: "104px",
        display: "flex",
        borderRadius: "16px",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
      }}
    >
      {/* Main  */}
      <Stack direction="row" alignItems="center" spacing={2} width={"600px"}>
        <Icon
          sx={{
            width: "64px",
            height: "64px",
            color: "white",
            backgroundColor: backgroundColor,
            borderRadius: "50%",
            padding: "4px",
          }}
        />
        <Typography variant="h6">{name}</Typography>
      </Stack>
      {/* Text  */}
      <Stack direction={"row"} gap={1} sx={{ flexGrow: 1 }}>
        <Typography variant="body2">Balance -</Typography>
        <Typography variant="body3">{balance}</Typography>
        <Typography variant="body2" sx={{ color: colors.purple[900] }}>
          MMK
        </Typography>
      </Stack>

      {/* Buttons  */}
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
      {/* Edit Account Modal*/}
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
            <EditAccount
              onClose={() => setOpenModal(false)}
              name={name}
              balance={balance}
              icon={Icon}
              bgColor={backgroundColor}
            />
          ) : (
            <ConfirmModal
              onClose={() => {
                setOpenModal(false);
              }}
              color={colors.extra.red_accent}
              highlight={"Delete"}
              description={
                <>
                  Sure you really want to delete the account <b>{name}</b>? The
                  account will be removed from your budgets. All account
                  transactions, standing orders, and debts will be irrevocably
                  lost.
                </>
              }
              promptText={"Do you really want to Delete?"}
            />
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default Account;
