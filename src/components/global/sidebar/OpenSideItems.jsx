import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { tokens } from "../../../theme";

// Opened Side bar Menu Items component

export const OpenSideItems = ({
  path,
  open,
  icon,
  text,
  Navigation,
  theme,
  colors = tokens(theme.palette.mode),
}) => {
  return (
    <ListItemButton
      onClick={() => {
        Navigation(path);
      }}
      sx={{
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: colors.purple[100],
          borderRadius: "8px",
          width: "70%",
        },
      }}
    >
      <ListItemIcon
        sx={{
          ml: open ? "auto" : 14,
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{ variant: "body2" }}
        sx={{ opacity: open ? 1 : 0 }}
      />
    </ListItemButton>
  );
};

export default OpenSideItems;
