import { Box, Paper, Typography, useTheme } from "@mui/material";
import { ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";
import { LineChart } from "../statistics";

const data = {
  income: Array.from({ length: 31 }, (_, i) => Math.random() * 1000),
  expenses: Array.from({ length: 31 }, (_, i) => Math.random() * -1000),
};

const labels = Array.from({ length: 31 }, (_, i) => i + 1);

export const Statistics = ({ isMediumScreen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper
      sx={{
        display: "flex",
        width: isMediumScreen ? "100%" : "60%",
        height: isMediumScreen ? "252px" : "100%",
        marginRight: isMediumScreen ? 0 : "24px",
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
        <Typography variant="h6">Balance Trend</Typography>
        <ShowMoreBtn to={"/statistics"} />
      </Box>
      <LineChart data={data} labels={labels} height="200px" />
    </Paper>
  );
};

export default Statistics;
