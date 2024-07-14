import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  useTheme,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { tokens } from "../../theme";
import { patchUserPassword } from "../../api/userAccounts";
import { enqueueSnackbar } from "notistack";

const UpdatePassword = ({ onClose, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [errors, setErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleToggleShowPassword = (setter) => {
    setter((show) => !show);
  };

  const updatePassword = async () => {
    if (!validateForm()) {
      return;
    }
    const data = {
      oldPassword: currentPassword,
      newPassword: newPassword,
    };
    const res = await patchUserPassword(data);
    if (res.data !== undefined) {
      const errors = {};
      errors.oldPasssword = res.data.message;
      setErrors(errors);
      enqueueSnackbar("Somthing went wrong", { variant: "error" });
      return;
    }
    enqueueSnackbar("Password Updated Successsful", { variant: "success" });
    refresh();
    onClose();
  };

  const validateForm = () => {
    const errors = {};

    if (newPassword !== confirmPassword) {
      errors.updatePassword = "The passwords do not match";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <Paper
      sx={{
        padding: isSmallScreen ? "16px 24px" : "32px 112px",
        width: isSmallScreen ? 359 : 686,
        height: isSmallScreen ? 524 : 472,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
        bgcolor: colors.backGround,
        color: colors.text.text1,
        border: `1px solid ${colors.panel.panelBorder}`,
      }}
    >
      <Typography variant={isSmallScreen ? "h6" : "h4"}>
        Update your password
      </Typography>
      <Typography variant={isSmallScreen ? "body4" : "body1"}>
        Enter your current password and new password
      </Typography>

      <TextField
        type={showCurrentPassword ? "text" : "password"}
        onChange={(e) => setCurrentPassword(e.target.value)}
        label="Current Password"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: "42px" },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleToggleShowPassword(setShowCurrentPassword)}
                edge="end"
              >
                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={!!errors.oldPasssword}
        helperText={errors.oldPasssword}
      />

      <TextField
        type={showNewPassword ? "text" : "password"}
        onChange={(e) => setNewPassword(e.target.value)}
        label="New Password"
        fullWidth
        required
        InputLabelProps={{
          shrink: true,
          required: true,
        }}
        InputProps={{
          sx: { height: "42px" },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleToggleShowPassword(setShowNewPassword)}
                edge="end"
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={!!errors.updatePassword}
        helperText={errors.updatePassword}
      />

      <TextField
        type={showConfirmPassword ? "text" : "password"}
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Confirm New Password"
        fullWidth
        required
        InputLabelProps={{
          shrink: true,
          required: true,
        }}
        InputProps={{
          sx: { height: "42px" },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleToggleShowPassword(setShowConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={!!errors.updatePassword}
        helperText={errors.updatePassword}
      />

      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
      >
        <Button
          onClick={() => {
            updatePassword();
          }}
          sx={{
            width: 208,
            height: 40,
            backgroundColor: colors.button.button1,
            textTransform: "none",
            color: colors.text.text1,
          }}
        >
          <Typography variant="body2">Save</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: 208,
            height: 40,
            backgroundColor: colors.button.button2,
            color: colors.text.text2,
            textTransform: "none",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default UpdatePassword;
