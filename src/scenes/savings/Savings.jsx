import { React, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  styled,
  Modal,
  Typography,
} from "@mui/material";
import { Active, Paused, Reached } from "../../components/savings";
import { SpeedDial } from "../../components/utils";
import SavingFor from "../../components/savings/SavingFor";

const SubTitle = ({ page }) => {
  if (page === "active") {
    return (
      <Typography variant="title2" sx={{ lineHeight: "29.05px" }}>
        Active Saving
      </Typography>
    );
  } else if (page === "paused") {
    return (
      <Typography variant="title2" sx={{ lineHeight: "29.05px" }}>
        Paused Saving
      </Typography>
    );
  } else {
    return (
      <Typography variant="title2" sx={{ lineHeight: "29.05px" }}>
        Reached Saving
      </Typography>
    );
  }
};

export const Savings = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("active");

  // Sub Title Change Handle

  // Rendering the Pages
  const renderPage = () => {
    if (page === "active") {
      return <Active />;
    } else if (page === "paused") {
      return <Paused />;
    } else {
      return <Reached />;
    }
  };
  return (
    // Container
    <Box
      sx={{
        backgroundColor: "white",
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
      }}
    >
      {/* Speed Dial */}
      <SpeedDial page={<SavingFor />} />
      {/* Nav Buttons */}
      <ButtonGroup variant="contained" sx={{ backgroundColor: "black" }}>
        {/* Active */}
        <Button
          value="active"
          onClick={() => setPage("active")}
          sx={{
            width: "245.67px",
            height: "37px",
            backgroundColor: page === "active" ? "black" : "white",
            color: page === "active" ? "white" : "black",
            "&:hover": {
              backgroundColor: page === "active" ? "grey" : "darkgrey",
            },
          }}
        >
          Active
        </Button>
        {/* Paused */}
        <Button
          value="paused"
          onClick={() => setPage("paused")}
          sx={{
            width: "245.67px",
            height: "37px",
            backgroundColor: page === "paused" ? "black" : "white",
            color: page === "paused" ? "white" : "black",
            "&:hover": {
              backgroundColor: page === "paused" ? "grey" : "darkgrey",
            },
          }}
        >
          Paused
        </Button>
        {/* Reached */}
        <Button
          value="reached"
          onClick={() => setPage("reached")}
          sx={{
            width: "245.67px",
            height: "37px",
            backgroundColor: page === "reached" ? "black" : "white",
            color: page === "reached" ? "white" : "black",
            "&:hover": {
              backgroundColor: page === "reached" ? "grey" : "darkgrey",
            },
          }}
        >
          Reached
        </Button>
      </ButtonGroup>
      {/* Sub Title */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "190px",
          height: "42px",
        }}
      >
        <Box
          sx={{ width: "120px", height: "8px", backgroundColor: "#00F79E" }}
        />
        <SubTitle page={page} />
      </Box>
      {/* Contents */}
      {renderPage()}
    </Box>
  );
};

export default Savings;
