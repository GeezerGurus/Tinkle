import React, { useState } from "react";
import { Popover, Button, Box, Typography, TextField } from "@mui/material";

function Edit({ buttonId, buttonLabel, popoverContent, forPlaceHolder }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `popover-${buttonId}` : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        color="primary"
        sx={{
          width: "101px",
          height: "38px",
          borderRadius: "4px",
          textAlign: "center",
          lineHeight: "30px",
          fontSize: "20px",
          textTransform: "capitalize",
          alignSelf: "center",
        }}
      >
        {buttonLabel}
      </Button>
      <Popover
        sx={{marginTop:"10px"}}
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Box
          display="flex"
          sx={{
            width: "1010px",
            height: "92px",
            padding: "18px 39px",
            gap: "158px",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{ width: "662.32px", height: "56px" }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "24px",
                fontWeight: "500",
                lineHeight: "36px",
              }}
            >
              {popoverContent}
            </Typography>
            <TextField
              variant="outlined"
              size="medium"
              placeholder={forPlaceHolder}
              sx={{
                width: "400.32px",
                height: "56px",
                marginLeft: "50px",
              }}
            ></TextField>
          </Box>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            sx={{
              width: "101px",
              height: "38px",
              borderRadius: "4px",
              alignSelf: "center",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                lineHeight: "30px",
                fontSize: "20px",
                textTransform: "capitalize",
              }}
            >
              Save
            </Typography>
          </Button>
        </Box>
      </Popover>
    </div>
  );
}

export default Edit;
