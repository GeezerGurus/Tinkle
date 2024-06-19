import { Box } from "@mui/material";
import React from "react";
import TableEntry from "./TableEntry";

const Table = () => {
  return (
    <Box
      sx={{
        width: "1296px",
        height: "603px",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <TableEntry />
    </Box>
  );
};

export default Table;
