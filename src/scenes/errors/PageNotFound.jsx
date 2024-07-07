// NotFound.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ marginTop: 2 }}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
