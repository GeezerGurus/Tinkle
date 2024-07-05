import { Button ,useTheme,useMediaQuery} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import React from "react";

const BackBtn = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Button
      onClick={() => navigate(-1)}
      size="large"
      startIcon={<NavigateBeforeIcon />}
      sx={{ position: "absolute", top: 16, left: 16 }}
    >
      Back
    </Button>
  );
};

export default BackBtn;
