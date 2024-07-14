import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { useParams } from "react-router-dom";
import { BackBtn, VideoContents } from "../../components/utils";
import { getVideos } from "../../api/videosApi";
import { Loader } from "../../components/utils";

const VideoCollection = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { videoCollection } = useParams();

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //data fetch
  const [isLoading, setIsLoading] = useState(false);
  const header = videoCollection
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    setIsLoading(true);
    const res = await getVideos();
    setVideos(res || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);
  //for favourite
  // const [favVideos, setFavVideos] = useState([]);

  // const fetchFavouriteVideos = async () => {
  //   setIsLoading(true);
  //   const res = await getFavoriteVideos();
  //   setFavVideos(res || []);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   fetchFavouriteVideos();
  // }, []);
  return (
    // Main Container
    <Paper
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: colors.backGround,
        border: "none",
        justifyContent: "flex-start",
        position: "relative",
      }}
    >
      {/* Call Back Button */}
      <BackBtn g />
      {/* Gradient title */}
      <Box
        sx={{
          textAlign: "center",
          marginTop: isMediumScreen ? "50px" : undefined,
          width: "100%",
          height: "134px",
          borderRadius: "16px",
          alignContent: "center",
          backgroundImage: "linear-gradient(to right, #50B87E, #8884DC)",
          display: "flex",
          alignItems: "center",
          padding: "32px",
          justifyContent: "center",
        }}
      >
        <Typography variant={isSmallScreen ? "body3" : "h6"}>
          Expand your knowledge on finance and life with our selected videos
        </Typography>
      </Box>
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          bgcolor: colors.backGround,
          position: "relative",
          padding: "50px",
        }}
      >
        {/* Title */}
        <Typography variant="h3">
          {videoCollection
            ? videoCollection
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : "Video Collection"}
        </Typography>
      </Box>
      {/* Contents */}
      <Grid
        container
        rowSpacing={3}
        columnSpacing={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          bgcolor: colors.backGround,
          width: "100%",
          height: "auto",
        }}
      >
        <Loader isLoading={isLoading} />
        {/* {header === "Favourites"
          ? favVideos.map((item, index) => (
              <Grid item key={index} sm={6} md={6} lg={4} xl={3}>
                <VideoContents
                  id={item._id}
                  title={item.title}
                  author={item.creator}
                  pathImage={item.thumbnail}
                  category={item.category}
                  favorite={item.favourite}
                  link={item.link}
                  refresh={fetchVideos}
                />
              </Grid>
            ))
          : */}
        {videos
          .filter((item) => item.category === header)
          .map((item, index) => (
            <Grid item key={index} sm={6} md={6} lg={4} xl={3}>
              <VideoContents
                id={item._id}
                title={item.title}
                author={item.creator}
                pathImage={item.thumbnail}
                category={item.category}
                favorite={item.favourite}
                link={item.link}
                refresh={fetchVideos}
              />
            </Grid>
          ))}
      </Grid>
    </Paper>
  );
};

export default VideoCollection;
