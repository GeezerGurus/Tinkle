import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  List,
  Divider,
  ListItem,
  Avatar,
  Button,
  Typography,
  useTheme,
  Drawer,
} from "@mui/material";
import { Link } from "react-router-dom";

import {
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
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { tokens, ColorModeContext } from "../../../theme";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import OpenSideItems from "./OpenSideItems";

// Contents
// lists
const list = [
  { text: "Debt List", path: "/lists/debt-list" },
  { text: "To Buy List", path: "/lists/to-buy-lists" },
];

// knowledge
const knowledge = [
  { text: "Videos", path: "" },
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
const ResponsiveSidebar = ({ mode, isOpen, toggleSlider, setSlider }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = React.useState("list");

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
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleSlider}
        variant="primary"
      >
        {/* Main Container When Opened */}
        <Box
          p={2}
          sx={{
            width: "180px",
            minHeight: "1024px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            overflowX: "hidden",
          }}
          role="presentation"
        >
          {/* Logo Header and Open Menu Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "39px",
              ml: 1,
            }}
          >
            {/* Logo and Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <WavesIcon
                onClick={toggleSlider}
                sx={{
                  border: "1px solid black",
                  borderRadius: "50%",
                  width: "40.19px",
                  height: "39px",
                }}
              />
              <Button
                variant="text"
                onClick={toggleSlider}
                sx={{ color: colors.grey[100], textTransform: "none" }}
              >
                <Typography variant="h6">Tinkle</Typography>
              </Button>
            </Box>

            {/* Menu Icon Button for when Opened and Closed */}
            <Button
              onClick={toggleSlider}
              sx={{
                width: "30px",
                height: "30px",
                "&:hover": {
                  backgroundColor: colors.purple[100],
                },
              }}
            >
              <MenuOpenIcon
                sx={{
                  color: theme.palette.mode === "dark" ? "white" : "black",
                  fontWeight: "700",
                  fontSize: "30px",
                }}
              />
            </Button>
          </Box>

          {/* Navigation Icons and Avatar Box */}
          <Box
            p={2}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            sx={{ height: "900px", marginTop: "43px" }}
          >
            {/* Menu Items Box */}
            <Box
              sx={{
                width: "100%",
                height: "528px",
                pl: 4,
              }}
            >
              <Typography variant="h6" ml={2}>
                Menu
              </Typography>

              {/* Menu Items for when Opened and Closed Sidebar*/}
              <List>
                {MenuOpen.map(
                  ({ text, icon, path, dropdown, page, content }) => (
                    <>
                      {!dropdown && (
                        <ListItem
                          key={text}
                          disablePadding
                          sx={{
                            width: "86%",
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: colors.purple[100],
                            },
                          }}
                        >
                          <OpenSideItems
                            path={path}
                            open={true}
                            icon={icon}
                            text={text}
                            theme={theme}
                            Navigation={navigate}
                            setOpen={setSlider}
                          />
                        </ListItem>
                      )}

                      {dropdown && (
                        <ListItem
                          key={text}
                          disablePadding
                          sx={{
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: "white",
                            },
                            width: "84%",
                          }}
                        >
                          <DropDownMenu
                            page={page}
                            text={text}
                            open={true}
                            icon={icon}
                            navigate={navigate}
                            DropdownClick={handleDropdownClick}
                            ChangePage={handleChange}
                            expanded={expanded}
                            content={content}
                            setOpen={setSlider}
                          />
                        </ListItem>
                      )}
                    </>
                  )
                )}
                <Divider sx={{ width: "90%" }} />
              </List>

              {/* General Items Box */}
              <Box>
                <Typography variant="h6" ml={2}>
                  General
                </Typography>

                {/* General Items for when Opened and Closed Sidebar */}
                <List>
                  {General.map(
                    ({ text, icon, path, dropdown, page, content }) => (
                      <ListItem
                        key={text}
                        disablePadding
                        sx={{
                          width: "80%",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: colors.purple[100],
                          },
                        }}
                      >
                        {!dropdown && (
                          <>
                            <OpenSideItems
                              path={path}
                              open={true}
                              icon={icon}
                              text={text}
                              theme={theme}
                              Navigation={navigate}
                              setOpen={setSlider}
                            />
                          </>
                        )}
                        {dropdown && (
                          <>
                            <DropDownMenu
                              page={page}
                              text={text}
                              open={true}
                              icon={icon}
                              navigate={navigate}
                              DropdownClick={handleDropdownClick}
                              ChangePage={handleChange}
                              expanded={expanded}
                              content={content}
                              setOpen={setSlider}
                            />
                          </>
                        )}
                      </ListItem>
                    )
                  )}
                </List>
              </Box>
            </Box>

            {/* Profile avatar , Profile Name, and light & dark Mode */}
            <Box display="flex" flexDirection="column" gap="10px" ml={5}>
              {/* avatar and name for Opened Sidebar*/}
              <Button
                component={Link}
                to={"/profile"}
                sx={{
                  width: "80%",
                  height: "100px",
                  padding: "8px",
                  border: "1px solid #E0E0E0",
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
                    width: "60%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "150px",
                      height: "38px",
                      padding: "0px 2px",
                      display: "flex",
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  border: "1px solid #E0E0E0",
                  borderRadius: "8px",
                  width: "150px",
                  height: "45px",
                  ml: 1,
                }}
              >
                <Button
                  onClick={() => {
                    colorMode.LightMode();
                  }}
                  startIcon={
                    <LightModeIcon
                      sx={{
                        color: theme.palette.mode === "light" ? "#FF9800" : "",
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
                  }}
                  startIcon={
                    <DarkModeIcon
                      sx={{
                        color: theme.palette.mode === "dark" ? "#50a0ff" : "",
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
                  Dark
                </Button>
              </Box>
            </Box>
          </Box>

          <Divider />
        </Box>
      </Drawer>
    </>
  );
};

export default ResponsiveSidebar;
