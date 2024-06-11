import React from "react";
import { Button, Typography } from "@mui/material";
import Text from "./Text";

const ShowMoreBtn = () => {
  return (
    <Button
      sx={{
        border: "1px dotted black",
        width: "78px",
        height: "28px",
        borderRadius: "7px",
        whiteSpace: "nowrap",
        textTransform: "none",
      }}
    >
      <Text>Show more</Text>
    </Button>
  );
};

export default ShowMoreBtn;
