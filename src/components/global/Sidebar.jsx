import React, { useState, useContext, useEffect } from "react";
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
  styled,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

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
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useTheme } from "@emotion/react";
import { tokens, ColorModeContext } from "../../theme";
import { useNavigate } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&::before": {
    display: "none",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  marginBottom: theme.spacing(1),
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#8884DC" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "white",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

const lists = [
  { text: "Debt List", path: "" },
  { text: "To Buy List", path: "" },
];

const Sidebar = ({ mode }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [expanded, setExpanded] = React.useState("list");

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const colorMode = useContext(ColorModeContext);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "230px",
          height: "39px",
          gap: "15px",
        }}
      >
        {/* finance tracker header */}
        <Button
          variant="text"
          onClick={toggleDrawer(true)}
          sx={{ color: colors.grey[100] }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "23px",
              textTransform: "capitalize",
            }}
          >
            Tinkle
          </Typography>
        </Button>
        <MenuOpenIcon
          sx={{
            fontWeight: "700",
            fontSize: "23px",
          }}
        />
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
              { text: "Budgets", icon: <BudgetsIcon />, path: "/budget" },
              {
                text: "Lists",
                icon: <ListsIcon />,
                path: "/lists/debt-list",
                dropdown: true,
                page: "list",
              },
              {
                text: "Statistic",
                icon: <BarChartIcon />,
                path: "/statistics",
              },
              { text: "Goal", icon: <OutlinedFlagIcon />, path: "/savings" },
              {
                text: "Knowledge",
                icon: <TipsAndKnowledgeIcon />,
                path: "/knowledge",
                dropdown: true,
                page: "knowledge",
              },
            ].map(({ text, icon, path, dropdown, page }) => (
              <ListItem key={text} disablePadding>
                {!dropdown && (
                  <>
                    <ListItemButton
                      onClick={() => {
                        handleNavigation(path)();
                      }}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </>
                )}

                {dropdown && (
                  <>
                    <Accordion
                      expanded={expanded === page}
                      onChange={handleChange(page)}
                    >
                      <AccordionSummary>
                        {/* Icon */}
                        <ListItemIcon>{icon}</ListItemIcon>
                        {/* Name */}
                        <Typography>{text}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box
                          sx={{
                            width: "240px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {page === "list" && (
                            <Box
                              sx={{
                                width: "60%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }}
                            >
                              {lists.map(({ text, path }) => (
                                <ListItem
                                  key={text}
                                  disablePadding
                                  sx={{
                                    width: "200px",
                                  }}
                                >
                                  <ListItemButton
                                    onClick={() => {
                                      handleNavigation(path);
                                    }}
                                    sx={{
                                      height: "40px",
                                      fontSize: "14px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    <ListItemIcon sx={{ minWidth: "16px" }}>
                                      <FiberManualRecordIcon
                                        sx={{
                                          width: "11px",
                                          height: "11px",
                                          color: "#8884DC",
                                        }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                  </ListItemButton>
                                </ListItem>
                              ))}
                            </Box>
                          )}
                          {page === "knowledge" && (
                            <Box>
                              <Button onClick={handleNavigation("/knowledge1")}>
                                Knowledge 1
                              </Button>
                              <Button onClick={handleNavigation("/knowledge2")}>
                                Knowledge 2
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
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
              {
                text: "Setting",
                icon: <SettingIcon />,
                path: "/settings",
                dropdown: true,
                page: "settings",
              },
            ].map(({ text, icon, path, dropdown, page }) => (
              <ListItem key={text} disablePadding>
                {!dropdown && (
                  <ListItemButton onClick={handleNavigation(path)}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {dropdown && (
                  <>
                    <Accordion
                      expanded={expanded === page}
                      onChange={handleChange(page)}
                    >
                      <AccordionSummary>
                        {/* Icon */}
                        <ListItemIcon>{icon}</ListItemIcon>
                        {/* Name */}
                        <Typography>{text}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Sunt velit temporibus vero laudantium laborum
                          nemo error sed exercitationem odio, rem doloremque
                          nesciunt sit! Quidem optio animi explicabo recusandae
                          autem enim!
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
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
