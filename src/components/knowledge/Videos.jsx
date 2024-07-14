import React, { useState, useEffect } from "react";
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
import { getVideos } from "../../api/videosApi";
import { Loader } from "../../components/utils";
const Videos = ({ header }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const path = header.toLowerCase().replace(" ", "-");
  //responsive
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //datafetch
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchVideos = async () => {
    setIsLoading(true);
    const res = await getVideos();
    setVideos(res || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Video genre header */}
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          width: "100%",
          height: "auto",
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
        <Loader isLoading={isLoading} />
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
    </Box>
  );
};

export default Videos;
