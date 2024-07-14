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
import PropTypes from "prop-types";

// All Contents for each Sub Header

const BookHeaderItem = ({ header, lists, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Ensure header is defined before further processing
  const books = lists;

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
        overflow: "hidden",
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
          endIcon={
            <ArrowForwardIosIcon sx={{ color: colors.button.button1 }} />
          }
          sx={{ height: "27px", mr: 2, color: colors.button.button1 }}
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
          {books
            .filter((item) => item.category === header)
            .map((item, index) => (
              <Grid item key={index} xs={5} sm={5} md={3}>
                <BookContents
                  id={item._id}
                  title={item.title}
                  link={item.link}
                  author={item.author}
                  favorite={item.favourite}
                  pathImage={item.coverImage}
                  refresh={refresh}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

BookHeaderItem.propTypes = {
  header: PropTypes.string.isRequired,
};

export default BookHeaderItem;
