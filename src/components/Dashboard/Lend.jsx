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

export const Lend = ({ checked, handleChange }) => {
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
          I Lend
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
          <Typography variant="text">$500 to IRS</Typography>
          <Typography variant="text">Due - 30-01-25</Typography>
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
          <Typography variant="text">$50 to Local Shop</Typography>
          <Typography variant="text">Due - 30-01-25</Typography>
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
          <Typography variant="text">$20 to Netfilx</Typography>
          <Typography variant="text">Due - 30-01-25</Typography>
        </Box>
      </CheckItem>
    </Box>
  );
};

export default Lend;
