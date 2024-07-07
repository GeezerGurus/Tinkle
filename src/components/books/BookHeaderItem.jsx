import React, { useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { ArrowForwardIos as ArrowForwardIosIcon } from "@mui/icons-material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import { BookContents } from "../utils";

// All Contents for each Sub Header

//Favorites
const favorites = [
  {
    title: "Minus GPA",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  {
    title: "Project Over School Work",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  {
    title: "Restless Nights",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  {
    title: "Darkness When Light",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
];

// Budget
const budget = [
  {
    title: "NO VALUE",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  {
    title: "Money Disappearance",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  {
    title: "Million Dollar Project",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  {
    title: "No Pay",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
];

// Savings
const savings = [
  {
    title: "Empty Wallet",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  {
    title: "Broken Piggy Bank",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  {
    title: "Robbery and Theft",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  {
    title: "Tenth of a penny",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
];

// Business
const business = [
  {
    title: "Child Labor",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  {
    title: "Drug Dealings",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  { title: "Prostitution", author: "Thuta Htun", image: "", favorite: true },
  {
    title: "Organs and their worths",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
];

// Tinkle
const tinkle = [
  {
    title: "The bottle Budget",
    author: "Joel Woods",
    image: "",
    favorite: true,
  },
  {
    title: "Still No Pay",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  { title: "Black Coffee", author: "Thuta Htun", image: "", favorite: true },
  {
    title: "Disappearing Pay",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
];

//Life
const life = [
  {
    title: "My No Life",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  {
    title: "Touch Grass",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  { title: "Brain Dead", author: "Thuta Htun", image: "", favorite: true },
  {
    title: "Deep Slumber",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
];

const bookData = {
  favorites,
  budget,
  savings,
  business,
  tinkle,
  life,
};

// Main
const BookHeaderItem = ({ header }) => {
  const path = header.toLowerCase().replace(" ", "-");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const books = useMemo(() => {
    return bookData[header.toLowerCase()];
  }, [header]);

  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: isLargest ? "100%" : "1290px",
        height: isMediumScreen ? "100%" : "454px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          height: "46px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        <Typography variant="h4" ml={2}>
          {header}
        </Typography>

        {/* View all button */}
        <Button
          component={Link}
          to={`/books/${path}`}
          endIcon={<ArrowForwardIosIcon sx={{ color: colors.purple[600] }} />}
          sx={{ height: "27px", mr: 2 }}
        >
          <Typography variant="body1">View all</Typography>
        </Button>
      </Box>

      {/* Contents */}
      <Box
        sx={{
          height: isMediumScreen ? "100%" : "398px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Inner Container for Contents */}
        <Grid
          container
          sx={{
            width: isSmallScreen ? "80%" : "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Items */}
          {books.map((item, index) => (
            <Grid item xxs={5} sm={5} md={3}>
              <BookContents
                key={index}
                title={item.title}
                author={item.author}
                favorite={item.favorite}
                pathImage={item.image}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BookHeaderItem;