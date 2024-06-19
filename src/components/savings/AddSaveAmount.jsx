import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  FormControl,
  InputAdornment,
  Button,
} from "@mui/material";
import { EntryBox, EntryInput } from "../utils";
import CloseIcon from "@mui/icons-material/Close";
const AddSaveAmount = ({ onClose }) => {
  const [amount, setAmount] = useState("");

  const handleAmount = (amount) => {
    setAmount(amount.target.value);
  };
  const handleSave = () => {
    console.log({
      amount: amount,
    });
  };

  //   Container
  return (
    <Paper
      sx={{
        width: "807px",
        height: "282px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Inner Box */}
      <Box
        sx={{
          width: "643px",
          height: "248px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {/* Header Section */}
        <Typography variant="title3">Add Save Amount</Typography>
        <CloseIcon
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: "16px",
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
        {/* Middle Section */}
        <EntryBox sx={{ padding: "0" }}>
          <Typography variant="text3" sx={{ fontWeight: "500" }}>
            Current Balance:
          </Typography>
          <FormControl>
            <EntryInput
              type="number"
              value={amount}
              onChange={handleAmount}
              inputProps={{ min: "0" }}
              endAdornment={
                <InputAdornment position="end">
                  <Typography
                    variant="body1"
                    sx={{ color: "black", fontWeight: 600, fontSize: "16px" }}
                  >
                    MMK
                  </Typography>
                </InputAdornment>
              }
              sx={{
                color: "black",
                fontSize: "18px",
                fontWeight: "500",
              }}
            />
          </FormControl>
        </EntryBox>
        {/* Bottom Section */}
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            width: "243px",
            height: "44px",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
};

export default AddSaveAmount;
