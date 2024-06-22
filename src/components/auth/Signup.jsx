import { Box, Paper, TextField, Typography, Button, Link } from "@mui/material";
import React from "react";

const Signup = () => {
  return (
    <Paper
      sx={{
        width: "1040px",
        height: "704px",
        borderRadius: "40px 0 0 40px",
        display: "flex",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "linear-gradient(135deg, #9591F2, #B4D9B8);",
      }}
    >
      <Paper
        sx={{
          width: "66%",
          height: "100%",
          borderRadius: "40px 0 0 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          p: 4,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Let's Sign Up!
        </Typography>
        <Typography variant="body2" align="center" width={"422px"} gutterBottom>
          Sign up and create an account, so that you can start tracking your
          finance!
        </Typography>
        {/* Name Fields */}
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <TextField label="First Name" variant="outlined" fullWidth />
          <TextField label="Last Name" variant="outlined" fullWidth />
        </Box>
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          type="password"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ height: "56px" }}
        >
          Create Account
        </Button>
        <Typography>
          Already have an account? <Link href="#">Log in</Link>
        </Typography>
      </Paper>
    </Paper>
  );
};

export default Signup;
