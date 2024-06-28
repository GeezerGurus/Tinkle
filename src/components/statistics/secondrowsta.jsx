import * as React from "react";
import { Box, Typography, Divider } from "@mui/material";

const Secondrow = () => {
  const Probar = ({ fact, amount }) => {
    return (
      <Box
        sx={{
          width: "80%",
          height: "72px",
          backgroundColor: "yellow",
        }}
      >
        {/* for caption and amount */}
        <Box
          sx={{
            width: "100%",
            height: "37px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">{fact}</Typography>
          <Typography variant="body1">{amount}</Typography>
        </Box>
        {/* for progressbar */}
        <Box sx={{ width: "100%", height: "37px" }}></Box>
      </Box>
    );
  };

  return (
    // the lower row
    <Box
      sx={{
        width: "100%",
        height: "540px",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* progress bar box */}
      <Box
        sx={{
          width: "603px",
          height: "483px",
          borderRadius: "8px",
          border: "1px solid #E0E0E0",
        }}
      >
        {/* for Top Category caption and divider */}
        <Box
          sx={{
            width: "100%",
            height: "72px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingLeft: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              lineHeight: "36px",
              fontWeight: "600",
              color: "black",
              alignSelf: "flex-start",
              paddingLeft: "40px",
            }}
          >
            Top Category
          </Typography>
          <Divider
            sx={{
              width: "calc(100% - 80px)",
              backgroundColor: "#11111180",
              paddingLeft: "25px",
              marginTop: "10px",
            }}
          />
        </Box>
        {/* progressbar box */}
        <Box
          sx={{
            width: "100%",
            height: "376px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Probar fact={"Education, development"} amount={"88,000 MMK"} />
          <Probar />
          <Probar />
          <Probar />
        </Box>
      </Box>

      {/* table box */}
      <Box
        sx={{
          width: "603px",
          height: "483px",
          borderRadius: "8px",
          border: "1px solid #E0E0E0",
          boxShadow: "",
        }}
      ></Box>
    </Box>
  );
};

export default Secondrow;
