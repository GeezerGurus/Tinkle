import { Box, Button, Modal } from "@mui/material";
import React from "react";
import Edit from "./Edit";
import CreateBudget from "./CreateBudget";

const BudgetBox = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "474px", height: "408px", backgroundColor: "white" }}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open Dialog
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
          {/* <CreateBudget onClose={handleClose} /> */}
          <Edit onClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default BudgetBox;
