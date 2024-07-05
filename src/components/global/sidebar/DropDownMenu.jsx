import React, { useContext } from "react";
import {
  Box,
  ListItemIcon,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { ArrowForwardIosSharp as ArrowForwardIosSharpIcon } from "@mui/icons-material";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { tokens, ColorModeContext } from "../../../theme";
import DropDownItems from "./DropDownItems";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderRadius: "8px",
  "&::before": {
    display: "none",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  marginBottom: theme.spacing(1),
  border: "none",
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#8884DC" }} />
    }
    {...props}
  />
))(
  ({
    theme,
    colors = tokens(theme.palette.mode),
    colorMode = useContext(ColorModeContext),
  }) => ({
    borderRadius: "8px",
    backgroundColor:
      theme.palette.mode === "dark" ? colorMode.DarkMode() : "white",
    flexDirection: "row",
    "&:hover": {
      background: colors.purple[100],
      borderRadius: "8px",
    },
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
  })
);

export const DropDownMenu = ({
  page,
  text,
  open,
  icon,
  navigate,
  DropdownClick,
  ChangePage,
  expanded,
  content,
  setOpen,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Accordion expanded={expanded === page} onChange={ChangePage(page)}>
      <AccordionSummary>
        {/* Icon */}
        <ListItemIcon sx={{ ml: open ? "none" : 14 }}>{icon}</ListItemIcon>
        {/* Name */}
        <Typography variant="body2" sx={{ opacity: open ? 1 : 0 }}>
          {text}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            width: isSmallScreen ? "200px" : "240px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DropDownItems
            content={content}
            Navigation={navigate}
            onClick={DropdownClick}
            setOpen={setOpen}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default DropDownMenu;