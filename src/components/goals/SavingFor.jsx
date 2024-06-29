import React, { useState } from "react";
import {
  Paper,
  Button,
  Box,
  Typography,
  Grid,
  useTheme,
  Modal,
  Stack,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import SchoolIcon from "@mui/icons-material/School";
import PaymentsIcon from "@mui/icons-material/Payments";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import WineBarIcon from "@mui/icons-material/WineBar";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CreateGoal from "./CreateGoal";

const GridItem = ({ bg, icon, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid item>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          width: "145px",
          height: "124px",
          border: "1px solid black",
          borderRadius: "8px",
        }}
      >
        <Button onClick={() => setOpen(true)}>
          {icon &&
            React.cloneElement(icon, {
              sx: {
                width: "56px",
                height: "56px",
                color: bg,
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
        <Typography variant="body2">{name}</Typography>
      </Stack>
    </Grid>
  );
};
export const SavingFor = ({ onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper
      sx={{
        width: "814px",
        height: "556px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: "8px",
        padding: "16px 56px",
      }}
    >
      {/* Upper Section */}
      <Typography variant="h4">What are you Saving for?</Typography>

      {/* Middle Section */}
      <Box
        sx={{
          width: "284px",
          height: "116px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Name"
          placeholder="Enter a name"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Create and Cancel Buttons */}
        <Box
          sx={{
            width: "100%",
            height: "44px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Create Button */}
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            sx={{
              width: "136px",
              height: "44px",
              backgroundColor: colors.purple[600],
              "&:hover": {
                backgroundColor: colors.purple[200],
              },
              textTransform: "none",
            }}
          >
            <Typography variant="body2">Create</Typography>
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
          {/* Cancel Button */}
          <Button
            onClick={onClose}
            sx={{
              width: "136px",
              height: "44px",
              backgroundColor: colors.purple[200],
              textTransform: "none",
            }}
          >
            <Typography variant="body2">Cancel</Typography>
          </Button>
        </Box>
      </Box>
      {/* Bottom Section */}
      <Typography variant="h6">Some things people save for:</Typography>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={2}
        columnSpacing={3}
      >
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
        <GridItem name="Emergency Fund" bg="magenta" icon={<PaymentsIcon />} />
        <GridItem name="Health Care" bg="red" icon={<HealthAndSafetyIcon />} />
        <GridItem name="Fine Dining" bg="yellow" icon={<WineBarIcon />} />
        <GridItem name="Charity" bg="lightblue" icon={<CardGiftcardIcon />} />
      </Grid>
    </Paper>
  );
};

export default SavingFor;
