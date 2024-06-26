import { LinearProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Progress = ({ percent, height }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const progressValue = parseInt(percent, 10); // Convert percent to integer
  const isOverspent = progressValue < 0; // Check if overspent
  return (
    <LinearProgress
      variant="determinate"
      value={isOverspent ? 100 : 100 - progressValue}
      sx={{
        height: height || 17,
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
  );
};

export default Progress;
