import React, { useState } from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { CreateList, ListBox } from "../../components/to buy list";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const SpeedDial = ({ page }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      {/* Speed Dial  */}
      <IconButton
        onClick={() => setOpen(true)}
        size="large"
        sx={{
          position: "absolute",
          right: 16,
          bottom: 16,
          width: "116px",
          height: "116px",
        }}
      >
        <AddCircleIcon
          fontSize="large"
          sx={{
            color: "#2099DD",
            width: "116px",
            height: "116px",
          }}
        />
      </IconButton>
      {/* Create List Modal*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {page &&
            React.cloneElement(page, {
              onClose: () => setOpen(false),
            })}
        </Box>
      </Modal>
    </Box>
  );
};

export default SpeedDial;
