import React from "react";
import { Box, Typography, LinearProgress, Button } from "@mui/material";
import ReachedBox from "./ReachedBox";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
export const Reached = () => {
  const ActiveItems = [
    {
      name: "New Home",
      saved: 100000,
      goal: 100000,
      icon: <HomeIcon />,
      bgColor: "red",
      date: "No target date",
    },
    {
      name: "New Car",
      saved: 1000000,
      goal: 1000000,
      icon: <DirectionsCarIcon />,
      bgColor: "lightblue",
      date: "No target date",
    },
    {
      name: "New Home",
      saved: 100000,
      goal: 100000,
      icon: <HomeIcon />,
      bgColor: "red",
      date: "No target date",
    },
    {
      name: "Emergency",
      saved: 100000,
      goal: 100000,
      icon: <LocalAtmIcon />,
      bgColor: "grey",
      date: "No target date",
    },
  ];
  return (
    // Container
    <Box
      sx={{
        width: "1059px",
        height: "779px",
        gap: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* Contents */}
      {ActiveItems.map((item, index) => (
        <ReachedBox
          key={index}
          name={item.name}
          icon={item.icon}
          bgColor={item.bgColor}
          date={item.date}
          saved={item.saved}
          goal={item.goal}
        />
      ))}
    </Box>
  );
};

export default Reached;
