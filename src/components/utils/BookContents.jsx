import React, { useState } from "react";
import { Box, Typography, IconButton, useTheme, Avatar } from "@mui/material";
import {
  BookmarkBorderOutlined as BookmarkBorderOutlinedIcon,
  BookmarkOutlined as BookmarkOutlinedIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import BookIcon from "@mui/icons-material/Book";

const BookContents = ({ title, author, favorite, pathImage }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [favorited, setFavorited] = useState(favorite || false);

  return (
    <Box
      sx={{
        width: "244px",
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
          width: "222px",
          height: "286px",
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
          width: "222px",
          height: "42px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          position: "relative",
          mb: 5,
        }}
      >
        <IconButton
          onClick={() => {
            favorited ? setFavorited(false) : setFavorited(true);
          }}
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
        <Typography variant="body1" sx={{ width: "80%" }}>
          {title}
        </Typography>
        {/* Author */}
        <Typography variant="body4">{author}</Typography>
      </Box>
    </Box>
  );
};

export default BookContents;
