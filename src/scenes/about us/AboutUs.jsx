// NotFound.js
import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { AboutUsImage } from "../../assets/empty";

const AboutUs = () => {
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
        backgroundColor: colors.purple[200],
      }}
    >
      <img
        src={AboutUsImage}
        alt="404"
        style={{ width: "40%", objectFit: "contain" }}
      />
      <Typography variant="h4" gutterBottom sx={{ color: colors.purple[900] }}>
        This Page is Still Under Construction! Stay Tune!
      </Typography>
      <Button
        component={Link}
        to="/dashboard"
        sx={{
          marginTop: 2,
          width: "320px",
          height: "44px",
          borderRadius: "8px",
          backgroundColor: colors.purple[900],
          textTransform: "none",
          color: "white",
        }}
      >
        <Typography variant="body2">Go Back to Dashboard Page</Typography>
      </Button>
    </Box>
  );
};

export default AboutUs;
