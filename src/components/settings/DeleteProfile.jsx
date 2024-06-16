import React from "react";
import { Button, Paper, Typography, Box } from "@mui/material";

const DeleteProfile = ({ onClose }) => {
  const handleCancel = () => {
    // Implement Cancel functionality
    console.log("Item Canceld");
    onClose();
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log("Item deleted");
  };

  return (
    // Container
    <Paper
      sx={{
        width: "694px",
        height: "475px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "48px",
      }}
    >
      <Typography variant="h2" fontWeight={600}>
        Delete Profile and All Data?
      </Typography>
      <Typography variant="h3">
        All financial transactions, bank connections, and profile information
        will be irreversibly deleted and all data will be lost.
      </Typography>
      <Typography variant="h3">
        No ongoing subscriptions can be used for a new registration and must be
        terminated manually.
      </Typography>
      {/* Buttons */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "77px",
          marginTop: 4,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: "#2196F3",
            width: "139px",
            height: "56px",
          }}
          onClick={handleCancel}
        >
          <Typography variant="body2" sx={{ color: "#2196F3" }}>
            Cancel
          </Typography>
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "red",
            width: "139px",
            height: "56px",
          }}
          onClick={handleDelete}
        >
          <Typography variant="body2" sx={{ color: "white" }}>
            Delete
          </Typography>
        </Button>
      </Box>
    </Paper>
  );
};

export default DeleteProfile;
