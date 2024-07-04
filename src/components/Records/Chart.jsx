import { Paper, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { PieActiveArc } from "../statistics";

const pieData = [
  { id: 0, value: 88000, label: "Education and Development" },
  { id: 1, value: 240000, label: "Food and Drinks" },
  { id: 2, value: 88000, label: "Health and Beauty" },
  { id: 3, value: 88000, label: "Charges, Fees" },
];

export const Chart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      sx={{
        display: "flex",
        width: isMediumScreen ? "100%" : "32%",
        height: "216px",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px 24px",
        borderRadius: "16px",
      }}
    >
      <PieActiveArc data={pieData} dashboard={true} />
    </Paper>
  );
};

export default Chart;
