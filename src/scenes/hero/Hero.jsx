import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Container,
  Box,
  Stack,
  useTheme,
  Divider,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Modal,
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
} from "../../assets/hero";
import { tokens } from "../../theme";
import CircleIcon from "@mui/icons-material/Circle";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import FlagIcon from "@mui/icons-material/Flag";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Form from "../../components/auth/Form";

const Hero = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentSection, setCurrentSection] = useState("past");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

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
          justifyContent={"space-around"}
          alignItems={"center"}
          padding={1}
        >
          <Typography variant="h6">Tinkle</Typography>
          <Stack direction={"row"} gap={1}>
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
              <Typography variant="body2">Home</Typography>
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
              <Typography variant="body2">Features</Typography>
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
              <Typography variant="body2">About</Typography>
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
              <Typography variant="body2">Support</Typography>
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
            <Typography variant="Hbody2">Sign Up</Typography>
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
          <Typography variant="title5" gutterBottom textAlign={"center"}>
            Let's Make Your Finance Glow With{" "}
            <Typography
              component="span"
              variant="title5"
              sx={{ color: colors.purple[600] }}
            >
              Tinkle
            </Typography>
            !
          </Typography>
          <Typography variant="Hbody2" textAlign={"center"}>
            Twinkle is a new platform where you can track, set and make plans
            for your finance.
          </Typography>
          <Typography variant="Hbody2" textAlign={"center"}>
            If you love being organize and wants a secure future. Come Join Us!
          </Typography>
          <Button
            variant="contained"
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
            <Typography variant="Hbody2">Join Us</Typography>
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
            <Typography variant="title4" gutterBottom textAlign={"center"}>
              <Typography
                component="span"
                variant="title4"
                sx={{ color: colors.purple[600] }}
              >
                Tinkle{" "}
              </Typography>
              will track your whole timeline of your Finance!{" "}
            </Typography>
          </Stack>

          {/* Timeline  */}
          <Stack direction={"row"} width={"100%"} height={"64vh"}>
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
          <Grid item xs={5}>
            <Stack>
              <Typography variant="title1">Tired of Forgetting:</Typography>
              <Typography
                variant="title3"
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <img
              src={ListItem2Image}
              alt=""
              style={{
                width: "108%",
                objectFit: "contain",
              }}
            />
          </Grid>
          <Grid item xs={5}>
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
          <Grid item xs={5}>
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
          <Grid item xs={6}>
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
        <Stack direction={"row"} alignItems={"center"} mb={8}>
          <img
            src={KnowledgeImage}
            alt=""
            style={{
              width: "100%",
              objectFit: "contain",
            }}
          />
          <Stack width={"80%"}>
            <Typography variant="title3">Need Advice on</Typography>
            <Stack direction={"row"} gap={1}>
              <Typography
                variant="title3"
                sx={{ color: colors.purple[600] }}
                gutterBottom
              >
                Business?
              </Typography>
              <Typography
                variant="title3"
                sx={{ color: colors.purple[800] }}
                gutterBottom
              >
                Finance?
              </Typography>
            </Stack>
            <Typography variant="title1">
              Get Advice and Suggestions, Gain
              <br /> Knowledge and See Business Ideas from our Handpicked Videos
              and Books
            </Typography>
          </Stack>
        </Stack>

        {/* our team pages  */}
        <Stack width={"100%"} alignItems={"center"} mb={7} id="about">
          <Typography variant="title3">Meet Our Team</Typography>
          <Typography
            variant="title4"
            gutterBottom
            sx={{ color: colors.purple[900] }}
          >
            Passionate, Proactive, Resilient
          </Typography>
          {/* Avatars  */}
          <Stack width={"100%"}>
            <Stack
              width={"100%"}
              direction={"row"}
              justifyContent={"space-around"}
              padding={"40px 160px"}
              position={"relative"}
            >
              <img
                src={RightArrowImage2}
                alt=""
                style={{
                  height: "40%",
                  position: "absolute",
                  objectFit: "contain",
                  top: 0,
                  right: 30,
                }}
              />
              <Stack alignItems={"center"} gap={1.5}>
                <Avatar sx={{ width: "105px", height: "105px" }} />{" "}
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  0
                </Typography>
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  Wai Yan Htut
                </Typography>
                <Typography variant="Hbody2" sx={{ color: colors.purple[800] }}>
                  DL
                </Typography>
              </Stack>
              <Stack alignItems={"center"} gap={1.5}>
                <Avatar sx={{ width: "105px", height: "105px" }} />{" "}
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  01
                </Typography>
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  Yei Khant Lwin
                </Typography>
                <Typography variant="Hbody2" sx={{ color: colors.purple[800] }}>
                  Nigga
                </Typography>
              </Stack>
              <Stack alignItems={"center"} gap={1.5}>
                <Avatar sx={{ width: "105px", height: "105px" }} />{" "}
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  02
                </Typography>
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  Zayar Naing
                </Typography>
                <Typography variant="Hbody2" sx={{ color: colors.purple[800] }}>
                  broke coder
                </Typography>
              </Stack>
              <Stack alignItems={"center"} gap={1.5}>
                <Avatar sx={{ width: "105px", height: "105px" }} />{" "}
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  03
                </Typography>
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  Zaw Lin Naing
                </Typography>
                <Typography variant="Hbody2" sx={{ color: colors.purple[800] }}>
                  brooken coder
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack
              width={"100%"}
              direction={"row"}
              justifyContent={"space-around"}
              padding={"40px 60px"}
              position={"relative"}
            >
              <img
                src={LeftArrowImage2}
                alt=""
                style={{
                  height: "40%",
                  position: "absolute",
                  objectFit: "contain",
                  bottom: 50,
                  left: -30,
                }}
              />
              <Stack alignItems={"center"} gap={1.5} width={"20%"}>
                <Avatar sx={{ width: "105px", height: "105px" }} />{" "}
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  04
                </Typography>
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  Swan Lynn Htun
                </Typography>
                <Typography variant="Hbody2" sx={{ color: colors.purple[800] }}>
                  Edi coder
                </Typography>
              </Stack>
              <Stack alignItems={"center"} gap={1.5} width={"20%"}>
                <Avatar sx={{ width: "105px", height: "105px" }} />{" "}
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  05
                </Typography>
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  Ye Yint Naing Oo
                </Typography>
                <Typography variant="Hbody2" sx={{ color: colors.purple[800] }}>
                  Designer
                </Typography>
              </Stack>
              <Stack alignItems={"center"} gap={1.5} width={"20%"}>
                <Avatar sx={{ width: "105px", height: "105px" }} />{" "}
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  06
                </Typography>
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  Sai Sai Lin Htet
                </Typography>
                <Typography variant="Hbody2" sx={{ color: colors.purple[800] }}>
                  E boy
                </Typography>
              </Stack>
              <Stack alignItems={"center"} gap={1.5} width={"20%"}>
                <Avatar sx={{ width: "105px", height: "105px" }} />{" "}
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  07
                </Typography>
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  Thuta Htun
                </Typography>
                <Typography variant="Hbody2" sx={{ color: colors.purple[800] }}>
                  Caffeine Addict
                </Typography>
              </Stack>{" "}
              <Stack alignItems={"center"} gap={1.5} width={"20%"}>
                <Avatar sx={{ width: "105px", height: "105px" }} />{" "}
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  08
                </Typography>
                <Typography variant="title1" sx={{ color: colors.purple[900] }}>
                  Sithu
                </Typography>
                <Typography variant="Hbody2" sx={{ color: colors.purple[800] }}>
                  A Ba
                </Typography>
              </Stack>
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
                style={{ width: 70, height: 70 }}
              />
              <Typography variant="title4" sx={{ color: colors.purple[900] }}>
                HELP CENTER
              </Typography>
              <img
                src={ThreeStarsImage}
                alt=""
                style={{ width: 70, height: 70, transform: "scaleX(-1)" }}
              />
            </Box>
            <Typography
              variant="Hbody2"
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
            justifyContent={"space-around"}
            mb={3}
          >
            <Stack alignItems={"center"} gap={2} width={"25%"}>
              <lord-icon
                src="https://cdn.lordicon.com/rsvfayfn.json"
                trigger="hover"
                style={{ width: "72px", height: "72px" }}
              ></lord-icon>
              <Typography
                gutterBottom
                variant="title1"
                sx={{ color: colors.purple[900] }}
              >
                Reach Out Directly
              </Typography>
              <Typography variant="Hbody2" textAlign={"center"}>
                Prefer to send us and <br />
                email or give us a call?
                <br />
                Email:{" "}
                <a href="" style={{ textDecoration: "none" }}>
                  geezersco@gmail.com
                </a>
              </Typography>
            </Stack>
            <Stack alignItems={"center"} gap={2} width={"25%"}>
              <lord-icon
                src="https://cdn.lordicon.com/axteoudt.json"
                trigger="hover"
                style={{ width: "72px", height: "72px" }}
              ></lord-icon>
              <Typography
                gutterBottom
                variant="title1"
                sx={{ color: colors.purple[900] }}
              >
                Tell Us Your Experience
              </Typography>
              <Typography variant="Hbody2" textAlign={"center"}>
                We are incredibly excited to
                <br /> hear your stories and feedback.
              </Typography>
            </Stack>{" "}
            <Stack alignItems={"center"} gap={2} width={"25%"}>
              <lord-icon
                src="https://cdn.lordicon.com/fdxqrdfe.json"
                trigger="hover"
                style={{ width: "72px", height: "72px" }}
              ></lord-icon>
              <Typography
                gutterBottom
                variant="title1"
                sx={{ color: colors.purple[900] }}
              >
                Immediate Assistance?
              </Typography>
              <Typography variant="Hbody2" textAlign={"center"}>
                Come chat with us any time on
                <br /> our official Face Book Page.
                <br />
                <a href="" style={{ textDecoration: "none" }}>
                  Geezers Co.
                </a>
              </Typography>
            </Stack>
          </Stack>

          {/* Quick Answers  */}
          <Stack alignItems={"center"} gap={2} height={"100vh"}>
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
