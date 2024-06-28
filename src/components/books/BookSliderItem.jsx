import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  IconButton,
  Avatar,
} from "@mui/material";

import {
  BookmarkBorderOutlined as BookmarkBorderOutlinedIcon,
  BookmarkOutlined as BookmarkOutlinedIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme";

import { Link } from "react-router-dom";

const BookSliderItem = ({
  title,
  author,
  description,
  favorite,
  path,
  link,
  direction,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [favorited, setFavorited] = useState(favorite || false);
  return (
    <Box
      sx={{
        width: "973px",
        height: "400px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Image Cover for the Book */}
      <Box sx={{ width: "247px", height: "391px", border: "1px solid orange" }}>
        <Avatar
          variant="square"
          src={path} // Replace with your image variable or URL
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Book Title, Author, Description, and Read Now Button */}
      <Box
        sx={{
          width: "674px",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-around",
          position: "relative",
        }}
      >
        {/* Book Mark Icons */}
        <IconButton
          sx={{ position: "absolute", top: "10px", right: 0 }}
          onClick={() => {
            favorited ? setFavorited(false) : setFavorited(true);
          }}
        >
          {favorited ? (
            <BookmarkOutlinedIcon
              sx={{
                width: "48px",
                height: "48px",
                color: colors.purple[600],
              }}
            />
          ) : (
            <BookmarkBorderOutlinedIcon
              sx={{
                width: "48px",
                height: "48px",
                color: colors.purple[600],
              }}
            />
          )}
        </IconButton>
        {/* Title */}
        <Typography variant="h4" sx={{ height: "46px" }}>
          {title}
        </Typography>
        {/* Author */}
        <Typography variant="body2" sx={{ height: "27px" }}>
          By {author}
        </Typography>
        {/* Description */}
        <Typography variant="body3" sx={{ height: "156px" }}>
          {description}
        </Typography>
        {/* Read More Button */}
        <Button
          component="a"
          href={link.startsWith("http") ? link : `https://${link}`} // Replace with your target URL
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          sx={{
            width: "176px",
            height: "42px",
            backgroundColor: colors.purple[200],
            color: "black",
            ml: "9px",
            "&:hover": {
              color: "white",
            },
          }}
        >
          <Typography variant="body3">Read More</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default BookSliderItem;
