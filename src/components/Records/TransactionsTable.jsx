import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridActionsCellItem,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Icon,
  Modal,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { CategoryIcons, ConfirmModal, Loader } from "../utils";
import EditRecord from "./EditRecord";
import { tokens } from "../../theme";
import { getRecords, deleteRecord } from "../../api/recordsApi";
import { getAccount } from "../../api/accountApi";
import { getCategory } from "../../api/categoriesApi";

const CustomToolbar = ({ action }) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton
        slotProps={{ tooltip: { title: "Customize columns" } }}
      />
      {action === "filter" && (
        <GridToolbarFilterButton
          slotProps={{ tooltip: { title: "Filter the data" } }}
        />
      )}
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      {action === "filter" && <GridToolbarQuickFilter />}
      {action === "export" && (
        <GridToolbarExport slotProps={{ tooltip: { title: "Export data" } }} />
      )}
    </GridToolbarContainer>
  );
};

const CustomFooter = ({ selectedRows, handleBulkDelete }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <GridFooterContainer>
      {selectedRows.length > 0 ? (
        <Button
          onClick={handleBulkDelete}
          sx={{
            textTransform: "none",
            color: "white",
            margin: 1,
            borderRadius: "8px",
            backgroundColor: colors.purple[600],
            "&:hover": {
              backgroundColor: colors.purple[200],
            },
          }}
        >
          Delete Selected
        </Button>
      ) : (
        <Box sx={{ flexGrow: 1 }} />
      )}
      <GridPagination />
    </GridFooterContainer>
  );
};

const TransactionsTable = ({ action }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modal, setModal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accountNames, setAccountNames] = useState({});
  const [categoryDetails, setCategoryDetails] = useState({});
  const [selectedRow, setSelectedRow] = useState();
  const [selectedRows, setSelectedRows] = useState([]);

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueFormatter: (params) => {
        return params.split("T")[0];
      },
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => {
        const categoryId = params.row.category;
        const category = categoryDetails[categoryId] || {};
        const IconComponent = CategoryIcons[category.icon];

        return (
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            {IconComponent && <IconComponent sx={{ color: category.color }} />}
            {category.name}
          </Stack>
        );
      },
    },
    {
      field: "account",
      headerName: "Account",
      flex: 1,
      valueGetter: (params, row) => {
        const accountId = row.accountId;
        return accountNames[accountId] || "";
      },
    },
    { field: "notes", headerName: "Note", flex: 1 },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              color:
                params.row.type === "expense"
                  ? colors.extra.red_accent
                  : colors.green[500],
            }}
          >
            {params.row.type === "expense" ? "- MMK " : "+ MMK "}
            {params.value}
          </Box>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: isSmallScreen ? 90 : 100,
      cellClassName: "actions",
      sortable: false,
      getActions: ({ id, row }) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => {
            setSelectedRow(row);
            setModal("edit");
            setOpenModal(true);
          }}
          color="inherit"
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            setSelectedRow(row);
            setModal("delete");
            setOpenModal(true);
          }}
          color="inherit"
        />,
      ],
    },
  ];

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const records = await getRecords();
      setRows(records);

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

  const handleDelete = async (id) => {
    try {
      await deleteRecord(id);
      fetchRecords();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedRows.map(async (id) => {
          await deleteRecord(id);
          console.log("deleted:", id);
        })
      );
      console.log("done");
      setSelectedRows([]);
      await fetchRecords();
    } catch (error) {
      console.error("Error deleting records:", error);
    }
  };

  const columnVisibilityModel = isMediumScreen
    ? {
        date: true,
        category: true,
        amount: true,
        account: false,
        notes: false,
        actions: action === "edit",
      }
    : {
        date: true,
        category: true,
        account: true,
        notes: true,
        amount: true,
        actions: action === "edit",
      };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Paper style={{ height: "603px", width: "100%" }}>
        <DataGrid
          rows={rows}
          getRowId={(row) => row._id}
          columns={columns}
          disableColumnMenu={action !== "filter"}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          columnVisibilityModel={columnVisibilityModel}
          pageSizeOptions={[5, 10, 20, 30]}
          checkboxSelection={action === "edit"}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
          slots={{
            toolbar: () => <CustomToolbar action={action} />,
            footer: () => (
              <CustomFooter
                selectedRows={selectedRows}
                handleBulkDelete={handleBulkDelete}
              />
            ),
          }}
        />
      </Paper>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {modal === "edit" ? (
            <EditRecord
              onClose={() => setOpenModal(false)}
              dataRow={selectedRow}
              refresh={fetchRecords}
            />
          ) : (
            <ConfirmModal
              highlight={"Delete"}
              color={colors.extra.red_accent}
              promptText={"Do you really want to Delete?"}
              description={
                <>
                  This action will delete all the selected records and make
                  changes to your
                  <br /> balance accounts.
                </>
              }
              snackbarText={"Record deleted!"}
              refresh={fetchRecords}
              onClick={() => handleDelete(selectedRow._id)}
              onClose={() => setOpenModal(false)}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default TransactionsTable;
