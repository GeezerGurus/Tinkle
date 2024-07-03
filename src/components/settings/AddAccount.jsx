import {
  Button,
  Paper,
  Stack,
  Typography,
  Modal,
  Box,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CreateAccount from "./CreateAccount";
import { tokens } from "../../theme";

const AddAccount = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);

  return (
    <Paper
      sx={{
        width: "100%",
        height: "136px",
        borderRadius: "16px",
        border: `2px dashed ${colors.purple[600]}`,
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
          <AddIcon
            sx={{ width: "48px", height: "48px", color: colors.purple[600] }}
          />
          <Typography variant="body1" sx={{ color: colors.purple[600] }}>
            Tap to add account
          </Typography>
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
