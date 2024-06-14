import React, { useState } from "react";
import { tokens } from "../../theme";
import { Box, Button, ButtonGroup, useTheme, styled } from "@mui/material";
import { ActivePage, ClosedPage } from "../../components/debt list";

const StyledButton = styled(Button)(({ theme }) => ({
  width: "433px",
  height: "37px",
  backgroundColor: "white",
  color: "black",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.neutral.dark,
    color: "white",
  },
  fontWeight: "600",
  fontSize: "16px",
}));

const Debt = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState("active");

  const handlePage = (event) => {
    setPage(event.target.value);
  };

  const renderPage = () => {
    if (page === "active") {
      return <ActivePage />;
    } else if (page === "closed") {
      return <ClosedPage />;
    }
  };

  return (
    // Container
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "green",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Main  */}
      <Box
        sx={{
          marginTop: theme.spacing(3),
          width: "1249px",
          backgroundColor: "blue",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: theme.spacing(3),
        }}
      >
        {/* Top nav  */}
        <ButtonGroup variant="contained" sx={{ backgroundColor: "black" }}>
          <StyledButton
            value="active"
            onClick={handlePage}
            sx={{
              backgroundColor: page === "active" ? "black" : "white",
              color: page === "active" ? "white" : "black",
              "&:hover": {
                backgroundColor: page === "active" ? "grey" : "darkgrey",
              },
            }}
          >
            Active
          </StyledButton>
          <StyledButton
            value="closed"
            onClick={handlePage}
            sx={{
              backgroundColor: page === "closed" ? "black" : "white",
              color: page === "closed" ? "white" : "black",
              "&:hover": {
                backgroundColor: page === "closed" ? "grey" : "darkgrey",
              },
            }}
          >
            Closed
          </StyledButton>
        </ButtonGroup>

        {/* Rendering  */}
        {renderPage()}
      </Box>
    </Box>
  );
};

export default Debt;
