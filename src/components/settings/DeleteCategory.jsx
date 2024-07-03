import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";

const DeleteCategory = ({ onClose, icon: Icon, backgroundColor, name }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDelete = () => {
    console.log(`Deleting category ${name}`);
    onClose();
  };

  return (
    <Paper
      sx={{
        width: "623px",
        height: "355px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "32px",
      }}
    >
      {/* Title  */}
      <Stack direction={"row"} gap={1}>
        <Typography variant="h4" sx={{ color: colors.extra.red_accent }}>
          DELETE
        </Typography>
        <Typography variant="h4">Category?</Typography>
      </Stack>

      {/* Main  */}
      <Stack direction="row" alignItems="center" spacing={2}>
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
        <Typography variant="h4">{name}</Typography>
      </Stack>
      {/* Text  */}
      <Stack direction={"row"} alignItems={"baseline"} gap={1}>
        <Typography variant="body1">
          Do you really want to delete category
        </Typography>
        <Typography variant="h6">
          <b>{name}</b>?
        </Typography>
      </Stack>
      {/* Delete button  */}
      <Stack gap={1} direction={"row"} justifyContent={"space-between"}>
        <Button
          onClick={handleDelete}
          sx={{
            width: "208px",
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
          <Typography variant="body2">Yes</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[200],
            "&:hover": {
              backgroundColor: colors.purple[100],
            },
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2">No</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default DeleteCategory;
