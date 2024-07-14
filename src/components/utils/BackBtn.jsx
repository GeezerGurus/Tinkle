import { Button, useTheme } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import React from "react";
import { tokens } from "../../theme";

const BackBtn = ({ to }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        color: colors.button.button1,
      }}
    >
      Back
    </Button>
  );
};

export default BackBtn;
