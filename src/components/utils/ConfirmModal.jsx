import {
  Button,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import React from "react";
import { enqueueSnackbar } from "notistack";

const ConfirmModal = ({
  refresh,
  snackbarText,
  snackbarColor,
  onClose,
  onClick,
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

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        width: "auto",
        height: "auto",
        padding: isSmallScreen ? "16px 32px" : "32px 40px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: colors.backGround,
        border: `1px solid ${colors.panel.panelBorder}`,
      }}
    >
      <Typography variant={isSmallScreen ? "h6" : "h4"} textAlign={"center"}>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Typography
              component="span"
              variant={isSmallScreen ? "h6" : "h4"}
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
      <Typography
        variant={isSmallScreen ? "body4" : "body1"}
        sx={{ textAlign: "center", color: colors.text.text1 }}
      >
        {description}
      </Typography>
      <Stack gap={1} direction={"row"} justifyContent={"space-between"}>
        <Button
          onClick={async () => {
            await onClick();
            refresh();
            enqueueSnackbar(snackbarText, {
              variant: snackbarColor || "error",
            });
            onClose();
          }}
          sx={{
            width: isSmallScreen ? "134px" : "208px",
            height: isSmallScreen ? "44px" : "40px",
            backgroundColor: colors.button.button1,
            textTransform: "none",
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: colors.button.button2,
            },
          }}
        >
          <Typography color={colors.text.text1} variant="body2">
            Yes
          </Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: isSmallScreen ? "134px" : "208px",
            height: isSmallScreen ? "44px" : "40px",
            backgroundColor: colors.button.button2,
            "&:hover": {
              backgroundColor: colors.button.button1,
            },
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          <Typography color={colors.text.text2} variant="body2">
            No
          </Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default ConfirmModal;
