import React, { useState } from "react";
import { Box, IconButton, Modal, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../theme";

const SpeedDial = ({ modal }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  return (
    <Box>
      {/* Speed Dial  */}
      <IconButton
        onClick={() => setOpen(true)}
        size="large"
        sx={{
          position: "fixed",
          right: 16,
          bottom: 16,
          width: isSmallScreen ? "72px" : "116px",
          height: isSmallScreen ? "72px" : "116px",
          backgroundColor: colors.purple[200],
        }}
      >
        <AddIcon
          fontSize="large"
          sx={{
            width: isSmallScreen ? "32px" : "48px",
            height: isSmallScreen ? "32px" : "48px",
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
