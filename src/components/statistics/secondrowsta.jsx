import * as React from "react";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { tokens } from "../../theme";
import TableData from "./table";

const Secondrow = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const pieData = [
    { id: 0, value: 88000, label: "Education and Development" },
    { id: 1, value: 240000, label: "Food and Drinks" },
    { id: 2, value: 88000, label: "Health and Beauty" },
    { id: 3, value: 88000, label: "Charges, Fees" },
  ];

  const colorMap = {
    0: "#7772F2",
    1: "#F5ADA8",
    2: "#A8BCF5",
    3: "#F5EEA8",
  };

  const Probar = ({ fact, amount, maxAmount, color }) => {
    return (
      <Box
        sx={{
          width: "80%",
          height: "64px",
        }}
      >
        {/* for caption and amount */}
        <Box
          sx={{
            width: "100%",
            height: "29px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">{fact}</Typography>
          <Typography variant="body1">{amount}</Typography>
        </Box>
        {/* for progressbar */}
        <Box sx={{ width: "100%", height: "35px" }}>
          <LinearProgress
            variant="determinate"
            value={(amount / maxAmount) * 100}
            sx={{
              width: "100%",
              height: "35px",
              "& .MuiLinearProgress-bar": {
                backgroundColor: color,
              },
              backgroundColor: "#F0F0F0",
            }}
          />
        </Box>
      </Box>
    );
  };
  const maxAmount = Math.max(...pieData.map((item) => item.value));
  return (
    // the lower row
    <Box
      sx={{
        width: "100%",
        height: "540px",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* progress bar box */}
      <Box
        sx={{
          width: "603px",
          height: "378px",
          borderRadius: "8px",
          border: "1px solid #E0E0E0",
        }}
      >
        {/* for Top Category caption and divider */}
        <Box
          sx={{
            width: "100%",
            height: "72px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingLeft: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              lineHeight: "36px",
              fontWeight: "600",
              color: "black",
              alignSelf: "flex-start",
              paddingLeft: "40px",
            }}
          >
            Top Category
          </Typography>
          <Divider
            sx={{
              width: "calc(100% - 100px)",
              backgroundColor: "#11111180",
              paddingLeft: "25px",
              marginTop: "10px",
            }}
          />
        </Box>
        {/* progressbar box */}
        <Box
          sx={{
            width: "100%",
            height: "289px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {pieData.map((item) => (
            <Probar
              key={item.id}
              fact={item.label}
              amount={item.value}
              maxAmount={maxAmount}
              color={colorMap[item.id]}
            />
          ))}
        </Box>
      </Box>

      {/* table box */}
      <Box
        sx={{
          width: "603px",
          height: "378px",
          borderRadius: "8px",
          border: "1px solid #E0E0E0",
          boxShadow: "",
        }}
      >
        <TableData
          data={[
            {
              date: "2024-06-01",
              fact: "Education and Development",
              method: "Credit Card",
              amount: "-88000 MMK",
            },
            {
              date: "2024-06-02",
              fact: "Food and Drinks",
              method: "Cash",
              amount: "-240000 MMK",
            },
            {
              date: "2024-06-03",
              fact: "Health and Beauty",
              method: "Debit Card",
              amount: "-88000 MMK",
            },
            {
              date: "2024-06-04",
              fact: "Charges, Fees",
              method: "Bank Transfer",
              amount: "-88000 MMK",
            },
            {
              date: "2024-06-04",
              fact: "Charges, Fees",
              method: "Bank Transfer",
              amount: "-88000 MMK",
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Secondrow;
