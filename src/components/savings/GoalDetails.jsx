import React, { useState } from "react";
import {
  Paper,
  Box,
  IconButton,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import AddSaveAmount from "./AddSaveAmount";
function CircularProgressBar(props) {
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
          color: "#D9D9D9B2", // Background color
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
          color: "#43BC63",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
            transition: "stroke-dashoffset 0.5s ease 0s",
          },
        }}
      />
      <Box
        sx={{
          width: "260.2px",
          height: "161.34px",
          top: "92.33px",
          left: "42.9px",
          bottom: "92.33px",
          right: "42.9px",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Percentage */}
        <Typography
          variant="caption"
          component="div"
          color="#43BC63"
          sx={{ fontSize: "64px" }}
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
          <Typography variant="title2" sx={{ fontWeight: "100" }}>
            {props.saved}/{props.goal}
          </Typography>
          <Typography variant="title2" sx={{ fontWeight: "100" }}>
            MMK
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export const GoalDetails = ({ onClose, saved, goal }) => {
  const [open, setOpen] = useState(false);
  const percentage = goal > 0 ? (saved / goal) * 100 : 0;

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper
      sx={{
        width: "839px",
        height: "887px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
      }}
    >
      <Box
        sx={{
          width: "807px",
          height: "855px",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            height: "39px",
          }}
        >
          {/* Pause button */}
          <IconButton>
            <PauseCircleOutlineIcon sx={{ width: "48px", height: "48px" }} />
          </IconButton>
          {/* Header */}
          <Typography variant="title3">Goal</Typography>
          {/* Close Button */}
          <CloseIcon
            onClick={onClose}
            sx={{
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
        </Box>
        {/* Middle Section */}
        {/* Progress Bar */}
        <Box
          sx={{
            width: "371px",
            height: "371px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgressBar value={percentage} saved={saved} goal={goal} />
        </Box>
        {/* Last Week Added Amount and Estimation */}
        <Box
          sx={{
            width: "325px",
            height: "160px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Last Week Added */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <Typography variant="title2" sx={{ fontWeight: "400" }}>
              Last week added amount
            </Typography>
            <Typography variant="title2">2000MMK</Typography>
          </Box>
          {/* Estimation */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <Typography variant="title2" sx={{ fontWeight: "400" }}>
              Estimated time to reach goal
            </Typography>
            <Typography variant="title2">20 week</Typography>
          </Box>
        </Box>
        {/* Bottom Section */}
        {/* Bottons */}
        <Box
          sx={{
            width: "243px",
            height: "118px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            sx={{
              width: "100%",
              height: "44px",
              backgroundColor: "#43BC63",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Add Saved Amount
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
            sx={{
              width: "100%",
              height: "44px",
              backgroundColor: "#E30000",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Set Goal as Reached
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default GoalDetails;
