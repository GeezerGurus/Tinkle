import { React, useState, useEffect } from "react";
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
  useMediaQuery,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";
import { getRecords } from "../../api/recordsApi";

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
  const [rowsData, setRowsData] = useState([]);

  const headers = ["Date", "Category", "Account", "Notes", "Amount"];

  const fetchRecords = async () => {
    const res = await getRecords();
    setRowsData(res);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <TableContainer sx={{ overflow: "hidden" }}>
      <Table sx={{ border: "none" }}>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
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
          {rowsData.map((rowData, index) => (
            <DataRow key={index} data={rowData} colors={colors} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Transactions = ({ isMediumScreen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Paper
      sx={{
        display: isMediumScreen ? "none" : "",
        height: isLargeScreen ? "auto" : "354px",
        borderRadius: "16px",
        // overflowY: "auto",
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
