import React from "react";
import { Box, Divider, Typography, LinearProgress, Paper } from "@mui/material";
import { ShowMoreBtn } from "../utils";

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
              fontSize: "14px",
              fontWeight: "500",
              letterSpacing: "1%",
              color: "black",
            }}
          >
            {content}
          </Typography>
        </Box>
        {/* Dollar box */}
        <Box sx={{ width: "60px", textAlign: "right" }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              letterSpacing: "1%",
              color: "black",
            }}
          >
            {dollar}
          </Typography>
        </Box>
        {/* Percent box */}
        <Box sx={{ width: "40px", textAlign: "right" }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              letterSpacing: "1%",
              color: "black",
            }}
          >
            {percent}
          </Typography>
        </Box>
      </Box>
      {/* Progress Bar */}
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={isOverspent ? 100 : 100 - progressValue}
          sx={{
            height: 17,
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
    </Box>
  );
};

const Budget = () => {
  return (
    <Paper
      sx={{
        width: "369px",
        height: "274px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {/* Header box of Budget */}
      <Box
        sx={{
          height: "23px",
          marginBottom: "13.5px",
          width: "317.5px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="title">Budgets</Typography>
        <ShowMoreBtn to={"/budget"} />
      </Box>
      {/* Small line */}
      <Divider
        sx={{
          width: "calc(100% - 64px)",
          backgroundColor: "black",
        }}
      ></Divider>
      {/* 1st row of Budget */}
      <Box
        sx={{
          marginLeft: "10px",
          marginTop: "13.5px",
          width: "84%",
          height: "36px",
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
          marginLeft: "10px",
          width: "84%",
          height: "36px",
          marginTop: "16px",
        }}
      >
        <Progress content="School" dollar="$70" percent="30%" />
      </Box>
      {/* 3rd row of Budget */}
      <Box
        sx={{
          marginLeft: "10px",
          width: "84%",
          height: "36px",
          marginTop: "16px",
        }}
      >
        <Progress content="Gas Fee" dollar="-$300" percent="-56%" />
      </Box>
      {/* Last row of Budget */}
      <Box
        sx={{
          marginTop: "25px",
          width: "300px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: "16px",
              height: "16px",
              border: "0px",
              backgroundColor: "#00F79E",
            }}
          ></Box>
          <Typography variant="text">In Limit</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: "16px",
              height: "16px",
              border: "0px",
              backgroundColor: "#FF8744",
            }}
          ></Box>
          <Typography variant="text">Risk of Overspent</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: "16px",
              height: "16px",
              backgroundColor: "#FF0000",
              border: "1px solid",
            }}
          ></Box>
          <Typography variant="text">Overspent</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Budget;
