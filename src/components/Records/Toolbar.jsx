import { Box, Button } from "@mui/material";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { ContainerFrame } from "./Container";

const Toolbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        width: "1296px",
        height: "48px",
        backgroundColor: "white",
        color: "black",
      }}
    >
      Chart
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open Dialog
      </Button>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
      >
        <ContainerFrame onClose={handleClose} />
      </Dialog>
    </Box>
  );
};

export default Toolbar;
