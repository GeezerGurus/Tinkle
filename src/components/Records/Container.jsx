import * as React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/material";
import { tokens } from "../../theme";
import NavButton from "../utils/NavButton";
import Expense from "./Expense";
import Income from "./Income";
import Transfer from "./Transfer";
import CloseIcon from "@mui/icons-material/Close";

export const ContainerFrame = ({ onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = React.useState("expense");

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
    <Box
      sx={{
        width: "600px",
        height: "855px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        // justifyContent:"space-between",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "40px",
          }}
        ></Box>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "24px",
            color: "black",
          }}
        >
          ADD RECORD
        </Typography>
        <CloseIcon
          onClick={onClose}
          sx={{
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
      </Box>
      <Stack
        spacing={0}
        direction="row"
        sx={{
          width: "470px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          backgroundColor: "black",
        }}
      >
        <NavButton
          variant="contained"
          value="expense"
          onClick={handlePage}
          sx={{
            backgroundColor: page === "expense" ? "black" : "white",
            color: page === "expense" ? "white" : "black",
            "&:hover": {
              backgroundColor:
                page === "expense" ? "grey" : theme.palette.neutral.dark,
            },
          }}
        >
          Expense
        </NavButton>
        <NavButton
          variant="contained"
          value="income"
          onClick={handlePage}
          sx={{
            backgroundColor: page === "income" ? "black" : "white",
            color: page === "income" ? "white" : "black",
            "&:hover": {
              backgroundColor:
                page === "income" ? "grey" : theme.palette.neutral.dark,
            },
          }}
        >
          Income
        </NavButton>
        <NavButton
          variant="contained"
          value="transfer"
          onClick={handlePage}
          sx={{
            backgroundColor: page === "transfer" ? "black" : "white",
            color: page === "transfer" ? "white" : "black",
            "&:hover": {
              backgroundColor:
                page === "transfer" ? "grey" : theme.palette.neutral.dark,
            },
          }}
        >
          Transfer
        </NavButton>
      </Stack>
      {/* --------------------------------------------------------------------------------------- */}
      {renderPage()}
      {/* ===================================================================== */}

      <NavButton
        sx={{
          backgroundColor: "black",
          color: "white",
          width: "240px",
          marginBottom: "40px",
        }}
      >
        Save Record
      </NavButton>
    </Box>
  );
};
export default ContainerFrame;
