import {
  Box,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";
import { tokens } from "../../theme";

const Category = ({ icon: Icon, backgroundColor, name }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      item
      sx={{
        width: isSmallScreen ? "100%" : "45%",
        height: "64px",
        borderBottom: "1px solid grey",
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        justifyContent: "space-between",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Icon
          sx={{
            width: "40px",
            height: "40px",
            color: "white",
            backgroundColor: backgroundColor,
            borderRadius: "50%",
            padding: "4px",
          }}
        />
        <Typography variant="body2">{name}</Typography>
      </Stack>
      <Stack direction={"row"} gap={1}>
        <IconButton
          onClick={() => {
            setModal("edit");
            setOpenModal(true);
          }}
          sx={{
            width: "24px",
            height: "24px",
            background: "grey",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setModal("delete");
            setOpenModal(true);
          }}
          sx={{
            width: "24px",
            height: "24px",
            background: "red",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>

      {/* Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {modal === "delete" ? (
            <DeleteCategory
              onClose={() => setOpenModal(false)}
              name={name}
              backgroundColor={backgroundColor}
              icon={Icon}
            />
          ) : (
            <EditCategory
              onClose={() => setOpenModal(false)}
              name={name}
              backgroundColor={backgroundColor}
              icon={Icon}
            />
          )}
        </Box>
      </Modal>
    </Grid>
  );
};

export default Category;
