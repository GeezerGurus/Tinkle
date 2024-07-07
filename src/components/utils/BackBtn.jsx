import { Button, useTheme, useMediaQuery } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import React from "react";

const BackBtn = ({ to }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Button
      onClick={() => {
        if (to) {
          navigate(to);
        } else {
          navigate(-1);
        }
      }}
      size="large"
      startIcon={<NavigateBeforeIcon />}
      sx={{ position: "absolute", top: 16, left: 16 }}
    >
      Back
    </Button>
  );
};

export default BackBtn;
