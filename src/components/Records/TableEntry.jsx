import * as React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Category } from "../utils/Category";
import { Account } from "../utils/Account";
import { DatePicker } from "../utils/DatePicker";
import { useState } from "react";
import NumberRangePicker from "../utils/NumberRangePicker";

const DataRow = ({ data }) => {
  return (
    <TableRow>
      {data.map((text, index) => (
        <TableCell
          key={index}
          align="center"
          sx={{ borderBottom: "none", padding: "14px" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {index === 2 && (
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor:
                    parseFloat(data[4].slice(1)) > 50 ? "green" : "red",
                  marginRight: "8px",
                }}
              />
            )}
            {index === 1 && text !== "Category" && (
              <RestaurantIcon
                sx={{
                  marginRight: 1,
                  color: "white",
                  border: "1px solid",
                  borderColor:
                    parseFloat(data[4].slice(1)) > 50 ? "green" : "red",
                  backgroundColor:
                    parseFloat(data[4].slice(1)) > 50 ? "green" : "red",
                  borderRadius: "50%",
                }}
              />
            )}
            <Typography
              variant="body1"
              sx={{
                fontWeight: "600",
                fontSize: "12px",
                color:
                  index === 4
                    ? parseFloat(text.slice(1)) > 50
                      ? "green"
                      : "red"
                    : "black",
                lineHeight: "150%",
              }}
            >
              {text}
            </Typography>
          </Box>
        </TableCell>
      ))}
    </TableRow>
  );
};

export default function BasicTable() {
  const rowsData = [
    ["Date", "Category", "Account", "Notes", "Amount"],
    ["01-01-2024", "Groceries", "Savings", "Weekly shopping", "$50.00"],
    ["01-02-2024", "Utilities", "Checking", "Electric bill", "$100.00"],
    ["01-03-2024", "Entertainment", "Credit Card", "Movie night", "$20.00"],
    ["01-04-2024", "Transportation", "Checking", "Gasoline", "$40.00"],
    ["01-05-2024", "Healthcare", "Savings", "Doctor's visit", "$80.00"],
  ];
  // for amount number range
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(100);

  const handleStartChange = (value) => {
    setStartValue(value);
  };

  const handleEndChange = (value) => {
    setEndValue(value);
  };


  return (
    <TableContainer sx={{ height: "100%" }}>
      <Table sx={{ border: "none" }}>
        <TableHead>
          <TableRow>
            {rowsData[0].map((header, index) => (
              <TableCell
                key={index}
                align="center"
                sx={{ borderBottom: "none" }}
              >
                {header === "Date" ? (
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      color: "black",
                      lineHeight: "150%",
                    }}
                  >
                    <Button
                      endIcon={<DatePicker />}
                      disableRipple
                      disableFocusRipple
                      sx={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "transparent", // remove background color on hover
                        },
                        "&:active": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {header}
                    </Button>
                  </Typography>
                ) : header === "Category" ? (
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      color: "black",
                      lineHeight: "150%",
                    }}
                  >
                    <Button
                      endIcon={<Category />}
                      disableRipple
                      disableFocusRipple
                      sx={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "transparent", // remove background color on hover
                        },
                        "&:active": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {header}
                    </Button>
                  </Typography>
                ) : header === "Account" ? (
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      color: "black",
                      lineHeight: "150%",
                    }}
                  >
                    <Button
                      endIcon={<Account />}
                      disableRipple
                      disableFocusRipple
                      sx={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "transparent", // remove background color on hover
                        },
                        "&:active": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {header}
                    </Button>
                  </Typography>
                ) : header === "Amount" ? (
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      color: "black",
                      lineHeight: "150%",
                    }}
                  >
                    <Button
                      endIcon={
                        <NumberRangePicker
                          startValue={startValue}
                          endValue={endValue}
                          onStartChange={handleStartChange}
                          onEndChange={handleEndChange}
                        />
                      }
                      disableRipple
                      disableFocusRipple
                      sx={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "transparent", // remove background color on hover
                        },
                        "&:active": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {header}
                    </Button>
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: "black",
                    }}
                  >
                    {header}
                  </Typography>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.slice(1).map((rowData, index) => (
            <DataRow key={index} data={rowData} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
