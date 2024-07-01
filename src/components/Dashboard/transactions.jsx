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
  useTheme,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";

const DataRow = ({ data, colors }) => {
  return (
    <TableRow>
      {data.map((text, index) => (
        <TableCell
          key={index}
          align="center"
          sx={{
            borderBottom: "none",
            paddingBottom: "8px",
          }}
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
                    parseFloat(data[4].slice(1)) > 50
                      ? colors.green[100]
                      : colors.category.red,
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
                    parseFloat(data[4].slice(1)) > 50
                      ? colors.green[100]
                      : colors.category.red,
                  backgroundColor:
                    parseFloat(data[4].slice(1)) > 50
                      ? colors.green[100]
                      : colors.category.red,
                  borderRadius: "50%",
                }}
              />
            )}
            <Typography
              variant="body4"
              sx={{
                color:
                  index === 4
                    ? parseFloat(text.slice(1)) > 50
                      ? colors.green[500]
                      : colors.extra.red_accent
                    : "",
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

const BasicTable = ({ colors }) => {
  const rowsData = [
    ["Date", "Category", "Account", "Notes", "Amount"],
    ["01-01-2024", "Groceries", "Savings", "Weekly shopping", "MMK 50.00"],
    ["01-02-2024", "Utilities", "Checking", "Electric bill", "MMK 100.00"],
    ["01-03-2024", "Entertainment", "Credit Card", "Movie night", "MMK 20.00"],
    ["01-04-2024", "Transportation", "Checking", "Gasoline", "MMK 40.00"],
    ["01-05-2024", "Healthcare", "Savings", "Doctor's visit", "MMK 80.00"],
  ];

  return (
    <TableContainer sx={{ overflow: "hidden" }}>
      <Table sx={{ border: "none" }}>
        <TableHead>
          <TableRow>
            {rowsData[0].map((header, index) => (
              <TableCell
                key={index}
                align="center"
                sx={{ borderBottom: "none" }}
              >
                <Typography variant="body4">{header}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.slice(1).map((rowData, index) => (
            <DataRow key={index} data={rowData} colors={colors} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Transactions = ({ isSmallScreen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper
      sx={{
        display: isSmallScreen ? "none" : "",
        height: "354px",
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          height: "48px",
          display: "flex",
          margin: "16px 24px 0 24px",
          justifyContent: "space-between",
          borderBottom: `${colors.purple[600]} 1px solid`,
        }}
      >
        <Typography variant="h6">Transactions</Typography>
        <ShowMoreBtn to={"/records"} />
      </Box>
      <BasicTable colors={colors} />
    </Paper>
  );
};

export default Transactions;
