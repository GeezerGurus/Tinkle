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

      {/* Inneeree teeext  */}
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

  const [open, setOpen] = useState(false);
  const percentage = goal > 0 ? (saved / goal) * 100 : 0;

  const handleClose = () => {
    setOpen(false);
  };
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
        <IconButton>
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
          <Typography variant="body1">week</Typography>
        </Stack>
      </Stack>
      {/* Bottons */}
      <Stack gap={1} direction={"row"} justifyContent={"space-between"}>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            width: "240px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2">Add amount</Typography>
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <AddSaveAmount onClose={handleClose} />
          </Box>
        </Modal>
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
    </Paper>
  );
};

export default GoalDetails;
