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
import { CategoryIcons, Loader, ShowMoreBtn } from "../utils";
import { tokens } from "../../theme";
import { getRecords } from "../../api/recordsApi";
import { getAccount } from "../../api/accountApi";
import { getCategory } from "../../api/categoriesApi";

const DataRow = ({ data, colors, accountName, icon }) => {
  const IconComponent = icon ? CategoryIcons[icon.icon] : null;

  return (
    <TableRow
      sx={{
        backgroundColor: data.type === "expense" ? colors.purple[100] : "",
      }}
    >
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
          {IconComponent && (
            <IconComponent
              sx={{
                marginRight: 1,
                color: "white",
                border: "1px solid",
                borderColor: icon.color,
                backgroundColor: icon.color,
                borderRadius: "50%",
              }}
            />
          )}

          <Typography variant="body4">{icon?.name}</Typography>
        </Box>
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
          <Typography variant="body4"> {accountName}</Typography>
        </Box>
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
  const [accountNames, setAccountNames] = useState({});
  const [categoryDetails, setCategoryDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const headers = ["Date", "Category", "Account", "Notes", "Amount"];

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const records = await getRecords();
      setRowsData(records);

      // Fetch account names for each row
      const accountIds = records.map((record) => record.accountId);
      const uniqueAccountIds = [...new Set(accountIds)];
      const accountNamesMap = {};

      await Promise.all(
        uniqueAccountIds.map(async (id) => {
          const account = await getAccount(id);
          accountNamesMap[id] = account.name;
        })
      );

      setAccountNames(accountNamesMap);

      // Fetch category details for each row
      const categoryIds = records.map((record) => record.category);
      const uniqueCategoryIds = [...new Set(categoryIds)];
      const categoryDetailsMap = {};

      await Promise.all(
        uniqueCategoryIds.map(async (id) => {
          const category = await getCategory(id);
          categoryDetailsMap[id] = {
            name: category.name,
            color: category.color,
            icon: category.icon,
          };
        })
      );

      setCategoryDetails(categoryDetailsMap);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <TableContainer sx={{ overflow: "hidden", padding: "0 24px" }}>
      <Loader isLoading={isLoading} />
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
          {rowsData.slice(0, 5).map((rowData, index) => (
            <DataRow
              key={index}
              data={rowData}
              colors={colors}
              accountName={accountNames[rowData.accountId]}
              icon={categoryDetails[rowData.category]}
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
