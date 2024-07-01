import { Box, Paper } from "@mui/material";

export const Chart = ({ isSmallScreen }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        backgroundColor: "white",
        color: "black",
        width: isSmallScreen ? "100%" : "40%",
        height: isSmallScreen ? "278px" : "100%",
      }}
    ></Paper>
  );
};

export default Chart;
