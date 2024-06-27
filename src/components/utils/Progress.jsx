import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Progress = ({ percent, height, showPercentText, barColor }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const progressValue = parseInt(percent, 10); // Convert percent to integer
  const isOverspent = progressValue < 0; // Check if overspent
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={isOverspent ? 100 : 100 - progressValue}
          sx={{
            height: height || 17,
            bgcolor: barColor || colors.extra.light_grey,
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
      {showPercentText && (
        <Box sx={{ width: "43px", height: "30px" }}>
          <Typography variant="h6">{`${percent}%`}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Progress;
