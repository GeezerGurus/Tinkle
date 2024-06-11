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
          height: "55px",
          border: "3px pale black",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            marginTop: "21px",
            marginLeft: "38px",
            marginBottom: "21px",
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          Transactions
        </Typography>
        <Button
          sx={{
            border: "1px dotted black",
            marginLeft: "620px",
            marginTop: "22px",
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
      <Box>
        <BasicTable />
      </Box>
    </Box>
  );
};

export default Transactions;
