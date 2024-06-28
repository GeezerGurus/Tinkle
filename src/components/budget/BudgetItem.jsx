import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { Progress } from "../utils";
import { Link, useLocation } from "react-router-dom";

const BudgetItem = ({ title, total, progressPercent, spent, remains }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  console.log(location);

  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "152px",
        borderRadius: "16px",
        backgroundColor: colors.purple[100],
      }}
    >
      <Button
        component={Link}
        to={`${location.pathname}/${title.toLowerCase()}`}
        sx={{ width: "100%", height: "100%", padding: "16px 56px" }}
      >
        <Stack
          justifyContent={"space-between"}
          sx={{ height: "100%", width: "100%" }}
        >
          {/* Title  */}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <Typography variant="h6">{title}</Typography>
            <Stack direction={"row"} alignItems={"flex-end"} gap={"4px"}>
              <Typography variant="h6">{total}</Typography>{" "}
              <Typography variant="body1">MMK</Typography>
            </Stack>
          </Stack>

          {/* Progress bar  */}
          <Progress percent={progressPercent} height={32} />

          {/* Info  */}
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack alignItems={"flex-start"}>
              <Typography variant="body3">{spent} MMK</Typography>
              <Typography variant="body2">Spent</Typography>
            </Stack>
            <Stack alignItems={"flex-end"}>
              <Typography variant="body3">{remains} MMK</Typography>
              <Typography variant="body2">Remains</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Button>
    </Paper>
  );
};

export default BudgetItem;
