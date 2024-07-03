import {
  Box,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { Progress } from "../utils";

const pieData = [
  { id: 0, value: 88000, label: "Education and Development" },
  { id: 1, value: 240000, label: "Food and Drinks" },
  { id: 2, value: 88000, label: "Health and Beauty" },
  { id: 3, value: 88000, label: "Charges, Fees" },
  { id: 4, value: 120000, label: "Transportation" },
  { id: 5, value: 50000, label: "Entertainment" },
  { id: 6, value: 150000, label: "Shopping" },
  { id: 7, value: 100000, label: "Utilities" },
];

const colorMap = {
  0: "#7772F2",
  1: "#F5ADA8",
  2: "#A8BCF5",
  3: "#F5EEA8",
  4: "#FFC107",
  5: "#4CAF50",
  6: "#E91E63",
  7: "#795548",
};

const TopSpendings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        border: `1px solid ${colors.purple[600]}`,
        height: "100%",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Box
        sx={{
          minHeight: "56px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[600]} 1px solid`,
        }}
      >
        <Typography variant={isSmallScreen ? "h6" : "h4"}>
          Top Spendings
        </Typography>
      </Box>

      {/* Categories */}
      <Box
        sx={{
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {pieData.map((category) => (
          <Stack minHeight={isSmallScreen ? "auto" : "64px"} key={category.id}>
            <Stack
              direction={"row"}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <Typography variant={isSmallScreen ? "body2" : "body1"}>
                {category.label}
              </Typography>
              <Typography
                variant={isSmallScreen ? "body2" : "body1"}
              >{`${category.value} MMK`}</Typography>
            </Stack>
            <Progress
              percent={`${(category.value / 300000) * 100}%`} // Example calculation based on max value (300000 MMK)
              height={"35px"}
              barColor={colorMap[category.id]}
            />
          </Stack>
        ))}
      </Box>
    </Paper>
  );
};

export default TopSpendings;
