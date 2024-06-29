import React, { useState } from "react";
import {
  Box,
  Avatar,
  Button,
  Modal,
  Paper,
  Typography,
  useTheme,
  Stack,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import { EditProfilePic, UpdatePassword } from "../../components/profile";
import BannerImage from "../../assets/banner.png";
import UserProfile from "../../assets/nigga.png";

const EditButton = ({ onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      variant="contained"
      sx={{
        width: 101,
        height: 38,
        borderRadius: "4px",
        textTransform: "none",
        backgroundColor: colors.purple[900],
        "&:hover": { backgroundColor: colors.purple[800] },
      }}
      onClick={onClick}
    >
      <Typography variant="body2">Edit</Typography>
    </Button>
  );
};

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openNameInput, setOpenNameInput] = useState(false);
  const [openJobInput, setOpenJobInput] = useState(false);
  const [openEmailInput, setOpenEmailInput] = useState(false);
  const [openPhoneInput, setOpenPhoneInput] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openProfilePicModal, setOpenProfilePicModal] = useState(false);

  const renderInputField = (label, value, openInput, setOpenInput) => (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      {openInput ? (
        <>
          <Typography variant="h6" sx={{ color: colors.purple[900] }}>
            {label}
          </Typography>
          <TextField sx={{ width: 456 }} placeholder={value} />
          <Stack direction="row" gap={1}>
            <Button
              sx={{
                width: 101,
                textTransform: "none",
                backgroundColor: colors.purple[600],
              }}
            >
              <Typography variant="body1">Save</Typography>
            </Button>
            <Button
              sx={{
                width: 101,
                textTransform: "none",
                backgroundColor: colors.purple[200],
              }}
              onClick={() => setOpenInput(false)}
            >
              <Typography variant="body1">Cancel</Typography>
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Stack gap={1}>
            <Typography variant="body1" sx={{ color: colors.purple[900] }}>
              {label}
            </Typography>
            <Typography variant="h6">{value}</Typography>
          </Stack>
          <EditButton onClick={() => setOpenInput(true)} />
        </>
      )}
    </Stack>
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: 874,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "64%", borderRadius: "22px" }}>
        {/* Banner  */}
        <Box
          sx={{
            height: 156,
            borderRadius: "22px 22px 0 0",
            backgroundImage: `url(${BannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Contents  */}
        <Box sx={{ padding: "0 40px 32px 40px" }}>
          {/* Head  */}
          <Box
            display="flex"
            justifyContent="space-between"
            position="relative"
          >
            <Stack direction="row" gap={2} position="relative">
              <Avatar
                src={UserProfile}
                alt="avatar"
                sx={{
                  width: 155,
                  height: 155,
                  border: "15px solid white",
                  top: -56,
                }}
              />
              <Stack>
                <Typography variant="h3">Yei Khant Lwin</Typography>
                <Typography variant="body1">
                  Doctor, Lawyer, Astronaut, Plumber
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              sx={{
                width: 191,
                height: 42,
                mt: 4,
                borderRadius: "4px",
                textTransform: "none",
                backgroundColor: colors.purple[600],
                "&:hover": { backgroundColor: colors.purple[200] },
              }}
              onClick={() => setOpenProfilePicModal(true)}
            >
              <Typography variant="body2">Edit profile picture</Typography>
            </Button>
          </Box>
          {/* Form  */}
          <Paper
            sx={{
              margin: "0 auto",
              width: "100%",
              borderRadius: "22px",
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap={3}
              sx={{ width: "100%" }}
            >
              {renderInputField(
                "Display Name",
                "Yei Khant Lwin",
                openNameInput,
                setOpenNameInput
              )}
              {renderInputField(
                "Job Description",
                "Doctor, Lawyer, Astronaut",
                openJobInput,
                setOpenJobInput
              )}
              {renderInputField(
                "Email",
                "yeikhantlwin@gmail.com",
                openEmailInput,
                setOpenEmailInput
              )}
              {renderInputField(
                "Phone Number",
                "09-882673835",
                openPhoneInput,
                setOpenPhoneInput
              )}
            </Box>
            <Button
              onClick={() => setOpenPasswordModal(true)}
              variant="contained"
              sx={{
                width: 191,
                height: 42,
                borderRadius: "4px",
                textTransform: "none",
                backgroundColor: colors.purple[600],
                "&:hover": { backgroundColor: colors.purple[200] },
              }}
            >
              <Typography variant="body2">Change Password</Typography>
            </Button>
          </Paper>
          <Modal
            open={openPasswordModal}
            onClose={() => setOpenPasswordModal(false)}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <UpdatePassword onClose={() => setOpenPasswordModal(false)} />
            </Box>
          </Modal>
          <Modal
            open={openProfilePicModal}
            onClose={() => setOpenProfilePicModal(false)}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <EditProfilePic
                userProfile={UserProfile}
                onClose={() => setOpenProfilePicModal(false)}
              />
            </Box>
          </Modal>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
