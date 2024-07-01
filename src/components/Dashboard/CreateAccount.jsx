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
} from "@mui/material";
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

const CreateAccount = ({ onClose, isSmallScreen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedOption, setSelectedOption] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOption(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "359px" : "686px",
        height: isSmallScreen ? "470px" : "418px",
        padding: isSmallScreen ? "19px" : "32px 112px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      {/* Title  */}
      <Typography variant="h4">Create Account</Typography>

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
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          type="number"
          label="Currency Balance"
          fullWidth
          inputProps={{ min: "0" }}
          InputProps={{
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
          label="Category"
          fullWidth
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
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: colors.purple[200],
            },
          }}
        >
          <Typography variant="body2">Create</Typography>
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

export default CreateAccount;
