import { styled, Select } from "@mui/material";

const EntrySelect = styled(Select)(() => ({
  width: "453px",
  height: "40px",
  border: "1.5px solid black",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  color: "black",
  "&:hover": {
    borderColor: "black",
  },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
  },
  // '& .MuiSelect-icon':
  // {
  //     color:"black",
  // }
}));

export default EntrySelect;
