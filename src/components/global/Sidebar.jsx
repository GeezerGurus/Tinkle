import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Typography,
  Tooltip,
  styled,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiDrawer from "@mui/material/Drawer";

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
  ArrowForwardIosSharp as ArrowForwardIosSharpIcon,
  FiberManualRecord as FiberManualRecordIcon,
  Waves as WavesIcon,
  Circle as CircleIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { tokens, ColorModeContext } from "../../theme";
import { useNavigate } from "react-router-dom";
import { dark } from "@mui/material/styles/createPalette";

// Drawer

const drawerWidth = "320px";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(11)} + 1px)`,
  },
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

// Accordion components
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderRadius: "8px",
  "&::before": {
    display: "none",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  marginBottom: theme.spacing(1),
  border: "none",
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#8884DC" }} />
    }
    {...props}
  />
))(({ theme, colors = tokens(theme.palette.mode) }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.mode === "dark" ? dark : "white",
  flexDirection: "row",
  "&:hover": {
    background: colors.purple[100],
    borderRadius: "8px",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

// Drop Down component
const Dropdown = ({ content, Navigation, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      {content.map(({ text, path }) => (
        <ListItem
          key={text}
          disablePadding
          sx={{
            width: "190px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: colors.purple[100],
            },
          }}
        >
          <ListItemButton
            onClick={() => {
              onClick();
              Navigation(path);
            }}
            sx={{
              height: "40px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <ListItemIcon sx={{ minWidth: "26px" }}>
              <FiberManualRecordIcon
                sx={{
                  width: "11px",
                  height: "11px",
                  color: "#8884DC",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                variant: "body2",
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </Box>
  );
};

// Closed Side bar Menu Items component

const Tool = ({ Navigation, title, icon, path, dropdown, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Tooltip title={title} placement="right" arrow>
      {!dropdown && (
        <IconButton
          onClick={() => {
            onClick();
          }}
          sx={{
            height: "46.4px",
            width: "46.4px",
            ml: 11 + "6px",
            "&:hover": {
              backgroundColor: colors.purple[100],
            },
          }}
        >
          {icon}
        </IconButton>
      )}
      {dropdown && (
        <IconButton
          onClick={() => {
            onClick();
          }}
          sx={{
            height: "46.4px",
            width: "46.4px",

            ml: 11 + "6px",
            "&:hover": {
              backgroundColor: colors.purple[100],
            },
          }}
        >
          {icon}
        </IconButton>
      )}
    </Tooltip>
  );
};

// Contents

// lists
const lists = [
  { text: "Debt List", path: "" },
  { text: "To Buy List", path: "" },
];

// knowledge
const knowledge = [
  { text: "Videos", path: "/video" },
  { text: "Books", path: "" },
  { text: "Documentations", path: "" },
];

//settings
const settings = [
  { text: "General", path: "" },
  { text: "Balance Account", path: "" },
  { text: "Category", path: "" },
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
    setExpanded(false); // Reset expanded state when navigating
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

  // Drawer Component
  const drawerList = () => (
    <Box
      p={2}
      sx={{
        width: open ? "320px" : "84px",
        height: "1024px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: open ? "230px" : "61px",
          height: "39px",
          gap: "15px",
        }}
      >
        {/* finance tracker header */}
        {/* Left Side */}
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
        {/* Right Side */}
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
                fontWeight: "700",
                fontSize: "30px",
              }}
            />
          ) : (
            <MenuIcon
              sx={{
                fontWeight: "700",
                fontSize: "30px",
              }}
            />
          )}
        </Button>
      </Box>
      {/* buttons and avatar box */}
      <Box
        p={2}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{ height: "900px", marginTop: open ? "43px" : "48px" }}
      >
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
                color: "black",
                width: "11px",
                height: "11px",
                ml: open ? "auto" : 13 + "2px",
              }}
            />
          )}
          <List>
            {MenuOpen.map(({ text, icon, path, dropdown, page }) => (
              <>
                {!dropdown && (
                  <ListItem
                    key={text}
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
                      <ListItemButton
                        onClick={() => {
                          handleNavigation(path)();
                        }}
                        sx={{
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: colors.purple[100],
                            borderRadius: "8px",
                            width: "70%",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: open ? "auto" : 14,
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          primaryTypographyProps={{ variant: "body2" }}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    ) : (
                      <Tool
                        title={text}
                        icon={icon}
                        path={path}
                        Navigation={handleNavigation}
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
                      width: "88%",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    {open ? (
                      <Accordion
                        expanded={expanded === page}
                        onChange={handleChange(page)}
                      >
                        <AccordionSummary>
                          {/* Icon */}
                          <ListItemIcon sx={{ ml: open ? "none" : 14 }}>
                            {icon}
                          </ListItemIcon>
                          {/* Name */}
                          <Typography
                            variant="body2"
                            sx={{ opacity: open ? 1 : 0 }}
                          >
                            {text}
                          </Typography>
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
                              <Dropdown
                                content={lists}
                                Navigation={handleNavigation}
                                onClick={handleDropdownClick}
                              />
                            )}
                            {page === "knowledge" && (
                              <Dropdown
                                content={knowledge}
                                Navigation={handleNavigation}
                                onClick={handleDropdownClick}
                              />
                            )}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ) : (
                      <Tool
                        title={text}
                        icon={icon}
                        path={path}
                        Navigation={handleNavigation}
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
              </>
            ))}
            <Divider sx={{ width: "90%", display: open ? "auto" : "none" }} />
          </List>
          {/* General */}
          <Box>
            {open ? (
              <Typography variant="h6">General</Typography>
            ) : (
              <CircleIcon
                sx={{
                  color: "black",
                  width: "11px",
                  height: "11px",
                  ml: open ? "auto" : 13 + "2px",
                  mt: 2.3,
                }}
              />
            )}
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
                <ListItem
                  key={text}
                  disablePadding
                  sx={{
                    width: open ? "80%" : "61px",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: colors.purple[100],
                    },
                  }}
                >
                  {!dropdown && (
                    <>
                      {open ? (
                        <ListItemButton
                          onClick={handleNavigation(path)}
                          sx={{
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: colors.purple[100],
                              borderRadius: "8px",
                              width: "70%",
                            },
                          }}
                        >
                          <ListItemIcon sx={{ ml: open ? "auto" : 14 }}>
                            {icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={text}
                            primaryTypographyProps={{ variant: "body2" }}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      ) : (
                        <Tool
                          title={text}
                          icon={icon}
                          path={path}
                          Navigation={handleNavigation}
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
                        <Accordion
                          expanded={expanded === page}
                          onChange={handleChange(page)}
                        >
                          <AccordionSummary>
                            {/* Icon */}
                            <ListItemIcon sx={{ ml: open ? "none" : 14 }}>
                              {icon}
                            </ListItemIcon>
                            {/* Name */}
                            <Typography
                              variant="body2"
                              sx={{ opacity: open ? 1 : 0 }}
                            >
                              {text}
                            </Typography>
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
                              <Dropdown
                                content={settings}
                                Navigation={handleNavigation}
                                onClick={handleDropdownClick}
                              />
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      ) : (
                        <Tool
                          title={text}
                          icon={icon}
                          path={path}
                          Navigation={handleNavigation}
                          dropdown={dropdown}
                          onClick={handleDropdownClick(page)}
                        />
                      )}
                    </>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap="10px">
          {/* avatar and name */}
          <Box
            sx={{
              width: "240px",
              height: "45px",
              padding: "8px",
              gap: "20px",
              border: open ? "1px solid #E0E0E0" : "none",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
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
                  gap: "5px",
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
              <IconButton>
                <ArrowIcon />
              </IconButton>
            </Box>
          </Box>
          {/* dark mode light mode */}

          {/* When Open */}
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
            // When Closed
            <Box
              sx={{
                height: "10%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Tooltip title="Profile" placement="right">
                <Avatar
                  src=""
                  alt="avatar"
                  sx={{ width: "38px", height: "38px" }}
                />
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
            </Box>
          )}
        </Box>
      </Box>

      <Divider />
    </Box>
  );

  // Drawer Close Component
  return (
    <Drawer anchor="left" open={open} variant="permanent">
      {drawerList(open)}
    </Drawer>
  );
};

export default Sidebar;
