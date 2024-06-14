import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import { EntryInput, EntryBox, EntrySelect, Item } from "../utils";
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

const Expense = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [acc, setAcc] = useState("wallet");
  const [selectedOption, setSelectedOption] = useState("food");
  const [time, setTime] = useState(getCurrentTimeString());
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [note, setNote] = useState("");

  return (
    <Box
      sx={{
        width: "614px",
        height: "554px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <EntryBox>
        <Typography variant="text2">Account:</Typography>
        <EntrySelect
          value={acc}
          onChange={(event) => setAcc(event.target.value)}
          MenuProps={menuProps}
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
        </EntrySelect>
      </EntryBox>

      <EntryBox>
        <Typography variant="text2">Amount:</Typography>
        <FormControl>
          <EntryInput
            type="number"
            inputProps={{ min: "0" }}
            startAdornment={
              <InputAdornment position="start">
                <Typography
                  sx={{ color: "red", fontWeight: "600", fontSize: "24px" }}
                >
                  -
                </Typography>
              </InputAdornment>
            }
            endAdornment={<InputAdornment position="end">MMK</InputAdornment>}
          />
        </FormControl>
      </EntryBox>

      <EntryBox>
        <Typography variant="text2">Category:</Typography>
        <EntrySelect
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
          displayEmpty
          MenuProps={menuProps}
        >
          <MenuItem value="food">
            <Item
              icon={<RestaurantIcon />}
              text="Food and Drinks"
              bgColor="red"
            />
          </MenuItem>
          <MenuItem value="shopping">
            <Item
              icon={<LocalMallIcon />}
              text="Shopping"
              bgColor="lightblue"
            />
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
            <Item
              icon={<DirectionsCarIcon />}
              text="Vehicle"
              bgColor="purple"
            />
          </MenuItem>
          <MenuItem value="life">
            <Item
              icon={<ManIcon />}
              text="Life & Entertainment"
              bgColor="lightgreen"
            />
          </MenuItem>
          <MenuItem value="communication">
            <Item
              icon={<TvIcon />}
              text="Communication, PC"
              bgColor="magenta"
            />
          </MenuItem>
          <MenuItem value="financialIncome">
            <Item
              icon={<PaymentsIcon />}
              text="Financial Incomes"
              bgColor="lightblue"
            />
          </MenuItem>
          <MenuItem value="investment">
            <Item
              icon={<AutoGraphIcon />}
              text="Investments"
              bgColor="#db2c55"
            />
          </MenuItem>
          <MenuItem value="income">
            <Item icon={<PriceCheckIcon />} text="Income" bgColor="yellow" />
          </MenuItem>
          <MenuItem value="others">
            <Item icon={<ListIcon />} text="Others" bgColor="brown" />
          </MenuItem>
        </EntrySelect>
      </EntryBox>

      <EntryBox>
        <Typography variant="text2">Time:</Typography>
        <FormControl>
          <EntryInput
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </FormControl>
      </EntryBox>

      <EntryBox>
        <Typography variant="text2">Date:</Typography>
        <FormControl>
          <EntryInput
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            InputProps={{
              inputProps: {
                min: "2022-01-01", // Set min and max dates if needed
                max: "2025-12-31",
              },
            }}
          />
        </FormControl>
      </EntryBox>

      <EntryBox>
        <Typography variant="text2">Payee:</Typography>
        <FormControl>
          <EntryInput />
        </FormControl>
      </EntryBox>

      <EntryBox>
        <Typography variant="text2">Note:</Typography>
        <FormControl>
          <EntryInput
            multiline
            rows={2}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            variant="outlined"
            sx={{
              height: "65px",
            }}
          />
        </FormControl>
      </EntryBox>
    </Box>
  );
};

export default Expense;
