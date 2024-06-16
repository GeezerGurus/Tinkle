import React from "react";
import {
  Modal,
  Box,
  Typography,
  Fade,
  LinearProgress,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

// ProgressBar Component
const ProgressBar = ({ amount, spentamount }) => {
  const progressValue = (parseInt(spentamount) / parseInt(amount)) * 100;
  return (
    <Box sx={{ width: "612px" }}>
      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{
          height: 28.72,
          bgcolor: "#D9D9D9B2",
          "& .MuiLinearProgress-bar": {
            bgcolor: progressValue > 50 ? "#FF0000" : "#00F79E",
          },
        }}
      />
    </Box>
  );
};

// Bigprogress Component
const Bigprogress = ({ reason, amount, spentamount, remainamount, fact }) => {
  return (
    <Button
      sx={{
        width: "731px",
        height: "150px",
        minHeight: "150px",
        backgroundColor: "#FFF2F2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "0px",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          width: "612px",
          height: "59.57px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            marginTop: "22.34px",
            fontSize: "24px",
            lineHeight: "29.05px",
            fontWeight: "500",
            letterSpacing: "1%",
          }}
        >
          {reason}
        </Typography>

        <Typography
          sx={{
            marginTop: "22.34px",
            fontSize: "24px",
            lineHeight: "29.05px",
            fontWeight: "500",
            letterSpacing: "1%",
          }}
        >
          {amount}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "612px",
          height: "28.72px",
        }}
      >
        <ProgressBar amount={amount} spentamount={spentamount} />
      </Box>
      <Box
        sx={{
          width: "612px",
          height: "54px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "612px",
            height: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              lineHeight: "24.2px",
              letterSpacing: "1%",
              fontWeight: "700",
            }}
          >
            {spentamount}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              lineHeight: "24.2px",
              letterSpacing: "1%",
              fontWeight: "700",
            }}
          >
            {remainamount}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "612px",
            height: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              lineHeight: "24.2px",
              letterSpacing: "1%",
              fontWeight: "700",
            }}
          >
            Spent
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              lineHeight: "24.2px",
              letterSpacing: "1%",
              fontWeight: "700",
            }}
          >
            {fact}
          </Typography>
        </Box>
      </Box>
    </Button>
  );
};

// BudgetDetails Component
const BudgetDetails = ({ type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    // Progress List Container
    <Box
      sx={{
        height: "695px",
        width: "100%",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(4),
      }}
    >
      <Bigprogress
        reason="Home"
        amount="500,000.00 MMK"
        spentamount="79,000.00MMK"
        remainamount="421,000.00MMK"
        fact="Remains"
      />
      <Bigprogress
        reason="Home"
        amount="500,000.00 MMK"
        spentamount="79,000.00MMK"
        remainamount="421,000.00MMK"
        fact="Remains"
      />
      <Bigprogress
        reason="Fashion"
        amount="500,000.00 MMK"
        spentamount="490,000.00MMK"
        remainamount="66.00MMK"
        fact="Overspent"
      />
      <Bigprogress
        reason="Fashion"
        amount="500,000.00 MMK"
        spentamount="490,000.00MMK"
        remainamount="66.00MMK"
        fact="Overspent"
      />
      <Bigprogress
        reason="Fashion"
        amount="500,000.00 MMK"
        spentamount="490,000.00MMK"
        remainamount="66.00MMK"
        fact="Overspent"
      />
      <Bigprogress
        reason="Fashion"
        amount="500,000.00 MMK"
        spentamount="490,000.00MMK"
        remainamount="66.00MMK"
        fact="Overspent"
      />
    </Box>
  );
};

export default BudgetDetails;
