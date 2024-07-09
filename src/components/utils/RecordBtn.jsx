import { React, useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AddRecord } from "../records";

const RecordBtn = ({ color, hoverColor }) => {
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
          width: "114px",
          height: "38px",
          textTransform: "capitalize",
          background: color || "#000000",
          borderRadius: "48px",
          fontSize: "16px",
          lineHeight: "24px ",
          "&:hover": {
            backgroundColor: hoverColor,
          },
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
          <AddRecord onClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default RecordBtn;
