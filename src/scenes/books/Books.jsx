import React, { useState, useEffect, useRef, useCallback } from "react";
import { Paper, Box, useTheme, IconButton, useMediaQuery } from "@mui/material";
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import BookSliderItem from "../../components/books/BookSliderItem";
import { BookHeaderItem } from "../../components/books";
import { getBooks } from "../../api/booksApi";

const subHeaders = [
  {
    header: "Budget",
  },
  {
    header: "Savings",
  },
  {
    header: "Business",
  },
];
const Books = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentIndex, setIndex] = useState(0);
  const sliderRef = useRef(null);
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

  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? lists.length - 1 : prevIndex - 1
    );
  };

  const handleNext = useCallback(() => {
    setIndex((prevIndex) =>
      prevIndex === lists.length - 1 ? 0 : prevIndex + 1
    );
  }, [lists.length]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      console.log(currentIndex);
      slider.style.transition = "transform 0.5s ease-in-out";
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  useEffect(() => {
    const intervalId = setInterval(handleNext, 4000); // Auto-slide every 4 seconds
    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [isLoading, handleNext]);

  return (
    <Paper
      sx={{
        width: isSmallScreen
          ? "100%"
          : isMediumScreen
          ? "90vw"
          : isLargest
          ? "92vw"
          : "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        bgcolor: colors.backGround,
      }}
    >
      <Box
        sx={{
          p: isLargest ? 2 : undefined,
          width: "100%",
          height: "auto",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            minHeight: "432px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {isSmallScreen && (
            <IconButton onClick={handlePrev}>
              <ArrowBackIosIcon
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  left: 30,
                  width: "77px",
                  height: "85px",
                  color: colors.purple[600],
                }}
              />
            </IconButton>
          )}
          <Box
            ref={sliderRef}
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            {lists.map((book, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  flex: "0 0 100%",
                  minHeight: isSmallScreen
                    ? "40%"
                    : isMediumScreen
                    ? "400px"
                    : "432px",
                  border: "1px solid #BDBDBD",
                  borderRadius: "22px",
                  boxShadow: "0 4px 4px 0 #00000040",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  overflow: "hidden",
                }}
              >
                <IconButton onClick={handlePrev}>
                  <ArrowBackIosIcon
                    sx={{
                      display: isSmallScreen ? "none" : undefined,
                      width: "77px",
                      height: "85px",
                      color: colors.purple[600],
                    }}
                  />
                </IconButton>
                <BookSliderItem
                  id={book._id}
                  title={book.title}
                  author={book.author}
                  category={book.category}
                  description={book.description}
                  favorite={book.favourite}
                  path={book.coverImage}
                  link={book.link}
                  refresh={fetchBooks} // Pass the function itself
                />
                <IconButton onClick={handleNext}>
                  <ArrowForwardIosIcon
                    sx={{
                      display: isSmallScreen ? "none" : undefined,
                      width: "77px",
                      height: "85px",
                      color: colors.purple[600],
                    }}
                  />
                </IconButton>
              </Box>
            ))}
          </Box>
          {isSmallScreen && (
            <IconButton onClick={handleNext}>
              <ArrowForwardIosIcon
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  right: 5,
                  width: "77px",
                  height: "85px",
                  color: colors.purple[600],
                }}
              />
            </IconButton>
          )}
        </Box>
        {/* <BookFavouriteItem header={"Favourite"}  /> */}

        {subHeaders.map((item, index) => (
          <BookHeaderItem key={index} header={item.header} lists={lists} />
        ))}
      </Box>
    </Paper>
  );
};

export default Books;
