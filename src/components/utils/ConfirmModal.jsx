import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React from "react";

const ConfirmModal = ({
  onClose,
  color,
  highlight,
  description,
  promptText,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Split the promptText into parts using a regular expression to match the highlight word, ignoring case
  const regex = new RegExp(`(${highlight})`, "i");
  const parts = promptText.split(regex);

  return (
    <Paper
      sx={{
        width: "auto",
        height: "221px",
        padding: "30px 36px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Typography
              component="span"
              variant="h4"
              key={index}
              sx={{ color: color }}
            >
              {part}
            </Typography>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
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
            "&:hover": {
              backgroundColor: colors.purple[100],
            },
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
