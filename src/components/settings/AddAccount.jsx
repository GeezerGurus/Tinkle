import { Button, Paper, Stack, Typography, Modal, Box } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CreateAccount from "./CreateAccount";

const AddAccount = () => {
  const [open, setOpen] = useState(false);

  return (
    <Paper
      sx={{
        width: "1292px",
        height: "101px",
        border: "2px dashed rgba(0, 0, 0, 0.6)",
      }}
    >
      <Button
        onClick={() => {
          setOpen(true);
        }}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          textTransform: "none",
        }}
      >
        <Stack alignItems={"center"}>
          <AddIcon sx={{ width: "56px", height: "56px" }} />
          <Typography variant="h3">Tap to add account</Typography>
        </Stack>
      </Button>
      {/* Delete Profile Modal*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CreateAccount onClose={() => setOpen(false)} />
        </Box>
      </Modal>
    </Paper>
  );
};

export default AddAccount;
