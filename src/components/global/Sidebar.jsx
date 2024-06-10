import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => () => {
    navigate(path);
    setDrawerOpen(false);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
          { text: "Records", icon: <ListAltIcon />, path: "/records" },
          { text: "Knowledge", icon: <SchoolIcon />, path: "/knowledge" },
          { text: "Lists", icon: <ListAltIcon />, path: "/lists" },
          { text: "Budget", icon: <AttachMoneyIcon />, path: "/budget" },
          { text: "Statistic", icon: <BarChartIcon />, path: "/statistic" },
        ].map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleNavigation(path)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box>
      <IconButton onClick={toggleDrawer(true)} sx={{ color: colors.grey[100] }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
