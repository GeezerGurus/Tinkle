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
  colors,
} from "@mui/material";
import { tokens } from "../../theme";
import CreateGoal from "./CreateGoal";
import { CategoryIcons } from "../utils";

const GridItem = ({ bg, icon, name, refresh }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const IconComponent = CategoryIcons[icon];
  return (
    <Grid item sm={6} md={3} lg={3}>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          width: isSmallerScreen ? "110px" : "145px",
          height: isSmallerScreen ? "90px" : "124px",
          
          border: `1px solid ${colors.panel.panelBorder}`,
          borderRadius: "8px",
        }}
      >
        <Button onClick={() => setOpen(true)}>
        
            {IconComponent && (
              <IconComponent
                sx={{
                  width: isSmallerScreen ? "36px" : "56px",
                  height: isSmallerScreen ? "36px" : "56px",
                  color: bg,
                }}
              />)}
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
              <CreateGoal refresh={refresh} onClose={handleClose} name={name} />
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
            <Typography variant="body2" refresh={refresh} onClose={handleClose}>Cancel</Typography>
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
        sx={{ marginTop: isSmallerScreen ? "5px" : isMediumScreen ? "20px" : "0px" }}
      >
        <GridItem
          refresh={refresh}
          name="New Home"
          bg="orange"
          icon={"Home"}
        />
        <GridItem
          refresh={refresh}
          name="New Vehicle"
          bg="lightblue"
          icon={"Car"}
        />
        <GridItem
          refresh={refresh}
          name="Holiday Trip"
          bg="lightgreen"
          icon={"Plane"}
        />
        <GridItem
          refresh={refresh}
          name="Education"
          bg="blue"
          icon={"School"}
        />
        <GridItem
          refresh={refresh}
          name="Emergency Fund"
          bg="magenta"
          icon={"Cash"}
        />
        <GridItem
          refresh={refresh}
          name="Health Care"
          bg="red"
          icon={"LocalHospital"}
        />
        <GridItem
          refresh={refresh}
          name="Fine Dining"
          bg="yellow"
          icon={"Liquor"}
        />
        <GridItem
          refresh={refresh}
          name="Charity"
          bg="lightblue"
          icon={"GiftCard"}
        />
      </Grid>
    </Paper>
  );
};

export default SavingFor;
