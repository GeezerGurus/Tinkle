import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

const RecordsTable = ({ data }) => {
  const getIconForFact = (fact) => {
    switch (fact) {
      case "Food and Drinks":
        return <RestaurantIcon sx={{ color: "#A8BCF5" }} />;
      case "Health and Beauty":
        return <VolunteerActivismIcon sx={{ color: "#F5ADA8" }} />;
      case "Education and Development":
        return <LocalLibraryIcon sx={{ color: "#7772F2" }} />;
      case "Charges, Fees":
        return <DirectionsBikeIcon sx={{ color: "#F5EEA8" }} />;
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ overflow: "auto" }}>
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
                {!isSmallScreen && (
                  <TableCell sx={{ borderBottom: "none" }}>
                    <Typography variant="body4">
                      {renderCashMethod(row.method)}
                    </Typography>
                  </TableCell>
                )}
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
  );
};

export default RecordsTable;
