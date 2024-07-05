import React, { useState, useEffect, useRef } from "react";
import { Paper, Box, useTheme, IconButton, useMediaQuery } from "@mui/material";

import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";

import { tokens } from "../../theme";
import BookSliderItem from "../../components/books/BookSliderItem";
import { BookHeaderItem } from "../../components/books";
import { motion } from "framer-motion";
import MoneyPhoto from "../../components/books/images/money2.jpg";
// Book Info

const bookInfo = [
  {
    title: "Finance for teens and young adults",
    author: "Harlen Pierce",
    description: `"Finance for Teens and Young Adults" by Harlem Pierce is a practical
          guide designed to introduce young individuals to the essentials of
          personal finance. The book covers fundamental topics such as
          budgeting, saving, investing, and managing debt, tailored specifically
          for teens and young adults. It aims to empower young readers with the
          knowledge and tools needed to make informed financial decisions early
          in life, helping them build a strong foundation for future financial
          stability`,
    favorite: true,
    pathImage: MoneyPhoto,
    link: "www.google.com",
  },
  {
    title: "The nights of Frontend Developer",
    author: "Thuta Htun",
    description: `Where's my pay check?`,
    favorite: false,
    pathImage: MoneyPhoto,
    link: "www.google.com",
  },
  {
    title: "Me with my Insomnia",
    author: "Overworked Developer",
    description: `I just wanna sleep`,
    favorite: true,
    pathImage: MoneyPhoto,
    link: "www.google.com",
  },
];

// Sub Header Contents

const subHeaders = [
  {
    header: "Favorites",
  },
  {
    header: "Budget",
  },
  {
    header: "Savings",
  },
  {
    header: "Business",
  },
  {
    header: "Tinkle",
  },
  {
    header: "Life",
  },
];

const Books = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentIndex, setIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [intervalId, setIntervalId] = useState(null);
  const sliderRef = useRef(null);

  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePrev = () => {
    setDirection("left");
    setIndex((prevIndex) =>
      prevIndex === 0 ? bookInfo.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setDirection("right");
    setIndex((prevIndex) =>
      prevIndex === bookInfo.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const slider = sliderRef.current;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, [currentIndex]);

  useEffect(() => {
    const intervalId = setInterval(handleNext, 4000); // Auto-slide every 4 seconds
    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    // Main Container
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
      }}
    >
      {/* Inner Container */}
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
        {/* Recommendation Box */}

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
            {bookInfo.map((book, index) => (
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
                {/* Back Arrow */}
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
                  title={book.title}
                  author={book.author}
                  description={book.description}
                  favorite={book.favorite}
                  path={book.pathImage}
                  link={book.link}
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
        {/* </motion.div> */}

        {/* Collections */}
        {subHeaders.map((header, index) => (
          <BookHeaderItem key={index} header={header.header} />
        ))}
      </Box>
    </Paper>
  );
};

export default Books;
