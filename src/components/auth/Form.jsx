import React, { useState, useContext } from "react";
import {
  Paper,
  TextField,
  Typography,
  Button,
  Link,
  FormControl,
} from "@mui/material";
import { signup, signin } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [page, setPage] = useState("sign-up");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePage = () => {
    setPage(page === "sign-up" ? "sign-in" : "sign-up");
  };

  const signingUp = async (userData) => {
    setIsLoading(true);

    try {
      const res = await signup(userData);
      const { user, token } = res;
      localStorage.setItem("jwt", token);
      login(user);
      console.log("User signed up:", user);
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const loggingIn = async (userData) => {
    setIsLoading(true);

    try {
      const res = await signin(userData);
      const { user, token } = res;
      localStorage.setItem("jwt", token);
      login(user);
      console.log("User logged in:", user);
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (page === "sign-up") {
      signingUp(userData);
    } else {
      loggingIn(userData);
    }
  };
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
          p: 4,
        }}
      >
        <FormControl
          component="form"
          onSubmit={handleSubmit}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {page === "sign-up" && (
            <>
              <Typography variant="h3" gutterBottom>
                Let's Sign Up!
              </Typography>
              <Typography
                variant="body2"
                align="center"
                width={"422px"}
                gutterBottom
              >
                Sign up and create an account, so that you can start tracking
                your finance!
              </Typography>
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
              />
              <TextField
                name="password"
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
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <Typography>
                Already have an account?
                <Link href="#" onClick={togglePage}>
                  Sign in
                </Link>
              </Typography>
            </>
          )}

          {page === "sign-in" && (
            <>
              <Typography variant="h3" gutterBottom>
                Welcome Back!
              </Typography>
              <Typography
                variant="body2"
                align="center"
                width={"422px"}
                gutterBottom
              >
                Sign in to access your account and manage your finances.
              </Typography>
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
              />
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: "56px" }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              <Typography>
                Don't have an account yet?
                <Link href="#" onClick={togglePage}>
                  Sign up
                </Link>
              </Typography>
            </>
          )}
        </FormControl>
      </Paper>
    </Paper>
  );
};

export default Form;
