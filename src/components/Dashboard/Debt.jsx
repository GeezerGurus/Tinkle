import React, { useState } from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import { Owe } from "./Owe";
import { Lend } from "./Lend";
import { ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";

const Debt = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState("Owe");

  const handleChange = (event) => {
    setPage(page === "Owe" ? "Lend" : "Owe");
  };

  return (
    <Paper
      sx={{
        width: "369px",
        height: "302px",
        padding: "16px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        borderRadius: "16px",
      }}
    >
      {/* Header box of Debt List */}
      <Box
        sx={{
          height: "48px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[500]} 1px solid`,
        }}
      >
        <Typography variant="h6">Debt List</Typography>
        <ShowMoreBtn to={"/budget"} />
      </Box>

      {page === "Owe" ? (
        <Lend handleChange={handleChange} color={colors.category.red} />
      ) : (
        <Owe handleChange={handleChange} color={colors.green[500]} />
      )}
    </Paper>
  );
};

export default Debt;
