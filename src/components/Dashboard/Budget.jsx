import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  useTheme,
  Stack,
} from "@mui/material";
import { ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";

const Progress = ({ content, dollar, percent }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const progressValue = parseInt(percent, 10); // Convert percent to integer
  const isOverspent = progressValue < 0; // Check if overspent

  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
      {/* Texts  */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body4">{content}</Typography>

        <Stack flexDirection={"row"} gap={2}>
          <Typography variant="body3">{dollar}</Typography>
          <Typography variant="body2">{percent}</Typography>
        </Stack>
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
                ? colors.category.red // overspent
                : progressValue < 50
                ? colors.category.orange // normal spending or risl of overspent
                : colors.green[100], // in limit
            },
          }}
        />
      </Box>
    </Box>
  );
};

const Budget = ({ isSmallScreen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "100%" : "369px",
        height: isSmallScreen ? "278px" : "267px",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "16px",
      }}
    >
      {/* Header box of Budget */}
      <Box
        sx={{
          height: "48px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[600]} 1px solid`,
        }}
      >
        <Typography variant="h6">Budgets</Typography>
        <ShowMoreBtn to={"/budget"} />
      </Box>

      <Progress content="Home" dollar="$60" percent="90%" />

      <Progress content="School" dollar="$70" percent="30%" />

      <Progress content="Gas Fee" dollar="-$300" percent="-56%" />

      {/* Indicators  */}
      <Box
        sx={{
          width: "100%",
          height: "36px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Box
            sx={{
              width: "16px",
              height: "16px",
              backgroundColor: colors.green[100],
            }}
          ></Box>
          <Typography variant="body4">In Limit</Typography>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Box
            sx={{
              width: "16px",
              height: "16px",
              backgroundColor: colors.category.orange,
            }}
          ></Box>
          <Typography variant="body4">Risk of Overspent</Typography>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Box
            sx={{
              width: "16px",
              height: "16px",
              backgroundColor: colors.category.red,
            }}
          ></Box>
          <Typography variant="body4">Overspent</Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Budget;
