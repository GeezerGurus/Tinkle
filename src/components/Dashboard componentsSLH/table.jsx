import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function createData(date, category, account, note, amount) {
  return { date, category, account, note, amount };
}

const rows = [
  createData(
    "02-01-2024",
    "Food and Drinks",
    "Cash",
    "Went to KFC with...",
    "-MMK 25000kyats"
  ),
  createData(
    "31-03-2024",
    "Food and Drinks",
    "K-pay",
    "Went to KFC with...",
    "+MMK 25000kyats"
  ),
  createData(
    "02-01-2024",
    "Food and Drinks",
    "Cash",
    "Went to KFC with...",
    "-MMK 25000kyats"
  ),
  createData(
    "02-01-2024",
    "Food and Drinks",
    "Cash",
    "Went to KFC with...",
    "-MMK 25000kyats"
  ),
  createData(
    "31-03-2024",
    "Food and Drinks",
    "K-pay",
    "Went to KFC with...",
    "+MMK 25000kyats"
  ),
];

const BasicTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ backgroundColor: "white", border: "1px pale black" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: "black",
              }}
            >
              Date
            </TableCell>
            <TableCell
              sx={{
                color: "black",
              }}
            >
              Category
            </TableCell>
            <TableCell
              sx={{
                color: "black",
              }}
            >
              Account
            </TableCell>
            <TableCell
              sx={{
                color: "black",
              }}
            >
              Note
            </TableCell>
            <TableCell
              sx={{
                color: "black",
              }}
            >
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  color: "black",
                }}
              >
                {row.date}
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                }}
              >
                {row.category}
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                }}
              >
                {row.account}
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                }}
              >
                {row.note}
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                }}
              >
                {row.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;