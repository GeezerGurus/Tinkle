import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  BookmarkBorderOutlined as BookmarkBorderOutlinedIcon,
  BookmarkOutlined as BookmarkOutlinedIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import BookIcon from "@mui/icons-material/Book";
import { patchBook } from "../../api/booksApi";
import { enqueueSnackbar } from "notistack";

const BookContents = ({ id,title, author, favorite, pathImage ,refresh}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [favorited, setFavorited] = useState(favorite || false);

  const handleSaveFav = async (fav) => {
    try {
      if (id) {
        const EditedBook = { favourite : fav };
        const createVideos = await patchBook(id, EditedBook);
        console.log("created Videos:",createVideos);
        enqueueSnackbar("Saved!", { variant: "info" });
      } else {
        console.error("Video ID not found");
      }
    } catch (error) {
      console.error("Error editing setting:", error);
    }
  };
  const handleChangeBookMark = () => {
    const newFav = favorited ? false : true;
    setFavorited(newFav);
    handleSaveFav(newFav);
  };

  const isSmallest = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : "244px",
        height: "388px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {/* Image for Book Cover */}
      <Box
        sx={{
          width: isSmallScreen ? "150px" : "222px",
          height: isSmallScreen ? "204px" : "286px",
          borderRadius: "16px",
          mt: "12px",
        }}
      >
        <Avatar
          variant="rounded"
          src={pathImage} // Replace with your image variable or URL
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "16px",
          }}
        >
          <BookIcon sx={{ width: "80px", height: "80px" }} />
        </Avatar>
      </Box>
      {/* Details for the Book */}
      <Box
        sx={{
          width: isSmallScreen ? "141px" : "222px",
          height: "42px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          position: "relative",
          mb: isSmallScreen ? 10 : 5,
        }}
      >
        <IconButton
          onClick={
            handleChangeBookMark
          }
          sx={{
            position: "absolute",
            top: "5%",
            right: 0,
            color: colors.purple[600],
          }}
        >
          {favorited ? (
            <BookmarkOutlinedIcon sx={{ width: "30px", height: "30px" }} />
          ) : (
            <BookmarkBorderOutlinedIcon
              sx={{ width: "30px", height: "30px" }}
            />
          )}
        </IconButton>
        {/* Title */}
        <Typography variant="body1" sx={{ width: "80%" }} noWrap>
          {title}
        </Typography>
        {/* Author */}
        <Typography variant="body4">{author}</Typography>
      </Box>
    </Box>
  );
};

export default BookContents;