import { styled,Box } from "@mui/material"

export const DisplayBox = styled(Box)(()=>({
    width:"80%",
    height:"30px",
    border: "1.5px solid black",
    borderRadius: "8px",
    display:'flex',
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between'
}))

export default DisplayBox