import React from "react";
import { tokens } from "../../theme";
import { Paper, useTheme,Box } from "@mui/material";
import Videopage from "../../components/knowledge/Videopage";

const Video = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        width: "100%",
        height:"fit-cotent",
        padding: "16px, 16px, 0px, 16px",
        margin: "0 auto",
        gap: "8px",
      }}
    >
      <Videopage />
    </Box>
  );
};

export default Video;