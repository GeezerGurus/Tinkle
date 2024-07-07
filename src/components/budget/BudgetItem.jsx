import {
  Button,
  Paper,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { Progress } from "../utils";
import { Link, useLocation } from "react-router-dom";

const BudgetItem = ({ title, total, progressPercent, spent, remains, id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // console.log(location);

  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: isSmallScreen ? "100%" : "152px",
        borderRadius: "16px",
        backgroundColor: colors.purple[100],
      }}
    >
      <Button
        component={Link}
        to={`${location.pathname}/${id}`}
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
            <Typography variant={isSmallScreen ? "body3" : "h6"}>
              {title}
            </Typography>
            <Stack direction={"row"} alignItems={"flex-end"} gap={"4px"}>
              <Typography variant={isSmallScreen ? "body3" : "h6"}>
                {total}
              </Typography>{" "}
              <Typography variant={isSmallScreen ? "body2" : "body1"}>
                MMK
              </Typography>
            </Stack>
          </Stack>

          {/* Progress bar  */}
          <Progress percent={progressPercent} height={32} />

          {/* Info  */}
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack alignItems={"flex-start"}>
              <Typography variant="body3">{spent} MMK</Typography>
              <Typography variant={isSmallScreen ? "body3" : "body2"}>
                Spent
              </Typography>
            </Stack>
            <Stack alignItems={"flex-end"}>
              <Typography variant="body3">{remains} MMK</Typography>
              <Typography variant={isSmallScreen ? "body3" : "body2"}>
                Remains
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Button>
    </Paper>
  );
};

export default BudgetItem;
