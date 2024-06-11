import { useContext } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Typography,
  ButtonGroup,
  Button,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Add } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

// Function to map paths to titles
const getTitle = (path) => {
  switch (path) {
    case "/":
      return "Dashboard";
    case "/records":
      return "Records";
    case "/knowledge":
      return "Knowledge";
    case "/lists":
      return "Lists";
    case "/budget":
      return "Budget";
    case "/statistics":
      return "Statistics";
    case "/settings":
      return "Settings";
    case "/profile":
      return "Profile";
    case "/auth":
      return "Auth";
    case "/support":
      return "Support";
    case "/home":
      return "Home";
    default:
      return "Dashboard";
  }
};

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();
  const title = getTitle(location.pathname);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{ width: "100%", height: "78px" }}
    >
      {/* header */}
      <Box
        display="flex"
        sx={{
          width: "166px",
          height: "48px",
        }}
      >
        <Typography variant="h2" sx={{ fontSize: "32px" }}>
          {title}
        </Typography>
      </Box>
      {/* ICONS */}
      <Box display="flex">
        <ButtonGroup
          sx={{
            width: "204px",
            height: "40px",
            gap: "16px",
          }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              width: "97px",
              height: "38px",
              textTransform: "capitalize",
              background: "#000000",
              borderRadius: "8px",
              padding: "14px, 24px, 14px, 24px",
              fontSize: "16px",
              lineHeight: "24px ",
            }}
          >
            Record
          </Button>
          <IconButton size="large">
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton size="large">
            <PersonOutlinedIcon />
          </IconButton>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Topbar;
