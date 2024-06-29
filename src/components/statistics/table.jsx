import * as React from "react";
import {
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Icon,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ShowMoreBtn from "../utils/ShowMoreBtn";
const TableData = ({ data }) => {
  const getIconForFact = (fact) => {
    switch (fact) {
      case "Food and Drinks":
        return <RestaurantIcon sx={{ marginRight: "8px", color: "#A8BCF5" }} />;
      case "Health and Beauty":
        return (
          <VolunteerActivismIcon
            sx={{ marginRight: "8px", color: "#F5ADA8" }}
          />
        );
      case "Education and Development":
        return (
          <LocalLibraryIcon sx={{ marginRight: "8px", color: "#7772F2" }} />
        );
      case "Charges, Fees":
        return (
          <DirectionsBikeIcon sx={{ marginRight: "8px", color: "#F5EEA8" }} />
        );
      default:
        return null;
    }
  };
  const renderCashMethod = (method) => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          backgroundColor: "green",
          borderRadius: "50%",
          marginRight: 1,
        }}
      />
      <Typography variant="body4">{method}</Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "378px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        <Box
          sx={{
            alignSelf: "start",
            width: "548px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              lineHeight: "36px",
              fontWeight: "600",
              color: "black",
              //alignSelf: "flex-start",
              paddingLeft: "40px",
            }}
          >
            Record
          </Typography>

          <ShowMoreBtn />
        </Box>

        <Divider
          sx={{
            width: "calc(100% - 80px)",
            backgroundColor: "#11111180",
            paddingLeft: "25px",
            marginTop: "10px",
          }}
        />
      </Box>
      <Box sx={{ height: "300px", overflow: "auto" }}>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index} sx={{ borderBottom: "none" }}>
                  <TableCell sx={{ borderBottom: "none" }}>
                    <Typography variant="body4">{row.date}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {getIconForFact(row.fact)}
                    <Typography variant="body4">{row.fact}</Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    <Typography variant="body4">
                      {renderCashMethod(row.method)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }} align="right">
                    <Typography variant="body4" sx={{ color: "red" }}>
                      {row.amount}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TableData;
