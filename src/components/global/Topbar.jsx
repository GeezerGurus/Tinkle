import { useContext } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Typography,
  ButtonGroup,
  Button,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Add } from "@mui/icons-material";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{ width: "100%", height: "78px" }}
    >
      {/* header */}
      <Box
        display="flex"
        sx={{
          width: "166px",
          height: "48px",
        }}
      >
        <Typography variant="h2" sx={{ fontSize: "32px" }}>
          Dashboard
        </Typography>
      </Box>
      {/* ICONS */}
      <Box display="flex">
        <ButtonGroup
          sx={{
            width: "204px",
            height: "40px",
            gap: "16px",
          }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              width: "97px",
              height: "38px",
              textTransform: "capitalize",
              background: "#000000",
              borderRadius: "8px",
              padding: "14px, 24px, 14px, 24px",
              fontSize: "16px",
              lineHeight: "24px ",
            }}
          >
            Record
          </Button>
          <IconButton size="large">
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton size="large">
            <PersonOutlinedIcon />
          </IconButton>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Topbar;
