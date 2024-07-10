import React from "react";
import { tokens } from "../../theme";
import {
  Box,
  // Button,
  // ButtonGroup,
  Grid,
  // Stack,
  // Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
// import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  BalanceTrend,
  Expenses,
  Records,
  TopSpendings,
} from "../../components/statistics";

const Statistics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallLaptop = useMediaQuery(theme.breakpoints.down("laptop"));

  const sidebarWidth = 84;

  return (
    <Box
      sx={{
        overflowX: isSmallScreen ? "hidden" : "",
        width: isMediumScreen
          ? isSmallScreen
            ? "100%"
            : `calc(98vw - ${sidebarWidth}px)`
          : isSmallLaptop
          ? `92vw`
          : "100%",
        height: "92%",
        display: "flex",
        pt: 2,
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSmallScreen ? 5 : "",
        }}
      >
        {/* top bar  */}
        {/* <Stack
          alignItems={"center"}
          mb={isMediumScreen ? (isSmallScreen ? "" : 2) : ""}
        >
          <ButtonGroup
            variant="contained"
            sx={{
              width: isSmallScreen ? "80%" : "100%",
              borderRadius: "16px",
              border: `1px solid ${colors.purple[600]}`,
            }}
          >
            <Button
              sx={{
                width: isSmallScreen ? "25%" : "96px",
                borderRadius: "16px",
                backgroundColor: "white",
                color: colors.purple[700],
                "&:hover": {
                  backgroundColor: colors.purple[100],
                },
              }}
            >
              <NavigateBeforeIcon />
            </Button>
            <Stack
              justifyContent="center"
              alignItems="center"
              width="344px"
              height="40px"
              sx={{ backgroundColor: colors.purple[600], color: "white" }}
            >
              <Typography variant="body1">This Month</Typography>
            </Stack>
            <Button
              sx={{
                width: isSmallScreen ? "25%" : "96px",
                borderRadius: "16px",
                backgroundColor: "white",
                color: colors.purple[700],
                "&:hover": {
                  backgroundColor: colors.purple[100],
                },
              }}
            >
              <NavigateNextIcon />
            </Button>
          </ButtonGroup>
        </Stack> */}

        {/* 4 boxes */}
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
          maxHeight={isSmallScreen ? "100%" : "872px"}
          columnGap={5}
          rowGap={5}
        >
          <Grid item xs={11} md={5} height={isSmallScreen ? "425px" : "45%"}>
            <Expenses />
          </Grid>
          <Grid item xs={11} md={5} height={isSmallScreen ? "252px" : "45%"}>
            <BalanceTrend />
          </Grid>
          <Grid item xs={11} md={5} height={isSmallScreen ? "65%" : "45%"}>
            <TopSpendings />
          </Grid>
          <Grid item xs={11} md={5} height={isSmallScreen ? "65%" : "45%"}>
            <Records />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Statistics;
