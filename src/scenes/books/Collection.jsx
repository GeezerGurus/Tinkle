import React, { useEffect, useRef, useState } from "react";
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
import { BookContents } from "../../components/utils";
import { BackBtn } from "../../components/utils";
import { getBooks } from "../../api/booksApi";

const path = "/books";
const Collection = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const gridRef = useRef(null);
  const { collection } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState([]);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const res = await getBooks();
      setLists(res || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (gridRef.current) {
        const hasOverflow =
          gridRef.current.scrollHeight > gridRef.current.clientHeight;
        setIsOverflowing(hasOverflow);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));

  const header = collection
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    // Main Container
    <Paper
      sx={{
        width: isSmallScreen
          ? "100%"
          : isMediumScreen
          ? "100%"
          : isLargest
          ? "92vw"
          : "100%",
        height: "940px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            width: isLargeScreen ? "100%" : "1290px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          {/* Title */}
          <Typography variant="h3">{header}</Typography>

          {/* Call Back Button */}
          <BackBtn />
        </Box>
        {/* Contents */}
        <Grid
          container
          ref={gridRef}
          sx={{
            width: isOverflowing
              ? isLargest
                ? "100%"
                : "1151px"
              : isLargest
              ? "99%"
              : "1146px",
            height: "769px",
            gap: "49px",
            alignItems: isMediumScreen ? "center" : "flex-start",
            justifyContent: isMediumScreen ? "center" : "flex-start",
            p: 1,
            overflowY: "auto",
          }}
        >
          {lists
            .filter(
              (item) => item.category === header || item.favourite === true
            )
            .map((item) => (
              <Grid item key={item._id} xxs={5} sm={5} md={3} lg={2.5}>
                <BookContents
                  id={item._id}
                  title={item.title}
                  author={item.author}
                  favorite={item.favourite}
                  pathImage={item.coverImage}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default Collection;
