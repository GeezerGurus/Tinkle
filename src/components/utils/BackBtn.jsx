import { Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import React from "react";

const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      size="large"
      startIcon={<NavigateBeforeIcon />}
    >
      Back
    </Button>
  );
};

export default BackBtn;