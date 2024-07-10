import React, { useState,useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  isMuiElement,
} from "@mui/material";
import {
  BookmarkBorderOutlined as BookmarkBorderOutlinedIcon,
  BookmarkOutlined as BookmarkOutlinedIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import { postFavVideos, deleteFavVideos,getFavoriteVideos } from "../../api/videosApi";
import { Loader } from "../../components/utils";
const VideoContents = ({
  link,
  title,
  author,
  pathImage,
  vdavatar,
  favorite,
  id,
  refresh,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [favorited, setFavorited] = useState(favorite || false);
  //responsive
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  //api
  const [favVideos, setFavVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchFavouriteVideos = async () => {
    setIsLoading(true);
    const res = await getFavoriteVideos();
    setFavVideos(res || []);
    setIsLoading(false);
  };

 
  const handleSaveFav = async () => {
    try {
      fetchFavouriteVideos()
      const addedVideo = {
        favourite: favorited,
      };
      const createdVideo = await postFavVideos(id, addedVideo);
      console.log("Account Edited:", addedVideo);
      fetchFavouriteVideos()
    } catch (error) {
      console.error("Error editing setting:", error);
    }
  };

  const handleChangeBookMark = () => {
    const newFav = favorited ? false : true;
    setFavorited(newFav);
    newFav ? handleSaveFav(id, newFav) : deleteFavVideos(id);
  };
  useEffect(() => {
    fetchFavouriteVideos();
  }, []);
  return (
    <Box
      sx={{
        alignContent: "center",
        width: isSmallScreen
          ? "326px"
          : isMediumScreen
          ? "40vw"
          : isLargeScreen
          ? "40vw"
          : "426px",
        height: "auto",
        borderRadius: "16px",
        padding: "16px",
      }}
    >
      <Card sx={{ textDecoration: "none" }}>
        <Box component="a" href={link}>
          <CardMedia
            component="img"
            image={pathImage}
            sx={{ width: "100%", height: "240px", borderRadius: "12px" }}
          />
        </Box>
        <CardContent>
          <Box display="flex" justifyContent="space-between" height={"80px"}>
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              minHeight="47px"
            >
              <Typography
                textAlign="left"
                variant="body1"
                sx={{ lineHeight: "1.5" }}
              >
                {title}
              </Typography>
              <Box
                width="100%"
                height="50px !important"
                display="flex"
                alignItems="center"
                justifyContent={"left"}
                sx={{ gap: "20px", marginTop: "4px" }}
              >
                <Avatar
                  src={vdavatar}
                  sx={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "16px",
                  }}
                />
                <Typography variant="body2" sx={{ alignSelf: "center" }}>
                  {author}
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={() => {
                handleChangeBookMark();
              }}
              sx={{ alignSelf: "flex-start", color: colors.purple[600] }}
            >
              {favorited ? (
                <BookmarkOutlinedIcon sx={{ width: "30px", height: "30px" }} />
              ) : (
                <BookmarkBorderOutlinedIcon
                  sx={{ width: "30px", height: "30px" }}
                />
              )}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VideoContents;
