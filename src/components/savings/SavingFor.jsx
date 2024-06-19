import React, { useState } from "react";
import {
  Paper,
  Button,
  Box,
  Typography,
  Grid,
  useTheme,
  styled,
  Modal,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../../theme";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import SchoolIcon from "@mui/icons-material/School";
import PaymentsIcon from "@mui/icons-material/Payments";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import WineBarIcon from "@mui/icons-material/WineBar";
import { Translate } from "@mui/icons-material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CreateGoal from "./CreateGoal";
import EditGoal from "./EditGoal";

const GridBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  height: "108px",
}));

const GridItem = ({ bg, icon, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid item xs={3}>
      <GridBox>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: "50%",
            backgroundColor: bg,
            "&:hover": {
              backgroundColor: "grey",
            },
          }}
        >
          {icon &&
            React.cloneElement(icon, {
              sx: {
                width: "80px",
                height: "80px",
                color: "white",
                "&:hover": {
                  color: bg,
                },
              },
            })}
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <CreateGoal
              iconF={icon}
              bgColor={bg}
              name={name}
              onClose={() => setOpen(false)}
            />
          </Box>
        </Modal>
        <Typography variant="text2">{name}</Typography>
      </GridBox>
    </Grid>
  );
};
export const SavingFor = ({ onClose }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper
      sx={{
        width: "832px",
        height: "607px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: "8px",
      }}
    >
      {/* Upper Section */}
      <Typography variant="title3" sx={{ fontWeight: "500" }}>
        What are you Saving for?
      </Typography>
      <CloseIcon
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          margin: "16px",
          color: "black",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          "&:hover": {
            color: "white",
            backgroundColor: "black",
          },
          "&:active": {
            color: "white",
            backgroundColor: "grey",
          },
        }}
      />
      {/* Middle Section */}
      <Box
        sx={{
          width: "251px",
          height: "106px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Name"
          variant="standard"
          color="secondary"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{
            width: "251px",
            height: "44px",
          }}
        >
          Create
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <CreateGoal onClose={handleClose} name={name} />
          </Box>
        </Modal>
      </Box>
      {/* Bottom Section */}
      <Typography variant="title3" sx={{ fontWeight: "500" }}>
        Some things people save for:
      </Typography>
      <Box
        sx={{
          width: "691px",
          height: "253px",
        }}
      >
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <GridItem name="New Home" bg="orange" icon={<HomeIcon />} />
          <GridItem
            name="New Vehicle"
            bg="lightblue"
            icon={<DirectionsCarIcon />}
          />
          <GridItem
            name="Holiday Trip"
            bg="lightgreen"
            icon={<ConnectingAirportsIcon />}
          />
          <GridItem name="Education" bg="blue" icon={<SchoolIcon />} />
          <GridItem
            name="Emergency Fund"
            bg="magenta"
            icon={<PaymentsIcon />}
          />
          <GridItem
            name="Health Care"
            bg="red"
            icon={<HealthAndSafetyIcon />}
          />
          <GridItem name="Fine Dining" bg="yellow" icon={<WineBarIcon />} />
          <GridItem name="Charity" bg="lightblue" icon={<CardGiftcardIcon />} />
        </Grid>
      </Box>
    </Paper>
  );
};

export default SavingFor;
