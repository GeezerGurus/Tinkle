import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import { Owe } from "./Owe";
import { Lend } from "./Lend";
import { Loader, ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";
import { getDebtRecord } from "../../api/debtRecordApi";

const Debt = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDebtRecord = async () => {
    setIsLoading(true);
    const response = await getDebtRecord();
    setItems(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDebtRecord();
  }, []);

  const [page, setPage] = useState("Owe");

  const handleChange = (event) => {
    setPage(page === "Owe" ? "Lend" : "Owe");
  };
  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));

  const lendItems = items?.filter(
    (item) => item.type === "lend" && item.amount > 0
  );
  const oweItems = items?.filter(
    (item) => item.type === "owe" && item.amount > 0
  );

  return (
    <Paper
      sx={{
        width: isLaptop ? "100%" : "369px",
        height: "302px",
        padding: "16px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        borderRadius: "16px",
        bgcolor: colors.panel.panel1,
      }}
    >
      <Loader isLoading={isLoading} />
      {/* Header box of Debt List */}
      <Box
        sx={{
          height: "48px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[600]} 1px solid`,
        }}
      >
        <Typography variant="h6">Debt List</Typography>
        <ShowMoreBtn to={"/lists/debt-list"} />
      </Box>

      {page === "Owe" ? (
        <Lend
          handleChange={handleChange}
          color={colors.green[500]}
          items={lendItems}
        />
      ) : (
        <Owe
          handleChange={handleChange}
          color={colors.category.red}
          items={oweItems}
        />
      )}
    </Paper>
  );
};

export default Debt;
