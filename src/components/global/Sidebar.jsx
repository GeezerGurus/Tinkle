import React, { useState, useContext } from "react";
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
  ButtonGroup,
  Avatar,
  Button,
  Typography,
  Tooltip,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import ArrowIcon from "@mui/icons-material/PlayArrow";
import SettingIcon from "@mui/icons-material/SettingsOutlined";
import SupportIcon from "@mui/icons-material/HelpOutlineOutlined";
import AboutUsIcon from "@mui/icons-material/GroupOutlined";
import BudgetsIcon from "@mui/icons-material/CorporateFareOutlined";
import ListsIcon from "@mui/icons-material/ReceiptLongOutlined";
import TipsAndKnowledgeIcon from "@mui/icons-material/AodOutlined";
import RecordsIcon from "@mui/icons-material/ArticleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/GridView";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useTheme } from "@emotion/react";
import { tokens, ColorModeContext } from "../../theme";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ mode }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const colorMode = useContext(ColorModeContext);

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
    <Box p={2} sx={{ width: "320px", height: "1024px" }} role="presentation">
      <Box
        textAlign="center"
        sx={{
          width: "100%",
          height: "30px",
          gap: "15px",
        }}
      >
        {/* finance tracker header */}
        <Button
          variant="text"
          endIcon={<MenuIcon />}
          onClick={toggleDrawer(true)}
          sx={{ color: colors.grey[100] }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "20px",
              textTransform: "capitalize",
            }}
          >
            Finance Tracker
          </Typography>
        </Button>
      </Box>
      {/* buttons and avatar box */}
      <Box
        p={2}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{ height: "900px" }}
      >
        <Box
          sx={{
            width: "280px",
            height: "528px",
            padding: "0px, 26px, 0px, 26px",
            top: "110",
            left: "10px",
            gap: "12px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500px",
              lineHeight: "24px",
              letterSpacing: "7%",
            }}
          >
            Menu
          </Typography>
          <List>
            {[
              { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
              { text: "Records", icon: <RecordsIcon />, path: "/records" },
              { text: "Lists", icon: <ListsIcon />, path: "/lists/debt-list" },
              {
                text: "Tips and Knowledge",
                icon: <TipsAndKnowledgeIcon />,
                path: "/knowledge",
              },
              { text: "Budget", icon: <BudgetsIcon />, path: "/budget" },
              {
                text: "Statistic",
                icon: <BarChartIcon />,
                path: "/statistics",
              },
            ].map(({ text, icon, path }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={handleNavigation(path)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500px",
              lineHeight: "24px",
              letterSpacing: "7%",
            }}
          >
            General
          </Typography>
          <List>
            {[
              { text: "About Us", icon: <AboutUsIcon />, path: "/home" },
              { text: "Support", icon: <SupportIcon />, path: "/support" },
              { text: "Setting", icon: <SettingIcon />, path: "/settings" },
            ].map(({ text, icon, path }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={handleNavigation(path)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box display="flex" flexDirection="column" gap="10px">
          {/* avatar and name */}
          <Box
            display="flex"
            sx={{
              width: "240px",
              height: "45px",
              padding: "8px",
              gap: "20px",
              border: "1px",
              borderRadius: "8px",
            }}
          >
            <Box sx={{ width: "32px", height: "32px" }}>
              <Avatar src="" alt="avatar" />
            </Box>
            <Box
              sx={{
                width: "156px",
                height: "35px",
                padding: "0px 2px 0px 2px",
                gap: "5px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Yei Khant Lwin
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "11px",
                  lineHeight: "14px",
                }}
              >
                Developer
              </Typography>
            </Box>
            <Box sx={{ width: "14.78px", height: "8.45px" }}>
              <IconButton>
                <ArrowIcon />
              </IconButton>
            </Box>
          </Box>
          {/* dark mode light mode */}
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              border: "1px",
              borderRadius: "8px",
              width: "240px",
              height: "45px",
            }}
          >
            <ButtonGroup sx={{ gap: "10px" }}>
              <Button
                onClick={colorMode.LightMode}
                startIcon={
                  <LightModeIcon
                    sx={{
                      color: mode === "light" ? "#FF9800" : "",
                    }}
                  />
                }
                variant="outline"
                sx={{
                  textTransform: "capitalize",
                  width: "110px",
                  height: "38px",
                  gap: "8px",
                  padding: "14px, 24px, 14px, 24px",
                  borderRadius: "8px",
                }}
              >
                Light
              </Button>
              <Button
                onClick={colorMode.DarkMode}
                startIcon={
                  <DarkModeIcon
                    sx={{ color: mode === "dark" ? "#50a0ff" : "" }}
                  />
                }
                variant="outline"
                sx={{
                  textTransform: "capitalize",
                  width: "110px",
                  height: "38px",
                  gap: "8px",
                  padding: "14px, 24px, 14px, 24px",
                  borderRadius: "8px",
                }}
              >
                Dark
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>

      <Divider />
    </Box>
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p={2}
      sx={{
        width: "80px",
        backgroundColor: theme.palette.frameBackground.default,
      }}
    >
      <Box>
        <ButtonGroup orientation="vertical" sx={{ gap: "33px" }}>
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{ color: colors.grey[100] }}
          >
            <MenuIcon />
          </IconButton>
          <Tooltip title="Dashboard" placement="right" arrow>
            <IconButton onClick={handleNavigation("/")}>
              <DashboardIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Records" placement="right" arrow>
            <IconButton onClick={handleNavigation("/records")}>
              <RecordsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Lists" placement="right" arrow>
            <IconButton onClick={handleNavigation("/lists/debt-list")}>
              <ListsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Knowledge" placement="right" arrow>
            <IconButton onClick={handleNavigation("/knowledge")}>
              <TipsAndKnowledgeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Budget" placement="right" arrow>
            <IconButton onClick={handleNavigation("/budget")}>
              <BudgetsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Statistic" placement="right" arrow>
            <IconButton onClick={handleNavigation("/statistics")}>
              <BarChartIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="About Us" placement="right" arrow>
            <IconButton onClick={handleNavigation("/home")}>
              <AboutUsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Support" placement="right" arrow>
            <IconButton onClick={handleNavigation("/support")}>
              <SupportIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings" placement="right" arrow>
            <IconButton onClick={handleNavigation("/settings")}>
              <SettingIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>

        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {drawerList()}
        </Drawer>
      </Box>
      <Box>
        <Tooltip title="Profile" placement="right" arrow>
          <Avatar src="" alt="avatar" sx={{ width: "38px", height: "38px" }} />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Sidebar;
