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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { tokens } from "../../theme";
import { Progress, ConfirmModal, BackBtn } from "../../components/utils";
import { EditBudget } from "../../components/budget";

const rows = [
  {
    date: "2024-06-26",
    category: "Food",
    account: "Checking Account",
    note: "Grocery shopping",
    amount: 50.0,
  },
  {
    date: "2024-06-25",
    category: "Utilities",
    account: "Savings Account",
    note: "Electricity bill",
    amount: 80.0,
  },
  {
    date: "2024-06-24",
    category: "Entertainment",
    account: "Credit Card",
    note: "Movie tickets",
    amount: 30.0,
  },
  {
    date: "2024-06-23",
    category: "Transportation",
    account: "Cash",
    note: "Taxi fare",
    amount: 15.0,
  },
  {
    date: "2024-06-22",
    category: "Shopping",
    account: "Checking Account",
    note: "Clothing",
    amount: 100.0,
  },
  {
    date: "2024-06-21",
    category: "Healthcare",
    account: "Health Savings Account",
    note: "Doctor's appointment",
    amount: 120.0,
  },
  {
    date: "2024-06-20",
    category: "Dining Out",
    account: "Credit Card",
    note: "Restaurant dinner",
    amount: 70.0,
  },
  {
    date: "2024-06-19",
    category: "Travel",
    account: "Travel Credit Card",
    note: "Flight booking",
    amount: 300.0,
  },
  {
    date: "2024-06-18",
    category: "Education",
    account: "Savings Account",
    note: "Textbooks",
    amount: 85.0,
  },
  {
    date: "2024-06-17",
    category: "Insurance",
    account: "Insurance Savings",
    note: "Car insurance premium",
    amount: 150.0,
  },
  {
    date: "2024-06-16",
    category: "Home Improvement",
    account: "Home Equity Line",
    note: "Paint and supplies",
    amount: 200.0,
  },
];

const BudgetOverview = ({ title, total, progressPercent, spent, remains }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { periodType } = useParams();
  const [modal, setModal] = useState("");

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const sidebarWidth = 84;

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
        p: isSmallScreen ? 1 : "",
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
        position: "relative",
        overflowX: isSmallScreen ? "hidden" : "",
      }}
    >
      {/* Loading */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Back button  */}
      <Box sx={{ position: "absolute", left: 16, top: isSmallScreen ? 0 : 16 }}>
        <BackBtn />
      </Box>

      {/* Header Stack */}
      <Stack alignItems={"center"}>
        {/* Header */}
        <Typography variant={isSmallScreen ? "h5" : "h4"} gutterBottom>
          Overview
        </Typography>

        {/* Navigate left and right */}
        <ButtonGroup
          variant="contained"
          sx={{
            width: isMediumScreen ? "80%" : "100%",
            borderRadius: "16px",
            border: `1px solid ${colors.purple[600]}`,
          }}
        >
          <Button
            sx={{
              width: isSmallScreen ? "25%" : "96px",
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
              width: isSmallScreen ? "25%" : "96px",
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

      {/* Item details  */}
      <Paper
        sx={{
          width: isMediumScreen ? (isSmallScreen ? "100%" : "80%") : "56%",
          minHeight: "184px",
          borderRadius: "16px",
          backgroundColor: colors.purple[100],
          padding: isSmallScreen ? "19px 24px" : "32px 56px",
        }}
      >
        <Stack justifyContent={"space-between"} sx={{ height: "100%" }}>
          {/* Title  */}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <Typography variant={isSmallScreen ? "body1" : "h6"}>
                Home
              </Typography>
              <IconButton
                onClick={() => {
                  setModal("Edit_Budget");
                  setOpen(true);
                }}
              >
                <EditIcon
                  fontSize="medium"
                  sx={{
                    backgroundColor: colors.vibrant.light_blue,
                    borderRadius: "50%",
                    padding: "2px",
                  }}
                />
              </IconButton>
            </Stack>

            <Stack direction={"row"} alignItems={"flex-end"} gap={"4px"}>
              <Typography variant={isSmallScreen ? "body3" : "h6"}>
                500
              </Typography>
              <Typography variant={isSmallScreen ? "body4" : "body1"}>
                MMK
              </Typography>
            </Stack>
          </Stack>

          {/* Progress bar  */}
          <Progress percent={80} height={32} />

          {/* Info  */}
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack alignItems={"flex-start"}>
              <Typography variant={isSmallScreen ? "body4" : "body3"}>
                200 MMK
              </Typography>
              <Typography variant={isSmallScreen ? "body3" : "body2"}>
                Spent
              </Typography>
            </Stack>
            <Stack alignItems={"center"}>
              <Typography variant="body3">80%</Typography>
              <Typography variant={isSmallScreen ? "body3" : "body2"}>
                Remains
              </Typography>
            </Stack>
            <Stack alignItems={"flex-end"}>
              <Typography variant={isSmallScreen ? "body4" : "body3"}>
                300 MMK
              </Typography>
              <Typography variant={isSmallScreen ? "body3" : "body2"}>
                Remains
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      {/* Contents box table */}
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "56%",
          height: "781px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflowY: "auto",
          gap: "14px",
        }}
      >
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            sx={{ minWidth: isSmallScreen ? "100%" : 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Category</TableCell>
                {!isSmallScreen && (
                  <>
                    <TableCell align="center">Account</TableCell>
                    <TableCell align="center">Note</TableCell>
                  </>
                )}
                <TableCell align="center">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: colors.extra.faint_white }}>
              {rows.map((row) => (
                <TableRow
                  key={row.date}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  {!isSmallScreen && (
                    <>
                      <TableCell align="center">{row.account}</TableCell>
                      <TableCell align="center">{row.note}</TableCell>
                    </>
                  )}
                  <TableCell align="center">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add new budget button */}
      <IconButton
        onClick={() => {
          setModal("Delete_Confirm");
          setOpen(true);
        }}
        size="large"
        sx={{
          position: "absolute",
          right: 16,
          bottom: 16,
          width: isSmallScreen ? "72px" : "116px",
          height: isSmallScreen ? "72px" : "116px",
          backgroundColor: colors.purple[200],
        }}
      >
        <DeleteIcon
          fontSize="large"
          sx={{
            color: colors.extra.red_accent,
            width: isSmallScreen ? "32px" : "48px",
            height: isSmallScreen ? "32px" : "48px",
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
          {modal === "Edit_Budget" ? (
            <EditBudget
              onClose={() => {
                setOpen(false);
              }}
              items={items}
              // refresh={fetchItems}
            />
          ) : (
            <ConfirmModal
              highlight={"Delete"}
              color={colors.extra.red_accent}
              promptText={"Do you really want to Delete?"}
              description={"This action will delete your whole Budget plan."}
              onClose={() => {
                setOpen(false);
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default BudgetOverview;
