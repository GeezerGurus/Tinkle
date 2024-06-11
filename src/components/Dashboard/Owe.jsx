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

export const Owe = ({ checked, handleChange }) => {
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
          <Text>$700 to John</Text>
          <Text>Due - 26-11-24</Text>
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
          <Text>$100 to Sarah</Text>
          <Text>Due - 14-07-24</Text>
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
          <Text>$30 to Alex</Text>
          <Text>Due - 26-2-25</Text>
        </Box>
      </CheckItem>
    </Box>
  );
};

export default Owe;
