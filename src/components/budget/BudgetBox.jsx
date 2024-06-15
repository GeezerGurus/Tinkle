import {
  Button,
  Box,
  Typography,
  Divider,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BudgetProgressModal from "./BudgetProgressModal";

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
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    // one Budget Box
    <Box
      sx={{
        width: "474px",
        height: "408px",
        borderRadius: "8px",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
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
          // backgroundColor: "red",
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
          // backgroundColor: "red",
        }}
      >
        <Progress content="Food" dollar="-$300" percent="-56%" />
      </Box>
      {/* Last row of Budget */}
      <Box
        sx={{
          //marginTop: "25px",
          width: "100%",
          height: "99px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          //component={Link}
          //to={to}
          sx={{
            border: "1px dotted black",
            width: "138px",
            height: "36px",
            borderRadius: "7px",
            whiteSpace: "nowrap",
            textTransform: "none",
          }}
          onClick={handleOpen}
        >
          <Typography
            variant="text"
            sx={{
              fontSize: "20px",
              lineHeight: "24.2px",
              letterSpacing: "1%",
              fontWeight: "200",
            }}
          >
            Show more
          </Typography>
        </Button>
      </Box>
      <BudgetProgressModal
        open={open}
        handleClose={handleClose}
        header={header}
      />
    </Box>
  );
};

export default BudgetBox;
