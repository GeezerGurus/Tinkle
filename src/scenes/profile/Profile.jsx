import React from "react";
import { tokens } from "../../theme";
import { Paper, Typography, useTheme } from "@mui/material";
import Profileinfo from "../../components/profile/Profileinfo"

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Paper sx={{
      width:"1122px",
      height:"874px",
      margin:"0 auto",
      marginTop:"50px"
    }}>
      <Profileinfo/>
    </Paper>
  );
};

export default Profile;
