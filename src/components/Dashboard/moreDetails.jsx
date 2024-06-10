import * as React from 'react';
import { Box,Typography, Button } from "@mui/material";
import { styled } from "@mui/material";
import { IOwe } from './I_Owe';
import { ILend } from './I_Lend';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';


           /// Variables and functions
const ShowMoreBtn = styled(Button)(()=>({
    border: "1px dotted black",
    // marginLeft: "249px",
    // marginTop:"-25px",
    width: "78px",
    height: "28px",
    borderRadius: "7px",
    whiteSpace: "nowrap",
    textTransform: "none",
})) 
const ShowMore = styled(Typography)(()=>({
    fontSize: "12px",
    fontWeight: "200",
    lineHeight: "14.52px",
    letterSpacing: "1%",
    alignItems: "center",
    // fontFamily: "inter",
}))
const Heading = styled(Typography)(()=>({
    // width:"253px",
    // height:"24px",
    fontSize:"20px",
    fontWeight:"600",
    color:'#000000',
    // padding:"19px 30px"
}))
 ///////////////////Main
export const MoreDetails = () =>{
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
    setChecked(event.target.checked);
    }
    
    return (
    <Box sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        height:"100%"
    }}>
        {/*  Budget */}
        <Box sx={{
            width: "369px",
            height: "274px",
            backgroundColor:"white"
        }}
        >

        </Box>

            {/* Currency Exchange */}
        <Box sx={{
            width: "369px",
            height: "273px",
            backgroundColor:"white",
        }}
        >
            <Heading sx={{
                padding:"19px 30px 0"
            }}>
                Currency Exchange
            </Heading>
            <Typography sx={{
                width:"211px",
                height:"0",
                // lineHeight:'16.94px',
                fontSize:"14px",
                fontWeight:"500",
                color:'rgba(0, 0, 0, 0.5)',
                padding:"5px 33px"
            }}>1USD = 3200MMK</Typography>
        </Box>


            {/* Debt List */}
        <Box sx={{
            width :'369px',
            height:'267px',
            backgroundColor:"white",

        }}
        >
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "301px",
                marginLeft: "26px",
                height: "54.5px"
            }}>
            <Heading>
                Debt List
            </Heading>
            <ShowMoreBtn>
                <ShowMore>Show More</ShowMore>
            </ShowMoreBtn>
                    {/*  I Owe & Switch */}
            </Box>
                <Divider sx={{
                    backgroundColor:'black',
                    margin:"0px 30px 0"
                }}></Divider>
                {checked? <ILend checked={checked} handleChange={handleChange}/> : <IOwe checked={checked} handleChange={handleChange}/>}
        </Box>


    </Box>


    )
}
export default MoreDetails;