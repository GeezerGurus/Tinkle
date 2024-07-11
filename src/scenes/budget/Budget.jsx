import React from "react";
import { Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { BudgetBox } from "../../components/budget";

const Budget = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    // Container
    <Box
      sx={{
        width: isMediumScreen ? "100%" : isLargeScreen ? "91vw" : "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      {/* Main */}
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          marginTop: theme.spacing(3),
          width: isMediumScreen ? (isSmallScreen ? "95%" : "60%") : "987px",

          height: isMediumScreen ? "100%" : "855px",
          gridTemplateColumns: isMediumScreen
            ? isSmallScreen
              ? "repeat(1, 1fr)"
              : "repeat(1, 1fr)"
            : "repeat(2, 1fr)",
          gap: "39px",
        }}
      >
        <BudgetBox period={"Monthly"} />
        <BudgetBox period={"Weekly"} />
        <BudgetBox period={"Yearly"} />
        <BudgetBox period={"One Time"} />
        {/* <ShowMoreBox header={"One Time"} /> */}
      </Box>
    </Box>
  );
};

export default Budget;
