import { styled } from "@mui/material"

export const EntryInput = styled('input')({
    width:"80%",
    height:"100%",
    marginRight:"13px",
    fontWeight:"600",
    border: "none",
    '&:focus': {
        outline: 'none',
    },
    appearance: "textfield",
    '&::-webkit-outer-spin-button': {
        display: "none",
    },
    '&::-webkit-inner-spin-button': {
        display: "none",
    },

})

export default EntryInput;