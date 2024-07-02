import React, { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { Box, Modal, Paper, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { ConfirmModal } from "../utils";
import EditRecord from "./EditRecord";
import { tokens } from "../../theme";

const CustomToolbar = ({ action }) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton
        slotProps={{ tooltip: { title: "Customize columns" } }}
      />
      {action === "filter" && (
        <GridToolbarFilterButton
          slotProps={{ tooltip: { title: "Filter the datas" } }}
        />
      )}
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      {action === "filter" && <GridToolbarQuickFilter />}
      {action === "export" && (
        <GridToolbarExport
          slotProps={{
            tooltip: { title: "Export data" },
          }}
        />
      )}
    </GridToolbarContainer>
  );
};

const TransactionsTable = ({ action }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modal, setModal] = React.useState("");
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "account", headerName: "Account", flex: 1 },
    { field: "note", headerName: "Note", flex: 1 },
    { field: "amount", headerName: "Amount", type: "number", flex: 1 },
    {
      field: "actions",
      type: "actions",
      hideable: false,
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      sortable: false,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              setModal("edit");
              setOpenModal(true);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              setModal("delete");
              setOpenModal(true);
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const rows = [];

  for (let i = 1; i <= 50; i++) {
    rows.push({
      id: i,
      date: `2024-07-${i < 10 ? "0" + i : i}`,
      category: `Category ${i}`,
      account: i % 2 === 0 ? "Credit Card" : "Debit Card",
      note: `Item ${i}`,
      amount: Math.floor(Math.random() * 200) + 20, // Random amount between 20 and 219
    });
  }

  return (
    <>
      <Paper style={{ height: "603px", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnMenu={action !== "filter"}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          columnVisibilityModel={{
            actions: action === "edit" ? true : false,
          }}
          pageSizeOptions={[5, 10, 20, 30]}
          checkboxSelection={action === "edit"}
          slots={{
            toolbar: () => <CustomToolbar action={action} />,
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
              onClose={() => {
                setOpenModal(false);
              }}
              // refresh={fetchItems}
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
              onClose={() => {
                setOpenModal(false);
              }}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default TransactionsTable;
