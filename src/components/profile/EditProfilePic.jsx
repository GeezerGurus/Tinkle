import {
  Avatar,
  Button,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { updateProfilePic } from "../../api/userAccounts";
import { getUser } from "../../api/userAccounts";
import { enqueueSnackbar } from "notistack";

const EditProfilePic = ({ userProfile, onClose, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        if (res.profilePhoto) {
          const profilePhotoPath = res.profilePhoto.replace(
            /^uploads[\\/]+/,
            ""
          );
          const profilePhotoURL = `https://tinkle-production-ad04.up.railway.app/uploads/${profilePhotoPath}`;
          console.log("Profile Photo URL:", profilePhotoURL);
          setPreview(profilePhotoURL);
        }
      } catch (error) {
        console.error("Error Fetching User Data", error);
      }
    };

    fetchUser();
  }, [userProfile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateClick = async () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", selectedFile);

    try {
      const response = await updateProfilePic(formData);
      console.log("Profile picture updated successfully:", response);
      setPreview(URL.createObjectURL(selectedFile));
      refresh();
      enqueueSnackbar("Successfully Updated", { variant: "success" });
      onClose();
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  return (
    <Paper
      sx={{
        padding: isMediumScreen ? "19px" : "32px 40px",
        width: isMediumScreen ? (isSmallScreen ? "95vw" : "580px") : "686px",
        // height: isSmallScreen ? "auto" : "483px",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
        bgcolor: colors.backGround,
        border: `1px solid ${colors.panel.panelBorder}`,
      }}
    >
      <Typography
        variant={isSmallScreen ? "h6" : "h4"}
        color={colors.text.text2}
      >
        Your Profile Picture
      </Typography>
      <Typography
        variant={isSmallScreen ? "body4" : "body1"}
        textAlign={"center"}
        color={colors.text.text1}
      >
        Adding picture can make your profile look more personal
      </Typography>
      <Avatar
        src={preview}
        alt="avatar"
        sx={{
          width: 245,
          height: 245,
        }}
      />
      {/* Choosing Picture */}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="upload-profile-photo"
      />
      <label htmlFor="upload-profile-photo">
        <Button
          variant="contained"
          component="span"
          sx={{
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
            mb: 2,
          }}
        >
          Choose Photo
        </Button>
      </label>

      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
      >
        {/* <label htmlFor="upload-profile-photo"> */}
        <Button
          onClick={handleUpdateClick}
          disabled={!selectedFile}
          sx={{
            width: isSmallScreen ? 202 : 208,
            height: isSmallScreen ? 44 : 40,
            backgroundColor: colors.button.button1,
            textTransform: "none",
            color: colors.text.text1,
          }}
        >
          <Typography variant="body2">
            {/* {isFileSelected ? "Save" : "Update"} */}
            Update
          </Typography>
        </Button>
        {/* </label> */}
        <Button
          onClick={onClose}
          sx={{
            width: isSmallScreen ? 202 : 208,
            height: isSmallScreen ? 44 : 40,
            backgroundColor: colors.button.button2,
            textTransform: "none",
            color: colors.text.text2,
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default EditProfilePic;
