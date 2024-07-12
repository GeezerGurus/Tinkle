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
import { postListToBuy } from "../../api/listsToBuy";
import { enqueueSnackbar } from "notistack";

const CreateList = ({ onClose, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [errors, setErrors] = useState({});
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");

  const validateForm = () => {
    const errors = {};
    if (!listName) {
      errors.listName = "Name is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const newList = {
        name: listName,
        description: listDescription,
      };
      const createdList = await postListToBuy(newList);
      console.log("New list created:", createdList);
      refresh();
      enqueueSnackbar("List created!", { variant: "success" });
      onClose();
    } catch (error) {
      console.error("Error creating new list:", error);
    }
  };

  return (
    // Container
    <Paper
      sx={{
        padding: isSmallScreen ? "16px 26px" : "32px 116px",
        width: isSmallScreen ? "359px" : "710px",
        height: "426px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: colors.backGround,
        border: `1px solid ${colors.panel.panelBorder}`,
      }}
    >
      {/* Title  */}
      <Typography variant="h4" sx={{ color: colors.text.text1 }}>
        Create a List
      </Typography>

      {/* Form  */}
      <TextField
        placeholder="Enter name"
        label="Name"
        required
        fullWidth
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        InputLabelProps={{
          shrink: true,
          required: true,
        }}
        InputProps={{
          sx: { height: isSmallScreen ? "42px" : undefined },
        }}
        error={!!errors.listName}
        helperText={errors.listName}
      />
      <TextField
        placeholder="Enter a description (optional)"
        fullWidth
        label="Description"
        multiline
        maxRows={2}
        value={listDescription}
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
          onClick={handleCreate}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.button.button1,
            textTransform: "none",
            color: "white",
          }}
        >
          <Typography variant="body2">Create</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.button.button2,
            textTransform: "none",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default CreateList;
