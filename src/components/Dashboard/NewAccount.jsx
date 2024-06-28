import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import React, { useState } from "react";
import CreateAccount from "./CreateAccount";

const NewAccount = ({ BgColor }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
        sx={{
          width: "210px",
          height: "211px",
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
            sx={{ width: "64px", height: "64px", color: BgColor }}
          />
          <Typography variant="body1">Add Account</Typography>
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
          <CreateAccount onClose={() => setOpenModal(false)} />
        </Box>
      </Modal>
    </>
  );
};

export default NewAccount;
