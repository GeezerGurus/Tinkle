import {
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

const CreateDebtRecord = ({ onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedOption, setSelectedOption] = useState([]);
  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOption(typeof value === "string" ? value.split(",") : value);
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "359px" : "686px",
        height: "427px",
        padding: isSmallScreen ? "16px 26px" : "32px 112px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      {/* Title  */}
      <Typography variant="h4" sx={{ color: colors.purple[900] }}>
        Create Debt Record
      </Typography>
      <TextField
        type="number"
        label="Amount"
        fullWidth
        inputProps={{ min: "0" }}
        InputProps={{
          sx: { height: isSmallScreen ? "45px" : undefined },
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
        value={selectedOption}
        onChange={handleChange}
        select
        label="Account"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isSmallScreen ? "45px" : undefined },
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
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isSmallScreen ? "45px" : undefined },
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

export default CreateDebtRecord;
