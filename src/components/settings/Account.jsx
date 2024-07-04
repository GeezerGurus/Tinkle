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

  
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallest = useMediaQuery(theme.breakpoints.down("xs"));

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
      }}
    >
      {/* Main Stack (Icon and Name) */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ width: isSmallScreen ? "30%" : isMediumScreen? "200px":"300px" }}
      >
        <Icon
          sx={{
            fontSize: isSmallScreen? "30px": "45px",
            
            color: "white",
            backgroundColor: backgroundColor,
            borderRadius: "50%",
            padding: "4px",
          }}
        />
        <Typography variant={isSmallScreen ? "body3" : "h6"}>{name}</Typography>
      </Stack>

      {/* Balance Stack */}
      <Stack
        direction={isSmallest? "column" :"row"}
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
          sx={{ color: colors.purple[900] }}
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
