import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Container,
  Box,
  Stack,
  useTheme,
  Divider,
  Accordion,
  Avatar,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Modal,
  useMediaQuery,
} from "@mui/material";
import {
  DashboardImage,
  BackgroundImage,
  LeftArrowImage,
  RightArrowImage,
  StraightLineImage,
  TreeLineImage,
  TwoStarsImage,
  RightArrowImage2,
  LeftArrowImage2,
  ThreeStarsImage,
  ListItem1Image,
  ListItem2Image,
  ListItem3Image,
  KnowledgeImage,
  LogoDarkImage,
} from "../../assets/hero";
import { tokens } from "../../theme";
import CircleIcon from "@mui/icons-material/Circle";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import FlagIcon from "@mui/icons-material/Flag";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Form from "../../components/auth/Form";
import { Heroavatarprofile } from "../../components/hero";
import { Directions } from "@mui/icons-material";
const Hero = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentSection, setCurrentSection] = useState("past");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const profiles = [
    { code: "0", name: "Wai Yan Htut", job: "DL" },
    { code: "01", name: "Yei Khant Lwin", job: "Nigga" },
    { code: "02", name: "Zayar Naing", job: "broke coder" },
    { code: "03", name: "Zaw Lin Naing", job: "brooken coder" },
    // Add more profiles as needed
  ];

  const profiles2 = [
    { code: "05", name: "Ye Yint Naing Oo", job: "Designer" },

    { code: "08", name: "Sithu", job: "A Ba" },
    { code: "06", name: "Sai Sai Lin Htet", job: "E boy" },
    { code: "07", name: "Thuta Htun", job: "Caffeine Addict" },
    { code: "04", name: "Swan Lynn Htun", job: "Edi coder" },
  ];

  useEffect(() => {
    const sections = ["past", "present", "future"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % sections.length;
      setCurrentSection(sections[index]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getColor = (section) =>
    currentSection === section ? colors.purple[600] : colors.extra.grey_accent;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallest = useMediaQuery(theme.breakpoints.down("xs"));
  const isExtraSmallest = useMediaQuery(theme.breakpoints.down("xxs"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navigation Bar */}
      <Box
        width={"100%"}
        sx={{
          backgroundColor: "rgba(0,0,0,0)",
          position: "fixed",
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={"8px 16px"}
        >
          <img
            src={LogoDarkImage}
            alt="Tinkle"
            style={{ width: "88px", objectFit: "contain" }}
          />
          <Stack direction={"row"} display={isSmallScreen ? "none" : "block"}>
            <Button
              component="a"
              href="#home"
              sx={{
                textTransform: "none",
                borderRadius: "0",
                borderBottom: `2px solid ${colors.purple[600]}`,
                margin: 1,
              }}
              color="inherit"
            >
              <Typography variant={isSmallScreen ? "body4" : "body2"}>
                Home
              </Typography>
            </Button>
            <Button
              component="a"
              href="#features"
              sx={{
                textTransform: "none",
                borderRadius: "0",
                borderBottom: `2px solid ${colors.purple[600]}`,
                margin: 1,
              }}
              color="inherit"
            >
              <Typography variant={isSmallScreen ? "body4" : "body2"}>
                Features
              </Typography>
            </Button>
            <Button
              component="a"
              href="#about"
              sx={{
                textTransform: "none",
                borderRadius: "0",
                borderBottom: `2px solid ${colors.purple[600]}`,
                margin: 1,
              }}
              color="inherit"
            >
              <Typography variant={isSmallScreen ? "body4" : "body2"}>
                About
              </Typography>
            </Button>
            <Button
              component="a"
              href="#support"
              sx={{
                textTransform: "none",
                borderRadius: "0",
                borderBottom: `2px solid ${colors.purple[600]}`,
                margin: 1,
              }}
              color="inherit"
            >
              <Typography variant={isSmallScreen ? "body4" : "body2"}>
                Support
              </Typography>
            </Button>
          </Stack>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            sx={{
              width: "104px",
              height: "40px",
              backgroundColor: colors.purple[600],
              color: "white",
              borderRadius: "48px",
              "&:hover": {
                backgroundColor: colors.purple[200],
              },
              textTransform: "none",
            }}
          >
            <Typography variant={isSmallScreen ? "body4" : "Hbody2"}>
              Sign Up
            </Typography>
          </Button>
        </Stack>
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          gap: 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        {/* Hero Section - Header 1*/}
        <Box
          id="home"
          sx={{
            width: "88%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant={isSmallScreen ? "title2" : "title5"}
            gutterBottom
            textAlign={"center"}
          >
            Let's Make Your Finance Glow With{" "}
            <Typography
              component="span"
              variant={isSmallScreen ? "title2" : "title5"}
              sx={{ color: colors.purple[600] }}
            >
              Tinkle
            </Typography>
            !
          </Typography>
          <Typography
            variant={isSmallScreen ? "Hbody3" : "Hbody2"}
            textAlign={"center"}
          >
            Twinkle is a new platform where you can track, set and make plans
            for your finance.
          </Typography>
          <Typography
            variant={isSmallScreen ? "Hbody3" : "Hbody2"}
            textAlign={"center"}
          >
            If you love being organize and wants a secure future. Come Join Us!
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
            sx={{
              mt: 5,
              width: "293px",
              height: "44px",
              backgroundColor: colors.purple[600],
              "&:hover": { backgroundColor: colors.purple[200] },
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            <Typography variant={isSmallScreen ? "body3" : "Hbody2"}>
              Join Us
            </Typography>
          </Button>
        </Box>

        {/* Images - Dashboard, Arrows  */}
        <Stack alignItems={"center"} width={"100%"} position={"relative"}>
          <Stack
            width={"90%"}
            height={"auto"}
            justifyContent={"space-between"}
            direction={"row"}
            position={"absolute"}
          >
            <img
              src={LeftArrowImage}
              style={{ width: "6%", objectFit: "contain" }}
            />
            <img
              src={RightArrowImage}
              style={{ width: "10%", objectFit: "contain" }}
            />
          </Stack>
          <img
            src={DashboardImage}
            alt="Dashboard"
            style={{ width: "72%", objectFit: "contain" }}
          />
        </Stack>

        {/* Features */}
        <Box
          id="features"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Stack width={"72%"}>
            <Typography
              variant={isSmallScreen ? "h6" : "title4"}
              gutterBottom
              textAlign={"center"}
            >
              <Typography
                component="span"
                variant={isSmallScreen ? "h6" : "title4"}
                sx={{ color: colors.purple[600] }}
              >
                Tinkle{" "}
              </Typography>
              will track your whole timeline of your Finance!{" "}
            </Typography>
          </Stack>

          {/* Timeline  */}
          <Stack
            display={isSmallScreen ? "none" : undefined}
            direction={"row"}
            width={"100%"}
            height={"64vh"}
          >
            {/* Past Section */}
            <Stack alignItems={"center"} position={"relative"} width={"25%"}>
              <Typography variant="title2" gutterBottom>
                Past
                <img
                  src={TwoStarsImage}
                  alt="2 stars"
                  style={{
                    height: "auto",
                    position: "absolute",
                    width: "21px",
                    objectFit: "contain",
                    top: -1,
                  }}
                />
              </Typography>
              <CircleIcon sx={{ color: getColor("past") }} />
              <img
                src={StraightLineImage}
                alt="dotted line"
                style={{ height: "10%", objectFit: "contain" }}
              />
              <Box
                sx={{
                  border: `3px solid ${getColor("past")}`,
                  padding: "36px 37px 38px",
                  borderRadius: "16px",
                  mb: 2,
                }}
              >
                <DriveFileRenameOutlineRoundedIcon
                  sx={{
                    width: "56px",
                    height: "56px",
                    color: getColor("past"),
                  }}
                />
              </Box>
              {currentSection === "past" && (
                <>
                  <Typography variant="title1" gutterBottom>
                    Records
                  </Typography>
                  <Typography variant="Hbody2" textAlign={"center"}>
                    We keep records so that you can check back at any time you
                    want.
                  </Typography>
                </>
              )}
            </Stack>
            {/* Present Section */}
            <Stack alignItems={"center"} position={"relative"} width={"50%"}>
              <Typography variant="title2" gutterBottom>
                Present
                <img
                  src={TwoStarsImage}
                  alt="2 stars"
                  style={{
                    height: "auto",
                    position: "absolute",
                    width: "21px",
                    objectFit: "contain",
                    top: -1,
                  }}
                />
              </Typography>
              <CircleIcon sx={{ color: getColor("present") }} />
              <img
                src={TreeLineImage}
                alt=" "
                style={{ height: "16%", objectFit: "contain" }}
              />
              <Stack
                width={"100%"}
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Stack alignItems={"center"} width={"50%"}>
                  <Box
                    sx={{
                      border: `3px solid ${getColor("present")}`,
                      padding: "36px 37px 38px",
                      borderRadius: "16px",
                      mb: "16px",
                    }}
                  >
                    <AutoAwesomeRoundedIcon
                      sx={{
                        width: "56px",
                        height: "56px",
                        color: getColor("present"),
                      }}
                    />
                  </Box>
                  {currentSection === "present" && (
                    <>
                      <Typography variant="title1" gutterBottom>
                        Budgeting
                      </Typography>
                      <Typography
                        variant="Hbody2"
                        textAlign={"center"}
                        width={"50%"}
                      >
                        Be mindful of what you are spending and be organize of
                        your finance wit Budgeting.
                      </Typography>
                    </>
                  )}
                </Stack>
                <Stack alignItems={"center"} width={"50%"}>
                  <Box
                    sx={{
                      border: `3px solid ${getColor("present")}`,
                      padding: "36px 37px 38px",
                      borderRadius: "16px",
                      mb: "16px",
                    }}
                  >
                    <EqualizerIcon
                      sx={{
                        width: "56px",
                        height: "56px",
                        color: getColor("present"),
                      }}
                    />
                  </Box>
                  {currentSection === "present" && (
                    <>
                      <Typography variant="title1" gutterBottom>
                        Statistics
                      </Typography>
                      <Typography
                        variant="Hbody2"
                        textAlign={"center"}
                        width={"50%"}
                      >
                        See your progress and current trends of Incomes and
                        Expenses
                      </Typography>
                    </>
                  )}
                </Stack>
              </Stack>
            </Stack>
            {/* Future Section */}
            <Stack alignItems={"center"} position={"relative"} width={"25%"}>
              <Typography variant="title2" gutterBottom>
                Future
                <img
                  src={TwoStarsImage}
                  alt="2 stars"
                  style={{
                    height: "auto",
                    position: "absolute",
                    width: "21px",
                    objectFit: "contain",
                    top: -1,
                  }}
                />
              </Typography>
              <CircleIcon sx={{ color: getColor("future") }} />
              <img
                src={StraightLineImage}
                alt="dotted line"
                style={{ height: "10%", objectFit: "contain" }}
              />
              <Box
                sx={{
                  border: `3px solid ${getColor("future")}`,
                  padding: "36px 37px 38px",
                  borderRadius: "16px",
                  mb: "16px",
                }}
              >
                <FlagIcon
                  sx={{
                    width: "56px",
                    height: "56px",
                    color: getColor("future"),
                  }}
                />
              </Box>
              {currentSection === "future" && (
                <>
                  <Typography variant="title1" gutterBottom>
                    Goals
                  </Typography>
                  <Typography variant="Hbody2" textAlign={"center"}>
                    Set Goals so that you have a secure and safe Future.
                  </Typography>
                </>
              )}
            </Stack>
          </Stack>
        </Box>

        {/* Lists section  */}
        <Grid
          container
          padding={5}
          rowGap={10}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {/* 1st  */}
          <Grid item xs={12} md={5}>
            <Stack>
              <Typography variant={"title1"}>Tired of Forgetting:</Typography>
              <Typography
                variant={isSmallScreen ? "title1" : "title3"}
                sx={{ color: colors.purple[600] }}
                gutterBottom
              >
                The Person You Lent Your Money to?
              </Typography>
              <Typography variant="Hbody2" sx={{ color: colors.purple[900] }}>
                It's hard to keep track of people who you lent your money to.
                So, let us help you with that with our Debt list taking feature.
                Where you can add sub records of the money they pay you back.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={ListItem1Image}
              alt=""
              style={{
                width: "108%",
                objectFit: "contain",
              }}
            />
          </Grid>
          {/* 2nd  */}
          <Grid item xs={12} md={5} display={isMediumScreen ? "block" : "none"}>
            <Stack>
              <Typography variant="title1">Tired of Forgetting:</Typography>
              <Typography
                variant="title3"
                sx={{ color: colors.purple[800] }}
                gutterBottom
              >
                The Things To Buy?{" "}
              </Typography>
              <Typography variant="Hbody2" sx={{ color: colors.purple[900] }}>
                Sometimes, we love to list out all the things that we want to
                buy or that we need to buy. And it can be a hassle to list it on
                a paper where it can get lost easily. Try our list taking
                feature and take unlimited lists and items as you desire to stay
                organized.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={ListItem2Image}
              alt=""
              style={{
                width: "108%",
                objectFit: "contain",
              }}
            />
          </Grid>
          <Grid item xs={12} md={5} display={isMediumScreen ? "none" : "block"}>
            <Stack>
              <Typography variant="title1">Tired of Forgetting:</Typography>
              <Typography
                variant="title3"
                sx={{ color: colors.purple[800] }}
                gutterBottom
              >
                The Things To Buy?{" "}
              </Typography>
              <Typography variant="Hbody2" sx={{ color: colors.purple[900] }}>
                Sometimes, we love to list out all the things that we want to
                buy or that we need to buy. And it can be a hassle to list it on
                a paper where it can get lost easily. Try our list taking
                feature and take unlimited lists and items as you desire to stay
                organized.
              </Typography>
            </Stack>
          </Grid>
          {/* 3 rd  */}
          <Grid item xs={12} md={5}>
            <Stack>
              <Typography variant="title1">Want To List:</Typography>
              <Typography
                variant="title3"
                sx={{ color: colors.purple[600] }}
                gutterBottom
              >
                The Person You Owe Money to?{" "}
              </Typography>
              <Typography variant="Hbody2" sx={{ color: colors.purple[900] }}>
                Not only, you can take the debt list you lent, you can also set
                up lists for the people you owe money to. Keep it in our app so
                that you won’t miss the due date to pay it back.
              </Typography>
            </Stack>
          </Grid>{" "}
          <Grid item xs={12} md={6}>
            <img
              src={ListItem3Image}
              alt=""
              style={{
                width: "108%",
                objectFit: "contain",
              }}
            />
          </Grid>
        </Grid>

        {/* Knowledge page  */}
        <Stack
          direction={isMediumScreen ? "column" : "row"}
          textAlign={isMediumScreen ? "center" : undefined}
          alignItems={"center"}
          mb={8}
        >
          <img
            src={KnowledgeImage}
            alt=""
            style={{
              width: "100%",
              objectFit: "contain",
            }}
          />
          <Stack width={"80%"}>
            <Typography variant={isSmallScreen ? "title2" : "title3"}>
              Need Advice on
            </Typography>
            <Stack direction={"row"} columnGap={2} justifyContent={"center"}>
              <Typography
                variant={isSmallScreen ? "title1" : "title3"}
                sx={{ color: colors.purple[600] }}
                gutterBottom
              >
                Business?
              </Typography>
              <Typography
                variant={isSmallScreen ? "title1" : "title3"}
                sx={{ color: colors.purple[800] }}
                gutterBottom
              >
                Finance?
              </Typography>
            </Stack>
            <Typography variant={isSmallScreen ? "body1" : "title1"}>
              Get Advice and Suggestions, Gain
              <br /> Knowledge and See Business Ideas from our Handpicked Videos
              and Books
            </Typography>
          </Stack>
        </Stack>

        {/* our team pages  */}
        <Stack
          display={"none"}
          width={"100%"}
          alignItems={"center"}
          mb={7}
          id="about"
        >
          <Typography variant="title3">Meet Our Team</Typography>
          <Typography
            variant="title4"
            gutterBottom
            textAlign={isSmallScreen ? "center" : undefined}
            sx={{ color: colors.purple[900] }}
          >
            Passionate, Proactive, Resilient
          </Typography>
          {/* Avatars  */}
          <Stack width={"100%"}>
            <Stack
              spacing={2}
              width={"100%"}
              direction="row"
              alignSelf={"center"}
              // direction={isSmallScreen?"column":"row"}
              justifyContent={"center"}
              padding={"40px 32px"}
              flexWrap={"warp"}
              position={"relative"}
            >
              <img
                src={RightArrowImage2}
                alt=""
                style={{
                  height: isSmallScreen ? "20vw" : "40%",
                  position: "absolute",
                  objectFit: "contain",
                  top: 0,
                  right: 30,
                }}
              />

              {profiles.map((profile, index) => (
                <Heroavatarprofile
                  code={profile.code}
                  name={profile.name}
                  job={profile.job}
                />
              ))}
            </Stack>
            <Divider />
            <Stack
              width={"100%"}
              spacing={1}
              direction="row"
              // direction={isSmallScreen?"column":"row"}
              justifyContent={"center"}
              padding={"40px 60px"}
              position={"relative"}
            >
              <img
                src={LeftArrowImage2}
                alt=""
                style={{
                  height: isSmallScreen ? "8%" : "40%",
                  position: "absolute",
                  objectFit: "contain",
                  bottom: 50,
                  left: isSmallScreen ? "-15px" : "-30px",
                }}
              />
              {profiles2.map((profile, index) => (
                <Heroavatarprofile
                  code={profile.code}
                  name={profile.name}
                  job={profile.job}
                />
              ))}
            </Stack>
          </Stack>
          <Typography variant="Hbody1" sx={{ color: colors.purple[900] }}>
            We lead with care -- We work with trust -- We strive for quality --
            We strive for uniqueness
          </Typography>
        </Stack>

        {/* Support  */}
        <Stack width={"100%"} alignItems={"center"} gap={5} id="support">
          <Stack>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <img
                src={ThreeStarsImage}
                alt=""
                style={{
                  width: isSmallScreen ? "50px" : 70,
                  height: isSmallScreen ? "50px" : 70,
                }}
              />
              <Typography
                variant="title4"
                textAlign={"center"}
                sx={{ color: colors.purple[900] }}
              >
                HELP CENTER
              </Typography>
              <img
                src={ThreeStarsImage}
                alt=""
                style={{
                  width: isSmallScreen ? "50px" : 70,
                  height: isSmallScreen ? "50px" : 70,
                  transform: "scaleX(-1)",
                }}
              />
            </Box>
            <Typography
              padding={"20px"}
              variant={isSmallScreen ? "body1" : "Hbody2"}
              sx={{ color: colors.purple[900] }}
              textAlign={"center"}
            >
              Encountered any issue or have a question to ask?
              <br /> Our dedicated team at Fina is always ready to assist you{" "}
            </Typography>
          </Stack>

          {/* 3 Blocks  */}
          <Stack
            direction={"row"}
            width={"100%"}
            textAlign={"center"}
            justifyContent={"space-around"}
            mb={3}
            flexWrap={"wrap"}
          >
            <Stack
              padding="20px"
              alignItems={"center"}
              gap={2}
              width={isSmallScreen ? "100%" : "25%"}
            >
              <lord-icon
                src="https://cdn.lordicon.com/rsvfayfn.json"
                trigger="hover"
                style={{
                  width: isSmallScreen ? "50px" : "72px",
                  height: isSmallScreen ? "50px" : "72px",
                }}
              ></lord-icon>
              <Typography
                gutterBottom
                variant={isSmallScreen ? "body3" : "title1"}
                sx={{ color: colors.purple[900] }}
              >
                Reach Out Directly
              </Typography>
              <Typography
                variant={isSmallScreen ? "body5" : "Hbody2"}
                textAlign={"center"}
              >
                Prefer to send us and email or give us a call?
                <br />
                Email:{" "}
                <a href="" style={{ textDecoration: "none" }}>
                  geezersco@gmail.com
                </a>
              </Typography>
            </Stack>
            <Stack
              padding="20px"
              alignItems={"center"}
              gap={2}
              width={isSmallScreen ? "100%" : "25%"}
            >
              <lord-icon
                src="https://cdn.lordicon.com/axteoudt.json"
                trigger="hover"
                style={{
                  width: isSmallScreen ? "50px" : "72px",
                  height: isSmallScreen ? "50px" : "72px",
                }}
              ></lord-icon>
              <Typography
                gutterBottom
                variant={isSmallScreen ? "body3" : "title1"}
                sx={{ color: colors.purple[900] }}
              >
                Tell Us Your Experience
              </Typography>

              <Typography
                variant={isSmallScreen ? "body5" : "Hbody2"}
                textAlign={"center"}
              >
                We are incredibly excited to hear your stories and feedback.
              </Typography>
            </Stack>{" "}
            <Stack
              padding="20px"
              alignItems={"center"}
              gap={2}
              width={isSmallScreen ? "100%" : "25%"}
            >
              <lord-icon
                src="https://cdn.lordicon.com/fdxqrdfe.json"
                trigger="hover"
                style={{
                  width: isSmallScreen ? "50px" : "72px",
                  height: isSmallScreen ? "50px" : "72px",
                }}
              ></lord-icon>
              <Typography
                gutterBottom
                variant={isSmallScreen ? "body3" : "title1"}
                sx={{ color: colors.purple[900] }}
              >
                Immediate Assistance?
              </Typography>
              <Typography
                variant={isSmallScreen ? "body5" : "Hbody2"}
                textAlign={"center"}
              >
                Come chat with us any time on our official Face Book Page.
                <br />
                <a href="" style={{ textDecoration: "none" }}>
                  Geezers Co.
                </a>
              </Typography>
            </Stack>
          </Stack>

          {/* Quick Answers  */}
          <Stack
            alignItems={"center"}
            gap={2}
            marginBottom={"20px"}
            height={"auto"}
            g
          >
            <Typography variant="title1" sx={{ color: colors.purple[900] }}>
              Quick Answers
            </Typography>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              sx={{
                width: "100%",
                borderRadius: "16px",
                backgroundColor: "rgba(0,0,0,0)",
                padding: "16px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="Hbody2">
                  How can I contact support?
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Typography variant="Hbody3">
                  You can contact our support team via email or phone. Visit the
                  Support section on our website for more information.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              sx={{
                width: "100%",
                borderRadius: "16px",
                backgroundColor: "rgba(0,0,0,0)",
                padding: "16px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography variant="Hbody2">
                  How can I contact support?
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Typography variant="Hbody3">
                  You can contact our support team via email or phone. Visit the
                  Support section on our website for more information.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              sx={{
                width: "100%",
                borderRadius: "16px",
                backgroundColor: "rgba(0,0,0,0)",
                padding: "16px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography variant="Hbody2">
                  How can I contact support?
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Typography variant="Hbody3">
                  You can contact our support team via email or phone. Visit the
                  Support section on our website for more information.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
              sx={{
                width: "100%",
                borderRadius: "16px",
                backgroundColor: "rgba(0,0,0,0)",
                padding: "16px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography variant="Hbody2">
                  How can I contact support?
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Typography variant="Hbody3">
                  You can contact our support team via email or phone. Visit the
                  Support section on our website for more information.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
              sx={{
                width: "100%",
                borderRadius: "16px",
                backgroundColor: "rgba(0,0,0,0)",
                padding: "16px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5bh-content"
                id="panel5bh-header"
              >
                <Typography variant="Hbody2">
                  How can I contact support?
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Typography variant="Hbody3">
                  You can contact our support team via email or phone. Visit the
                  Support section on our website for more information.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Stack>
      </Container>
      {/*footer*/}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          height: "40vh",
          background: "linear-gradient(to right, #3F3D66, #7E7ACC)",
        }}
      >
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          gap={3}
          height={"100%"}
        >
          <Typography variant="title1" sx={{ color: "white" }}>
            Tinkle
          </Typography>
          <Stack direction={"row"} gap={2}>
            <Button
              component="a"
              href="#home"
              sx={{
                textTransform: "none",
                borderRadius: "0",
                borderBottom: `2px solid ${colors.purple[600]}`,
              }}
              color="inherit"
            >
              <Typography variant="body2" sx={{ color: "white" }}>
                Home
              </Typography>
            </Button>
            <Button
              component="a"
              href="#features"
              sx={{
                textTransform: "none",
                borderRadius: "0",
                borderBottom: `2px solid ${colors.purple[600]}`,
              }}
              color="inherit"
            >
              <Typography variant="body2" sx={{ color: "white" }}>
                Features
              </Typography>
            </Button>
            <Button
              component="a"
              href="#about"
              sx={{
                textTransform: "none",
                borderRadius: "0",
                borderBottom: `2px solid ${colors.purple[600]}`,
              }}
              color="inherit"
            >
              <Typography variant="body2" sx={{ color: "white" }}>
                About
              </Typography>
            </Button>
            <Button
              component="a"
              href="#support"
              sx={{
                textTransform: "none",
                borderRadius: "0",
                borderBottom: `2px solid ${colors.purple[600]}`,
              }}
              color="inherit"
            >
              <Typography variant="body2" sx={{ color: "white" }}>
                Support
              </Typography>
            </Button>
          </Stack>
          <Typography variant="Hbody1" sx={{ color: "white" }}>
            Contact Us
          </Typography>
          <Stack direction={"row"} gap={2.5}>
            <i
              class="fi fi-brands-facebook"
              style={{
                width: "32px",
                height: "32px",
                fontSize: "2rem",
                color: "#f5f5f5",
              }}
            />
            <i
              class="fi fi-brands-youtube"
              style={{
                width: "32px",
                height: "32px",
                fontSize: "2rem",
                color: "#f5f5f5",
              }}
            ></i>
            <i
              class="fi fi-brands-discord"
              style={{
                width: "32px",
                height: "32px",
                fontSize: "2rem",
                color: "#f5f5f5",
              }}
            ></i>
            <i
              class="fi fi-brands-github"
              style={{
                width: "32px",
                height: "32px",
                fontSize: "2rem",
                color: "#f5f5f5",
              }}
            ></i>
            <i
              class="fi fi-brands-figma"
              style={{
                width: "32px",
                height: "32px",
                fontSize: "2rem",
                color: "#f5f5f5",
              }}
            ></i>
          </Stack>
        </Stack>
        <Box justifySelf={"flex-end"}>
          <Typography variant="body2" sx={{ color: "white" }} gutterBottom>
            &copy; {new Date().getFullYear()} Geezers Inc. Until it blossoms
          </Typography>
        </Box>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Form />
        </Box>
      </Modal>
    </Box>
  );
};

export default Hero;
