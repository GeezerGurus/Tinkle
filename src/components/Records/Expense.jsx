import * as React from "react";
import { Box, Typography, Button, useTheme, Select } from "@mui/material";
import { styled, Stack } from "@mui/material";
import { tokens } from "../../theme";
import EntryInput from "../utils/EntryInput";
import EntrySelect from "../utils/EntrySelect";
import DisplayBox from "../utils/DisplayBox";
import EntryBox from "../utils/EntryBox";
import VisibleTypo from "../utils/VisibleTypo";
import CustomArrowIcon from "../utils/CustomArrowIcon";
import MenuItem from "@mui/material/MenuItem";
import WalletIcon from "@mui/icons-material/Wallet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SavingsIcon from "@mui/icons-material/Savings";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import HouseIcon from "@mui/icons-material/House";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ManIcon from "@mui/icons-material/Man";
import TvIcon from "@mui/icons-material/Tv";
import PaymentsIcon from "@mui/icons-material/Payments";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ListIcon from "@mui/icons-material/List";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

const CustomMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#c0c0c0",
  },
});
const menuProps = {
  PaperProps: {
    style: {
      maxHeight: "144px",
      backgroundColor: "white",
      border: "1px solid black",
    },
  },
};

const getCurrentTimeString = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const formatDateString = (date) => {
  return dayjs(date).format("D, MMM, YYYY");
};

export const Expense = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [acc, setAcc] = React.useState("wallet");
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("food");
  const [time, setTime] = React.useState(getCurrentTimeString());
  const [date, setDate] = React.useState(dayjs().format("YYYY-MM-DD"));
  const [note, setNote] = React.useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAccChange = (event) => {
    setAcc(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
  };
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: "1",
      }}
    >
      <EntryBox>
        <VisibleTypo>Account:</VisibleTypo>
        <EntrySelect
          value={acc}
          onChange={handleAccChange}
          MenuProps={menuProps}
          IconComponent={() => <CustomArrowIcon open={open} />}
          onOpen={handleOpen}
          onClose={handleClose}
        >
          <CustomMenuItem value="wallet">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <WalletIcon
                sx={{
                  color: "white",
                  backgroundColor: "green",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Wallet
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="bank">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountBalanceIcon
                sx={{
                  color: "white",
                  backgroundColor: "orange",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Bank
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="savings">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SavingsIcon
                sx={{
                  color: "white",
                  backgroundColor: "pink",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Savings
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="Kpay">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PhonelinkRingIcon
                sx={{
                  color: "white",
                  backgroundColor: "blue",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Kpay
              </Typography>
            </Box>
          </CustomMenuItem>
        </EntrySelect>
      </EntryBox>
      {/* ===================================================================== */}
      <EntryBox>
        <VisibleTypo>Amount:</VisibleTypo>
        <DisplayBox>
          <RemoveIcon sx={{ color: "red" }} />
          <EntryInput type="number" />
          <VisibleTypo>MMK</VisibleTypo>
        </DisplayBox>
      </EntryBox>
      <EntryBox>
        <VisibleTypo>Category:</VisibleTypo>
        <EntrySelect
          value={selectedOption}
          onChange={handleChange}
          displayEmpty
          MenuProps={menuProps}
          IconComponent={() => <CustomArrowIcon open={open} />}
          onOpen={handleOpen}
          onClose={handleClose}
        >
          <CustomMenuItem value="food">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <RestaurantIcon
                sx={{
                  color: "white",
                  backgroundColor: "red",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Food and Drinks
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="shopping">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalMallIcon
                sx={{
                  color: "white",
                  backgroundColor: "lightblue",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Shopping
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="housing">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <HouseIcon
                sx={{
                  color: "white",
                  backgroundColor: "orange",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Housing
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="transportation">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DirectionsBusIcon
                sx={{
                  color: "white",
                  backgroundColor: "grey",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Transportation
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="vehicle">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DirectionsCarIcon
                sx={{
                  color: "white",
                  backgroundColor: "purple",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Vehicle
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="life">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ManIcon
                sx={{
                  color: "white",
                  backgroundColor: "lightgreen",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Life & Entertainment
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="communication">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TvIcon
                sx={{
                  color: "white",
                  backgroundColor: "magenta",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Communication,PC
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="financialExpense">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PaymentsIcon
                sx={{
                  color: "white",
                  backgroundColor: "lightblue",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Financial Expenses
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="investment">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AutoGraphIcon
                sx={{
                  color: "white",
                  backgroundColor: "#db2c55",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Investments
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="income">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PriceCheckIcon
                sx={{
                  color: "white",
                  backgroundColor: "yellow",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Income
              </Typography>
            </Box>
          </CustomMenuItem>
          <CustomMenuItem value="others">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListIcon
                sx={{
                  color: "white",
                  backgroundColor: "brown",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Others
              </Typography>
            </Box>
          </CustomMenuItem>
        </EntrySelect>
      </EntryBox>

      <EntryBox>
        <VisibleTypo>Time:</VisibleTypo>
        <TextField
          type="time"
          value={time}
          onChange={handleTimeChange}
          sx={{
            width: "80%",
            height: "30px",
            color: "black",
            border: "1.5px solid black",
            borderRadius: "8px",
            "& .MuiInputBase-input": {
              fontWeight: "600",
              padding: "5px 10px",
              color: "black",
            },
          }}
        />
      </EntryBox>

      <EntryBox>
        <VisibleTypo>Date:</VisibleTypo>
        <DisplayBox sx={{ color: "black", fontWeight: "600" }}>
          <Typography
            sx={{ marginLeft: "9px", color: "black", fontWeight: "600" }}
          >
            {formatDateString(date)}
          </Typography>
          <TextField
            type="date"
            value={date}
            onChange={handleDateChange}
            InputProps={{
              inputProps: {
                min: "2022-01-01", // Set min and max dates if needed
                max: "2025-12-31",
              },
              style: {
                // width: 'calc(100% - 10px)', // Adjusted width to fit within DisplayBox
                height: "100%",
                color: "black",
                border: "0.5px solid black", // Removed border since DisplayBox already has it
                borderRadius: "8px",
              },
            }}
            sx={{
              width: "10%",
              "& .MuiInputBase-input": {
                padding: "5px 10px",
              },
            }}
          />
        </DisplayBox>
      </EntryBox>

      <EntryBox>
        <VisibleTypo>Payee:</VisibleTypo>
        <DisplayBox>
          <EntryInput sx={{ marginLeft: "9px" }} />
        </DisplayBox>
      </EntryBox>

      <EntryBox>
        <VisibleTypo>Note:</VisibleTypo>
        <TextField
          id="note"
          multiline
          rows={2}
          value={note}
          onChange={handleNoteChange}
          variant="outlined"
          sx={{
            width: "80%",
            color: "black",
            border: "1.5px solid black",
            borderRadius: "8px",
          }}
        />
      </EntryBox>
    </Box>
  );
};

export default Expense;
