import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { PieActiveArc } from "../statistics";
import { ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";

const pieData = [
  { id: 0, value: 88000, label: "Education and Development" },
  { id: 1, value: 240000, label: "Food and Drinks" },
  { id: 2, value: 88000, label: "Health and Beauty" },
  { id: 3, value: 88000, label: "Charges, Fees" },
];

export const Chart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <Paper
      sx={{
        display: "flex",
        width: isMediumScreen ? "100%" : "40%",
        height: isMediumScreen ? "278px" : "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px 24px",
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          height: "48px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[600]} 1px solid`,
        }}
      >
        <Typography variant="h6">Expenses</Typography>
        <ShowMoreBtn to={"/statistics"} />
      </Box>

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
          // width={isMediumScreen ? 320 : 500}
          series={[
            {
              data: pieData,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: {
                innerRadius: isLargest ? 50 : 30,
                additionalRadius: isLargest ? -50 : -30,
              },
              cx: isSmallScreen
                ? "80%"
                : isMediumScreen
                ? "65%"
                : isLargeScreen
                ? "90%"
                : isLargest
                ? "35%"
                : "30%",
              cy: isMediumScreen ? "60%" : isLargeScreen ? "70%" : "50%",
              outerRadius: isMediumScreen
                ? 65
                : isLargeScreen
                ? 60
                : isLargest
                ? 55
                : 60,
            },
          ]}
          // height={isMediumScreen ? 250 : 300}
          label={({ dataEntry }) => (
            <text>{`${dataEntry.label} (${dataEntry.value.toFixed(
              2
            )} MMK)`}</text>
          )}
          slotProps={{
            legend: {
              direction: isLargeScreen ? "row" : "column",
              position: {
                vertical: isLargeScreen ? "top" : "middle",
                horizontal: isLargeScreen ? "middle" : "right",
              },
              labelStyle: {
                fontSize: isMediumScreen
                  ? "8px"
                  : isLargeScreen
                  ? "8px"
                  : "10px",
              },
              itemMarkWidth: isMediumScreen ? 10 : 15,
              itemMarkHeight: isMediumScreen ? 10 : 15,
              padding: isLargeScreen
                ? isMediumScreen
                  ? isMediumScreen
                    ? -1
                    : 10
                  : 0
                : -11,
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default Chart;
