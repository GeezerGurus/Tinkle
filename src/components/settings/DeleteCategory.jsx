import { Button, Paper, Stack, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const DeleteCategory = ({ onClose, icon: Icon, backgroundColor, name }) => {
  const handleDelete = () => {
    console.log(`Deleting category ${name}`);
    onClose();
  };

  return (
    <Paper
      sx={{
        width: "694px",
        height: "475px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "24px",
      }}
    >
      {/* Title  */}
      <Typography variant="h2">Delete Category</Typography>
      {/* Close button  */}
      <IconButton
        onClose={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
        onClick={onClose}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      {/* Main  */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Icon
          sx={{
            width: "73px",
            height: "73px",
            color: "white",
            backgroundColor: backgroundColor,
            borderRadius: "50%",
            padding: "4px",
          }}
        />
        <Typography variant="h4">{name}</Typography>
      </Stack>
      {/* Text  */}
      <Stack alignItems={"center"}>
        <Typography variant="h5">Do you really want to delete</Typography>
        <Typography variant="h5">
          category <b>{name}</b>?
        </Typography>
      </Stack>
      {/* Delete button  */}
      <Button
        onClick={handleDelete}
        sx={{
          width: "244px",
          height: "56px",
          color: "white",
          backgroundColor: "red",
        }}
      >
        <Typography variant="h6">Delete</Typography>
      </Button>
    </Paper>
  );
};

export default DeleteCategory;
