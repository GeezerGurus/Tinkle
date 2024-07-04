import {
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";

const Total = ({ type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      sx={{
        borderRadius: "16px",
        display: "flex",
        padding: "24px",
        flexDirection: "column",
        gap: "16px",
        // width: "400px",
        width: isMediumScreen ? "100%" : "32%",
        height: "216px",
        backgroundColor: "white",
      }}
    >
      {/* Header  */}
      {type === "income" ? (
        <Typography variant="h6" sx={{ color: colors.purple[900] }}>
          Total Income You Have
        </Typography>
      ) : (
        <Typography variant="h6" sx={{ color: colors.purple[900] }}>
          Total Expense You Made
        </Typography>
      )}

      {/* Amount */}
      {type === "income" ? (
        <Stack direction={"row"} alignItems={"baseline"} gap={1}>
          <Typography variant="h3" sx={{ color: colors.purple[600] }}>
            45,678
          </Typography>
          <Typography variant="h4" sx={{ color: colors.purple[600] }}>
            MMK
          </Typography>
        </Stack>
      ) : (
        <Stack direction={"row"} alignItems={"baseline"} gap={1}>
          <Typography variant="h3" sx={{ color: colors.extra.red_accent }}>
            2,405
          </Typography>
          <Typography variant="h4" sx={{ color: colors.extra.red_accent }}>
            MMK
          </Typography>
        </Stack>
      )}

      {/* Percent */}
      {type === "income" ? (
        <Typography variant="body2" sx={{ color: colors.extra.grey_accent }}>
          +20% more income than the month before
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ color: colors.extra.grey_accent }}>
          +33% more expense than the month before
        </Typography>
      )}
    </Paper>
  );
};

export default Total;
