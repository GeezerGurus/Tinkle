import { React, useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import Container from "../records/Container";

const RecordBtn = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleClickOpen}
        sx={{
          width: "97px",
          height: "38px",
          textTransform: "capitalize",
          background: "#000000",
          borderRadius: "8px",
          fontSize: "16px",
          lineHeight: "24px ",
        }}
      >
        Record
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Container onClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default RecordBtn;
