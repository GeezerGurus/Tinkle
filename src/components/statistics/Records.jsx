import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";
import RecordsTable from "./RecordsTable";
import { getRecords } from "../../api/recordsApi";

const Records = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [records, setRecords] = useState([]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchRecords = async () => {
    const res = await getRecords();
    setRecords(res);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <Paper
      sx={{
        border: `1px solid ${colors.purple[600]}`,
        height: "100%",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          minHeight: "56px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[600]} 1px solid`,
        }}
      >
        <Typography variant={isSmallScreen ? "h6" : "h4"}>Records</Typography>
        <ShowMoreBtn to={"/records"} />
      </Box>
      <RecordsTable data={records} />
    </Paper>
  );
};

export default Records;
