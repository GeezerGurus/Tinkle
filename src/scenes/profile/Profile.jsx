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
  useMediaQuery,
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

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const renderInputField = (label, value, openInput, setOpenInput) => (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      {openInput ? (
        <>
          <Stack
            direction={isMediumScreen ? "column" : "row"}
            justifyContent={"space-between"}
            width={"90%"}
          >
            <Typography
              variant={isMediumScreen ? "body3" : "h6"}
              sx={{ color: colors.purple[900], width: "230px" }}
            >
              {label}
            </Typography>
            <TextField
              sx={{
                width: isSmallScreen ? "100%" : "100%",
              }}
              placeholder={value}
            />
          </Stack>
          <Stack direction={isMediumScreen ? "column" : "row"} gap={1}>
            <Button
              sx={{
                width: isMediumScreen
                  ? isSmallScreen
                    ? 60
                    : 80
                  : isSmallLaptop
                  ? 90
                  : 101,
                textTransform: "none",
                backgroundColor: colors.purple[600],
              }}
            >
              <Typography variant="body1">Save</Typography>
            </Button>
            <Button
              sx={{
                width: isMediumScreen
                  ? isSmallScreen
                    ? 60
                    : 80
                  : isSmallLaptop
                  ? 90
                  : 101,
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
            <Typography
              variant={isMediumScreen ? "body3" : "body1"}
              sx={{ color: colors.purple[900] }}
            >
              {label}
            </Typography>
            <Typography variant={isMediumScreen ? "body4" : "h6"}>
              {value}
            </Typography>
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
        height: isMediumScreen ? "auto" : 874,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{ width: isSmallScreen ? "95%" : "64%", borderRadius: "22px" }}
      >
        {/* Banner  */}
        <Box
          sx={{
            height: isMediumScreen ? (isSmallScreen ? 110 : 140) : 156,
            borderRadius: isSmallScreen ? "10px 10px 0 0" : "22px 22px 0 0",
            backgroundImage: `url(${BannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Contents  */}
        <Box
          sx={{
            padding: isSmallScreen ? " 0 24px 16px 24px" : "0 40px 32px 40px",
          }}
        >
          {/* Head  */}
          <Box
            display="flex"
            flexDirection={isMediumScreen ? "column" : "row"}
            justifyContent="space-between"
            position="relative"
            alignItems={isMediumScreen ? "center" : undefined}
          >
            <Stack
              direction={isSmallScreen ? "column" : "row"}
              gap={isSmallScreen ? 0 : 2}
              position="relative"
              alignItems={isSmallScreen ? "center" : undefined}
              justifyContent={"center"}
            >
              <Avatar
                src={UserProfile}
                alt="avatar"
                sx={{
                  width: isSmallScreen ? 120 : 155,
                  height: isSmallScreen ? 120 : 155,
                  border: "15px solid white",
                  top: -56,
                }}
              />
              <Stack
                alignItems={isSmallScreen ? "center" : undefined}
                sx={{ mt: isSmallScreen ? -5 : undefined }}
              >
                <Typography variant={isMediumScreen ? "h6" : "h3"}>
                  Yei Khant Lwin
                </Typography>
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
                mt: isMediumScreen ? (isSmallScreen ? 4 : -5) : 4,
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
              margin: isMediumScreen ? "16px auto" : "0 auto",
              width: "100%",
              borderRadius: "22px",
              padding: isMediumScreen ? "19px" : "32px 24px",
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
