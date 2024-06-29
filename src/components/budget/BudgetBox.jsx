import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Paper,
  Stack,
  useTheme,
  Button,
} from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../theme";
import ShowMoreBtn from "../utils/ShowMoreBtn";
import { Link } from "react-router-dom";

// Sample progress details
const progressDetails = [
  { content: "Home", dollar: "$60", percent: "90%" },
  { content: "Outdoor", dollar: "$70", percent: "30%" },
  { content: "Food", dollar: "-$300", percent: "-56%" },
];

const Progress = ({ content, dollar, percent, period }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const progressValue = parseInt(percent, 10); // Convert percent to integer
  const isOverspent = progressValue < 0; // Check if overspent
  return (
    <Box
      sx={{ display: "flex", width: "100%", flexDirection: "column", mb: 1 }}
    >
      {/* Text  */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1">{content}</Typography>
        <Stack flexDirection={"row"} gap={2}>
          <Typography variant="body3">{dollar}</Typography>
          <Typography variant="body2">{percent}</Typography>
        </Stack>
      </Box>

      {/* Progress Bar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
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
                  ? colors.category.orange // normal spending or risk of overspent
                  : colors.green[100], // in limit
              },
            }}
          />
        </Box>
        <IconButton
          component={Link}
          to={`/budget/${period
            .toLowerCase()
            .replace(" ", "-")}/${content.toLowerCase()}`}
        >
          <ArrowForwardIosIcon sx={{ color: colors.purple[600] }} />
        </IconButton>
      </Box>
    </Box>
  );
};

const BudgetBox = ({ period }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    // one Budget Box
    <Paper
      sx={{
        borderRadius: "8px",
        width: "474px",
        height: "408px",
        display: "flex",
        padding: "16px 48px",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Header box of Budgetbox */}
      <Typography
        variant="h3"
        sx={{
          borderBottom: `${colors.purple[600]} 1px solid`,
          height: "69px",
          alignSelf: "flex-start",
          width: "100%",
        }}
      >
        {period}
      </Typography>

      {/* Progress here */}
      {progressDetails.length > 0 && (
        <Box sx={{ flexGrow: 1, width: "100%", padding: "24px 0" }}>
          {progressDetails.map((progressDetail, index) => (
            <Progress
              key={index}
              content={progressDetail.content}
              dollar={progressDetail.dollar}
              percent={progressDetail.percent}
              period={period}
            />
          ))}
        </Box>
      )}

      {/* Add budget  */}
      {progressDetails.length < 3 && (
        <Button
          sx={{
            width: "100%",
            borderRadius: "16px",
            border: `2px dashed ${colors.purple[600]}`,
            height: "25%",
            display: "flex",
          }}
        >
          <Stack alignItems={"center"}>
            <AddIcon
              sx={{ width: "32px", height: "32px", color: colors.purple[600] }}
            />
            <Typography variant="body2" sx={{ color: colors.purple[600] }}>
              Tap to add budget
            </Typography>
          </Stack>
        </Button>
      )}

      {progressDetails.length >= 3 && (
        // Show more button
        <ShowMoreBtn
          fontSize={"body1"}
          width="133px"
          to={`/budget/${period.toLowerCase().replace(" ", "-")}`}
        />
      )}
    </Paper>
  );
};

export default BudgetBox;
