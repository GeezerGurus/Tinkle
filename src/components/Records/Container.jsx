import React, { useState } from "react";
import {
  Paper,
  Typography,
  useTheme,
  styled,
  Button,
  ButtonGroup,
} from "@mui/material";
import { tokens } from "../../theme";
import Expense from "./Expense";
import Income from "./Income";
import Transfer from "./Transfer";
import CloseIcon from "@mui/icons-material/Close";

const StyledButton = styled(Button)(({ theme }) => ({
  width: "192.67px",
  height: "42px",
  backgroundColor: "white",
  color: "black",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.neutral.dark,
    color: "white",
  },
  fontWeight: "600",
  fontSize: "16px",
}));

export const Container = ({ onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState("expense");

  const handlePage = (event) => {
    setPage(event.target.value);
  };

  const renderPage = () => {
    if (page === "income") {
      return <Income />;
    } else if (page === "transfer") {
      return <Transfer />;
    } else {
      return <Expense />;
    }
  };
  return (
    <Paper
      sx={{
        position: "relative",
        width: "807px",
        height: "855px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "32px",
          color: "black",
          lineHeight: "150%",
          letterSpacing: "-1%",
        }}
      >
        ADD RECORD
      </Typography>
      <CloseIcon
        onClick={onClose}
        sx={{
          margin: "16px",
          top: "0",
          right: "0",
          position: "absolute",
          color: "black",
          width: "40px",
          height: "40px",
          "&:hover": {
            color: "white",
            backgroundColor: "black",
            borderRadius: "50%",
          },
          "&:active": {
            color: "white",
            backgroundColor: "grey",
            borderRadius: "50%",
          },
        }}
      />
      <ButtonGroup variant="contained" sx={{ backgroundColor: "black" }}>
        <StyledButton
          value="expense"
          onClick={handlePage}
          sx={{
            backgroundColor: page === "expense" ? "black" : "white",
            color: page === "expense" ? "white" : "black",
            "&:hover": {
              backgroundColor: page === "expense" ? "grey" : "darkgrey",
            },
          }}
        >
          Expense
        </StyledButton>
        <StyledButton
          value="income"
          onClick={handlePage}
          sx={{
            backgroundColor: page === "income" ? "black" : "white",
            color: page === "income" ? "white" : "black",
            "&:hover": {
              backgroundColor: page === "income" ? "grey" : "darkgrey",
            },
          }}
        >
          Income
        </StyledButton>
        <StyledButton
          value="transfer"
          onClick={handlePage}
          sx={{
            backgroundColor: page === "transfer" ? "black" : "white",
            color: page === "transfer" ? "white" : "black",
            "&:hover": {
              backgroundColor: page === "transfer" ? "grey" : "darkgrey",
            },
          }}
        >
          Transfer
        </StyledButton>
      </ButtonGroup>

      {/* Rendering  */}
      {renderPage()}

      <StyledButton
        sx={{
          backgroundColor: "black",
          color: "white",
          width: "243px",
          marginBottom: "17px",
        }}
      >
        Save Record
      </StyledButton>
    </Paper>
  );
};
export default Container;
