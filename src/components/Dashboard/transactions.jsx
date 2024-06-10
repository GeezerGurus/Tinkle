import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import BasicTable from "./table";

export const Transactions = () => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        color: "black",
        width: "100%",
        height: "354px",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          height: "69px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 23px",
          borderBottom: "1px solid black",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "20px",
            lineHeight: "auto",
            letterSpacing: "1%",
          }}
        >
          Transactions
        </Typography>
        <Button
          sx={{
            border: "1px dotted black",
            width: "78px",
            height: "28px",
            borderRadius: "7px",
            whiteSpace: "nowrap",
            textTransform: "none",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "200",
              lineHeight: "14.52px",
              letterSpacing: "1%",
              alignItems: "center",
              // fontFamily: "inter",
            }}
          >
            Show more
          </Typography>
        </Button>
      </Box>
      <BasicTable />
    </Box>
  );
};

export default Transactions;
