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
  Paper,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { ShowMoreBtn } from "../utils";

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
              variant="text"
              sx={{
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

const BasicTable = () => {
  const rowsData = [
    ["Date", "Category", "Account", "Notes", "Amount"],
    ["01-01-2024", "Groceries", "Savings", "Weekly shopping", "$50.00"],
    ["01-02-2024", "Utilities", "Checking", "Electric bill", "$100.00"],
    ["01-03-2024", "Entertainment", "Credit Card", "Movie night", "$20.00"],
    ["01-04-2024", "Transportation", "Checking", "Gasoline", "$40.00"],
    ["01-05-2024", "Healthcare", "Savings", "Doctor's visit", "$80.00"],
  ];

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
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", fontSize: "12px", color: "black" }}
                >
                  {header}
                </Typography>
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
};

const Transactions = () => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        color: "black",
        width: "100%",
        height: "354px",
        borderRadius: "8px",
      }}
    >
      <Paper
        sx={{
          height: "69px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 23px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="title">Transactions</Typography>
        <ShowMoreBtn to={"/records"} />
      </Paper>
      <BasicTable />
    </Box>
  );
};

export default Transactions;
