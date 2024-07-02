import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DebtRecord from "../../components/debt list/DebtRecord";
import { BackBtn, SpeedDial } from "../../components/utils";
import { useParams } from "react-router-dom";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { CreateDebtRecord } from "../../components/debt list";

const DebtItems = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetching the debtItemId from the URL params
  const { debtItemId } = useParams();

  // Example data for debt records
  const debtRecords = [
    {
      amount: "-500,000.00",
      currency: "MMK",
      dueDate: "02-01-2024",
      icon: <PaidOutlinedIcon />,
    },
    {
      amount: "-300,000.00",
      currency: "MMK",
      dueDate: "05-15-2024",
      icon: <PaidOutlinedIcon />,
    },
    {
      amount: "-700,000.00",
      currency: "MMK",
      dueDate: "12-31-2023",
      icon: <PaidOutlinedIcon />,
    },
    {
      amount: "-500,000.00",
      currency: "MMK",
      dueDate: "02-01-2024",
      icon: <PaidOutlinedIcon />,
    },
    {
      amount: "-300,000.00",
      currency: "MMK",
      dueDate: "05-15-2024",
      icon: <PaidOutlinedIcon />,
    },
    {
      amount: "-700,000.00",
      currency: "MMK",
      dueDate: "12-31-2023",
      icon: <PaidOutlinedIcon />,
    },
    {
      amount: "-500,000.00",
      currency: "MMK",
      dueDate: "02-01-2024",
      icon: <PaidOutlinedIcon />,
    },
    {
      amount: "-300,000.00",
      currency: "MMK",
      dueDate: "05-15-2024",
      icon: <PaidOutlinedIcon />,
    },
    {
      amount: "-700,000.00",
      currency: "MMK",
      dueDate: "12-31-2023",
      icon: <PaidOutlinedIcon />,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          marginTop: theme.spacing(3),
          width: "1249px",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: theme.spacing(3),
        }}
      >
        {/* Back button  */}
        <BackBtn />

        <Stack alignItems={"center"}>
          <Typography variant="h4" sx={{ color: colors.purple[600] }}>
            Owe to {debtItemId}
          </Typography>
          <Stack direction={"row"} alignItems={"baseline"} gap={1}>
            <Typography variant="body1">Amount Still Owe -</Typography>
            <Typography variant="h5">500,000.00</Typography>
            <Typography variant="h6" sx={{ color: colors.extra.grey }}>
              MMK
            </Typography>
          </Stack>
        </Stack>
        <Box
          sx={{
            width: "88%",
            height: "76%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            overflowY: "auto",
          }}
        >
          {debtRecords.map((record, index) => (
            <DebtRecord
              key={index}
              amount={record.amount}
              currency={record.currency}
              dueDate={record.dueDate}
              Icon={record.icon}
              onEdit={() => {
                // Handle edit action
              }}
              onDelete={() => {
                // Handle delete action
              }}
            />
          ))}
        </Box>
      </Box>
      <SpeedDial modal={<CreateDebtRecord />} />
    </Box>
  );
};

export default DebtItems;
