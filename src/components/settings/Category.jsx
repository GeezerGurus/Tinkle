import { Box, Grid, IconButton, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteCategory from "./DeleteCategory";

const Category = ({ icon: Icon, backgroundColor, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid
      item
      sx={{
        width: "452px",
        height: "64px",
        borderBottom: "1px solid black",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        justifyContent: "space-between",
        padding: "0 28px",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
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
        <Typography variant="text2">{name}</Typography>
      </Stack>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          width: "27px",
          height: "23px",
          background: "red",
          color: "white",
          borderRadius: "5px",
        }}
      >
        <DeleteIcon />
      </IconButton>
      {/* Delete Category Modal*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <DeleteCategory
            onClose={() => setOpen(false)}
            name={name}
            backgroundColor={backgroundColor}
            icon={Icon}
          />
        </Box>
      </Modal>
    </Grid>
  );
};

export default Category;
