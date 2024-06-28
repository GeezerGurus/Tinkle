import { React, useContext } from "react";
import { Box, IconButton, useTheme, Typography, Stack } from "@mui/material";
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
    case /^\/budget\/.*$/.test(path):
      return "Budget";
    case /^\/statistics$/.test(path):
      return "Statistics";
    case /^\/settings\/.*$/.test(path):
      return "Settings";
    case /^\/profile$/.test(path):
      return "Profile";
    case /^\/goals$/.test(path):
      return "Goals";
    case /^\/auth$/.test(path):
      return "Auth";
    case /^\/support$/.test(path):
      return "Support";
    case /^\/home$/.test(path):
      return "Home";
    case /^\/dashboard$/.test(path):
      return "Dashboard";
    case /^\/books$/.test(path):
      return "Books";
    case /^\/books\/favorites$/.test(path):
      return "Books";
    case /^\/books\/savings$/.test(path):
      return "Books";
    case /^\/books\/business$/.test(path):
      return "Books";
    case /^\/books\/budget$/.test(path):
      return "Books";
    case /^\/books\/life$/.test(path):
      return "Books";
    case /^\/books\/tinkle$/.test(path):
      return "Books";
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
      alignItems="center"
      sx={{
        padding: "16px 32px",
        width: "100%",
        height: "80px",
      }}
    >
      {/* header */}
      <Stack>
        <Typography variant="h4">{title}</Typography>
        <Box
          sx={{
            width: "100%",
            backgroundColor: colors.purple[600],
            height: "4px",
          }}
        />
      </Stack>

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
        <RecordBtn color={colors.purple[600]} hoverColor={colors.purple[200]} />
        <IconButton size="large">
          <NotificationsOutlinedIcon
            sx={{ width: "32px", height: "32px", color: colors.purple[500] }}
          />
        </IconButton>
        <IconButton size="large" onClick={logout} aria-haspopup="true">
          <LogoutIcon
            sx={{ width: "32px", height: "32px", color: colors.purple[500] }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
