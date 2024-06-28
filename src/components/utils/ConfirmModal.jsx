import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React from "react";

const ConfirmModal = ({ onClose, color, type, description }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper
      sx={{
        width: "501px",
        height: "221px",
        padding: "30px 36px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">
        Do you really want to{" "}
        <Typography component="span" variant="h4" sx={{ color: color }}>
          {type}
        </Typography>
        ?
      </Typography>
      <Typography variant="body1">{description}</Typography>
      <Stack gap={1} direction={"row"} justifyContent={"space-between"}>
        <Button
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: colors.purple[200],
            },
          }}
        >
          <Typography variant="body2">Yes</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[200],
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2">No</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default ConfirmModal;
