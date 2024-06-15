import { styled, Button } from "@mui/material";

export const NavButton = styled(Button)(({ theme }) => ({
  width: "160px",
  height: "30px",
  backgroundColor: "white",
  color: "black",
  "&:hover": {
    backgroundColor: theme.palette.neutral.dark,
    color: "white",
  },
  border: "1.5px solid black",
  fontWeight: "600",
  fontSize: "14px",
}));

export default NavButton;
