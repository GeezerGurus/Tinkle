import {
  Avatar,
  Button,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";

const EditProfilePic = ({ userProfile, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        padding: isMediumScreen ? "19px" : "32px 40px",
        width: isMediumScreen ? (isSmallScreen ? "95vw" : "580px") : "686px",
        height: isSmallScreen ? "auto" : "483px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <Typography variant={isSmallScreen ? "h6" : "h4"}>
        Your Profile Picture
      </Typography>
      <Typography
        variant={isSmallScreen ? "body4" : "body1"}
        textAlign={"center"}
      >
        Adding picture can make your profile look more personal
      </Typography>
      <Avatar
        src={userProfile}
        alt="avatar"
        sx={{
          width: 245,
          height: 245,
        }}
      />
      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
      >
        <Button
          sx={{
            width: isSmallScreen ? 202 : 208,
            height: isSmallScreen ? 44 : 40,
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
            width: isSmallScreen ? 202 : 208,
            height: isSmallScreen ? 44 : 40,
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
