import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const ShowMoreBox = ({ header }) => {
  return (
    <Box
      sx={{
        width: "474px",
        height: "408px",
        borderRadius: "8px",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "white",
      }}
    >
      {/* Header box of Budgetbox */}
      <Box
        sx={{
          height: "69px",
          width: "360px",
          display: "flex",
          marginTop: "14px",
          marginLeft: "47px",
        }}
      >
        <Typography
          variant="title"
          sx={{
            fontSize: "36px",
            lineHeight: "54px",
            fontWeight: "500",
          }}
        >
          {header}
        </Typography>
      </Box>
      {/* Small line */}
      <Divider
        sx={{
          alignSelf: "center",
          width: "calc(100% - 100px)",
          backgroundColor: "black",
        }}
      ></Divider>
      <Box
        sx={{
          marginTop: "24.88px",
          width: "431px",
          height: "85px",
          display: "flex",
          justifyContent: "space-between",
          //backgroundColor: "red",
          alignSelf: "center",
          border: "1px dotted black",
          borderRadius: "16px",
        }}
      >
        <Button
          sx={{
            width: "431px",
            flex: "display",
            flexDirection: "column",
          }}
        >
          <AddIcon fontSize="large" />
          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: "19.36px",
              fontWeight: "300",
              letterSpacing: "1%",
            }}
          >
            Tap to add budget
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ShowMoreBox;
