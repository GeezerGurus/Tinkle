import React, { useState } from "react";
import { Box, Typography, Button, Modal, useTheme, Stack } from "@mui/material";
import GoalDetails from "./GoalDetails";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { tokens } from "../../theme";
import EditGoal from "./EditGoal";
import { ConfirmModal, Progress } from "../utils";

export const SavingItem = ({
  name,
  saved,
  goal,
  icon,
  bgColor,
  date,
  state,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const percentage = goal > 0 ? (saved / goal) * 100 : 0;
  const [modal, setModal] = useState("");

  const handleClose = () => {
    setOpenModal(false);
  };

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
          padding: "24px 128px",
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
              {icon &&
                React.cloneElement(icon, {
                  sx: {
                    width: "48px",
                    height: "48px",
                    backgroundColor: bgColor,
                    borderRadius: "50%",
                    color: "white",
                  },
                })}

              {/* Texts */}
              <Stack>
                <Typography variant="body1">{name}</Typography>
                <Typography variant="body4">{date}</Typography>
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
                    sx={{ width: "28px", height: "28px" }}
                  />
                </IconButton>
              ) : state === "paused" ? (
                <IconButton
                  onClick={() => {
                    setModal("play");
                    setOpenModal(true);
                  }}
                >
                  <PlayCircleOutlineIcon
                    sx={{ width: "28px", height: "28px" }}
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
                <BorderColorIcon sx={{ width: "28px", height: "28px" }} />
              </IconButton>

              {/* Delete Button */}
              <IconButton
                onClick={() => {
                  setModal("delete");
                  setOpenModal(true);
                }}
              >
                <DeleteIcon sx={{ width: "28px", height: "28px" }} />
              </IconButton>
            </Stack>
          </Box>

          {/* Middle Section */}
          <Progress
            percent={percentage}
            height={32}
            showPercentText={true}
            bgColor={state === "reached" ? colors.vibrant.yellow : ""}
          />

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
              <Typography variant="body2">Saved: </Typography>
              <Typography variant="body3">{saved} MMK</Typography>
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
              <Typography variant="body2">See Detail</Typography>
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
                <GoalDetails onClose={handleClose} saved={saved} goal={goal} />
              </Box>
            </Modal>

            {/* Goal */}
            <Stack direction={"row"} gap={1}>
              <Typography variant="body2">Goal: </Typography>
              <Typography variant="body3">{goal} MMK</Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
      {/* Edit Modal  */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
              onClose={() => setOpenModal(false)}
              savedAlready={saved}
              goal={goal}
              name={name}
              iconF={icon}
              bgColor={bgColor}
              dateF={date}
            />
          ) : modal === "delete" ? (
            <ConfirmModal
              highlight={"Delete"}
              color={colors.extra.red_accent}
              promptText={"Do you really want to Delete?"}
              description={"This action will delete your whole Saving plan."}
              onClose={handleClose}
            />
          ) : modal === "paused" ? (
            <ConfirmModal
              highlight={"Pause"}
              color={colors.purple[600]}
              promptText={"Do you really want to Pause?"}
              description={"This action will pause your Saving plan."}
              onClose={handleClose}
            />
          ) : (
            <ConfirmModal
              highlight={"Resume"}
              color={colors.green[500]}
              promptText={"Do you want to Resume your goal?"}
              description={"This action will set your Saving plan as reached."}
              onClose={handleClose}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default SavingItem;
