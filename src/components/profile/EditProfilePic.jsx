import {
  Avatar,
  Button,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";

const EditProfilePic = ({ userProfile, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper
      sx={{
        padding: "32px 40px",
        width: "686px",
        height: "483px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4">Your Profile Picture</Typography>
      <Typography variant="body1">
        Adding picture can make your profile look more personal
      </Typography>{" "}
      <Avatar
        src={userProfile}
        alt="avatar"
        sx={{
          width: 245,
          height: 245,
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
          <Typography variant="body2">Update</Typography>
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

export default EditProfilePic;
