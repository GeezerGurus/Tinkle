import { React, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { tokens } from "../../theme";

const StyledInput = styled("input")({
  maxWidth: "104px",
  background: "none",
  border: "none",
  "&:focus": {
    outline: "none",
  },
});

const Exchange = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [currency, setCurrency] = useState("USD");
  const [inputValue, setInput] = useState("");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(1),
        padding: "16px 24px",
        width: "369px",
        height: "275px",
        borderRadius: "16px",
      }}
    >
      {/* <Stack></Stack> */}
      <Box>
        <Typography variant="h6">Currency Exchange</Typography>
        <Typography variant="body2">1USD = 3200MMK</Typography>
      </Box>

      {/* Exchange  */}
      <Paper
        sx={{
          overflow: "hidden",
          alignSelf: "center",
          width: "293px",
          height: "156px",
          position: "relative",
          border: "#E0E0E0 1px solid",
          borderRadius: "21px",
        }}
      >
        {/* Upper Box */}
        <Box
          sx={{
            height: "50%",
            padding: "0 24px 0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Select
            value={currency}
            onChange={handleCurrencyChange}
            sx={{
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value="USD">
              <Typography variant="body3">USD</Typography>
            </MenuItem>
            <MenuItem value="Yen">
              <Typography variant="body3">YEN</Typography>
            </MenuItem>
            <MenuItem value="Euro">
              <Typography variant="body3">EURO</Typography>
            </MenuItem>
            <MenuItem value="MMK">
              <Typography variant="body3">MMK</Typography>
            </MenuItem>
          </Select>
          <StyledInput
            type="number"
            placeholder="Enter amount"
            value={inputValue}
            onChange={handleInput}
          />
        </Box>

        {/* Icon */}
        <IconButton
          sx={{
            position: "absolute",
            top: "34%",
            left: "40%",
          }}
        >
          <ArrowDownwardIcon
            sx={{
              width: "38px",
              height: "38px",
              backgroundColor: colors.purple[500],
              borderRadius: "50%",
            }}
          />
        </IconButton>

        {/* Lower Box */}
        <Box
          sx={{
            height: "50%",
            padding: "0 24px 0 40px",
            backgroundColor: colors.purple[200],
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Select
            value={currency}
            onChange={handleCurrencyChange}
            sx={{
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value="USD">
              <Typography variant="body3">USD</Typography>
            </MenuItem>
            <MenuItem value="Yen">
              <Typography variant="body3">YEN</Typography>
            </MenuItem>
            <MenuItem value="Euro">
              <Typography variant="body3">EURO</Typography>
            </MenuItem>
            <MenuItem value="MMK">
              <Typography variant="body3">MMK</Typography>
            </MenuItem>
          </Select>
          <StyledInput disabled value="Something here"></StyledInput>
        </Box>
      </Paper>
    </Paper>
  );
};

export default Exchange;
