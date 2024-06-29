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
} from "@mui/material";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import AddSaveAmount from "./AddSaveAmount";
import { tokens } from "../../theme";
import ConfirmModal from "../utils/ConfirmModal";

function CircularProgressBar(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "346px",
        height: "346px",
      }}
    >
      {/* Background CircularProgress */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={335}
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
        size={"346px"}
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
        gap={3}
        sx={{
          position: "absolute",
        }}
      >
        {/* Percentage */}
        <Typography variant="h1" color={colors.purple[600]}>
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

export const GoalDetails = ({ onClose, saved, goal }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modal, setModal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const percentage = goal > 0 ? (saved / goal) * 100 : 0;

  return (
    <Paper
      sx={{
        width: "766px",
        height: "785px",
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
        <IconButton>
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
      <Stack alignItems={"center"}>
        <Typography variant="h6">Last week added amount</Typography>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Typography variant="h5">2000</Typography>
          <Typography variant="body1">MMK</Typography>
        </Stack>

        <Typography variant="h6">Estimated time to reach goal</Typography>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Typography variant="h5">20</Typography>
          <Typography variant="body1">weeks</Typography>
        </Stack>
      </Stack>
      {/* Buttons */}
      <Stack gap={1} direction={"row"} justifyContent={"space-between"}>
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
          {modal === "reached" ? (
            <ConfirmModal
              color={colors.extra.yellow_accent}
              highlight="Reached"
              promptText="Do you want to set goal as Reached?"
              description="This action will set your Saving plan as reached."
              onClose={() => {
                setOpenModal(false);
              }}
            />
          ) : (
            <AddSaveAmount
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
