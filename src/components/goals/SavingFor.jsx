import React, { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Box,
  Typography,
  Grid,
  useTheme,
  Modal,
  Stack,
  useMediaQuery,
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
import { postGoal } from "../../api/goals";
import { enqueueSnackbar } from "notistack";

const GridItem = ({ bg, icon, name, refresh }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Grid item sm={6} md={3} lg={3}>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          width: isSmallerScreen ? "110px" : "145px",
          height: isSmallerScreen ? "90px" : "124px",
          border: "1px solid black",
          borderRadius: "8px",
        }}
      >
        <Button onClick={() => setOpen(true)}>
          {icon &&
            React.cloneElement(icon, {
              sx: {
                width: isSmallerScreen ? "36px" : "56px",
                height: isSmallerScreen ? "36px" : "56px",
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
              refresh={refresh}
              onClose={() => setOpen(false)}
            />
          </Box>
        </Modal>
        <Typography variant={isSmallerScreen ? "body4" : "body2"}>
          {name}
        </Typography>
      </Stack>
    </Grid>
  );
};
export const SavingFor = ({ onClose, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    refresh();
  };

  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Paper
      sx={{
        width: isSmallerScreen ? "390px" : isMediumScreen ? "450px" : "814px",
        height: isMediumScreen ? "auto" : "556px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: "8px",
        padding: "16px 56px",
      }}
    >
      {/* Upper Section */}
      <Typography variant={isMediumScreen ? "h6" : "h4"}>
        What are you Saving for?
      </Typography>

      {/* Middle Section */}
      <Box
        sx={{
          width: "284px",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: isSmallerScreen ? "10px" : isMediumScreen ? "20px" : "0px",
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
            marginTop: isSmallerScreen
              ? "10px"
              : isMediumScreen
              ? "20px"
              : "10px",
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
              <CreateGoal refresh={refresh} onClose={handleClose} name={name} />
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
      {/* <Typography
        variant={isMediumScreen ? "body1" : "h6"}
        sx={{
          marginTop: isSmallerScreen ? "10px" : isMediumScreen ? "20px" : "0px",
        }}
      >
        Some things people save for:
      </Typography> */}

      {/* <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={2}
        columnSpacing={3}
        sx={{ marginTop: isSmallerScreen? "5px":isMediumScreen ? "20px" : "0px"}}
      >
        <GridItem refresh={refresh} name="New Home" bg="orange" icon={<HomeIcon />} />
        <GridItem refresh={refresh}
          name="New Vehicle"
          bg="lightblue"
          icon={<DirectionsCarIcon />}
        />
        <GridItem refresh={refresh}
          name="Holiday Trip"
          bg="lightgreen"
          icon={<ConnectingAirportsIcon />}
        />
        <GridItem refresh={refresh} name="Education" bg="blue" icon={<SchoolIcon />} />
        <GridItem refresh={refresh} name="Emergency Fund" bg="magenta" icon={<PaymentsIcon />} />
        <GridItem refresh={refresh} name="Health Care" bg="red" icon={<HealthAndSafetyIcon />} />
        <GridItem refresh={refresh} name="Fine Dining" bg="yellow" icon={<WineBarIcon />} />
        <GridItem refresh={refresh} name="Charity" bg="lightblue" icon={<CardGiftcardIcon />} />
      </Grid> */}
    </Paper>
  );
};

export default SavingFor;
