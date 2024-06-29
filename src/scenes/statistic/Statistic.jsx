import * as React from "react";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import Firstrow from "../../components/statistics/firstrowsta";
import Secondrow from "../../components/statistics/secondrowsta";
import { useState } from "react";

const Statistic = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Function to handle previous month button click
  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  // Function to handle next month button click
  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "1360px",
          height: "946px",
          backgroundColor: "white",
        }}
      >
        <Firstrow
          caption={monthNames[currentMonth]}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <Secondrow />
      </Box>
    </Box>
  );
};

export default Statistic;
