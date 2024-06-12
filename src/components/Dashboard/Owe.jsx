import * as React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Switch demo" } };

const CheckItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "301px",
}));

export const Owe = ({ checked, handleChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            width: "62px",
            color: "#000000",
            height: "24px",
            fontSize: "20px",
            fontWeight: "400",
          }}
        >
          I Owe
        </Typography>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>
      {/* checkboxes */}
      <CheckItem>
        <Checkbox {...label} sx={{ color: "black" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "416px",
          }}
        >
          <Typography variant="text">$700 to John</Typography>
          <Typography variant="text">Due - 26-11-24</Typography>
        </Box>
      </CheckItem>
      <CheckItem>
        <Checkbox {...label} sx={{ color: "black" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "416px",
          }}
        >
          <Typography variant="text">$100 to Sarah</Typography>
          <Typography variant="text">Due - 14-07-24</Typography>
        </Box>
      </CheckItem>
      <CheckItem>
        <Checkbox {...label} sx={{ color: "black" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "416px",
          }}
        >
          <Typography variant="text">$30 to Alex</Typography>
          <Typography variant="text">Due - 26-2-25</Typography>
        </Box>
      </CheckItem>
    </Box>
  );
};

export default Owe;
