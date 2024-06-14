import React from "react";
import {
  IconButton,
  Box,
  Typography,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const Balancecom = ({ Icon, Title, Amount, Color }) => {
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
        backgroundColor: "white",
        color: "black",
        width: "210px",
        height: "211px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "88px",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "64px",
            height: "64px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Color,
            borderRadius: "50%",
            margin: "24px",
          }}
        >
          <Icon
            sx={{
              fontSize: "40px",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon
              sx={{
                color: "black",
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
      </Box>

      <Box
        sx={{
          marginTop: "19px",
          marginLeft: "24px",
        }}
      >
        <Typography
          variant="title"
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            lineHeight: "30px",
          }}
        >
          {Title}
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: "19px",
          marginLeft: "24px",
          marginBottom: "30px",
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: "600",
            lineHeight: "32px",
            letterSpacing: "1%",
          }}
        >
          {Amount}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Balancecom;
