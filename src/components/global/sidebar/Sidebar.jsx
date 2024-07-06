import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  List,
  Divider,
  ListItem,
  Avatar,
  Button,
  Typography,
  Tooltip,
  styled,
  useTheme,
  Stack,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";

import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  Dashboard as DashboardIcon,
  ArticleOutlined as RecordsIcon,
  CorporateFareOutlined as BudgetsIcon,
  ReceiptLongOutlined as ListsIcon,
  BarChart as BarChartIcon,
  OutlinedFlag as OutlinedFlagIcon,
  AodOutlined as TipsAndKnowledgeIcon,
  GroupOutlined as AboutUsIcon,
  HelpOutlineOutlined as SupportIcon,
  SettingsOutlined as SettingIcon,
  PlayArrow as ArrowIcon,
  Waves as WavesIcon,
  Circle as CircleIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { tokens, ColorModeContext } from "../../../theme";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import OpenSideItems from "./OpenSideItems";
import CloseSideItems from "./CloseSideItems";

// Drawer Component
const drawerWidth = "320px";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  // position: "fixed",
  // zIndex: 0,
  // height: "100%",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(11)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(11)} + 1px)`,
  },

  // position: "fixed",
  // zIndex: theme.zIndex.drawer + 1,
  // height: "100%",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// Contents
// lists
const list = [
  { text: "Debt List", path: "/lists/debt-list" },
  { text: "To Buy List", path: "/lists/to-buy-lists" },
];

// knowledge
const knowledge = [
  { text: "Videos", path: "/videos" },
  { text: "Books", path: "/books" },
];

//settings
const settings = [
  { text: "General", path: "/settings/general" },
  { text: "Balance Account", path: "/settings/balance-accounts" },
  { text: "Category", path: "/settings/categories" },
];

// Menu Items for Open Sidebar
const MenuOpen = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Records", icon: <RecordsIcon />, path: "/records" },
  { text: "Budgets", icon: <BudgetsIcon />, path: "/budget" },
  {
    text: "Lists",
    icon: <ListsIcon />,
    path: "/lists/debt-list",
    dropdown: true,
    page: "list",
    content: list,
  },
  {
    text: "Statistic",
    icon: <BarChartIcon />,
    path: "/statistics",
  },
  { text: "Goal", icon: <OutlinedFlagIcon />, path: "/goals" },
  {
    text: "Knowledge",
    icon: <TipsAndKnowledgeIcon />,
    path: "/knowledge",
    dropdown: true,
    page: "knowledge",
    content: knowledge,
  },
];

// General
const General = [
  { text: "About Us", icon: <AboutUsIcon />, path: "/home" },
  { text: "Support", icon: <SupportIcon />, path: "/support" },
  {
    text: "Setting",
    icon: <SettingIcon />,
    path: "/settings",
    dropdown: true,
    page: "settings",
    content: settings,
  },
];

