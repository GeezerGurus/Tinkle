import React from "react";
import { Box, Typography,useTheme,useMediaQuery } from "@mui/material";
import Videos from "./Videos";
import { tokens } from "../../theme";

const subHeaders = [
  { header: "Favourites" },
  { header: "Budgets" },
  { header: "Saving" },
  { header: "Business" },
  { header: "Tinkle" },
  { header: "Life" },
];

const Videopage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallest = useMediaQuery(theme.breakpoints.down("xs"));
  const isExtraSmallest = useMediaQuery(theme.breakpoints.down("xxs"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box sx={{ margin: "0 auto", textAlign: "center" }}>
      {/* Gradient title */}
      <Box
        sx={{
          margin: "0 auto",
          width: "auto",
          height: "134px",
          borderRadius: "16px",
          alignContent: "center",
          backgroundImage: "linear-gradient(to right, #50B87E, #8884DC)",
          display: "flex",
          alignItems: "center",
          padding: "32px",
          justifyContent: "center",
        }}
      >
        <Typography
          variant={isSmallScreen?"body3":"h6"}
        >
          Expand your knowledge on finance and life with our selected videos
        </Typography>
      </Box>
 
      {/* Video item box */}
      <Box sx={{ width: "97%", margin: "0 auto", padding: "8px" }}>
        {subHeaders.map((header, index) => (
          <Videos key={index} header={header.header} />
        ))}
      </Box>
    </Box>
  );
};

export default Videopage;
