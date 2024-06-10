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

<<<<<<< HEAD
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
=======
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
>>>>>>> c382cea40a902eea9c99b5490757c73de617bf78
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
<<<<<<< HEAD
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
=======
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
>>>>>>> c382cea40a902eea9c99b5490757c73de617bf78
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
