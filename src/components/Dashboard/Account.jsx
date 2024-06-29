import React, { useState } from "react";
import {
  IconButton,
  Box,
  Typography,
  Menu,
  MenuItem,
  Paper,
  useTheme,
  Modal,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import EditAccount from "./EditAccount";

export const Account = ({ Icon, Title, Amount, BgColor }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
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
          <MenuItem
            onClick={() => {
              handleClose();
              setOpenModal(true);
            }}
          >
            Edit
          </MenuItem>
        </Menu>
      </Box>

      <Box>
        {/* Title  */}
        <Typography variant="h6" gutterBottom>
          {Title}
        </Typography>
        {/* Amount  */}
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Typography variant="h4" gutterBottom>
            {Amount}
          </Typography>
          <Typography variant="body1">MMK</Typography>
        </Stack>
      </Box>
      {/* Edit modal  */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <EditAccount
            name={Title}
            balance={Amount}
            Type={<Icon />}
            onClose={() => setOpenModal(false)}
          />
        </Box>
      </Modal>
    </Paper>
  );
};

export default Account;
