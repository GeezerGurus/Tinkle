import React from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ShowMoreBtn = ({ to }) => {
  return (
    <Button
      component={Link}
      to={to}
      sx={{
        border: "1px dotted black",
        width: "78px",
        height: "28px",
        borderRadius: "7px",
        whiteSpace: "nowrap",
        textTransform: "none",
      }}
    >
      <Typography variant="text">Show more</Typography>
    </Button>
  );
};

export default ShowMoreBtn;
