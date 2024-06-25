import { React, useContext } from "react";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation } from "react-router-dom";
import { RecordBtn } from "../utils";
import { AuthContext } from "../../context/AuthContext";

// Function to map paths to titles
const getTitle = (path) => {
  switch (true) {
    case /^\/lists\/to-buy-lists\/.*$/.test(path):
      return "To Buy List";
    case /^\/lists\/to-buy-lists$/.test(path):
      return "To Buy List";
    case /^\/lists\/debt-list$/.test(path):
      return "Debt List";
    case /^\/records$/.test(path):
      return "Records";
    case /^\/knowledge$/.test(path):
      return "Knowledge";
    case /^\/budget$/.test(path):
      return "Budget";
    case /^\/statistics$/.test(path):
      return "Statistics";
    case /^\/settings\/.*$/.test(path):
      return "Settings";
    case /^\/profile$/.test(path):
      return "Profile";
    case /^\/savings$/.test(path):
      return "Savings";
    case /^\/auth$/.test(path):
      return "Auth";
    case /^\/support$/.test(path):
      return "Support";
    case /^\/home$/.test(path):
      return "Home";
    case /^\/dashboard$/.test(path):
      return "Dashboard";
    default:
      return "English or Spanish?";
  }
};

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const title = getTitle(location.pathname);
  const { logout } = useContext(AuthContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{
        width: "100%",
        height: "78px",
        backgroundColor: theme.palette.frameBackground.default,
      }}
    >
      {/* header */}
      <Box
        display="flex"
        sx={{
          width: "300px",
          height: "48px",
        }}
      >
        <Typography variant="h4">{title}</Typography>
      </Box>
      {/* ICONS */}
      <Box
        display="flex"
        sx={{
          width: "204px",
          height: "40px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Record Button  */}
        <RecordBtn />
        <IconButton size="large">
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton size="large" onClick={logout} aria-haspopup="true">
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
