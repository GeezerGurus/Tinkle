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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { tokens } from "../../theme";

const UpdatePassword = ({ onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleShowPassword = (setter) => {
    setter((show) => !show);
  };

  return (
    <Paper
      sx={{
        padding: "32px 112px",
        width: 686,
        height: 472,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4">Update your password</Typography>
      <Typography variant="body1">
        Enter your current password and new password
      </Typography>

      <TextField
        type={showCurrentPassword ? "text" : "password"}
        label="Current Password"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
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
      />

      <TextField
        type={showNewPassword ? "text" : "password"}
        label="New Password"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
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
      />

      <TextField
        type={showConfirmPassword ? "text" : "password"}
        label="Confirm New Password"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
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
      />

      <Stack gap={1} direction="row" justifyContent="space-between">
        <Button
          sx={{
            width: 208,
            height: 40,
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
          }}
        >
          <Typography variant="body2">Save</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: 208,
            height: 40,
            backgroundColor: colors.purple[200],
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
