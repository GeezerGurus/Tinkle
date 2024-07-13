import React from "react";
import {
  Typography,
  Box,
  useTheme,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";

const Heroavatarprofile = ({ code, name, job, image }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallest = useMediaQuery(theme.breakpoints.down("xs"));
  const isExtraSmallest = useMediaQuery(theme.breakpoints.down("xxs"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      display="flex"
      alignItems={"center"}
      width={isLargeScreen ? "29vw" : "200px"}
      textAlign="center"
      flexDirection={"column"}
    >
      <Avatar
        alt="hmm"
        src={image}
        sx={{
          width: isSmallScreen ? "55px" : "105px",
          height: isSmallScreen ? "55px " : "105px",
        }}
      />
      <Typography
        variant={isSmallScreen ? "body4" : "title1"}
        sx={{ color: colors.purple[900] }}
      >
        {code}
      </Typography>
      <Typography
        variant={isSmallScreen ? "body4" : "title1"}
        sx={{ textAlign: "center", color: colors.purple[900] }}
      >
        {name}
      </Typography>
      <Typography
        variant={isSmallScreen ? "body5" : "Hbody2"}
        sx={{ color: colors.purple[800] }}
      >
        {job}
      </Typography>
    </Box>
  );
};

export default Heroavatarprofile;
