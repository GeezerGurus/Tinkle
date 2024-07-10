import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const PieActiveArc = ({ data, dashboard }) => {
  const theme = useTheme();
  const categories = tokens(theme.palette.mode);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <Box
      sx={{
        width: isLargeScreen ? `calc(100%-84px)` : "100%",
        height: "90%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <PieChart
        // width={isSmallScreen ? 320 : 500}
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: {
              innerRadius: dashboard ? (isLargest ? 50 : 30) : 30,
              additionalRadius: dashboard ? (isLargest ? -50 : -30) : -30,
            },
            cx: isSmallScreen ? "65%" : "30%",
            cy: isSmallScreen ? "60%" : "50%",
            outerRadius: dashboard
              ? isSmallScreen
                ? 65
                : isLargeScreen
                ? 47
                : isLargest
                ? 60
                : 75
              : isSmallScreen
              ? 70
              : 75,
          },
        ]}
        // height={isSmallScreen ? 250 : 300}
        label={({ dataEntry }) => (
          <text>{`${dataEntry.label} (${dataEntry.value.toFixed(
            2
          )} MMK)`}</text>
        )}
        slotProps={{
          legend: {
            direction: isMediumScreen
              ? isSmallScreen
                ? "row"
                : "column"
              : "column",
            position: {
              vertical: isMediumScreen
                ? isSmallScreen
                  ? "top"
                  : "middle"
                : "middle",
              horizontal: isMediumScreen
                ? isSmallScreen
                  ? "middle"
                  : "right"
                : "right",
            },
            labelStyle: {
              fontSize: dashboard
                ? isSmallScreen
                  ? "8px"
                  : isLargeScreen
                  ? "10px"
                  : "12px"
                : isSmallScreen
                ? "12px"
                : "10px",
            },
            itemMarkWidth: isSmallScreen ? 10 : 20,
            itemMarkHeight: isSmallScreen ? 10 : 20,
            padding: dashboard
              ? isLargeScreen
                ? isMediumScreen
                  ? isSmallScreen
                    ? -1
                    : 10
                  : -10
                : -10
              : isMediumScreen
              ? isSmallScreen
                ? -1
                : 10
              : -10,
          },
        }}
      />
    </Box>
  );
};

export default PieActiveArc;
