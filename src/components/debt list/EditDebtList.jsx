import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import { Item } from "../utils";
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
} from "@mui/icons-material";

const EditDebtList = ({ onClose, action }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value);
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "44vh" : isMediumScreen ? "65vh" : "686px",
        height: isLaptop ? "95vh" : "739px",
        padding: isSmallScreen
          ? "16px 28px"
          : isLaptop
          ? "16px 112px"
          : "32px 112px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      {/* Title  */}
      <Typography variant="h4" sx={{ color: colors.purple[900] }}>
        Edit Debt
      </Typography>
      {action === "lent" ? (
        <Stack alignItems={"center"} gap={1}>
          <Box
            sx={{
              width: "120px",
              height: "8px",
              backgroundColor: colors.green[400],
            }}
          />
          <Typography variant="h6" gutterBottom>
            I Lent
          </Typography>
        </Stack>
      ) : (
        <Stack alignItems={"center"} gap={1}>
          <Box
            sx={{
              width: "120px",
              height: "8px",
              backgroundColor: colors.extra.red_accent,
            }}
          />
          <Typography variant="h6" gutterBottom>
            I Owe
          </Typography>
        </Stack>
      )}

      <TextField
        label="Name"
        placeholder={
          action === "lent" ? "To whom have I lent?" : "From whom did I borrow?"
        }
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isLaptop ? "42px" : undefined },
        }}
      />

      <TextField
        label="Purpose"
        placeholder="What was it for?"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isLaptop ? "42px" : undefined },
        }}
      />

      <TextField
        type="number"
        label="Amount"
        fullWidth
        value={selectedAmount}
        onChange={handleAmountChange}
        inputProps={{ min: "0" }}
        InputProps={{
          sx: { height: isLaptop ? "42px" : undefined },
          startAdornment: (
            <InputAdornment position="start" sx={{ color: "green" }}>
              {action === "lent" ? (
                <Typography
                  sx={{ color: "red", fontWeight: "400", fontSize: "24px" }}
                >
                  -
                </Typography>
              ) : (
                <Typography
                  sx={{ color: "green", fontWeight: "400", fontSize: "24px" }}
                >
                  +
                </Typography>
              )}
            </InputAdornment>
          ),
          endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        value={selectedAccount}
        onChange={handleAccountChange}
        select
        label="Account"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isLaptop ? "42px" : undefined },
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
        label="Date"
        type="date"
        fullWidth
        value={selectedDate}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isLaptop ? "42px" : undefined },
          inputProps: {
            min: "2020-01-01",
            max: "2030-12-31",
          },
        }}
      />

      <TextField
        label="Due Date"
        type="date"
        fullWidth
        value={selectedDate}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isLaptop ? "42px" : undefined },
          inputProps: {
            min: "2020-01-01",
            max: "2030-12-31",
          },
        }}
      />

      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Button
          sx={{
            width: isSmallScreen ? "208px" : isMediumScreen ? "190px" : "208px",
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
            width: isSmallScreen ? "208px" : isMediumScreen ? "190px" : "208px",
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

export default EditDebtList;
