import React, { useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowIcon from "@mui/icons-material/KeyboardArrowRight";
import VideoContents from "../utils/VideoContents";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

const videoData = {
  favourites: [
    {
      img: "",
      title: "How to get your ex back",
      avatar: "",
      author: "Zaw",
      favorite: true,
    },
    {
      img: "",
      title: "How to talk to girls",
      avatar: "",
      author: "Zaw",
      favorite: true,
    },
    {
      img: "",
      title: "How to make her happy",
      avatar: "",
      author: "Zaw",
      favorite: true,
    },
    {
      img: "",
      title: "How to make her fall in love with you",
      avatar: "",
      author: "Zaw",
      favorite: true,
    },
    { img: "", title: "Date ideas", avatar: "", author: "Zaw", favorite: true },
    {
      img: "",
      title: "What to do on your dates",
      avatar: "",
      author: "Zaw",
      favorite: true,
    },
  ],
  budgets: [
    {
      img: "",
      title: "How to go broke like a pro",
      avatar: "",
      author: "YY",
      favorite: true,
    },
    {
      img: "",
      title: "How to save money",
      avatar: "",
      author: "YY",
      favorite: true,
    },
    {
      img: "",
      title: "How to eat without money",
      avatar: "",
      author: "YY",
      favorite: true,
    },
    {
      img: "",
      title: "How to go out with friends without money",
      avatar: "",
      author: "YY",
      favorite: true,
    },
    {
      img: "",
      title: "How to be financially stable",
      avatar: "",
      author: "YY",
      favorite: true,
    },
  ],
  saving: [
    {
      img: "",
      title: "How to save money without money",
      avatar: "",
      author: "Sithu",
      favorite: true,
    },
    {
      img: "",
      title: "How to eat food which are expired",
      avatar: "",
      author: "Sithu",
      favorite: true,
    },
    {
      img: "",
      title: "How to save your money on dates",
      avatar: "",
      author: "Sithu",
      favorite: true,
    },
    {
      img: "",
      title: "Top recycling tips for college students",
      avatar: "",
      author: "Sithu",
      favorite: true,
    },
  ],
  business: [
    {
      img: "",
      title: "How to do drug dealing",
      avatar: "",
      author: "Yei",
      favorite: true,
    },
    {
      img: "",
      title: "Where to start online scamming",
      avatar: "",
      author: "Yei",
      favorite: true,
    },
    {
      img: "",
      title: "How to sell human body in 2024",
      avatar: "",
      author: "Yei",
      favorite: true,
    },
  ],
  tinkle: [
    {
      img: "",
      title: "How to use our app",
      avatar: "",
      author: "Zayer",
      favorite: true,
    },
    {
      img: "",
      title: "How to stalk using our app",
      avatar: "",
      author: "Zayer",
      favorite: true,
    },
  ],
  life: [
    {
      img: "",
      title: "Just give up on your dream and d*e",
      avatar: "",
      author: "TT",
      favorite: true,
    },
  ],
};

const Videos = ({ header }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const path = header.toLowerCase().replace(" ", "-");
  const videos = useMemo(() => {
    return videoData[header.toLowerCase()];
  }, [header]);

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallest = useMediaQuery(theme.breakpoints.down("xs"));
  const isExtraSmallest = useMediaQuery(theme.breakpoints.down("xxs"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box sx={{ width: "100%" }}>
      {/* Video genre header */}
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          width: "100%",
          height: "56px",
          padding: "0 16px",
          marginTop: "50px",
        }}
      >
        <Typography variant={isSmallScreen ? "h4" : "h3"}>{header}</Typography>
        <Button
          component={Link}
          to={`/videos/${path}`}
          variant="text"
          sx={{
            width: "150px",
            height: "27px",
            alignSelf: "center",
            justifyContent: "flex-end",
            color: colors.purple[600],
          }}
          endIcon={<ArrowIcon />}
        >
          <Typography
            variant="body1"
            sx={{
              textTransform: "capitalize",
            }}
          >
            View All
          </Typography>
        </Button>
      </Box>
      {/* Video content box */}
      <Grid
        container
        rowSpacing={5}
        columnSpacing={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="flex-start"
        alignItems="center"
      >
        {videos.length > 0 ? (
          videos.map((item, index) => (
            <Grid item key={index} sm={6} md={6} lg={4} xl={3}>
              <VideoContents
                title={item.title}
                author={item.author}
                pathImage={item.img}
                vdavatar={item.avatar}
                favorite={item.favorite}
              />
            </Grid>
          ))
        ) : (
          <Typography>No videos available</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Videos;
