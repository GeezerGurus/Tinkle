import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  MenuItem,
  styled,
  FormControl,
  InputAdornment,
  Button,
  Chip,
} from "@mui/material";
import { tokens } from "../../theme";
import { EntryInput, EntrySelect, EntryBox, Item } from "../utils";
import CloseIcon from "@mui/icons-material/Close";
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
  ArrowBackIos as ArrowBackIosIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";

const StyledButton = styled(Button)(({ theme }) => ({
  width: "192.67px",
  height: "42px",
  backgroundColor: "white",
  color: "black",
  textTransform: "none",
  fontWeight: "600",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: theme.palette.neutral.dark,
    color: "white",
  },
}));

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: "144px",
      backgroundColor: "white",
      border: "1px solid black",
    },
  },
};

const Edit = ({ onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [acc, setAcc] = useState("wallet");
  const [period, setPeriod] = useState("monthly");
  const [selectedOption, setSelectedOption] = useState([]);
  const chipContainerRef = useRef(null);
  const [descript, setDescript] = useState("");
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOption(typeof value === "string" ? value.split(",") : value);
  };

  const handleChipDelete = (chipToDelete) => () => {
    setSelectedOption((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Paper
      sx={{
        position: "relative",
        width: "807px",
        height: "883px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <Button
        variant="outlined"
        startIcon={<ArrowBackIosIcon />}
        sx={{
          border: "none",
          position: "absolute",
          top: 0,
          left: 0,
          margin: "16px",
        }}
      >
        <Typography variant="text">Cancel Edit</Typography>
      </Button>
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "32px",
          color: "black",
          lineHeight: "150%",
          letterSpacing: "-1%",
        }}
      >
        Edit
      </Typography>
      <CloseIcon
        onClick={onClose}
        sx={{
          margin: "16px",
          top: "0",
          right: "0",
          position: "absolute",
          color: "black",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          "&:hover": {
            color: "white",
            backgroundColor: "black",
          },
          "&:active": {
            color: "white",
            backgroundColor: "grey",
          },
        }}
      />
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
          <Typography variant="text2">Amount:</Typography>
          <FormControl>
            <EntryInput
              type="number"
              inputProps={{ min: "0" }}
              startAdornment={
                <InputAdornment position="start" sx={{ color: "green" }}>
                  <Typography
                    sx={{ color: "green", fontWeight: "400", fontSize: "24px" }}
                  >
                    +
                  </Typography>
                </InputAdornment>
              }
              endAdornment={<InputAdornment position="end">MMK</InputAdornment>}
            />
          </FormControl>
        </EntryBox>
        <EntryBox>
          <Typography variant="text2">Name:</Typography>
          <FormControl>
            <EntryInput />
          </FormControl>
        </EntryBox>
        <EntryBox>
          <Typography variant="text2">Category:</Typography>
          <FormControl>
            <EntrySelect
              value={selectedOption}
              onChange={handleChange}
              multiple
              MenuProps={menuProps}
              renderValue={() => (
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    overflowX: "auto",
                    alignItems: "center",
                    overflowY: "hidden",
                    transition: "height 0.3s ease",
                    "&::-webkit-scrollbar": {
                      height: "8px",
                      backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#888",
                      borderRadius: "3px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#555",
                    },
                  }}
                >
                  {selectedOption.map((option, index) => (
                    <Chip
                      key={index}
                      label={option}
                      onDelete={handleChipDelete(option)}
                      sx={{
                        height: "20px",
                      }}
                    />
                  ))}
                </Box>
              )}
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
                <Item
                  icon={<PriceCheckIcon />}
                  text="Income"
                  bgColor="yellow"
                />
              </MenuItem>
              <MenuItem value="others">
                <Item icon={<ListIcon />} text="Others" bgColor="brown" />
              </MenuItem>
            </EntrySelect>
          </FormControl>
        </EntryBox>
        <EntryBox>
          <Typography variant="text2">Period:</Typography>
          <EntrySelect
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            MenuProps={menuProps}
          >
            <MenuItem value="monthly">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ color: "black" }}>Monthly</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="weekly">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ color: "black" }}>Weekly</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="yearly">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ color: "black" }}>Yearly</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="one-time">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ color: "black" }}>One-Time</Typography>
              </Box>
            </MenuItem>
          </EntrySelect>
        </EntryBox>
        {/* Start-Date */}
        {period === "one-time" && (
          <EntryBox>
            <Typography variant="text2">Start Date:</Typography>
            <FormControl>
              <EntryInput
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                InputProps={{
                  inputProps: {
                    min: "2022-01-01", // Set min and max dates if needed
                    max: "2025-12-31",
                  },
                }}
              />
            </FormControl>
          </EntryBox>
        )}
        {/* End-Date */}
        {period === "one-time" && (
          <EntryBox>
            <Typography variant="text2">End Date:</Typography>
            <FormControl>
              <EntryInput
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                InputProps={{
                  inputProps: {
                    min: "2022-01-01", // Set min and max dates if needed
                    max: "2025-12-31",
                  },
                }}
              />
            </FormControl>
          </EntryBox>
        )}
        <EntryBox>
          <Typography variant="text2">Account:</Typography>
          <EntrySelect
            value={acc}
            onChange={(e) => setAcc(e.target.value)}
            MenuProps={menuProps}
          >
            <MenuItem value="wallet">
              <Item icon={<WalletIcon />} text="Wallet" bgColor="green" />
            </MenuItem>
            <MenuItem value="bank">
              <Item
                icon={<AccountBalanceIcon />}
                text="Bank"
                bgColor="orange"
              />
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
          <Typography variant="text2">Description:</Typography>
          <FormControl>
            <EntryInput
              placeholder="Enter a description (optional)"
              value={descript}
              onChange={(e) => setDescript(e.target.value)}
            />
          </FormControl>
        </EntryBox>
      </Box>
      {/* Buttons */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(4),
        }}
      >
        <StyledButton
          sx={{
            backgroundColor: "black",
            color: "white",
            width: "243px",
            marginBottom: "17px",
          }}
        >
          Save Edit
        </StyledButton>
        <StyledButton
          sx={{
            backgroundColor: "red",
            color: "white",
            width: "243px",
            marginBottom: "17px",
          }}
        >
          Delete
        </StyledButton>
      </Box>
    </Paper>
  );
};

export default Edit;
