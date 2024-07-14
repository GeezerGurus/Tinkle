import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  useTheme,
  Backdrop,
  useMediaQuery,
  Autocomplete,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router-dom";
import { BudgetItem, CreateBudget } from "../../components/budget";
import { BackBtn, Loader, SpeedDial } from "../../components/utils";
import { getBudgetPeriodically } from "../../api/budgetsApi";

const BudgetPeriod = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const { periodType } = useParams();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const fetchBudgets = useCallback(async () => {
    setIsLoading(true);
    const res = await getBudgetPeriodically(periodType);
    setBudgets(res || []);
    setIsLoading(false);
  }, [periodType]);

  useEffect(() => {
    fetchBudgets();
  }, [periodType, fetchBudgets]);

  // const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    navigate(-1);
  };

  const filteredBudgets = selectedBudget
    ? budgets.filter((budget) => budget.name === selectedBudget)
    : budgets;

  return (
    <Box
      sx={{
        width: "100%",
        height: isSmallScreen ? "auto" : "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
        position: "relative",
        overflowX: isSmallScreen ? "hidden" : "",
      }}
    >
      <Loader isLoading={isLoading} />

      {/* Loading */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Back button  */}
      <BackBtn />

      {/* Header Stack */}
      <Stack alignItems={"center"}>
        {/* Header */}
        <Typography variant={isSmallScreen ? "h5" : "h4"} gutterBottom>
          {periodType
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Typography>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={budgets.map((budget) => budget.name)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Budgets" />}
          onChange={(event, newValue) => setSelectedBudget(newValue)}
        />
      </Stack>

      {/* Contents box */}
      <Box
        sx={{
          width: isMediumScreen ? "100%" : "65%",
          height: isSmallScreen ? "auto" : "781px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflowY: "auto",
          gap: "24px",
          padding: "0px 2%",
        }}
      >
        {filteredBudgets.map((budget, index) => (
          <BudgetItem
            id={budget._id}
            title={budget.name}
            total={budget.initial}
            spent={budget.spent || 0}
            remains={budget.amount}
            progressPercent={(budget.amount / budget.initial) * 100}
            key={index}
          />
        ))}
      </Box>

      {/* Create Budget  */}
      <SpeedDial
        modal={
          <CreateBudget
            onClose={handleCloseModal}
            periodProp={periodType}
            refresh={fetchBudgets}
          />
        }
      />
    </Box>
  );
};

export default BudgetPeriod;
