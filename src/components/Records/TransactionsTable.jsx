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
  Modal,
  Paper,
  Stack,
  colors,
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
import { getBudget } from "../../api/budgetsApi";
import { getCategory } from "../../api/categoriesApi";



const CustomToolbar = ({ action }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton
        slotProps={{ 
          tooltip: { title: 'Customize columns' },
          button: { style: { color: colors.text.text1 } }, // Change color as needed
        }}
      />
      {action === 'filter' && (
        <GridToolbarFilterButton
          slotProps={{ 
            tooltip: { title: 'Filter the data' },
            button: { style: { color: colors.text.text1 } }, // Change color as needed
          }}
        />
      )}
      <GridToolbarDensitySelector
        slotProps={{ 
          tooltip: { title: 'Change density' },
          button: { style: { color: colors.text.text1 } }, // Change color as needed
        }}
      />
      <Box sx={{ flexGrow: 1 }} />
      {action === 'filter' && (
        <GridToolbarQuickFilter />
      )}
      {action === 'export' && (
        <GridToolbarExport
          slotProps={{ 
            tooltip: { title: 'Export data' },
            button: { style: { color: colors.text.text1 } }, // Change color as needed
          }}
        />
      )}
    </GridToolbarContainer>
  );
};

const CustomFooter = ({ selectedRows, handleBulkDelete, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);

  return (
    <GridFooterContainer>
      {selectedRows.length > 0 ? (
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
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
            snackbarText={"Records deleted!"}
            refresh={refresh}
            onClick={handleBulkDelete}
            onClose={() => setOpenModal(false)}
          />
        </Box>
      </Modal>
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
  const [entityNames, setEntityNames] = useState({});
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
      field: "entity",
      headerName: "Accounts/Budgets",
      flex: 1,
      
      
      valueGetter: (params, row) => {
        const entityId = row.accountId ? row.accountId : row.budgetId;
        return entityNames[entityId] || "";
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

      // Fetch entity names for each row (either account or budget)
      const entityIds = records.map((record) =>
        record.accountId ? record.accountId : record.budgetId
      );
      const uniqueEntityIds = [...new Set(entityIds)];
      const entityNamesMap = {};

      await Promise.all(
        uniqueEntityIds.map(async (id) => {
          const entity = records.find((record) => record.accountId === id)
            ? await getAccount(id)
            : await getBudget(id); // Fetch from budget API for budgetId
          entityNamesMap[id] = entity.name;
        })
      );

      setEntityNames(entityNamesMap);

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
        entity: false,
        notes: false,
        actions: action === "edit",
      }
    : {
        date: true,
        category: true,
        entity: true,
        notes: true,
        amount: true,
        actions: action === "edit",
      };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Paper  style={{ height: "603px", width: "100%",border:`1px solid ${colors.panel.panelBorder}`}}>
        <DataGrid
          rows={rows}
          
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: colors.panel.panel3, // Change header row background color here
              color: colors.text.text1,
              fontWeight: 'bold',
            },
            padding:"10px 23px",
            backgroundColor:colors.panel.panel3
          }}
          getRowId={(row) => row._id}
          columns={columns  }
          
          disableColumnMenu={action !== "filter"}
          classes={{
            columnHeaders: 'custom-column-header',
          }}
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
                refresh={fetchRecords}
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
                  This action will delete the selected record and make changes
                  to your
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
