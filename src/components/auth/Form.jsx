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

  const [errors, setErrors] = useState({});
  const [page, setPage] = useState("sign-up");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (page === "sign-up" && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
      const res = await login(userData);
      if (res.data !== undefined) {
        const errors = {};
        if (res.data.errors.password) {
          errors.loginPassword = res.data.errors.password;
        }
        if (res.data.errors.email) {
          errors.loginEmail = res.data.errors.email;
        }
        if (res.data.errors.username) {
          errors.loginUserName = res.data.errors.username;
        }

        setErrors(errors);
        setIsLoading(false);
        return;
      }
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
    const Data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
    if (!validateForm(Data)) {
      return;
    }
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
                sx={{ color: colors.text.text1 }}
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
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  required: true,
                }}
                InputProps={{
                  sx: { height: isSmallScreen ? "45px" : undefined },
                }}
                error={!!errors.username}
                helperText={errors.uername}
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  required: true,
                }}
                InputProps={{
                  sx: { height: isSmallScreen ? "45px" : undefined },
                }}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                required
                fullWidth
                type={showPassword ? "text" : "password"} // Toggle visibility based on state
                InputLabelProps={{
                  shrink: true,
                  required: true,
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
                error={!!errors.password || !!errors.confirmPassword}
                helperText={errors.password || errors.confirmPassword}
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                required
                fullWidth
                type={showConfirmPassword ? "text" : "password"} // Toggle visibility based on state
                InputLabelProps={{
                  shrink: true,
                  required: true,
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
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  height: isSmallScreen ? "45px" : "56px",
                  backgroundColor: "#525085",
                  "&:hover": {
                    backgroundColor: "#8884DC",
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
                  sx={{ color: "#8884DC", textDecoration: "none" }}
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
                sx={{ color: "#3F3D66" }}
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
                error={!!errors.loginUserName || !!errors.username}
                helperText={errors.loginUserName || errors.username}
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
                error={!!errors.loginEmail || !!errors.email}
                helperText={errors.loginEmail || errors.email}
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
                error={!!errors.loginPassword || !!errors.password}
                helperText={errors.loginPassword || errors.password}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  height: "56px",
                  backgroundColor: "#525085",
                  "&:hover": {
                    backgroundColor: "#8884DC",
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
                  sx={{ color: "#8884DC", textDecoration: "none" }}
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
