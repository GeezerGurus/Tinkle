import {
  Button,
  Box,
  Typography,
  Divider,
  LinearProgress,
  IconButton,
  Modal,
  Paper,
  ButtonGroup,
} from "@mui/material";
import { useState } from "react";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BudgetDetails from "./BudgetDetails";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

const budgetTypes = ["Monthly", "Weekly", "Yearly", "One Time"];
const durationTypes = ["This Month", "This Week", "This Year", "Today"];

const Progress = ({ content, dollar, percent }) => {
  const progressValue = parseInt(percent, 10); // Convert percent to integer
  const isOverspent = progressValue < 0; // Check if overspent
  return (
    <Box
      sx={{ display: "flex", width: "100%", flexDirection: "column", mb: 2 }}
    >
      <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
        {/* Content box */}
        <Box sx={{ width: "217.5px" }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              letterSpacing: "1%",
              color: "black",
              lineHeight: "24.2px",
            }}
          >
            {content}
          </Typography>
        </Box>
        {/* Dollar box */}
        <Box sx={{ width: "60px", textAlign: "right" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "19.36px",
              letterSpacing: "1%",
              color: "black",
            }}
          >
            {dollar}
          </Typography>
        </Box>
        {/* Percent box */}
        <Box sx={{ width: "80px", textAlign: "right" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "19.36px",
              letterSpacing: "1%",
              color: "black",
            }}
          >
            {percent}
          </Typography>
        </Box>
      </Box>
      {/* Progress Bar */}
      <Box
        sx={{
          width: "427px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box sx={{ width: "355px" }}>
          <LinearProgress
            variant="determinate"
            value={isOverspent ? 100 : 100 - progressValue}
            sx={{
              height: 18,
              bgcolor: " #D9D9D9B2",
              direction: isOverspent ? "rtl" : "ltr", // Reverse direction for overspent values only
              "& .MuiLinearProgress-bar": {
                bgcolor: isOverspent
                  ? "red" // Red for overspent
                  : progressValue < 50
                  ? "#FF8844" // Orange for normal spending
                  : "#00F79E", // Green for staying within the limit
              },
            }}
          />
        </Box>
        <Box
          sx={{
            width: "72px",
          }}
        >
          <Box
            sx={{
              width: "72px",
            }}
          >
            <IconButton>
              <ArrowForwardIosIcon
                sx={{
                  color: "black",
                  marginTop: "-8px",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const BudgetBox = ({ header }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const initialIndex = budgetTypes.indexOf(header);
  const [currentBudgetIndex, setCurrentBudgetIndex] = useState(initialIndex);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNext = () => {
    setCurrentBudgetIndex((prevIndex) => (prevIndex + 1) % budgetTypes.length);
  };

  const handlePrev = () => {
    setCurrentBudgetIndex((prevIndex) =>
      prevIndex === 0 ? budgetTypes.length - 1 : prevIndex - 1
    );
  };

  return (
    // one Budget Box
    <Paper
      sx={{
        width: "474px",
        height: "408px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      {/* Header box of Budgetbox */}
      <Box
        sx={{
          height: "69px",
          width: "360px",
          display: "flex",
          marginTop: "14px",
          marginLeft: "47px",
        }}
      >
        <Typography
          variant="title"
          sx={{
            fontSize: "36px",
            lineHeight: "54px",
            fontWeight: "500",
          }}
        >
          {header}
        </Typography>
      </Box>
      {/* Small line */}
      <Divider
        sx={{
          alignSelf: "center",
          width: "calc(100% - 100px)",
          backgroundColor: "black",
        }}
      ></Divider>
      {/* 1st row of Budget */}
      <Box
        sx={{
          marginLeft: "47px",
          marginTop: "25.88px",
          width: "427px",
          height: "48px",
          // backgroundColor: "red",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Progress content="Home" dollar="$60" percent="90%" />
      </Box>
      {/* 2nd row of Budget */}
      <Box
        sx={{
          marginLeft: "47px",
          marginTop: "33px",
          width: "427px",
          height: "48px",
        }}
      >
        <Progress content="Outdoor" dollar="$70" percent="30%" />
      </Box>

      {/* 3rd row of Budget */}
      <Box
        sx={{
          marginLeft: "47px",
          marginTop: "33px",
          width: "427px",
          height: "48px",
        }}
      >
        <Progress content="Food" dollar="-$300" percent="-56%" />
      </Box>
      {/* Last row of Budget */}
      <Box
        sx={{
          width: "100%",
          height: "99px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            border: "1px dotted black",
            width: "138px",
            height: "36px",
            borderRadius: "8px",
            textTransform: "none",
          }}
          onClick={handleOpen}
        >
          <Typography variant="text2">Show more</Typography>
        </Button>
      </Box>
      {/* Pop up  */}
      <Modal open={open} onClose={handleClose}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "807px",
            height: "883px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            p: 4,
          }}
        >
          {/* Header Container */}
          <Box
            sx={{
              width: "100%",
              height: "145px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <IconButton
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleClose}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
            <Typography variant="title3" sx={{ marginTop: "10px" }}>
              {budgetTypes[currentBudgetIndex]}
            </Typography>
            <ButtonGroup
              sx={{
                marginTop: "10px",
                width: "454px",
                height: "39px",
                border: "1px solid black",
              }}
            >
              <IconButton sx={{ width: "88px" }} onClick={handlePrev}>
                <ArrowBackIosIcon />
              </IconButton>
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#240202",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography fontSize={16}>
                  {durationTypes[currentBudgetIndex]}
                </Typography>
              </Box>
              <IconButton sx={{ width: "88px" }} onClick={handleNext}>
                <ArrowForwardIosIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
          <BudgetDetails type={header} />
        </Paper>
      </Modal>
    </Paper>
  );
};

export default BudgetBox;
