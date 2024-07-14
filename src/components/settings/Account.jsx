import {
  Paper,
  Stack,
  Typography,
  Box,
  Modal,
  useTheme,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import EditAccount from "./EditAccount";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import { ConfirmModal } from "../utils";
import { deleteAccount } from "../../api/accountApi";
import AccountIcons from "../utils/AccountIcons";

const Account = ({ name, balance, type, refresh, id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallest = useMediaQuery(theme.breakpoints.down("xs"));

  const types = [
    { value: "Cash", icon: AccountIcons[0], text: "Cash" },
    { value: "Bank", icon: AccountIcons[1], text: "Bank" },
    { value: "Saving", icon: AccountIcons[2], text: "Saving" },
    { value: "General", icon: AccountIcons[3], text: "General" },
    { value: "Investment", icon: AccountIcons[4], text: "Investment" },
    { value: "Loan", icon: AccountIcons[5], text: "Loan" },
    { value: "Card", icon: AccountIcons[6], text: "Card" },
    { value: "Insurance", icon: AccountIcons[7], text: "Insurance" },
    { value: "Bonus", icon: AccountIcons[8], text: "Bonus" },
    { value: "EMoney", icon: AccountIcons[9], text: "EMoney" },
  ];
  const accountType = types.find((t) => t.value === type);

  useEffect(() => {
    refresh();
  }, []);
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
        overflow: "hidden",
        bgcolor: colors.panel.panel1,
      }}
    >
      {/* Main Stack (Icon and Name) */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          width: isSmallScreen ? "30%" : isMediumScreen ? "200px" : "300px",
        }}
      >
        {accountType && (
          <accountType.icon
            sx={{
              fontSize: isSmallScreen ? "30px" : "45px",
              backgroundColor: colors.button.button1,
              color: colors.panel.panel1,
              borderRadius: "50%",
              padding: "4px",
            }}
          />
        )}
        <Typography variant={isSmallScreen ? "body3" : "h6"}>{name}</Typography>
      </Stack>

      {/* Balance Stack */}
      <Stack
        direction={isSmallest ? "column" : "row"}
        gap={1}
        sx={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant={isSmallScreen ? "body4" : "body2"}>
          Balance -
        </Typography>
        <Typography variant={isSmallScreen ? "body4" : "body2"}>
          {balance}
        </Typography>
        <Typography
          variant={isSmallScreen ? "body4" : "body2"}
          sx={{ color: colors.text.textSecondary }}
        >
          MMK
        </Typography>
      </Stack>

      {/* Buttons Stack */}
      <Stack direction="row" alignItems="center">
        <IconButton
          onClick={() => {
            setModal("edit-debtrecord");
            setOpenModal(true);
          }}
        >
          <EditIcon
            fontSize={isSmallScreen ? "23px" : "large"}
            sx={{
              bgcolor: colors.button.editButton,
              color: colors.panel.panel1,
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
              color: colors.notice.warning,
            }}
          />
        </IconButton>
      </Stack>

      {/* Edit Account Modal */}
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
              type={type}
              refresh={refresh}
              id={id}
            />
          ) : (
            <ConfirmModal
              onClick={() => {
                deleteAccount(id);
              }}
              refresh={refresh}
              snackbarText={"Account deleted!"}
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
              onClose={() => setOpenModal(false)}
            />
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default Account;
