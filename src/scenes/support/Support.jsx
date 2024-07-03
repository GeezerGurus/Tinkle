import React from "react";
import { tokens } from "../../theme";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import {
  Assistance,
  Experience,
  ReachOut,
  SupportAccordion,
} from "../../components/support";

const Support = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        gap: 4,
      }}
    >
      {/*header*/}
      <Stack textAlign={"center"} sx={{ width: "473px" }}>
        <Typography variant="h3" gutterBottom>
          Help & Support
        </Typography>
        <Typography variant="body2">
          Encountered any issue or have a question to ask? Our dedicated team at
          Fina is always ready to assist you.
        </Typography>
      </Stack>

      {/*Cards*/}
      <Box sx={{ width: "1256px" }}>
        <Stack direction={"row"} spacing={12}>
          <ReachOut />
          <Experience />
          <Assistance />
        </Stack>
      </Box>

      {/*footer*/}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "1256px",
        }}
      >
        <Stack direction={"row"}>
          <Box sx={{ width: "449px" }}>
            <Typography variant="h3">FAQ</Typography>
            <Typography variant="body1">
              Answers to some questions you might have.
            </Typography>
          </Box>
          <Box sx={{ width: "819px" }}>
            <SupportAccordion />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Support;
