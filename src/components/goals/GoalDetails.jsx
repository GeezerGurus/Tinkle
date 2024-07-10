import React, { useState } from "react";
import {
  Paper,
  Box,
  IconButton,
  Typography,
  Button,
  Modal,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import AddSaveAmount from "./AddSaveAmount";
import { tokens } from "../../theme";
import ConfirmModal from "../utils/ConfirmModal";
import { patchGoal } from "../../api/goals";
import { enqueueSnackbar } from "notistack";

function CircularProgressBar(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: isSmallScreen ? "246px" : "346px",
        height: isSmallScreen ? "246px" : "346px",
      }}
    >
      {/* Background CircularProgress */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={isSmallScreen ? 235 : 335}
        thickness={1.5}
        sx={{
          color: colors.extra.light_grey, // Background color
          position: "absolute",
        }}
      />
      {/* Fore CircularProgress */}
      <CircularProgress
        variant="determinate"
        {...props}
        thickness={2.5}
        size={isSmallScreen ? "246px" : "346px"}
        sx={{
          color: colors.purple[600],
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
            transition: "stroke-dashoffset 0.5s ease 0s",
          },
        }}
      />

      {/* Inner text */}
      <Stack
        alignItems={"center"}
        gap={isSmallScreen ? 0 : 3}
        sx={{
          position: "absolute",
        }}
      >
        {/* Percentage */}
        <Typography
          variant={isSmallScreen ? "h2" : "h1"}
          color={colors.purple[600]}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
        {/* Ratio */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">
            {props.saved} / {props.goal}
          </Typography>
          <Typography variant="h6">MMK</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export const GoalDetails = ({ onClose, saved, goal, id, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modal, setModal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const percentage = goal > 0 ? (saved / goal) * 100 : 0;

  const handleChange = async () => {
    const newStatus = {
      state: modal,
    };
    await patchGoal(id, newStatus);
    refresh();
    setOpenModal(false); // Close the modal after handling the change
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Paper
      sx={{
        width: isSmallerScreen ? "350px" : isSmallScreen ? "400px" : "766px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "32px 40px",
        alignItems: "center",
        borderRadius: "8px",
      }}
    >
      {/* Header */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <IconButton
          onClick={() => {
            setModal("paused");
            setOpenModal(true);
          }}
        >
          <PauseCircleOutlineIcon sx={{ width: "40px", height: "40px" }} />
        </IconButton>
        <Typography variant="h4">Goal</Typography>
        <IconButton
          onClick={() => {
            setModal("reached");
            setOpenModal(true);
          }}
        >
          <FlagOutlinedIcon sx={{ width: "40px", height: "40px" }} />
        </IconButton>
      </Stack>
      {/* Progress Bar */}
      <CircularProgressBar value={percentage} saved={saved} goal={goal} />
      {/* Last Week Added Amount and Estimation */}
      {/* <Stack alignItems={"center"}>
        <Typography variant={isSmallScreen ? "body1" : "h6"}>
          Last week added amount
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Typography variant="h5">2000</Typography>
          <Typography variant="body1">MMK</Typography>
        </Stack>

        <Typography variant={isSmallScreen ? "body1" : "h6"}>
          Estimated time to reach goal
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Typography variant="h5">20</Typography>
          <Typography variant="body1">weeks</Typography>
        </Stack>
      </Stack> */}
      {/* Buttons */}
      <Stack
        gap={isSmallScreen ? 2 : 1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
        sx={{ marginTop: isSmallScreen ? "10px" : "0px" }}
      >
        <Button
          onClick={() => {
            setModal("add");
            setOpenModal(true);
          }}
          sx={{
            width: "240px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: colors.purple[200],
            },
          }}
        >
          <Typography variant="body2">Add amount</Typography>
        </Button>

        <Button
          onClick={onClose}
          sx={{
            width: "240px",
            height: "40px",
            backgroundColor: colors.purple[200],
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          {modal === "reached" || modal === "paused" ? (
            <ConfirmModal
              highlight={modal === "paused" ? "Paused" : "Reached"}
              snackbarText={modal === "paused" ? "Paused!" : "Reached!"}
              snackbarColor={"success"}
              promptText={`Do you want to set goal as ${
                modal === "paused" ? "Paused" : "Reached"
              }?`}
              description={`This action will set your Saving plan as ${
                modal === "paused" ? "paused" : "reached"
              }.`}
              onClose={() => {
                setOpenModal(false);
              }}
              onClick={handleChange}
              refresh={refresh} // Pass handleChange for snackbar customization
            />
          ) : (
            <AddSaveAmount
              id={id}
              currentAmount={saved}
              refresh={refresh}
              onClose={() => {
                setOpenModal(false);
              }}
            />
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default GoalDetails;
