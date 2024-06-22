import React from "react";
import {
  IconButton,
  Box,
  Typography,
  Menu,
  MenuItem,
  Paper,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";

export const Balancecom = ({ Icon, Title, Amount, BgColor }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 0 0 24px",
        backgroundColor: BgColor,
        width: "210px",
        height: "211px",
        borderRadius: "16px",
      }}
    >
      {/* Icon  */}
      <Box
        sx={{
          display: "flex",
          width: "64px",
          height: "64px",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
      >
        <Icon
          sx={{
            fontSize: "40px",
            color: colors.purple[600],
          }}
        />
      </Box>

      {/* Menu  */}
      <Box sx={{ position: "absolute", top: 3, right: 3 }}>
        <IconButton
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon
            sx={{
              fontSize: "32px",
            }}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
        </Menu>
      </Box>

      <Box>
        {/* Title  */}
        <Typography variant="h6" gutterBottom>
          {Title}
        </Typography>
        {/* Amount  */}
        <Typography variant="h4" gutterBottom>
          {Amount}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Balancecom;
