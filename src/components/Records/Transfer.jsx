import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  useTheme,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import { EntryInput, EntryBox, EntrySelect, Item } from "../utils";
import MenuItem from "@mui/material/MenuItem";
import WalletIcon from "@mui/icons-material/Wallet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SavingsIcon from "@mui/icons-material/Savings";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dayjs from "dayjs";

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

const Transfer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [acc, setAcc] = useState("wallet");
  const [toAcc, setToAcc] = useState("outofwallet");
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
        <Typography variant="text2">From Acc:</Typography>
        <EntrySelect
          value={acc}
          onChange={(event) => setAcc(event.target.value)}
          MenuProps={menuProps}
          sx={{
            width: "174px",
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
        </EntrySelect>
        <ArrowForwardIcon
          sx={{
            width: "48px",
            height: "50px",
          }}
        />

        <Typography variant="text2">To Acc:</Typography>
        <EntrySelect
          value={toAcc}
          onChange={(event) => setToAcc(event.target.value)}
          MenuProps={menuProps}
          sx={{
            width: "174px",
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
        </EntrySelect>
      </EntryBox>

      <EntryBox>
        <Typography variant="text2">Amount:</Typography>
        <FormControl>
          <EntryInput
            type="number"
            endAdornment={<InputAdornment position="end">MMK</InputAdornment>}
          />
        </FormControl>
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

export default Transfer;
