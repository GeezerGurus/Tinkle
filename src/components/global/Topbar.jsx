import { useContext, React, useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  Button,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { RecordBtn } from "../utils";

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
  const navigate = useNavigate();
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
  const handleNavigation = (path) => () => {
    navigate(path);
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
          width: "300px",
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
        {/* Record Button  */}
        <RecordBtn />
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
            <IconButton onClick={handleNavigation("/profile")}>
              <Avatar />
            </IconButton>{" "}
            Profile
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
