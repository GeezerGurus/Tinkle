import { useContext, React, useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          width: "166px",
          height: "48px",
        }}
      >
        <Typography variant="h2" sx={{ fontSize: "32px" }}>
          {title}
        </Typography>
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
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            width: "97px",
            height: "38px",
            textTransform: "capitalize",
            background: "#000000",
            borderRadius: "8px",
            fontSize: "16px",
            lineHeight: "24px ",
          }}
        >
          Record
        </Button>
        <IconButton size="large">
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton
          size="large"
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
