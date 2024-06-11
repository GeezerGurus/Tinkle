import * as React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import { Text } from "../utils";

const label = { inputProps: { "aria-label": "Switch demo" } };

const CheckItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "301px",
  marginLeft: "26px",
}));

export const Lend = ({ checked, handleChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        transition: "1s",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "301px",
          marginLeft: "26px",
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
          <Text>$500 to IRS</Text>
          <Text>Due - 30-01-25</Text>
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
          <Text>$50 to Local Shop</Text>
          <Text>Due - 30-01-25</Text>
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
          <Text>$20 to Netfilx</Text>
          <Text>Due - 30-01-25</Text>
        </Box>
      </CheckItem>
    </Box>
  );
};

export default Lend;
