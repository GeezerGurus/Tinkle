import { Box, Button, Modal, Stack, Typography, useTheme } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import React, { useState } from "react";
import CreateAccount from "./CreateAccount";
import { tokens } from "../../theme";
const NewAccount = ({ BgColor, isSmallScreen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
        sx={{
          width: isSmallScreen ? "45%" : "210px",
          height: isSmallScreen ? "73px" : "211px",
          borderRadius: "16px",
          border: `2px dashed ${BgColor}`,
          textTransform: "none",
        }}
      >
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <AddCircleRoundedIcon
            sx={{
              width: isSmallScreen ? "34px" : "64px",
              height: isSmallScreen ? "34px" : "64px",
              color: BgColor,
            }}
          />
          <Typography
            variant={isSmallScreen ? "body2" : "body1"}
            color={theme.palette.mode === "dark" ? "white" : "black"}
          >
            Add Account
          </Typography>
        </Stack>
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CreateAccount
            onClose={() => setOpenModal(false)}
            isSmallScreen={isSmallScreen}
          />
        </Box>
      </Modal>
    </>
  );
};

export default NewAccount;
