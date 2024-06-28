import React, { useState, useEffect } from "react";
import { Paper, Box, useTheme, IconButton } from "@mui/material";

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
  // Auto slide functionality
  useEffect(() => {
    const id = setInterval(() => {
      handleNext();
    }, 4000);

    setIntervalId(id);

    return () => clearInterval(id);
  }, []);

  // Clear interval and restart on user interaction
  const handleInteraction = () => {
    clearInterval(intervalId);
    const newIntervalId = setInterval(() => {
      handleNext();
    }, 4000);
    setIntervalId(newIntervalId);
  };

  return (
    // Main Container
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      {/* Inner Container */}
      <Box
        sx={{
          width: "1321px",
          height: "908px",
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
            width: "1276px",
            minHeight: "432px",
            border: "1px solid #BDBDBD",
            borderRadius: "22px",
            boxShadow: "0 4px 4px 0 #00000040",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            overflow: "hidden",
            mb: 3,
          }}
        >
          {/* Back Arrow */}
          <IconButton onClick={handlePrev}>
            <ArrowBackIosIcon
              sx={{ width: "77px", height: "85px", color: colors.purple[600] }}
            />
          </IconButton>
          {/* Book Recommendations */}

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction === "right" ? 1000 : -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "right" ? -1000 : 1000 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ width: "973px", height: "400px" }}
            onClick={handleInteraction}
          >
            <BookSliderItem
              title={bookInfo[currentIndex].title}
              author={bookInfo[currentIndex].author}
              description={bookInfo[currentIndex].description}
              favorite={bookInfo[currentIndex].favorite}
              path={bookInfo[currentIndex].pathImage}
              link={bookInfo[currentIndex].link}
            />
          </motion.div>

          {/* Forward Arrow */}
          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon
              sx={{ width: "77px", height: "85px", color: colors.purple[600] }}
            />
          </IconButton>
        </Box>

        {/* Collections */}
        {subHeaders.map((header, index) => (
          <BookHeaderItem key={index} header={header.header} />
        ))}
      </Box>
    </Paper>
  );
};

export default Books;
