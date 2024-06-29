import React from "react";
import { IconButton, Tooltip, useTheme } from "@mui/material";

import { tokens } from "../../../theme";

// Closed Side bar Menu Items component

export const CloseSideItems = ({ title, icon, dropdown, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Tooltip title={title} placement="right" arrow>
      {!dropdown && (
        <IconButton
          onClick={() => {
            onClick();
          }}
          sx={{
            height: "46.4px",
            width: "46.4px",
            ml: 11 + "6px",
            "&:hover": {
              backgroundColor: colors.purple[100],
            },
          }}
        >
          {icon}
        </IconButton>
      )}
      {dropdown && (
        <IconButton
          onClick={() => {
            onClick();
          }}
          sx={{
            height: "46.4px",
            width: "46.4px",

            ml: 11 + "6px",
            "&:hover": {
              backgroundColor: colors.purple[100],
            },
          }}
        >
          {icon}
        </IconButton>
      )}
    </Tooltip>
  );
};

export default CloseSideItems;
