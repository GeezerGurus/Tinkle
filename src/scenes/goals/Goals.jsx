import { React, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  useTheme,
  Stack,
  useMediaQuery
} from "@mui/material";
import { Active, Paused, Reached } from "../../components/goals";
import { SpeedDial } from "../../components/utils";
import SavingFor from "../../components/goals/SavingFor";
import { tokens } from "../../theme";

export const Goals = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState("active");
  //for responsive
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Sub Title Change Handle

  // Rendering the Pages
  const renderPage = () => {
    if (page === "active") {
      return <Active isSmallScreen = {isMediumScreen} />;
    } else if (page === "paused") {
      return <Paused isSmallScreen = {isMediumScreen} />;
    } else {
      return <Reached isSmallScreen = {isMediumScreen} />;
    }
  };
  return (
    // Container
    <Box
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        gap: "24px",
      }}
    >
      {/* Speed Dial */}
      <SpeedDial modal={<SavingFor />} />

      {/* Nav Buttons */}
      <ButtonGroup
        variant="contained"
        sx={{ borderRadius: "16px", border: `1px solid ${colors.purple[600]}` }}
      >
        {/* Active */}
        <Button
          value="active"
          onClick={() => setPage("active")}
          sx={{
            borderRadius: "16px",
            width: isMediumScreen ? "120.67px" : "245.67px",
            height: "37px",
            backgroundColor: page === "active" ? colors.purple[600] : "white",
            color: page === "active" ? "white" : "black",
            "&:hover": {
              backgroundColor: colors.purple[200],
            },
          }}
        >
          <Typography variant="body2">Active</Typography>
        </Button>
        {/* Paused */}
        <Button
          value="paused"
          onClick={() => setPage("paused")}
          sx={{
            width: isMediumScreen ? "120.67px" : "245.67px",
            height: "37px",
            backgroundColor: page === "paused" ? colors.purple[600] : "white",
            color: page === "paused" ? "white" : "black",
            "&:hover": {
              backgroundColor: colors.purple[200],
            },
          }}
        >
          <Typography variant="body2">Paused</Typography>
        </Button>
        {/* Reached */}
        <Button
          value="reached"
          onClick={() => setPage("reached")}
          sx={{
            borderRadius: "16px",
            width: isMediumScreen ? "120.67px" : "245.67px",
            height: "37px",
            backgroundColor: page === "reached" ? colors.purple[600] : "white",
            color: page === "reached" ? "white" : "black",
            "&:hover": {
              backgroundColor: colors.purple[200],
            },
          }}
        >
          <Typography variant="body2">Reached</Typography>
        </Button>
      </ButtonGroup>

      {/* Sub Title */}
      <Stack alignItems={"center"}>
        <Box
          sx={{
            width: "120px",
            height: "8px",
            backgroundColor:
              page === "active"
                ? colors.vibrant.green
                : page === "paused"
                ? colors.extra.grey
                : colors.vibrant.yellow,
          }}
        />
        <Typography variant="h6">
          {page.charAt(0).toUpperCase() + page.slice(1)} Saving
        </Typography>
      </Stack>

      {/* Contents */}
      {renderPage()}
    </Box>
  );
};

export default Goals;
