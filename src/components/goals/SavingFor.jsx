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
  useMediaQuery,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import CreateGoal from "./CreateGoal";
import { CategoryIcons } from "../utils";

const GridItem = ({ bg, icon, name, refresh }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const IconComponent = CategoryIcons[icon];
  return (
    <Grid item xs={6} sm={4} md={3} lg={3}>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          width: isSmallerScreen
            ? "110px"
            : isSmall
            ? "100%"
            : isMediumScreen
            ? "130px"
            : "145px",
          height: isSmallerScreen
            ? "90px"
            : isSmall
            ? "90px"
            : isMediumScreen
            ? "90px"
            : "124px",
          backgroundColor: colors.panel.panel1,
          border: `1px solid ${colors.panel.panelBorder}`,
          borderRadius: "8px",
        }}
      >
        <Button onClick={() => setOpen(true)}>
          {IconComponent && (
            <IconComponent
              sx={{
                width: isMediumScreen ? "36px" : "56px",
                height: isMediumScreen ? "36px" : "56px",
                color: bg,
              }}
            />
          )}
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
              bg={bg}
              name={name}
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
        padding: isMediumScreen ? "8px 28px" : "16px 56px",
        backgroundColor: colors.backGround,
        border: `1px solid ${colors.panel.panelBorder}`,
      }}
    >
      <Typography variant={isMediumScreen ? "h6" : "h4"}>
        What are you Saving for?
      </Typography>
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
              <CreateGoal refresh={refresh} onClose={onClose} name={name} />
            </Box>
          </Modal>
          <Button
            onClick={onClose}
            sx={{
              width: "136px",
              height: "44px",
              backgroundColor: colors.purple[200],
              textTransform: "none",
            }}
          >
            <Typography variant="body2" onClose={handleClose}>
              Cancel
            </Typography>
          </Button>
        </Box>
      </Box>
      <Typography
        variant={isMediumScreen ? "body1" : "h6"}
        sx={{
          marginTop: isSmallerScreen ? "10px" : isMediumScreen ? "20px" : "0px",
        }}
      >
        Some things people save for:
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={2}
        columnSpacing={3}
        sx={{
          marginTop: isSmallerScreen ? "5px" : isMediumScreen ? "20px" : "0px",
        }}
      >
        <GridItem name="New Home" bg="orange" icon={"Home"} />
        <GridItem name="New Vehicle" bg="lightblue" icon={"Car"} />
        <GridItem name="Holiday Trip" bg="lightgreen" icon={"Plane"} />
        <GridItem name="Education" bg="blue" icon={"School"} />
        <GridItem name="Emergency Fund" bg="magenta" icon={"Cash"} />
        <GridItem name="Health Care" bg="red" icon={"LocalHospital"} />
        <GridItem name="Fine Dining" bg="yellow" icon={"Liquor"} />
        <GridItem name="Charity" bg="lightblue" icon={"GiftCard"} />
      </Grid>
    </Paper>
  );
};

export default SavingFor;
