// NotFound.js
import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { PageNotFoundImage } from "../../assets/page not found";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

const NotFound = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: colors.purple[400],
      }}
    >
      <img
        src={PageNotFoundImage}
        alt="404"
        style={{ width: "32%", objectFit: "contain" }}
      />
      <Typography variant="h4" gutterBottom sx={{ color: colors.purple[900] }}>
        The Page You're Looking For Isn't Here, Try A Different One!
      </Typography>
      <Button
        component={Link}
        to="/"
        sx={{
          marginTop: 2,
          width: "205px",
          height: "44px",
          borderRadius: "8px",
          backgroundColor: colors.purple[900],
          textTransform: "none",
          color: "white",
        }}
      >
        <Typography variant="body2">Go to our Page</Typography>
      </Button>
    </Box>
  );
};

export default NotFound;
