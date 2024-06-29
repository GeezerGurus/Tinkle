import * as React from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import PieActiveArc from "./piechart";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LineChart from "./linechart";

const Firstrow = ({ caption, onPrevMonth, onNextMonth }) => {
  const pieData = [
    { id: 0, value: 88000, label: "Education and Development" },
    { id: 1, value: 240000, label: "Food and Drinks" },
    { id: 2, value: 88000, label: "Health and Beauty" },
    { id: 3, value: 88000, label: "Charges, Fees" },
  ];
  const data = {
    income: Array.from({ length: 31 }, (_, i) => Math.random() * 1000),
    expenses: Array.from({ length: 31 }, (_, i) => Math.random() * -1000),
  };

  const labels = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    // the upper row
    <Box
      sx={{
        width: "100%",
        height: "442px",
        //backgroundColor: "green",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top button show bar */}
      <Box
        sx={{
          width: "597.93px",
          height: "64px",
          display: "flex",
          alignSelf: "center",
          //backgroundColor: "red",
        }}
      >
        <Box
          sx={{
            width: "119.85px",
            height: "60%",
            borderRadius: "12px 0px 0px 12px",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <IconButton onClick={onPrevMonth}>
            <ArrowBackIosIcon
              sx={{
                color: "black",
              }}
            />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: "358.23px",
            height: "60%",
            backgroundColor: "#8884DC",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {caption}
        </Box>
        <Box
          sx={{
            width: "119.85px",
            height: "60%",
            borderRadius: "0px 12px 12px 0px",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <IconButton onClick={onNextMonth}>
            <ArrowForwardIosIcon sx={{ color: "black" }} />
          </IconButton>
        </Box>
      </Box>
      {/* Two Boxes of pie chart and lines */}
      <Box
        sx={{
          height: "378px",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* piechart box */}
        <Box
          sx={{
            width: "603px",
            height: "378px",
            borderRadius: "8px",
            border: "1px solid #E0E0E0",
            boxShadow: "",
          }}
        >
          {/* For Expanse caption and divider */}
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
              Expense
            </Typography>
            <Divider
              sx={{
                width: "calc(100% - 80px)",
                backgroundColor: "#11111180",
                //alignSelf: "flex-start",
                paddingLeft: "25px",
                marginTop: "10px",
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "206px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <PieActiveArc data={pieData} />
          </Box>
        </Box>
        {/* Line chart box */}
        <Box
          sx={{
            width: "603px",
            height: "378px",
            borderRadius: "8px",
            border: "1px solid #E0E0E0",
            boxShadow: "",
          }}
        >
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
              Balance Trend
            </Typography>
            <Divider
              sx={{
                width: "calc(100% - 80px)",
                backgroundColor: "#11111180",
                //alignSelf: "flex-start",
                paddingLeft: "25px",
                marginTop: "10px",
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "206px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* for line chart */}
              <LineChart data={data} labels={labels} height="300px" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Firstrow;
