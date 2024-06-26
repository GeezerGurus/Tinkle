import React, { useState, useEffect } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Modal,
  Stack,
  Typography,
  useTheme,
  Backdrop,
  IconButton,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useParams } from "react-router-dom";
import { BudgetItem, CreateBudget } from "../../components/budget";
import { BackBtn } from "../../components/utils";
import { tokens } from "../../theme";

const budgetItems = [
  {
    title: "Marketing",
    total: 1000000,
    progressPercent: "30",
    spent: 500000,
    remains: 500000,
  },
  {
    title: "Development",
    total: 1500000,
    progressPercent: "50",
    spent: 800000,
    remains: 700000,
  },
  {
    title: "Operations",
    total: 500000,
    progressPercent: "80",
    spent: 200000,
    remains: 300000,
  },
  {
    title: "Research",
    total: 700000,
    progressPercent: "10",
    spent: 350000,
    remains: 350000,
  },
  {
    title: "Customer Support",
    total: 400000,
    progressPercent: "0",
    spent: 150000,
    remains: 250000,
  },
];

const BudgetPeriod = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { periodType } = useParams();

  // Mock function to simulate fetching data
  // const fetchItems = async () => {
  //   setIsLoading(true);
  //   let timeoutId;

  //   // Simulate async call
  //   timeoutId = setTimeout(() => {
  //     setItems(budgetItems); // Using mock budgetItems for demonstration
  //     setIsLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timeoutId);
  // };

  // useEffect(() => {
  //   fetchItems();
  // }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
        position: "relative",
      }}
    >
      {/* Loading */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ position: "absolute", left: 16, top: 16 }}>
        <BackBtn />
      </Box>

      {/* Header Stack */}
      <Stack alignItems={"center"}>
        {/* Header */}
        <Typography variant="h4" gutterBottom>
          {periodType
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Typography>

        {/* Navigate left and right */}
        <ButtonGroup
          variant="contained"
          sx={{
            borderRadius: "16px",
            border: `1px solid ${colors.purple[600]}`,
          }}
        >
          <Button
            sx={{
              width: "96px",
              borderRadius: "16px",
              backgroundColor: "white",
              color: colors.purple[700],
              "&:hover": {
                backgroundColor: colors.purple[100],
              },
            }}
          >
            <NavigateBeforeIcon />
          </Button>
          <Stack
            justifyContent="center"
            alignItems="center"
            width="344px"
            height="40px"
            sx={{ backgroundColor: colors.purple[600], color: "white" }}
          >
            <Typography variant="body1">23/6 - 30/6</Typography>
          </Stack>
          <Button
            sx={{
              width: "96px",
              borderRadius: "16px",
              backgroundColor: "white",
              color: colors.purple[700],
              "&:hover": {
                backgroundColor: colors.purple[100],
              },
            }}
          >
            <NavigateNextIcon />
          </Button>
        </ButtonGroup>
      </Stack>

      {/* Contents box */}
      <Box
        sx={{
          width: "60%",
          height: "781px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflowY: "auto",
          gap: "14px",
        }}
      >
        {budgetItems.map((budgetItem, index) => (
          <BudgetItem
            title={budgetItem.title}
            total={budgetItem.total}
            spent={budgetItem.spent}
            remains={budgetItem.remains}
            progressPercent={budgetItem.progressPercent}
            key={index}
          />
        ))}
      </Box>

      {/* Add new budget button */}
      <IconButton
        onClick={() => setOpen(true)}
        size="large"
        sx={{
          position: "absolute",
          right: 16,
          bottom: 16,
          width: "116px",
          height: "116px",
          backgroundColor: colors.purple[200],
        }}
      >
        <AddIcon
          fontSize="large"
          sx={{
            width: "48px",
            height: "48px",
          }}
        />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CreateBudget
            onClose={() => {
              setOpen(false);
            }}
            items={items}
            // refresh={fetchItems}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default BudgetPeriod;
