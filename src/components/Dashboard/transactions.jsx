import React, { useState, useEffect } from "react";
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
import { getAccount } from "../../api/accountApi";

const DataRow = ({ data, colors, accountName }) => {
  return (
    <TableRow>
      <TableCell
        align="center"
        sx={{ borderBottom: "none", paddingBottom: "8px" }}
      >
        <Typography variant="body4"> {data.date.split("T")[0]}</Typography>
      </TableCell>
      <TableCell
        align="center"
        sx={{ borderBottom: "none", paddingBottom: "8px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor:
                data.type === "income"
                  ? colors.green[100]
                  : colors.category.red,
              marginRight: "8px",
            }}
          />
          <RestaurantIcon
            sx={{
              marginRight: 1,
              color: "white",
              border: "1px solid",
              borderColor:
                data.type === "income"
                  ? colors.green[100]
                  : colors.category.red,
              backgroundColor:
                data.type === "income"
                  ? colors.green[100]
                  : colors.category.red,
              borderRadius: "50%",
            }}
          />
          <Typography
            variant="body4"
            sx={{
              color:
                data.type === "income"
                  ? colors.green[500]
                  : colors.extra.red_accent,
            }}
          >
            {data.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell
        align="center"
        sx={{ borderBottom: "none", paddingBottom: "8px" }}
      >
        <Typography variant="body4"> {accountName}</Typography>
      </TableCell>
      <TableCell
        align="center"
        sx={{ borderBottom: "none", paddingBottom: "8px" }}
      >
        <Typography variant="body4">{data.notes}</Typography>
      </TableCell>
      <TableCell
        align="center"
        sx={{ borderBottom: "none", paddingBottom: "8px" }}
      >
        <Typography
          variant="body4"
          sx={{
            color:
              data.type === "income"
                ? colors.green[500]
                : colors.extra.red_accent,
          }}
        >
          {data.type === "income" ? "+ " : "- "}MMK {data.amount}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

const BasicTable = ({ colors }) => {
  const [rowsData, setRowsData] = useState([]);
  const [accountNames, setAccountNames] = useState({}); // Added state for account names

  const headers = ["Date", "Category", "Account", "Notes", "Amount"];

  const fetchRecords = async () => {
    const records = await getRecords();
    setRowsData(records);

    // Fetch account names for each row
    const accountIds = records.map((record) => record.accountId);
    const uniqueAccountIds = [...new Set(accountIds)];
    const namesMap = {};

    // Fetch account details for each unique accountId
    await Promise.all(
      uniqueAccountIds.map(async (id) => {
        const account = await getAccount(id);
        namesMap[id] = account.name;
      })
    );

    setAccountNames(namesMap);
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
            <DataRow
              key={index}
              data={rowData}
              colors={colors}
              accountName={accountNames[rowData.accountId]}
            />
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