// Menu Items for Closed Side Bar
const Sidebar = ({ mode }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = React.useState("list");
  const [lightMode, setLightMode] = useState(false);

  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setOpen(false);
        setExpanded(false);
      }
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const toggleDrawer = (open) => (event) => {
    setOpen(open);

    if (!open) {
      setExpanded(false);
    }
  };

  const handleNavigation = (path) => () => {
    navigate(path);
    setOpen(false);
    setExpanded(false);
  };

  const handleDropdownClick = (page) => () => {
    handleDrawerOpen();
    setTimeout(() => {
      setExpanded(page);
    }, 400);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Main Component
  return (
    <>
      <Drawer anchor="left" open={open} variant="permanent">
        {/* Main Container When Opened */}
        <Box
          p={2}
          sx={{
            width: open ? "320px" : "84px",
            height: open ? "1024px" : "auto",
            // height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          // role="presentation"
        >
          {/* Logo Header and Open Menu Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: open ? "71.875%" : "61px",
              height: "39px",
            }}
          >
            {/* Logo and Header */}
            {open && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <WavesIcon
                  sx={{
                    border: "1px solid black",
                    borderRadius: "50%",
                    width: "40.19px",
                    height: "39px",
                  }}
                />
                <Button
                  variant="text"
                  onClick={toggleDrawer(false)}
                  sx={{ color: colors.grey[100], textTransform: "none" }}
                >
                  <Typography variant="h6">Tinkle</Typography>
                </Button>
              </Box>
            )}

            {/* Menu Icon Button for when Opened and Closed */}
            <Button
              onClick={open ? toggleDrawer(false) : toggleDrawer(true)}
              sx={{
                width: "30px",
                height: "30px",
                "&:hover": {
                  backgroundColor: colors.purple[100],
                },
              }}
            >
              {open ? (
                <MenuOpenIcon
                  sx={{
                    color: theme.palette.mode === "dark" ? "white" : "black",
                    fontWeight: "700",
                    fontSize: "30px",
                  }}
                />
              ) : (
                <MenuIcon
                  sx={{
                    color: theme.palette.mode === "dark" ? "white" : "black",
                    fontWeight: "700",
                    fontSize: "30px",
                  }}
                />
              )}
            </Button>
          </Box>

          {/* Navigation Icons and Avatar Box */}
          <Box
            p={2}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            sx={{ height: "900px", marginTop: open ? "43px" : "48px" }}
          >
            {/* Menu Items Box */}
            <Box
              sx={{
                width: "280px",
                height: "528px",
                padding: "0px, 26px",
              }}
            >
              {open ? (
                <Typography variant="h6">Menu</Typography>
              ) : (
                <CircleIcon
                  sx={{
                    color: theme.palette.mode === "dark" ? "white" : "black",
                    width: "11px",
                    height: "11px",
                    ml: open ? "auto" : 13 + "3px",
                  }}
                />
              )}

              {/* Menu Items for when Opened and Closed Sidebar*/}
              <List>
                {MenuOpen.map(
                  ({ text, icon, path, dropdown, page, content }, index) => (
                    <Box key={index}>
                      {!dropdown && (
                        <ListItem
                          disablePadding
                          sx={{
                            width: open ? "86%" : "61px",
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: colors.purple[100],
                            },
                          }}
                        >
                          {open ? (
                            <OpenSideItems
                              path={path}
                              open={open}
                              icon={icon}
                              text={text}
                              theme={theme}
                              Navigation={navigate}
                              setOpen={setOpen}
                            />
                          ) : (
                            <CloseSideItems
                              title={text}
                              icon={icon}
                              path={path}
                              dropdown={dropdown}
                              onClick={
                                dropdown
                                  ? handleDropdownClick(page)
                                  : handleNavigation(path)
                              }
                            />
                          )}
                        </ListItem>
                      )}

                      {dropdown && (
                        <ListItem
                          key={text}
                          disablePadding
                          sx={{
                            width: "85%",
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: "white",
                            },
                          }}
                        >
                          {open ? (
                            <DropDownMenu
                              page={page}
                              text={text}
                              open={open}
                              icon={icon}
                              navigate={navigate}
                              DropdownClick={handleDropdownClick}
                              ChangePage={handleChange}
                              expanded={expanded}
                              content={content}
                              setOpen={setOpen}
                            />
                          ) : (
                            <CloseSideItems
                              title={text}
                              icon={icon}
                              path={path}
                              dropdown={dropdown}
                              onClick={
                                dropdown
                                  ? handleDropdownClick(page)
                                  : handleNavigation(path)
                              }
                            />
                          )}
                        </ListItem>
                      )}
                    </Box>
                  )
                )}
                <Divider
                  sx={{ width: "90%", display: open ? "auto" : "none" }}
                />
              </List>

              {/* General Items Box */}
              <Box>
                {open ? (
                  <Typography variant="h6">General</Typography>
                ) : (
                  <CircleIcon
                    sx={{
                      color: theme.palette.mode === "dark" ? "white" : "black",
                      width: "11px",
                      height: "11px",
                      ml: open ? "auto" : 13 + "3px",
                      mt: 2.3,
                    }}
                  />
                )}

                {/* General Items for when Opened and Closed Sidebar */}
                <List>
                  {General.map(
                    ({ text, icon, path, dropdown, page, content }, index) => (
                      <Box key={index}>
                        <ListItem
                          disablePadding
                          sx={{
                            width: open ? "85%" : "61px",
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: colors.purple[100],
                            },
                          }}
                        >
                          {!dropdown && (
                            <>
                              {open ? (
                                <OpenSideItems
                                  path={path}
                                  open={open}
                                  icon={icon}
                                  text={text}
                                  theme={theme}
                                  Navigation={navigate}
                                  setOpen={setOpen}
                                />
                              ) : (
                                <CloseSideItems
                                  title={text}
                                  icon={icon}
                                  path={path}
                                  onClick={
                                    dropdown
                                      ? handleDropdownClick(page)
                                      : handleNavigation(path)
                                  }
                                />
                              )}
                            </>
                          )}
                          {dropdown && (
                            <>
                              {open ? (
                                <DropDownMenu
                                  page={page}
                                  text={text}
                                  open={open}
                                  icon={icon}
                                  navigate={navigate}
                                  DropdownClick={handleDropdownClick}
                                  ChangePage={handleChange}
                                  expanded={expanded}
                                  content={content}
                                  setOpen={setOpen}
                                />
                              ) : (
                                <CloseSideItems
                                  title={text}
                                  icon={icon}
                                  path={path}
                                  dropdown={dropdown}
                                  onClick={handleDropdownClick(page)}
                                />
                              )}
                            </>
                          )}
                        </ListItem>
                      </Box>
                    )
                  )}
                </List>
              </Box>
            </Box>

            {/* Profile avatar , Profile Name, and light & dark Mode */}
            <Box display="flex" flexDirection="column" gap="10px">
              {/* avatar and name for Opened Sidebar*/}
              <Button
                component={Link}
                to={"/profile"}
                sx={{
                  width: open ? "240px" : "10%",
                  height: "45px",
                  padding: "8px",
                  border: open ? "1px solid #E0E0E0" : "none",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  textTransform: "none",
                }}
              >
                <Avatar
                  src=""
                  alt="avatar"
                  sx={{ width: "32px", height: "32px" }}
                />
                <Box
                  sx={{
                    width: "156px",
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "137px",
                      height: "38px",
                      padding: "0px 2px",
                      display: open ? "flex" : "none",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body3">Yei Khant Lwin</Typography>
                    <Typography variant="body4">Developer</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "14.78px",
                    height: "8.45px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowIcon />
                </Box>
              </Button>

              {/* dark mode light mode for Opened and Closed Sidebar*/}
              {open ? (
                <Box
                  sx={{
                    display: open ? "flex" : "none",
                    justifyContent: "space-around",
                    alignItems: "center",

                    border: "1px solid #E0E0E0",
                    borderRadius: "8px",
                    width: "240px",
                    height: "45px",
                  }}
                >
                  <Button
                    onClick={() => {
                      colorMode.LightMode();
                      setLightMode(true);
                    }}
                    startIcon={
                      <LightModeIcon
                        sx={{
                          color: mode === "light" ? "#FF9800" : "",
                        }}
                      />
                    }
                    variant="outline"
                    sx={{
                      border: "1px solid black",
                      textTransform: "capitalize",
                      width: "110px",
                      height: "38px",
                      padding: "14px, 24px",
                      borderRadius: "8px",
                    }}
                  >
                    Light
                  </Button>
                  <Button
                    onClick={() => {
                      colorMode.DarkMode();
                      setLightMode(false);
                    }}
                    startIcon={
                      <DarkModeIcon
                        sx={{ color: mode === "dark" ? "#50a0ff" : "" }}
                      />
                    }
                    variant="outline"
                    sx={{
                      border: "1px solid black",
                      textTransform: "capitalize",
                      width: "110px",
                      height: "38px",
                      padding: "14px, 24px",
                      borderRadius: "8px",
                    }}
                  >
                    Dark
                  </Button>
                </Box>
              ) : (
                <Stack
                  sx={{
                    height: "10%",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: "auto",
                  }}
                >
                  {/* Avatar and Name for Closed Sidebar */}
                  <Tooltip title="Profile" placement="right">
                    <Button component={Link} to={"/profile"}>
                      <Avatar
                        src=""
                        alt="avatar"
                        sx={{ width: "38px", height: "38px" }}
                      />
                    </Button>
                  </Tooltip>
                  {lightMode && (
                    <Button
                      onClick={() => {
                        colorMode.DarkMode();
                        setLightMode(false);
                      }}
                      variant="outline"
                      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                    >
                      <LightModeIcon
                        sx={{
                          color: mode === "light" ? "#FF9800" : "",
                        }}
                      />
                    </Button>
                  )}
                  {!lightMode && (
                    <Button
                      onClick={() => {
                        colorMode.LightMode();
                        setLightMode(true);
                      }}
                      variant="outline"
                      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                    >
                      <DarkModeIcon
                        sx={{
                          color: mode === "light" ? "#FF9800" : "",
                        }}
                      />
                    </Button>
                  )}
                </Stack>
              )}
            </Box>
          </Box>

          <Divider />
        </Box>
      </Drawer>
      {/* <Box
        p={2}
        sx={{
          width: "240px",
          height: "1024px",
          background: "brown",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        // role="presentation"
      ></Box> */}
    </>
  );
};

export default Sidebar;
