import React, { useMemo,useEffect,useState } from "react";
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
import PropTypes from 'prop-types';
import { getBooks, getFavoriteBooks } from "../../api/booksApi";


// All Contents for each Sub Header
const favorites = [/* ... */];
const budget = [/* ... */];
const savings = [/* ... */];
const business = [/* ... */];
const tinkle = [/* ... */];
const life = [/* ... */];



const BookFavouriteItem = ({header}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Ensure header is defined before further processing
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchFavouriteBooks = async () => {
    setIsLoading(true);
    try {
      const res = await getFavoriteBooks();
      setLists(res || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFavouriteBooks();
  }, []);

  const path = useMemo(() => header.toLowerCase().replace(" ", "-"), [header]);

  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: isLargest ? "100%" : "1290px",
        height: isMediumScreen ? "100%" : "454pxauto",
        display: "flex",
        overflow:"hidden",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "46px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" ml={2}>
          {header}
        </Typography>

        <Button
          component={Link}
          to={`/books/${path}`}
          endIcon={<ArrowForwardIosIcon sx={{ color: colors.purple[600] }} />}
          sx={{ height: "27px", mr: 2 }}
        >
          <Typography variant="body1">View all</Typography>
        </Button>
      </Box>

      <Box
        sx={{
          height: isMediumScreen ? "100%" : "398px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          sx={{
            width: isSmallScreen ? "80%" : "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        > 
          {lists.map((item, index) => (
            <Grid item key={index} xs={5} sm={5} md={3}>
              <BookContents
                id = {item._id}
                title={item.title}
                author={item.author}
                favorite={item.favourite}
                pathImage={item.coverImage}
                // refresh = {fetchFavouriteBooks()}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

BookFavouriteItem.propTypes = {
  header: PropTypes.string.isRequired,
};

export default BookFavouriteItem;
