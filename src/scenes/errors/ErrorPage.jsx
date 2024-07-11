import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { ServerDownImage } from "../../assets/empty";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

const ErrorPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        textAlign: "center",
        backgroundColor: colors.purple[400],
      }}
    >
      <img
        src={ServerDownImage}
        alt="500"
        style={{ width: "32%", objectFit: "contain" }}
      />
      <Typography variant="h4" gutterBottom sx={{ color: colors.purple[900] }}>
        The server is down at the moment, it'll be up very soon!
      </Typography>
      <Button
        component="a"
        href="/dashboard"
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

export default ErrorPage;
