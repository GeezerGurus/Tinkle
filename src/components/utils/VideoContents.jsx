import React, { useState } from "react";
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
import DotIcon from "@mui/icons-material/FiberManualRecord";
import { tokens } from "../../theme";

const VideoContents = ({ title, author, pathImage, vdavatar, favorite }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [favorited, setFavorited] = useState(favorite || false);
  //responsive
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <Box
      sx={{
        alignContent: "center",
        width: isSmallScreen ? "326px" :isMediumScreen?"40vw": isLargeScreen?"40vw":"426px",
        height:"auto",
        borderRadius: "16px",
        padding: "16px",
      }}
    >
      <Card sx={{ border: "2px solid black" }}>
        <CardMedia
          component="img"
          image={pathImage}
          sx={{ width: "100%", height: "240px", borderRadius: "12px" }}
        />
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
                justifyContent={"space-between"}
                sx={{ gap: "4px", marginTop: "4px" }}
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
                <DotIcon
                  sx={{ width: "4px", height: "4px", alignSelf: "center" }}
                />
                <Typography variant="body2" sx={{ alignSelf: "center" }}>
                  1.3M views
                </Typography>
                <DotIcon
                  sx={{ width: "4px", height: "4px", alignSelf: "center" }}
                />
                <Typography variant="body2" sx={{ alignSelf: "center" }}>
                  2 days ago
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={() => {
                favorited ? setFavorited(false) : setFavorited(true);
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
