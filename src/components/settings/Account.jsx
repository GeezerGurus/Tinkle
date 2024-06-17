import { Button, Paper, Stack, Typography, Box, Modal } from "@mui/material";
import React, { useState } from "react";
import EditAccount from "./EditAccount";

const Account = ({ icon: Icon, name, balance, backgroundColor }) => {
  const [open, setOpen] = useState(false);
  return (
    <Paper
      sx={{
        width: "1292px",
        height: "101px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
      }}
    >
      {/* Main  */}
      <Stack direction="row" alignItems="center" spacing={2} width={"600px"}>
        <Icon
          sx={{
            width: "64px",
            height: "64px",
            color: "white",
            backgroundColor: backgroundColor,
            borderRadius: "50%",
            padding: "4px",
          }}
        />
        <Typography variant="h3">{name}</Typography>
      </Stack>
      {/* Text  */}
      <Typography variant="h5" sx={{ flexGrow: 1 }}>
        <b>Balance - {balance}</b> MMK
      </Typography>
      {/* Edit button  */}
      <Button onClick={() => setOpen(true)}>
        <Typography variant="h4" sx={{ color: "#2099DD" }}>
          Edit
        </Typography>
      </Button>
      {/* Edit Account Modal*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <EditAccount
            onClose={() => setOpen(false)}
            name={name}
            balance={balance}
            icon={Icon}
            bgColor={backgroundColor}
          />
        </Box>
      </Modal>
    </Paper>
  );
};

export default Account;
