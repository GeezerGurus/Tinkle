import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  useTheme,
  TextField,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { patchListToBuy } from "../../api/listsToBuy";
import { enqueueSnackbar } from "notistack";

const EditList = ({ onClose, id, name, description, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [listName, setListName] = useState(name || "");
  const [listDescription, setListDescription] = useState(description || "");

  const handleSave = async () => {
    try {
      const EditedList = {
        name: listName,
        description: listDescription,
      };
      const createdList = await patchListToBuy(id, EditedList);
      console.log("List Edited:", createdList);
      refresh();
      enqueueSnackbar("Saved!", { variant: "info" });
      onClose();
    } catch (error) {
      console.error("Error editing list:", error);
    }
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    // Container
    <Paper
      sx={{
        padding: isSmallScreen ? "16px 26px" : "32px 116px",
        width: isSmallScreen ? "359px" : "710px",
        height: isSmallScreen ? "416px" : "426px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* Title  */}
      <Typography variant="h4" sx={{ color: colors.purple[900] }}>
        Edit List
      </Typography>

      {/* Form  */}
      <TextField
        placeholder="Enter name"
        label="Name"
        fullWidth
        value={listName || ""}
        onChange={(e) => setListName(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isSmallScreen ? "42px" : undefined },
        }}
      />
      <TextField
        placeholder="Enter a description (optional)"
        fullWidth
        label="Description"
        multiline
        maxRows={2}
        value={listDescription || ""}
        onChange={(e) => setListDescription(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Buttons  */}
      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Button
          onClick={handleSave}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
          }}
        >
          <Typography variant="body2">Save</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[200],
            textTransform: "none",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default EditList;
