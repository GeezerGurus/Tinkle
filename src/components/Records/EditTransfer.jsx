import React, { useState } from "react";
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { Item } from "../utils";
import {
  Wallet as WalletIcon,
  AccountBalance as AccountBalanceIcon,
  Savings as SavingsIcon,
  PhonelinkRing as PhonelinkRingIcon,
  Restaurant as RestaurantIcon,
  LocalMall as LocalMallIcon,
  House as HouseIcon,
  DirectionsBus as DirectionsBusIcon,
  DirectionsCar as DirectionsCarIcon,
  Man as ManIcon,
  Tv as TvIcon,
  Payments as PaymentsIcon,
  AutoGraph as AutoGraphIcon,
  PriceCheck as PriceCheckIcon,
  List as ListIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { useTheme } from "@emotion/react";

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

const EditTransfer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedOption, setSelectedOption] = useState("");
  const [acc, setAcc] = useState("wallet");
  const [toAcc, setToAcc] = useState("outofwallet");
  const [time, setTime] = useState(getCurrentTimeString());
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [note, setNote] = useState("");

  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        padding: isSmallScreen
          ? "16px 26px"
          : isLargest
          ? "16px 68px"
          : "16px 112px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        gap={2}
      >
        <TextField
          select
          value={acc}
          label="From Account"
          fullWidth
          onChange={(event) => setAcc(event.target.value)}
          MenuProps={menuProps}
          InputProps={{
            sx: {
              height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
            },
          }}
        >
          <MenuItem value="wallet">
            <Item icon={<WalletIcon />} text="Wallet" bgColor="green" />
          </MenuItem>
          <MenuItem value="bank">
            <Item icon={<AccountBalanceIcon />} text="Bank" bgColor="orange" />
          </MenuItem>
          <MenuItem value="savings">
            <Item icon={<SavingsIcon />} text="Savings" bgColor="pink" />
          </MenuItem>
          <MenuItem value="Kpay">
            <Item icon={<PhonelinkRingIcon />} text="Kpay" bgColor="blue" />
          </MenuItem>
        </TextField>

        <TextField
          select
          label="To Account"
          value={toAcc}
          onChange={(event) => setToAcc(event.target.value)}
          MenuProps={menuProps}
          fullWidth
          InputProps={{
            sx: {
              height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
            },
          }}
        >
          <MenuItem value="outofwallet">
            <Item icon={<WalletIcon />} text="Out of Wallet" bgColor="green" />
          </MenuItem>
          <MenuItem value="bank">
            <Item icon={<AccountBalanceIcon />} text="Bank" bgColor="orange" />
          </MenuItem>
          <MenuItem value="savings">
            <Item icon={<SavingsIcon />} text="Savings" bgColor="pink" />
          </MenuItem>
          <MenuItem value="Kpay">
            <Item icon={<PhonelinkRingIcon />} text="Kpay" bgColor="blue" />
          </MenuItem>
        </TextField>
      </Stack>

      <TextField
        label="Amount"
        type="number"
        fullWidth
        placeholder="Enter amount"
        inputProps={{ min: "0" }}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
          endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        fullWidth
        select
        InputLabelProps={{
          shrink: true,
        }}
        label="Catgory"
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
        displayEmpty
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
        }}
      >
        <MenuItem value="food">
          <Item
            icon={<RestaurantIcon />}
            text="Food and Drinks"
            bgColor="red"
          />
        </MenuItem>
        <MenuItem value="shopping">
          <Item icon={<LocalMallIcon />} text="Shopping" bgColor="lightblue" />
        </MenuItem>
        <MenuItem value="housing">
          <Item icon={<HouseIcon />} text="Housing" bgColor="orange" />
        </MenuItem>
        <MenuItem value="transportation">
          <Item
            icon={<DirectionsBusIcon />}
            text="Transportation"
            bgColor="grey"
          />
        </MenuItem>
        <MenuItem value="vehicle">
          <Item icon={<DirectionsCarIcon />} text="Vehicle" bgColor="purple" />
        </MenuItem>
        <MenuItem value="life">
          <Item
            icon={<ManIcon />}
            text="Life & Entertainment"
            bgColor="lightgreen"
          />
        </MenuItem>
        <MenuItem value="communication">
          <Item icon={<TvIcon />} text="Communication, PC" bgColor="magenta" />
        </MenuItem>
        <MenuItem value="financialIncome">
          <Item
            icon={<PaymentsIcon />}
            text="Financial Incomes"
            bgColor="lightblue"
          />
        </MenuItem>
        <MenuItem value="investment">
          <Item icon={<AutoGraphIcon />} text="Investments" bgColor="#db2c55" />
        </MenuItem>
        <MenuItem value="income">
          <Item icon={<PriceCheckIcon />} text="Income" bgColor="yellow" />
        </MenuItem>
        <MenuItem value="others">
          <Item icon={<ListIcon />} text="Others" bgColor="brown" />
        </MenuItem>
      </TextField>

      <TextField
        type="time"
        fullWidth
        placeholder="Enter time"
        label="Time"
        InputLabelProps={{
          shrink: true,
        }}
        value={time}
        onChange={(event) => setTime(event.target.value)}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
        }}
      />

      <TextField
        type="date"
        label="Date"
        fullWidth
        placeholder="Enter date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
          inputProps: {
            min: "2022-01-01", // Set min and max dates if needed
            max: "2025-12-31",
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="Payee"
        placeholder="Enter payee name"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
        }}
      />

      <TextField
        label="Note"
        placeholder="Enter note (optional)"
        multiline
        fullWidth
        maxRows={2}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
        }}
      />
    </Box>
  );
};

export default EditTransfer;
