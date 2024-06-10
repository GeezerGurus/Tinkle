import * as React from 'react';
import { Box,Typography} from "@mui/material";
import { styled } from "@mui/material";
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const CheckItem =styled(Box)(()=>({
    display:"flex",
    alignItems: "center",
    width: "301px",
    marginLeft: "26px",
}))
const ListItems = styled(Typography)(()=>({
    color:"black",
    width:"149px",
    fontWeight:"300",
    fontSize:"15px"
}))

export const IOwe = ({checked,handleChange})=>{
    return (
        <Box sx={{
            display:"flex",
            flexDirection:"column",
            transition:"1s"
        }}>
            <Box 
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "301px",
                    marginLeft: "26px",
                }}
                >
                <Typography sx={{
                    width:"62px",
                    color:"#000000",
                    height:"24px",
                    fontSize:"20px",
                    fontWeight:"400",

                }}>
                    I Owe
                </Typography>
                <Switch  
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }} />

            </Box>
                        {/* checkboxes */}
           <CheckItem>
                <Checkbox {...label} sx={{color:"black"}}/>
               <ListItems>$500 to IRS</ListItems>
                <Typography sx={{
                    color:"black"
                }}
                >
                    Due - 30-01-25
                </Typography>

            </CheckItem>
           <CheckItem>
                <Checkbox {...label} sx={{color:"black"}}/>
               <ListItems>$50 to Local Shop</ListItems>
                <Typography sx={{
                    color:"black"
                }}
                >
                    Due - 30-01-25
                </Typography>

            </CheckItem>
           <CheckItem>
                <Checkbox {...label} sx={{color:"black"}}/>
               <ListItems>$20 to Netfilx</ListItems>
                <Typography sx={{
                    color:"black"
                }}
                >
                    Due - 30-01-25
                </Typography>

            </CheckItem>
        </Box>
    )
}