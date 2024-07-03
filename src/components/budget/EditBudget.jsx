import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  MenuItem,
  InputAdornment,
  Button,
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

const EditBudget = ({ onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [acc, setAcc] = useState("wallet");
  const [period, setPeriod] = useState("monthly");
  const [selectedOption, setSelectedOption] = useState([]);
  const [descript, setDescript] = useState("");
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOption(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "360px" : "686px",
        height:
          period === "one-time"
            ? isSmallScreen
              ? "700px"
              : " 870px"
            : isSmallScreen
            ? "630px"
            : "704px",
        padding: isSmallScreen ? "19px 10px" : "32px 112px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      {/* Title  */}
      <Typography variant={isSmallScreen ? "h5" : "h4"}>Edit Budget</Typography>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextField
          type="number"
          label="Amount"
          fullWidth
          inputProps={{ min: "0" }}
          InputProps={{
            sx: { height: isSmallScreen ? "75%" : "100%" },
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "green" }}>
                <Typography
                  sx={{ color: "green", fontWeight: "400", fontSize: "24px" }}
                >
                  +
                </Typography>
              </InputAdornment>
            ),
            endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Name"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ sx: { height: isSmallScreen ? "75%" : "100%" } }}
        />

        <TextField
          value={selectedOption}
          onChange={handleChange}
          select
          label="Category"
          fullWidth
          InputLabelProps={{
            sx: { mt: isSmallScreen ? "-2%" : "" },
          }}
          InputProps={{ sx: { height: isSmallScreen ? "80%" : "100%" } }}
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
        </TextField>

        <TextField
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          select
          label="Period"
          fullWidth
          InputProps={{ sx: { height: isSmallScreen ? "75%" : "100%" } }}
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
        </TextField>

        {/* Start-Date */}
        {period === "one-time" && (
          <TextField
            type="date"
            fullWidth
            label="Start Date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            InputProps={{
              sx: { height: isSmallScreen ? "75%" : "100%" },
              inputProps: {
                min: "2022-01-01", // Set min and max dates if needed
                max: "2025-12-31",
              },
            }}
          />
        )}
        {/* End-Date */}
        {period === "one-time" && (
          <TextField
            type="date"
            value={endDate}
            label="End Date"
            fullWidth
            onChange={(event) => setEndDate(event.target.value)}
            InputProps={{
              sx: { height: isSmallScreen ? "75%" : "100%" },
              inputProps: {
                min: "2022-01-01", // Set min and max dates if needed
                max: "2025-12-31",
              },
            }}
          />
        )}

        <TextField
          value={acc}
          onChange={(e) => setAcc(e.target.value)}
          select
          label="Balance Account"
          fullWidth
          InputProps={{ sx: { height: isSmallScreen ? "75%" : "100%" } }}
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
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Note"
          multiline
          maxRows={4}
          placeholder="Enter a description (optional)"
          value={descript}
          onChange={(e) => setDescript(e.target.value)}
        />
      </Box>

      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Button
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
          }}
        >
          <Typography variant="body2">Save</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[200],
            textTransform: "none",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default EditBudget;
