import React from "react";
import { tokens } from "../../theme";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  BalanceTrend,
  Expenses,
  Records,
  TopSpendings,
} from "../../components/statistics";

const Statistics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  // const monthNames = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // // Function to handle previous month button click
  // const handlePrevMonth = () => {
  //   setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  // };

  // // Function to handle next month button click
  // const handleNextMonth = () => {
  //   setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  // };

  return (
    <Box
      sx={{
        width: "100%",
        height: "92%",
        display: "flex",
        pt: 2,
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* top bar  */}
        <Stack alignItems={"center"}>
          {/* Navigate left and right */}
          <ButtonGroup
            variant="contained"
            sx={{
              borderRadius: "16px",
              border: `1px solid ${colors.purple[600]}`,
            }}
          >
            <Button
              sx={{
                width: "96px",
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
                width: "96px",
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
        </Stack>

        {/* 4 boxes */}
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
          maxHeight={"872px"}
          columnGap={5}
        >
          <Grid item xs={5} height={"45%"}>
            <Expenses />
          </Grid>
          <Grid item xs={5} height={"45%"}>
            <BalanceTrend />
          </Grid>
          <Grid item xs={5} height={"45%"}>
            <TopSpendings />
          </Grid>
          <Grid item xs={5} height={"45%"}>
            <Records />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Statistics;
