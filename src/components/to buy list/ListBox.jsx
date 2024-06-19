import React, { useState } from "react";
import { Button, Paper, Stack, Typography, Modal, Box } from "@mui/material";
import EditList from "./EditList";
import { Link } from "react-router-dom";

const ListBox = ({ name, description }) => {
  const [open, setOpen] = useState(false);

  return (
    // Container
    <Paper sx={{ display: "flex", alignItems: "center" }}>
      {/* Left  */}
      <Button
        component={Link}
        to={`/lists/to-buy-lists/${name}`}
        sx={{
          width: "801px",
          height: "85.64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          textTransform: "none",
        }}
      >
        <Stack direction={"column"} alignItems={"flex-start"}>
          <Typography variant="title2">{name}</Typography>
          <Typography variant="text">{description}</Typography>
        </Stack>
      </Button>
      {/* Right  */}
      <Button
        variant="text"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Typography variant="text2" color={"blue"}>
          Edit
        </Typography>
      </Button>
      {/* Edit List Modal*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <EditList
            onClose={() => setOpen(false)}
            name={name}
            description={description}
          />
        </Box>
      </Modal>
    </Paper>
  );
};

export default ListBox;
