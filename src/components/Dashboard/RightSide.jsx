import * as React from 'react';
import { Box,Typography, Button, Select } from "@mui/material";
import { styled } from "@mui/material";
import { IOwe } from './I_Owe';
import { ILend } from './I_Lend';
import Divider from '@mui/material/Divider';
import { FlagIcon } from "react-flag-kit";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';



           /// Variables and functions


// -------------------------------For Exchange panel---------------------------------------------------
const USAFlag = () => <FlagIcon code="US" size={28} />;
const EUFlag = () => <FlagIcon code="EU" size={28}/>;
const JPFlag = () => <FlagIcon code="JP" size={28}/>;
const MMFlag = () => <FlagIcon code="MM" size={28}/>;


const StyledFlagContainer = styled(Box)({
    borderRadius: '25%',
    overflow:"hidden", 
    width: '28px', 
    height: '28px',
});

const menuProps = {
    PaperProps: {
        style: {
            backgroundColor: '#707371',
        },
    },
};

const StyledInput = styled('input')({
    maxWidth: "110px",
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
    // padding:"0 0 0 40px"
    
});
const CustomMenuItem = styled(MenuItem)({
    '&:hover': {
        backgroundColor: '#c0c0c0',
    },
});
//---------------------------------------------------------------------------------------------------------
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
export const RightSide = () =>{
    const [checked, setChecked] = React.useState(false);
    const [currency, setCurrency] = React.useState('USD');
    const [inputValue,setInput] = React.useState('');


    const handleChange = (event) => {
    setChecked(event.target.checked);
    }
    
    const handleCurrencyChange = (event) =>{
        setCurrency(event.target.value);
    }
    
    const handleInput = (event)=>{
        setInput(event.target.value);
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
            <Box sx={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                gap:"none",
                marginTop:"30px"
            }}>
                    {/* Upper Box */}
                <Box sx={{
                    width:"293px",
                    height:"78px",
                    border:"1px solid black",
                    borderTopLeftRadius:"24px",
                    borderTopRightRadius:"24px",
                    borderBottom:"none",
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between"

                }}>
                    <Select
                    value = {currency}
                    onChange={handleCurrencyChange}
                    MenuProps={menuProps}
                    sx={{
                        width: '120px',
                        '.MuiOutlinedInput-notchedOutline': { border: 0 },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '& .MuiSelect-icon':{
                            color:"black",
                        }
                    }}
                    >
                        <CustomMenuItem value="USD">
                            <Box sx={{ display: 'flex', alignItems: 'center', width:"145px" }}>
                                <StyledFlagContainer>
                                    <USAFlag/>
                                    </StyledFlagContainer>
                                    <Typography sx={{ color: "black",marginLeft:2 }}>USD</Typography>
                            </Box>
                        </CustomMenuItem>
                        <CustomMenuItem value="Yen">
                            <Box sx={{ display: 'flex', alignItems: 'center', width:"145px" }}>
                                <StyledFlagContainer>
                                    <JPFlag/>
                                    </StyledFlagContainer>
                                    <Typography sx={{ color: "black",marginLeft:2 }}>YEN</Typography>
                            </Box>
                        </CustomMenuItem>
                        <CustomMenuItem value="Euro">
                            <Box sx={{ display: 'flex', alignItems: 'center', width:"145px" }}>
                                <StyledFlagContainer>
                                    <EUFlag/>
                                    </StyledFlagContainer>
                                    <Typography sx={{ color: "black",marginLeft:2 }}>EURO</Typography>
                            </Box>
                        </CustomMenuItem>
                        <CustomMenuItem value="MMK">
                            <Box sx={{ display: 'flex', alignItems: 'center', width:"145px" }}>
                                <StyledFlagContainer>
                                    <MMFlag/>
                                    </StyledFlagContainer>
                                    <Typography sx={{ color: "black",marginLeft:2 }}>MMK</Typography>
                            </Box>
                        </CustomMenuItem>
                    </Select>
                    <StyledInput 
                            type='number' 
                            placeholder="Enter amount" 
                            value={inputValue} 
                            onChange={handleInput} 
                        />
                </Box>
                                         {/* Icon */}
                <Button sx={{
                    position:"absolute",
                    top:"81%",
                    border:"1px",
                    borderRadius:"50%"
                }}>
                    <ArrowDownwardIcon sx={{
                        width:'38px',
                        height:"38px",
                        color:"black",
                        backgroundColor:"#00FF47",
                        border:"1px",
                        borderRadius:"50%"
                    }}/>
                </Button>
                                        {/* Lower Box */}
                <Box sx={{
                    width:"293px",
                    height:"78px",
                    border:"1px solid black",
                    borderTop:"none",
                    borderBottomLeftRadius:"24px",
                    borderBottomRightRadius:"24px",
                    backgroundColor:"#DEDEDE",
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between"
                }}>
                    <Select
                    value = {currency}
                    onChange={handleCurrencyChange}
                    MenuProps={menuProps}
                    sx={{
                        width: '120px',
                        '.MuiOutlinedInput-notchedOutline': { border: 0 },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '& .MuiSelect-icon':{
                            color:"black",
                        }
                    }}
                    >
                        <CustomMenuItem value="USD">
                            <Box sx={{ display: 'flex', alignItems: 'center', width:"145px" }}>
                                <StyledFlagContainer>
                                    <USAFlag/>
                                    </StyledFlagContainer>
                                    <Typography sx={{ color: "black",marginLeft:2 }}>USD</Typography>
                            </Box>
                        </CustomMenuItem>
                        <CustomMenuItem value="Yen">
                            <Box sx={{ display: 'flex', alignItems: 'center', width:"145px" }}>
                                <StyledFlagContainer>
                                    <JPFlag/>
                                    </StyledFlagContainer>
                                    <Typography sx={{ color: "black",marginLeft:2 }}>YEN</Typography>
                            </Box>
                        </CustomMenuItem>
                        <CustomMenuItem value="Euro">
                            <Box sx={{ display: 'flex', alignItems: 'center', width:"145px" }}>
                                <StyledFlagContainer>
                                    <EUFlag/>
                                    </StyledFlagContainer>
                                    <Typography sx={{ color: "black",marginLeft:2 }}>EURO</Typography>
                            </Box>
                        </CustomMenuItem>
                        <CustomMenuItem value="MMK">
                            <Box sx={{ display: 'flex', alignItems: 'center', width:"145px" }}>
                                <StyledFlagContainer>
                                    <MMFlag/>
                                    </StyledFlagContainer>
                                    <Typography sx={{ color: "black",marginLeft:2 }}>MMK</Typography>
                            </Box>
                        </CustomMenuItem>
                    </Select>
                    <Typography sx={{color:"black",width: "110px",}}>Something here idk</Typography>
                </Box>

            </Box>
            

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
export default RightSide;