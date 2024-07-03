import { Box, Paper, Typography, useTheme } from "@mui/material";
import { PieActiveArc } from "../statistics";
import { ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";

const pieData = [
  { id: 0, value: 88000, label: "Education and Development" },
  { id: 1, value: 240000, label: "Food and Drinks" },
  { id: 2, value: 88000, label: "Health and Beauty" },
  { id: 3, value: 88000, label: "Charges, Fees" },
];

export const Chart = ({ isSmallScreen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper
      sx={{
        display: "flex",
        width: isSmallScreen ? "100%" : "40%",
        height: isSmallScreen ? "278px" : "100%",
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

      <PieActiveArc data={pieData} dashboard={true} />
    </Paper>
  );
};

export default Chart;
