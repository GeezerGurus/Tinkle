import { Box, Avatar, Typography, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import UpdatePassword from "./UpdatePassword";
import Edit from "./Edit";

const ProfileInfo = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "22px",
        border: "1px",
      }}
    >
      <Box
        sx={{
          height: "156px",
          bgcolor: "red",
          borderRadius: "22px 22px 0px 0px",
        }}
      ></Box>
      <Box display="flex" justifyContent="space-between" position="relative">
        <Box position="relative" left="39px">
          <Avatar
            src=""
            alt="avatar"
            sx={{
              width: "155px",
              height: "155px",
              border: "15px solid white",
              top: "-58px",
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          left="238px"
          sx={{ width: "884px" }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "32px",
                fontWeight: "500",
                lineHeight: "48px",
                textAlign: "left",
              }}
            >
              Yei Khant Lwin
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "20px",
                fontWeight: "300",
                lineHeight: "30px",
              }}
            >
              Doctor, Lawyer, Astronaut, Plumber
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "191px",
              height: "42px",
              borderRadius: "4px",
              marginRight: "28px",
              marginTop: "35px",
              fontSize: "15px",
            }}
          >
            Edit User Profile
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          margin: "0 auto",
          width: "1045px",
          height: "548px",
          left: "49px",
          borderRadius: "22px",
          border: "1px solid #E0E0E0",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            width: "100%",
            height: "419px",
            gap: "22px",
            marginTop: "43px",
            gap: "15px",
          }}
        >
          <Box
            display="flex"
            sx={{
              height: "86px",
              padding: "4px, 21px, 4px, 21px",
              gap: "616px",
            }}
          >
            <Box
              width="284px"
              sx={{
                marginLeft: "21px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "24px",
                  fontWeight: "500",
                  lineHeight: "36px",
                }}
              >
                Display Name
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "24px",
                  fontWeight: "300",
                  lineHeight: "36px",
                }}
              >
                Yei Khant Lwin
              </Typography>
            </Box>
            <Edit
              buttonId="button1"
              buttonLabel="Edit"
              popoverContent={"Display Name"}
              forPlaceHolder={"Yei Khant Lwin"}
            />
          </Box>
          <Box
            display="flex"
            sx={{
              height: "86px",
              padding: "4px, 21px, 4px, 21px",
              gap: "616px",
            }}
          >
            <Box
              width="284px"
              sx={{
                marginLeft: "21px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "24px",
                  fontWeight: "500",
                  lineHeight: "36px",
                }}
              >
                Job Description
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "24px",
                  fontWeight: "300",
                  lineHeight: "36px",
                }}
              >
                Doctor, Lawyer, Astronaut
              </Typography>
            </Box>
            <Edit
              buttonId="button2"
              buttonLabel="Edit"
              popoverContent={"Job Description"}
              forPlaceHolder={"Doctor, Lawyer, Astronaut"}
            />
          </Box>
          <Box
            display="flex"
            sx={{
              height: "86px",
              padding: "4px, 21px, 4px, 21px",
              gap: "616px",
            }}
          >
            <Box
              width="284px"
              sx={{
                marginLeft: "21px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "24px",
                  fontWeight: "500",
                  lineHeight: "36px",
                }}
              >
                Email
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "24px",
                  fontWeight: "300",
                  lineHeight: "36px",
                }}
              >
                yeikhantlwin@gmail.com
              </Typography>
            </Box>
            <Edit
              buttonId="button3"
              buttonLabel="Edit"
              popoverContent={"Email"}
              forPlaceHolder={"yeikhantlwin@gmail.com"}
            />
          </Box>

          <Box
            display="flex"
            sx={{
              height: "86px",
              padding: "4px, 21px, 4px, 21px",
              gap: "616px",
            }}
          >
            <Box
              width="284px"
              sx={{
                marginLeft: "21px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "24px",
                  fontWeight: "500",
                  lineHeight: "36px",
                }}
              >
                Phone Number
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "24px",
                  fontWeight: "300",
                  lineHeight: "36px",
                }}
              >
                09-882673835
              </Typography>
            </Box>
            <Edit
              buttonId="button4"
              buttonLabel="Edit"
              popoverContent={"Phone Number"}
              forPlaceHolder={"09-882673835"}
            />
          </Box>
        </Box>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
          sx={{
            width: "191px",
            height: "42px",
            borderRadius: "4px",
            fontSize: "15px",
            padding: "8px, 22px, 8px, 22px",
            marginLeft: "417px",
          }}
        >
          Change Password
        </Button>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <UpdatePassword />
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileInfo;
