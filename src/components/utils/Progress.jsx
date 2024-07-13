import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Progress = ({ percent, height, showPercentText, barColor, bgColor }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const progressValue = parseFloat(percent);

  const getBarColor = () => {
    if (barColor) {
      return barColor;
    }
    if (progressValue < 20) {
      return colors.category.red; // overspent
    }
    if (progressValue < 50) {
      return colors.category.orange; // normal spending or risk of overspent
    }
    return colors.green[100]; // in limit
  };

  // Calculate remaining percentage
  const remainingPercent = progressValue;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={remainingPercent}
          sx={{
            height: height || 17,
            bgcolor: bgColor || colors.barMeter.gray,
            direction: "rtl",
            "& .MuiLinearProgress-bar": {
              bgcolor: getBarColor(),
            },
          }}
        />
      </Box>
      {showPercentText && (
        <Box sx={{ width: "43px", height: "30px" }}>
          <Typography variant="h6">{`${Math.round(
            progressValue
          )}%`}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Progress;
