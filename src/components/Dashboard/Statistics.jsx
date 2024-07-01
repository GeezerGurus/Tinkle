import { Box, Paper } from "@mui/material";

export const Statistics = ({ isSmallScreen }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        backgroundColor: "white",
        color: "black",
        width: isSmallScreen ? "100%" : "60%",
        height: isSmallScreen ? "252px" : "100%",
        marginRight: isSmallScreen ? 0 : "24px",
      }}
    ></Paper>
  );
};

export default Statistics;
