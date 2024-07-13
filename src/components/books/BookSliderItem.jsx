import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  IconButton,
  Avatar,
  useMediaQuery,
} from "@mui/material";

import {
  BookmarkBorderOutlined as BookmarkBorderOutlinedIcon,
  BookmarkOutlined as BookmarkOutlinedIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme";

const BookSliderItem = ({
  id,
  title,
  author,
  category,
  description,
  favorite,
  path,
  link,
  refresh // Assuming this is used for refreshing data after an action
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [favorited, setFavorited] = useState(favorite || false);

  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: isSmallScreen ? "90%" : isLargest ? "100%" : "973px",
        height: isSmallScreen ? "300px" : isMediumScreen ? "90%" : "400px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* Image Cover for the Book */}
      <Box
        sx={{
          width: isLargest ? "40%" : "247px",
          height: isLargest ? "95%" : "391px",
          border: "1px solid orange",
          mr: 2,
        }}
      >
        <Avatar
          variant="square"
          src={path} // Assuming path is the URL or path to the book cover image
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Book Title, Author, Description, and Read Now Button */}
      <Box
        sx={{
          width: isLargest ? "100%" : "674px",
          height: isLargest ? "100%" : "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-around",
          position: isSmallScreen ? undefined : "relative",
        }}
      >
        {/* Book Mark Icons */}
        <IconButton
          sx={{
            position: "absolute",
            top: "10px",
            right: isSmallScreen ? -20 : -80,
          }}
          onClick={() => {
            setFavorited((prev) => !prev); // Toggle favorite state
            // Optionally, you might want to call refresh here to update the state in the parent component
            refresh(); // Assuming refresh is a function passed down from parent
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
        <Typography
          variant={isMediumScreen ? "h6" : "h4"}
          sx={{ height: isSmallScreen ? "50px" : "46px" }}
        >
          {title}
        </Typography>
        {/* Author */}
        <Typography
          variant={isMediumScreen ? "body4" : "body2"}
          sx={{ height: "27px" }}
        >
          By {author}
        </Typography>
        {/* Description */}
        <Typography
          variant={isSmallScreen ? "body4" : "body3"}
          sx={{
            height: "156px",
            overflow: "hidden",
            display: isSmallScreen ? "none" : undefined,
          }}
        >
          {description}
        </Typography>
        {/* Read More Button */}
        <Button
          component="a"
          href={link.startsWith("http") ? link : `https://${link}`} // Assuming link is the URL or path to read more about the book
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          // onClick={console.log([
          //   id,
          //   title,
          //   author,
          //   category,
          //   description,
          //   favorite,
          //   path,
          //   link,
          // ]

          // )}
          sx={{
            width: "176px",
            height: "42px",
            backgroundColor: colors.button.button2,
            color: colors.text.text2,
            textTransform: "capitalize",
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
