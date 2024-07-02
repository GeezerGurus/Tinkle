import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const PieActiveArc = ({ data }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
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
              innerRadius: 30,
              additionalRadius: -30,
            },
            cx: isSmallScreen ? "65%" : "30%",
            cy: isSmallScreen ? "60%" : "50%",
            outerRadius: isSmallScreen ? 70 : 75,
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
              fontSize: isSmallScreen ? "12px" : "12px",
            },
            itemMarkWidth: isSmallScreen ? 10 : 20,
            itemMarkHeight: isSmallScreen ? 10 : 20,
            padding: isMediumScreen ? (isSmallScreen ? -1 : 10) : -10,
          },
        }}
      />
    </Box>
  );
};

export default PieActiveArc;
