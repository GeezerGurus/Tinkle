import React, { useState } from "react";
import { Box, IconButton, Modal, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../theme";

const SpeedDial = ({ modal }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          backgroundColor: colors.purple[200],
        }}
      >
        <AddIcon
          fontSize="large"
          sx={{
            width: "48px",
            height: "48px",
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
          {modal &&
            React.cloneElement(modal, {
              onClose: () => setOpen(false),
            })}
        </Box>
      </Modal>
    </Box>
  );
};

export default SpeedDial;
