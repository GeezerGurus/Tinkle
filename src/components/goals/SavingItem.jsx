import React, { useState, useEffect } from "react";

import {
  Box,
  Typography,
  Button,
  Modal,
  useTheme,
  Stack,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import GoalDetails from "./GoalDetails";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { enqueueSnackbar } from "notistack";
import { tokens } from "../../theme";
import EditGoal from "./EditGoal";
import { ConfirmModal } from "../utils";
import { deleteGoal, patchGoal } from "../../api/goals";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const Progress = ({ percent,state, height, showPercentText }) => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
        backgroundColor: "#e0e0df",
        borderRadius: "5px",
        overflow: "hidden"
      }}
    >
      <Box
        sx={{
          width: `${percent}%`,
          height: "100%",
          backgroundColor: state === "reached" ? colors.vibrant.yellow : colors.green[300],
          transition: "width 0.3s ease-in-out"
        }}
      />
      {showPercentText && (
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black"
          }}
        >
          {percent}%
        </Typography>
      )}
    </Box>
  );
};

export const SavingItem = ({
  id,
  name,
  goal,
  saved,
  description,
  createdAt,
  updatedAt,
  refresh,
  date,
  state,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const percentage = goal > 0 ? ((saved / goal) * 100).toFixed(2) : 0;
  const formattedDate = formatDate(date);

  // Update state to "reached" when percentage reaches 100%
  useEffect(() => {
    if (percentage >= 100 && state !== "reached") {
      const reachedStatus = {
        state: "reached",
      };
      patchGoal(id, reachedStatus)
        .then(() => {
          refresh();
          enqueueSnackbar("Goal reached!", { variant: "success" });
        })
        .catch((error) => {
          console.error("Error reaching goal:", error);
          
        });
    }
  }, [percentage, state, id, refresh]);

  const handleChange = async () => {
    const newStatus = {
      state: modal,
    };

    await patchGoal(id, newStatus);
    refresh();
    
    setOpenModal(false); // Close the modal after handling the change
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {/* Main Box */}
      <Box
        sx={{
          borderRadius: "16px",
          border: state === "reached" && "1px solid black",
          width: "100%",
          minHeight: "176px",
          backgroundColor:
            state === "active"
              ? colors.purple[100]
              : state === "paused"
              ? colors.extra.grey
              : "",
          padding: isMediumScreen ? "20px" : "24px 128px",
        }}
      >
        {/* Inner Box */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Upper Section */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Left Side */}
            <Stack direction={"row"} gap={1}>
              <Stack>
                <Typography variant={isMediumScreen ? "body2" : "body1"}>
                  {name}
                </Typography>
                <Typography variant="body4">{formattedDate}</Typography>
              </Stack>
            </Stack>

            {/* Right Side */}
            <Stack direction={"row"}>
              {/* Pause Button */}
              {state === "active" ? (
                <IconButton
                  onClick={() => {
                    setModal("paused");
                    setOpenModal(true);
                  }}
                >
                  <PauseCircleOutlineIcon
                    sx={{
                      width: isMediumScreen ? "20px" : "28px",
                      height: isMediumScreen ? "20px" : "28px",
                    }}
                  />
                </IconButton>
              ) : state === "paused" ? (
                <IconButton
                  onClick={() => {
                    setModal("active");
                    setOpenModal(true);
                  }}
                >
                  <PlayCircleOutlineIcon
                    sx={{
                      width: isMediumScreen ? "20px" : "28px",
                      height: isMediumScreen ? "20px" : "28px",
                    }}
                  />
                </IconButton>
              ) : (
                ""
              )}

              {/* Edit Button */}
              <IconButton
                onClick={() => {
                  setModal("edit");
                  setOpenModal(true);
                }}
              >
                <BorderColorIcon
                  sx={{
                    width: isMediumScreen ? "20px" : "28px",
                    height: isMediumScreen ? "20px" : "28px",
                  }}
                />
              </IconButton>

              {/* Delete Button */}
              <IconButton
                onClick={() => {
                  setModal("delete");
                  setOpenModal(true);
                }}
              >
                <DeleteIcon
                  sx={{
                    width: isMediumScreen ? "20px" : "28px",
                    height: isMediumScreen ? "20px" : "28px",
                  }}
                />
              </IconButton>
            </Stack>
          </Box>

          {/* Middle Section */}
          <Progress percent={percentage} height={32} state={state} showPercentText={true} />

          {/* Bottom Section */}
          <Box
            sx={{
              width: "100%",
              height: "21px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Saved */}
            <Stack direction={"row"} gap={1}>
              <Typography variant={isSmallScreen ? "body4" : "body2"}>
                Saved:{" "}
              </Typography>
              <Typography variant={isSmallScreen ? "body4" : "body3"}>
                {saved>=goal? goal:saved} MMK
              </Typography>
            </Stack>

            {/* Tap to see details */}
            <Button
              onClick={() => setOpen(true)}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": { backgroundColor: colors.purple[300] },
              }}
            >
              <Typography variant={isSmallScreen ? "body4" : "body2"}>
                See Detail
              </Typography>
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
                <GoalDetails
                  onClose={() => setOpen(false)}
                  saved={saved}
                  goal={goal}
                  id={id}
                  refresh={refresh}
                />
              </Box>
            </Modal>

            {/* Goal */}
            <Stack direction={"row"} gap={1}>
              <Typography variant={isSmallScreen ? "body4" : "body2"}>
                Goal:{" "}
              </Typography>
              <Typography variant={isSmallScreen ? "body4" : "body3"}>
                {goal} MMK
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
      {/* Edit Modal */}
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {modal === "edit" ? (
            <EditGoal
              onClose={handleClose}
              id={id}
              savedAlready={saved}
              goal={goal}
              name={name}
              dateF={date}
              description={description}
              refresh={refresh}
            />
          ) : modal === "delete" ? (
            <ConfirmModal
              onClick={async () => {
                await deleteGoal(id);
                refresh();
                handleClose();
              }}
              highlight={"Delete"}
              snackbarText={"Goal deleted!"}
              snackbarColor={"error"}
              color={colors.extra.red_accent}
              promptText={"Do you really want to Delete?"}
              description={"This action will delete your whole Saving plan."}
              refresh={refresh}
              onClose={handleClose}
              
            />
          ) : modal === "paused" ? (
            <ConfirmModal
              highlight={"Pause"}
              color={colors.purple[600]}
              snackbarText={"Goal Paused"}
              snackbarColor={"success"}
              promptText={"Do you really want to Pause?"}
              description={"This action will pause your Saving plan."}
              onClose={handleClose}
              onClick={handleChange}
              refresh={refresh}
            />
          ) : (
            <ConfirmModal
              highlight={"Resume"}
              color={colors.green[500]}
              snackbarText={"Resumed!"}
              
              snackbarColor={"success"}
              refresh={refresh}
              promptText={"Do you want to Resume your goal?"}
              description={"This action will set your Saving plan as active."}
              onClose={handleClose}
              onClick={handleChange}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default SavingItem;
