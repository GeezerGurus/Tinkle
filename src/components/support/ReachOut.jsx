import React from "react";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import { useTheme, Box, Paper, Typography } from "@mui/material";
import { tokens } from "../../theme";

const ReachOut = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper
      sx={{
        width: "390px",
        height: "370px",
        padding: "56px",
        borderRadius: "18px",
        textAlign: "Center",
        backgroundColor: colors.extra["faint_white"],
      }}
      elevation={4}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "33px",
        }}
      >
        <LocalPhoneRoundedIcon sx={{ fontSize: "72px", color: "green" }} />
      </Box>
      <Typography gutterBottom variant="h5" sx={{ marginBottom: "33px" }}>
        Reach Out Directly
      </Typography>
      <Typography variant="body1">
        Prefer to send us and <br />
        email or give us a call?
        <br />
        Email:{" "}
        <a href="" style={{ textDecoration: "none" }}>
          geezersco@gmail.com
        </a>
      </Typography>
    </Paper>
  );
};
export default ReachOut;
