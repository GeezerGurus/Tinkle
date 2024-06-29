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
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { tokens } from "../../theme";
import {
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
  MonetizationOn as MonetizationOnIcon,
  AccountBalance as AccountBalanceIcon,
  GridView as GridViewIcon,
  CreditScore as CreditScoreIcon,
} from "@mui/icons-material";
import { Item } from "../utils";

const EditAccount = ({ onClose, name, balance, Type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [accountName, setAccountName] = useState(name || "");
  const [currentBalance, setCurrentBalance] = useState(balance || 0);
  const [selectedOption, setSelectedOption] = useState(name || "");

  console.log(selectedOption);

  return (
    <Paper
      sx={{
        width: "686px",
        height: "418px",
        padding: "32px 112px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      {/* Title  */}
      <Typography variant="h4">Edit Account</Typography>

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
          label="Name"
          value={accountName || ""}
          onChange={(e) => {
            setAccountName(e.target.value);
          }}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          type="number"
          label="Currency Balance"
          fullWidth
          value={currentBalance || 0}
          onChange={(e) => {
            setCurrentBalance(e.target.value);
          }}
          inputProps={{ min: "0" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl fullWidth>
          <InputLabel shrink>Category</InputLabel>
          <Select
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            displayEmpty
            label="Category"
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
            <MenuItem value="wallet">
              <Item
                icon={<MonetizationOnIcon />}
                text="Wallet"
                bgColor="brown"
              />
            </MenuItem>
            <MenuItem value="bank">
              <Item icon={<AccountBalanceIcon />} text="Bank" bgColor="gold" />
            </MenuItem>
            <MenuItem value="kpay">
              <Item icon={<GridViewIcon />} text="Kpay" bgColor="blue" />
            </MenuItem>
            <MenuItem value="saving">
              <Item
                icon={<CreditScoreIcon />}
                text="Saving"
                bgColor="lightgreen"
              />
            </MenuItem>
            <MenuItem value="others">
              <Item icon={<ListIcon />} text="Others" bgColor="brown" />
            </MenuItem>
            <MenuItem value={name}>
              <Item icon={Type} text={name} bgColor="lightgreen" />
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Stack gap={1} direction="row" justifyContent="space-between">
        <Button
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: colors.purple[200],
            },
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
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default EditAccount;
