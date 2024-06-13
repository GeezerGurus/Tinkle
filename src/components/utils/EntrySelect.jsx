import { styled,Select } from "@mui/material";

export const EntrySelect = styled(Select)(()=>({
    width:"80%",
    height:"30px",
    border: "1.5px solid black",
    borderRadius: "8px",
    color:"black",
    '&:hover': {
        borderColor: "black"
    },
    '& .MuiSelect-select': {
        display: "flex",
        alignItems: "center"
    },
    // '& .MuiSelect-icon':
    // {
    //     color:"black",
    // }
}))

export default EntrySelect