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

const EditProfilePic = ({ userProfile, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userData, setUserData] = useState([]);
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [profilePic, setProfilePic] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(userProfile);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await getUser();
      setUserData(res);
    } catch (error) {
      console.log("Error Fetching User Data");
      throw error;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  console.log(userData);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setIsFileSelected(true);
  };

  const handleUpdateClick = async () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", selectedFile);
    // console.log(formData);

    try {
      const response = await updateProfilePic(formData);
      console.log("Profile picture updated successfully:", response);
      setPreview(formData);
      onClose();
    } catch (error) {
      console.error("Error updating profile picture:", error);
      // Handle error state or display error message to the user
    }
  };
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
        // src={
        //   userData?.profilePhoto
        //     ? `http://localhost:3001/api/v1/${userData.profilePhoto}`
        //     : preview
        // }
        alt="avatar"
        sx={{
          width: 245,
          height: 245,
        }}
      />
      {/* Choosing Picture */}

      {/* <input
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
      </label> */}

      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
      >
        {/* <label htmlFor="upload-profile-photo"> */}
        <Button
          onClick={handleUpdateClick}
          component="span"
          // onClick={handleUpdateClick}
          sx={{
            width: isSmallScreen ? 202 : 208,
            height: isSmallScreen ? 44 : 40,
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
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
