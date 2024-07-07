import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DebtRecord from "../../components/debt list/DebtRecord";
import { BackBtn, Loader, SpeedDial } from "../../components/utils";
import { useParams } from "react-router-dom";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { CreateDebtRecord } from "../../components/debt list";
import { getAllLendDebtItems } from "../../api/lendDebtItem";
import { getDebtRecordID } from "../../api/debtRecord";
import { getAllOweDebtItems } from "../../api/oweDebtItems";

const DebtItems = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [recordItem, setRecordItem] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { debtItemId } = useParams();

  const fetchDebtRecordItem = async () => {
    setIsLoading(true);
    const res = await getDebtRecordID(debtItemId);
    setRecordItem(res || []);
    setIsLoading(false);
  };

  const fetchLendItems = async () => {
    setIsLoading(true);
    const [lendItems, oweItems] = await Promise.all([
      getAllLendDebtItems(debtItemId),
      getAllOweDebtItems(debtItemId),
    ]);
    setItems([...lendItems, ...oweItems]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDebtRecordItem();
    fetchLendItems();
  }, []);

  const refresh = () => {
    fetchDebtRecordItem();
    fetchLendItems();
  };

  const action = recordItem.type;
  const debtRecords = items;
  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const capitalizeFirstWord = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : isLaptop ? "92vw" : "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Loader isLoading={isLoading} />
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
          <Typography
            variant={isSmallScreen ? "h6" : "h4"}
            sx={{ color: colors.purple[600] }}
          >
            {capitalizeFirstWord(recordItem.type)} to {recordItem.name}
          </Typography>
          <Stack direction={"row"} alignItems={"baseline"} gap={1}>
            <Typography variant={isSmallScreen ? "body4" : "body1"}>
              Amount Still Owe -
            </Typography>
            <Typography variant={isSmallScreen ? "body3" : "h5"}>
              {recordItem.amount}
            </Typography>
            <Typography
              variant={isSmallScreen ? "body3" : "h6"}
              sx={{ color: colors.extra.grey }}
            >
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
              debtId={debtItemId}
              id={record._id}
              amount={record.amount}
              currency={record.currency}
              dueDate={record.Date}
              refresh={refresh}
              Icon={<PaidOutlinedIcon />}
              action={action}
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
      <SpeedDial
        modal={
          <CreateDebtRecord
            onClose={onclose}
            debtId={debtItemId}
            action={recordItem.type}
            refresh={refresh}
          />
        }
      />
    </Box>
  );
};

export default DebtItems;
