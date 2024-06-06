import React from "react";
import { tokens } from "../../theme";
import { Container, Typography, useTheme } from "@mui/material";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Container>
      <Typography color={colors.greenAccent[500]} variant="h1">
        Dashboard
      </Typography>
    </Container>
  );
};

export default Dashboard;
