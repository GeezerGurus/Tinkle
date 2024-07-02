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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { tokens } from "../../theme";

const StyledInput = styled("input")({
  maxWidth: "104px",
  background: "none",
  border: "none",
  "&:focus": {
    outline: "none",
  },
});

// Exchange Rates data

const exchangeRates = {
  USD: { MMK: 3200, Yen: 110, Euro: 0.85, USD: 1 },
  MMK: { USD: 0.00031, Yen: 0.034, Euro: 0.00027, MMK: 1 },
  Yen: { USD: 0.0091, MMK: 29.5, Euro: 0.0077, Yen: 1 },
  Euro: { USD: 1.18, MMK: 3740, Yen: 130, Euro: 1 },
};

const Exchange = ({ isSmallScreen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [inputCurrency, setInputCurrency] = useState("USD");
  const [outputCurrency, setOutputCurrency] = useState("MMK");

  const handleInputCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setInputCurrency(selectedCurrency);
    if (selectedCurrency === outputCurrency) {
      setOutputCurrency(inputCurrency);
      setInputCurrency(outputCurrency);
    }
    setOutput("");
  };

  const handleOutputCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setOutputCurrency(selectedCurrency);
    if (selectedCurrency === inputCurrency) {
      setInputCurrency(outputCurrency);
      setOutputCurrency(inputCurrency);
    }
    setOutput("");
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleConvert = () => {
    const rate = exchangeRates[inputCurrency][outputCurrency];
    const result = input * rate;
    setOutput(result.toFixed(2));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleConvert();
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(1),
        padding: "16px 24px",
        width: isSmallScreen ? "100%" : "369px",
        height: "275px",
        borderRadius: "16px",
      }}
    >
      {/* <Stack></Stack> */}
      <Box>
        <Typography variant="h6">Currency Exchange</Typography>
        <Typography variant="body2">
          1 {inputCurrency} = {exchangeRates[inputCurrency][outputCurrency]}{" "}
          {outputCurrency}
        </Typography>
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
            value={inputCurrency}
            onChange={handleInputCurrencyChange}
            sx={{
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            {Object.keys(exchangeRates).map((currency) => (
              <MenuItem key={currency} value={currency}>
                <Typography variant="body3">{currency}</Typography>
              </MenuItem>
            ))}
          </Select>
          <StyledInput
            type="number"
            placeholder="Enter amount"
            value={input}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
          />
        </Box>

        {/* Icon */}
        <IconButton
          onClick={handleConvert}
          sx={{
            position: "absolute",
            top: "34%",
            left: "40%",
          }}
        >
          <KeyboardArrowDownIcon
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
            value={outputCurrency}
            onChange={handleOutputCurrencyChange}
            sx={{
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            {Object.keys(exchangeRates).map((currency) => (
              <MenuItem
                key={currency}
                value={currency}
                disabled={currency === inputCurrency}
              >
                <Typography variant="body3">{currency}</Typography>
              </MenuItem>
            ))}
          </Select>
          <StyledInput disabled value={output} />
        </Box>
      </Paper>
    </Paper>
  );
};

export default Exchange;
