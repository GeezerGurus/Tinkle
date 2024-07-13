import {
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { getRecords } from "../../api/recordsApi";

const Total = ({ type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [totalAmount, setTotalAmount] = useState(0);

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchRecords = async () => {
    try {
      const res = await getRecords();
      const filteredRecords = res.filter((record) => record.type === type);
      const sum = filteredRecords.reduce((acc, curr) => acc + curr.amount, 0);
      setTotalAmount(sum);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <Paper
      sx={{
        borderRadius: "16px",
        display: "flex",
        padding: "24px",
        flexDirection: "column",
        gap: "16px",
        // width: "400px",
        width: isMediumScreen ? "100%" : "32%",
        height: "216px",
        backgroundColor: colors.panel.panel3,
        border:`1px solid ${colors.panel.panelBorder}`,
        alignItems: isSmallScreen
          ? undefined
          : isMediumScreen
          ? "center"
          : undefined,
      }}
    >
      {/* Header  */}
      {type === "income" ? (
        <Typography variant="h6" sx={{ color: colors.text.text1 }}>
          Total Income You Have
        </Typography>
      ) : (
        <Typography variant="h6" sx={{ color: colors.text.text1 }}>
          Total Expense You Made
        </Typography>
      )}

      {/* Amount */}
      <Stack direction={"row"} alignItems={"baseline"} gap={1}>
        <Typography
          variant="h3"
          sx={
            type === "income"
              ? { color: colors.purple[600] }
              : { color: colors.extra.red_accent }
          }
        >
          {totalAmount.toLocaleString()}
        </Typography>
        <Typography
          variant="h4"
          sx={
            type === "income"
              ? { color: colors.purple[600] }
              : { color: colors.extra.red_accent }
          }
        >
          MMK
        </Typography>
      </Stack>

      {/* Percent */}
      {type === "income" ? (
        <Typography variant="body2" sx={{ color: colors.text.textSecondary }}>
          This is the total income you have made this month.
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ color: colors.text.textSecondary }}>
          This is the total expense you have made this month.
        </Typography>
      )}
    </Paper>
  );
};

export default Total;
