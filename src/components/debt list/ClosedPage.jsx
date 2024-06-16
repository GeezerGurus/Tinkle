import React from "react";
import {
  Box,
  Typography,
  useTheme,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material";
import { tokens } from "../../theme";
import Debt from "./Debt";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AddIcon from "@mui/icons-material/Add";
const actions = [
  {
    icon: (
      <PowerSettingsNewIcon
        sx={{ transform: "rotate(180deg)", color: "red" }}
      />
    ),
    name: "Lend",
  },
  {
    icon: <PowerSettingsNewIcon sx={{ color: "green" }} />,
    name: "Save",
  },
];

const ClosedPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(3),
        height: "100vh", // Set height to full viewport height
        overflowY: "auto", // Enable vertical scrolling
        padding: theme.spacing(2),
        "::-webkit-scrollbar": {
          width: "7px",
        },
        "::-webkit-scrollbar-track": {
          background: "#EAE5E5",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#544D4D",
          height: "86.56px",
          borderRadius: "2px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
      {/* Common Scrollable Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(3),
        }}
      >
        {/* Lent part */}
        <Box>
          {/* I lent */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "yellow",
              padding: theme.spacing(2), // Add some padding
            }}
          >
            <Box
              sx={{ width: "120px", height: "8px", backgroundColor: "#00F79E" }}
            />
            <Typography variant="h6">I Lent</Typography>
          </Box>
          {/* Active Debt list */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(1),
            }}
          >
            <Debt bgColor="#FFF2F2" />
            <Debt bgColor="#FFF2F2" />
            <Debt bgColor="#FFF2F2" />
            <Debt bgColor="#FFF2F2" />
            <Debt bgColor="#FFF2F2" />
          </Box>
        </Box>
        {/* Owe Part */}
        <Box>
          {/* I Owe */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "yellow",
              padding: theme.spacing(2), // Add some padding
            }}
          >
            <Box
              sx={{ width: "120px", height: "8px", backgroundColor: "#FF0000" }}
            />
            <Typography variant="h6">I Owe</Typography>
          </Box>
          {/* Closed Debt list */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(1),
            }}
          >
            <Debt bgColor="#FFF2F2" />
            <Debt bgColor="#FFF2F2" />
            <Debt bgColor="#FFF2F2" />
            <Debt bgColor="#FFF2F2" />
            <Debt bgColor="#FFF2F2" />
            <Debt bgColor="#FFF2F2" />
          </Box>
        </Box>
      </Box>
      <SpeedDial
        ariaLabel="SpeedDial example"
        sx={{
          position: "absolute",
          bottom: -30,
          right: 130,
          width: "116px",
          //backgroundColor: "#2099DD",
        }}
        icon={
          <AddIcon
            sx={{
              //backgroundColor: "#2099DD",
              color: "white",
            }}
          />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default ClosedPage;
