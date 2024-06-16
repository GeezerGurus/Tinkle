import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import React from "react";
const Due = ({ duedate }) => {
  return (
    <Box
      sx={{
        width: "1185px",
        height: "29px",
        display: "flex",
        justifyContent: "space-between",
        //backgroundColor: "red",
      }}
    >
      <Button
        sx={{
          width: "161px",
          height: "29px",
          borderRadius: "4px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        +Add Record
      </Button>
      <Box
        sx={{
          width: "142px",
          height: "29px",
          fontSize: "16px",
          lineHeight: "19.36px",
          letterSpacing: "1%",
          fontWeight: "500",
          color: "#A3A3A3",
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
        }}
      >
        {" "}
        Due-
        <Typography
          sx={{
            fontSize: "16px",
            lineHeight: "19.36px",
            letterSpacing: "1%",
            fontWeight: "500",
            color: "black",
          }}
        >
          {duedate}
        </Typography>
      </Box>
    </Box>
  );
};
const Cap = ({ name, reason, amount }) => {
  return (
    <Box
      sx={{
        width: "1185px",
        height: "50px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          height: "50px",
          width: "592.5px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: "34px",
            lineHeight: "29.05px",
            fontWeight: "600",
            letterSpacing: "4%",
            color: "black",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            lineHeight: "19.36px",
            fontWeight: "600",
            letterSpacing: "4%",
            color: "#A3A3A3",
          }}
        >
          {reason}
        </Typography>
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "592.5px",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          color: "black",
        }}
      >
        <Typography
          sx={{
            fontSize: "19px",
            lineHeight: "22.99px",
            fontWeight: "500",
            letterSpacing: "1%",
          }}
        >
          {amount}
        </Typography>
      </Box>
    </Box>
  );
};
const ActiveDebt = ({ bgColor }) => {
  return (
    <Paper
      sx={{
        width: "1240px",
        height: "175px",
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Cap name={"Daniel"} reason={"For his car"} amount={"500,000.00 MMK"} />
      <Divider
        sx={{
          backgroundColor: "#00000033",
          width: "calc(100% - 54px)",
          height: "2px",
          //backgroundColor: "black",
        }}
      />
      <Due duedate={"02-01-2024"} />
    </Paper>
  );
};

export default ActiveDebt;
