import { React, useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { tokens } from "../../theme";
import { currencyNames } from "../utils";

const StyledInput = styled("input")({
  maxWidth: "104px",
  background: "none",
  border: "none",
  "&:focus": {
    outline: "none",
  },
});

// Exchange Rates data

const Exchange = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [apiExchangeRates, setApiExchangeRates] = useState({});
  const [inputCurrency, setInputCurrency] = useState("USD");
  const [outputCurrency, setOutputCurrency] = useState(currencyNames[90]);

  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));

  const fetchExchangeRates = useCallback(async () => {
    try {
      const API_KEY = "88b049f9ee5cb4b41121e4c7";
      const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${inputCurrency}`;
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setApiExchangeRates(data.conversion_rates);
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error);
    }
  }, [inputCurrency]);

  useEffect(() => {
    fetchExchangeRates();
  }, [inputCurrency, fetchExchangeRates]);

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
    const rate = apiExchangeRates[outputCurrency];
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
        width: isLaptop ? "100%" : "369px",
        height: "275px",
        borderRadius: "16px",
        bgcolor: colors.panel.panel1,
      }}
    >
      {/* <Stack></Stack> */}
      <Box>
        <Typography variant="h6">Currency Exchange</Typography>
        <Typography variant="body2">
          1 {inputCurrency} = {apiExchangeRates[outputCurrency]}
          {outputCurrency}
        </Typography>
      </Box>

      {/* Exchange  */}
      <Paper
        sx={{
          overflow: "hidden",
          alignSelf: "center",
          width: isLaptop ? "90%" : "293px",
          height: "156px",
          position: "relative",
          border: `1px solid ${colors.text.text1}`,
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
            bgcolor: colors.panel.panel1,
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
            {currencyNames.map((currency) => (
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
              backgroundColor: colors.button.button1,
              borderRadius: "50%",
            }}
          />
        </IconButton>

        {/* Lower Box */}
        <Box
          sx={{
            height: "50%",
            padding: "0 24px 0 40px",
            backgroundColor: colors.panel.panel2,
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
            {Object.keys(apiExchangeRates).map((currency) => (
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
