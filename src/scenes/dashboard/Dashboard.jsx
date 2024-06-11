//import React, { Component } from "react";
import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GridViewIcon from "@mui/icons-material/GridView";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { tokens } from "../../theme";
import { Typography, useTheme, Box, Button } from "@mui/material";
import { Balancecom, Balancetrend } from "../../components";
import { Transactions } from "../../components/Dashboard/transactions";
import { Expenses } from "../../components/Dashboard/expenses";
import { MoreDetails } from "../../components/Dashboard/moreDetails";
import Budget from "../../components/Dashboard/budget_wiget";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    // mainbox
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "946px",
      }}
    >
      {/* mainbox-Left side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "912px",
          height: "892px",
          marginRight: "24px",
        }}
      >
        {/* Balancecom top 4 components */}
        <Box
          sx={{
            display: "flex",
            height: "211px",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <Balancecom
            Icon={MonetizationOnIcon}
            Reason="Wallet"
            Amount="$1,234.56"
            Color=" #E3D23D"
          />
          <Balancecom
            Icon={AccountBalanceIcon}
            Reason="Bank"
            Amount="$2,345.67"
            Color="#5DE381"
          />
          <Balancecom
            Icon={GridViewIcon}
            Reason="Kpay"
            Amount="$3,456.78"
            Color="#4B47E3"
          />
          <Balancecom
            Icon={CreditScoreIcon}
            Reason="Saving"
            Amount="$4,567.89"
            Color="#E33E32"
          />
        </Box>
        {/* Balancetrend,Expenses middle row components */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "279px",
            marginBottom: "24px",
          }}
        >
          <Balancetrend />
          <Expenses />
        </Box>

        {/* Transactions last row components */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "354px",
          }}
        >
          <Transactions />
        </Box>
      </Box>
      {/* main right side component */}
      <Box
        sx={{
          width: "369px",
          backgroundColor: "grey",
          marginBottom: "24px",
          height: "892px",
          borderRadius: "8px",
          border: "1px solid",
        }}
      >
        {/* Budget component */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "274px",
            border: "1px",
            backgroundColor: "white",
          }}
        >
          {/* header box of Budget */}
          <Box
            sx={{
              marginLeft: "26px",
              marginTop: "18px",
              height: "23px",
              marginBottom: "13.5px",
              width: "317.5px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",

              //backgroundColor: "red",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                lineHeight: "24.2px",
                fontWeight: "600",
                letterSpacing: "1%",
                color: "black",
              }}
            >
              Budgets
            </Typography>
            <Button
              sx={{
                width: "71px",
                height: "26px",
                borderRadius: "7px",
                border: "1px dotted #828282",
                whiteSpace: "nowrap",
                textTransform: "none",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "200",
                  lineHeight: "14.52px",
                  letterSpacing: "1%",
                }}
              >
                Show more
              </Typography>
            </Button>
          </Box>
          {/* the small line */}
          <Box
            sx={{
              height: "1px",
              width: "calc(100% - 24px)",
              marginLeft: "14px",
              backgroundColor: "black",
            }}
          />

          {/* 1st row of Budget */}
          <Box
            sx={{
              marginLeft: "30px",
              marginTop: "13.5px",
              width: "84%",
              height: "36px",
              //backgroundColor: "red",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Budget content="Home" dollar="$60" percent="90%" />
            {/* first row content box */}
            <Box
              sx={{
                width: "217.5px",
                height: "100%",
              }}
            ></Box>

            {/* firstrow $ box */}
            <Box
              sx={{
                width: "60px",
                height: "100%",
              }}
            ></Box>
            {/* firstrow % box */}
            <Box
              sx={{
                width: "40px",
                height: "100%",
              }}
            ></Box>
          </Box>

          {/* 2nd row of Budget */}
          <Box
            sx={{
              marginLeft: "30px",
              width: "84%",
              height: "36px",
              // backgroundColor: "gold",
              marginTop: "16px",
            }}
          >
            <Budget content="School" dollar="$70" percent="30%" />
            {/* second row content box */}
            <Box
              sx={{
                width: "217.5px",
                height: "100%",
              }}
            ></Box>

            {/* second row $ box */}
            <Box
              sx={{
                width: "60px",
                height: "100%",
              }}
            ></Box>
            {/* second row % box */}
            <Box
              sx={{
                width: "40px",
                height: "100%",
              }}
            ></Box>
          </Box>

          {/* 3rd row of Budget */}
          <Box
            sx={{
              marginLeft: "30px",
              width: "84%",
              height: "36px",
              // backgroundColor: "green",
              marginTop: "16px",
            }}
          >
            <Budget content="Gas Fee" dollar="-$300" percent="-56%" />
            {/* third row content box */}
            <Box
              sx={{
                width: "217.5px",
                height: "100%",
              }}
            ></Box>
            {/* third row $ box */}
            <Box
              sx={{
                width: "60px",
                height: "100%",
              }}
            ></Box>
            {/* third row % box */}

            <Box
              sx={{
                width: "40px",
                height: "100%",
              }}
            ></Box>
          </Box>

          {/* last row of Budget */}
          <Box
            sx={{
              marginTop: "25px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Box
              sx={{
                width: "16px",
                height: "16px",
                border: "0px",
                backgroundColor: "#00F79E",
              }}
            ></Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "200",
                lineHeight: "14.52px",
                letterSpacing: "1%",
                color: "black",
                marginLeft: "-20px",
              }}
            >
              In Limit
            </Typography>
            <Box
              sx={{
                width: "16px",
                height: "16px",
                border: "0px",
                backgroundColor: "#FF8744",
              }}
            ></Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "200",
                lineHeight: "14.52px",
                letterSpacing: "1%",
                color: "black",
                marginLeft: "-20px",
              }}
            >
              Risk of Overspent
            </Typography>
            <Box
              sx={{
                width: "16px",
                height: "16px",
                backgroundColor: "#FF0000",
                border: "1px solid",
              }}
            ></Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "200",
                lineHeight: "14.52px",
                letterSpacing: "1%",
                color: "black",
                marginLeft: "-20px",
              }}
            >
              Overspent
            </Typography>
          </Box>
        </Box>

        <MoreDetails />
      </Box>
    </Box>
  );
};

export default Dashboard;
