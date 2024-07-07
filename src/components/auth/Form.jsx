import React, { useState, useContext } from "react";
import {
  Paper,
  TextField,
  Typography,
  Button,
  Link,
  FormControl,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FormImage from "../../assets/form.png";
import { tokens } from "../../theme";
import { postSetting } from "../../api/generalSettings";

const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState("sign-up");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));

  const togglePage = () => {
    setPage(page === "sign-up" ? "sign-in" : "sign-up");
  };

  const signingUp = async (userData) => {
    setIsLoading(true);

    try {
      await signup(userData);
      setIsLoading(false);
      navigate("/dashboard");
      postSetting();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const loggingIn = async (userData) => {
    setIsLoading(true);

    try {
      await login(userData);
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

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Paper
      sx={{
        width: isLargeScreen ? "80vw" : "1040px",
        height: isMediumScreen ? "95vh" : isLaptop ? "95vh" : "704px",
        borderRadius: isMediumScreen ? " 40px" : "40px 0 0 40px",
        display: "flex",
        justifyContent: "flex-end",
        overflow: "hidden",
        backgroundImage: `url(${FormImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: isSmallScreen ? "top" : "left",
      }}
    >
      <Paper
        sx={{
          padding: isSmallScreen
            ? "20px 20px 50px"
            : isLaptop
            ? "50px 96px"
            : "88px 96px",
          width: isSmallScreen ? "100%" : isMediumScreen ? "80%" : "693px",
          height: isSmallScreen ? "90%" : "100%",
          borderRadius: isSmallScreen ? " 40px 40px 0 0" : "40px 0 0 40px",
          mt: isSmallScreen ? 15 : undefined,
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
              <Typography
                variant={isSmallScreen ? "h6" : "h3"}
                sx={{ color: colors.purple[900] }}
                gutterBottom
              >
                Let's Sign Up!
              </Typography>
              <Typography
                variant={isSmallScreen ? "body4" : "body2"}
                align="center"
                width={isSmallScreen ? "100%" : "422px"}
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
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: { height: isSmallScreen ? "45px" : undefined },
                }}
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: { height: isSmallScreen ? "45px" : undefined },
                }}
              />
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"} // Toggle visibility based on state
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: { height: isSmallScreen ? "45px" : undefined },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type={showConfirmPassword ? "text" : "password"} // Toggle visibility based on state
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: { height: isSmallScreen ? "45px" : undefined },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleToggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  height: isSmallScreen ? "45px" : "56px",
                  backgroundColor: colors.purple[800],
                  "&:hover": {
                    backgroundColor: colors.purple[600],
                  },
                  textTransform: "none",
                }}
                type="submit"
                disabled={isLoading}
              >
                <Typography variant="body2">
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Typography>
              </Button>
              <Typography variant={isSmallScreen ? "body2" : undefined}>
                Already have an account?{" "}
                <Link
                  href="#"
                  onClick={togglePage}
                  sx={{ color: colors.purple[600], textDecoration: "none" }}
                >
                  Sign in
                </Link>
              </Typography>
            </>
          )}

          {page === "sign-in" && (
            <>
              <Typography
                variant={isSmallScreen ? "h6" : "h3"}
                sx={{ color: colors.purple[900] }}
                gutterBottom
              >
                Welcome Back!
              </Typography>
              <Typography
                variant="body2"
                align="center"
                width={isSmallScreen ? "100%" : "422px"}
                gutterBottom
              >
                Sign in to access your account and manage your finances.
              </Typography>
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: { height: isSmallScreen ? "45px" : undefined },
                }}
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: { height: isSmallScreen ? "45px" : undefined },
                }}
              />
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"} // Toggle visibility based on state
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: { height: isSmallScreen ? "45px" : undefined },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  height: "56px",
                  backgroundColor: colors.purple[800],
                  "&:hover": {
                    backgroundColor: colors.purple[600],
                  },
                  textTransform: "none",
                }}
                type="submit"
                disabled={isLoading}
              >
                <Typography variant="body2">
                  {isLoading ? "Signing In..." : "Sign In"}
                </Typography>
              </Button>
              <Typography variant={isSmallScreen ? "body2" : undefined}>
                Don't have an account yet?{" "}
                <Link
                  href="#"
                  onClick={togglePage}
                  sx={{ color: colors.purple[600], textDecoration: "none" }}
                >
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
