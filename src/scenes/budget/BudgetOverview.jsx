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
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../theme";
import {
  Progress,
  ConfirmModal,
  BackBtn,
  Loader,
  CategoryIcons,
} from "../../components/utils";
import { EditBudget } from "../../components/budget";
import {
  deleteBudget,
  getBudget,
  getBudgetPeriodically,
} from "../../api/budgetsApi";
import { getRecords } from "../../api/recordsApi";
import { getCategory } from "../../api/categoriesApi";

const BudgetOverview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { periodType, budgetId } = useParams();
  const [modal, setModal] = useState("");
  const [budget, setBudget] = useState("");
  const [allBudgets, setAllBudgets] = useState([]);
  const [records, setRecords] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState({});
  const [spent, setSpent] = useState(0);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const getPeriodLabel = (createdAt, periodType) => {
    const date = new Date(createdAt);

    switch (periodType) {
      case "monthly":
        return date.toLocaleString("en-US", { year: "numeric", month: "long" });
      case "yearly":
        return date.toLocaleString("en-US", { year: "numeric" });
      case "one-time":
        const startDate = new Date(budget.startDate);
        const endDate = new Date(budget.endDate);
        return `${startDate.toLocaleDateString(
          "en-US"
        )} - ${endDate.toLocaleDateString("en-US")}`;
      case "weekly":
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay()); // Get start of the week
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Get end of the week

        const startMonth = startOfWeek.toLocaleString("en-US", {
          month: "long",
        });
        const endMonth = endOfWeek.toLocaleString("en-US", { month: "long" });

        return `${startOfWeek.getDate()} ${startMonth} - ${endOfWeek.getDate()} ${endMonth}`;
      default:
        return "";
    }
  };

  const fetchBudget = async () => {
    setIsLoading(true);

    try {
      const budget = await getBudget(budgetId);
      const allBudgets = await getBudgetPeriodically(periodType);
      const records = await getRecords();

      // Filter records based on budgetId
      const filteredRecords = records.filter(
        (record) => record.budgetId === budgetId
      );

      // Calculate total expenses (spent)
      const spent = filteredRecords
        .filter((record) => record.type === "expense")
        .reduce((total, record) => total + record.amount, 0);

      setSpent(spent);

      // Fetch category details for each unique category
      const categoryIds = filteredRecords.map((record) => record.category);
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
      setRecords(filteredRecords);
      setBudget(budget);
      setAllBudgets(allBudgets);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, [periodType, budgetId]);

  const handleNavigate = (direction) => {
    const currentIndex = allBudgets.findIndex(
      (Budget) => Budget._id === budget._id
    );
    let newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0) {
      newIndex = allBudgets.length - 1;
    } else if (newIndex >= allBudgets.length) {
      newIndex = 0;
    }

    navigate(`/budget/${periodType}/${allBudgets[newIndex]._id}`);
  };

  const percentageRemains = Math.round((budget.amount / budget.initial) * 100);

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
      <Loader isLoading={isLoading} />

      {/* Loading */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Back button  */}
      <BackBtn to={"/budget"} />

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
            onClick={() => {
              handleNavigate("left");
            }}
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
            <Typography variant="body1">
              {getPeriodLabel(budget.createdAt, periodType)}
            </Typography>
          </Stack>
          <Button
            onClick={() => {
              handleNavigate("right");
            }}
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
          padding: isSmallScreen ? "19px 24px" : "32px 56px",
          backgroundColor: colors.panel.panel1,
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
                {budget.name}
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
                {budget.initial}
              </Typography>
              <Typography variant={isSmallScreen ? "body4" : "body1"}>
                MMK
              </Typography>
            </Stack>
          </Stack>

          {/* Progress bar  */}
          <Progress percent={percentageRemains} height={32} />

          {/* Info  */}
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack alignItems={"flex-start"}>
              <Typography variant={isSmallScreen ? "body4" : "body3"}>
                {spent} MMK
              </Typography>
              <Typography variant={isSmallScreen ? "body3" : "body2"}>
                Spent
              </Typography>
            </Stack>
            <Stack alignItems={"center"}>
              <Typography variant="body3">{percentageRemains}%</Typography>
              <Typography variant={isSmallScreen ? "body3" : "body2"}>
                Remains
              </Typography>
            </Stack>
            <Stack alignItems={"flex-end"}>
              <Typography variant={isSmallScreen ? "body4" : "body3"}>
                {budget.amount} MMK
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
        <Typography variant="body1" sx={{ border: "1px solid black" }}>
          {budget.description}
        </Typography>
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
                    <TableCell align="center">Transactor</TableCell>
                    <TableCell align="center">Notes</TableCell>
                  </>
                )}
                <TableCell align="center">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: colors.extra.faint_white }}>
              {records.map((record) => {
                const category = categoryDetails[record.category];
                const IconComponent = CategoryIcons[category?.icon];

                return (
                  <TableRow
                    key={record._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {record.date.split("T")[0]}
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={1}
                      >
                        <IconComponent
                          sx={{
                            color: category?.color,
                          }}
                        />
                        {category?.name || "-"}
                      </Stack>
                    </TableCell>
                    {!isSmallScreen && (
                      <>
                        <TableCell align="center">
                          {record.transactor}
                        </TableCell>
                        <TableCell align="center">{record.notes}</TableCell>
                      </>
                    )}
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            record.type === "expense"
                              ? colors.extra.red_accent
                              : colors.green[500],
                        }}
                      >
                        {record.type === "expense" ? "- " : "+ "}
                        {record.amount} MMK
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
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
              budget={budget}
              refresh={fetchBudget}
            />
          ) : (
            <ConfirmModal
              highlight={"Delete"}
              onClick={() => {
                deleteBudget(budget._id);
              }}
              refresh={() => {
                navigate("/budget");
              }}
              snackbarText={"Budget deleted!"}
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
