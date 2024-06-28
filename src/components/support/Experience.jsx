import React from "react"
import CampaignIcon from '@mui/icons-material/Campaign';
import { 
    useTheme, 
    Box,
    Paper,
    Typography, 
    
    } from "@mui/material";
import { tokens } from "../../theme";
 
const Expreience=({Title, Description})=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <Paper sx={{
            width:"390px",
            height:"370px",
            padding:"56px",
            borderRadius:"18px",
            textAlign:"Center",
            backgroundColor:colors.extra["faint_white"]
            
        }} elevation={4} >
                <Box 
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "33px",
                }}
                >
                    <CampaignIcon sx={{ fontSize: "75px", color:"green" }} />
                </Box>
                <Typography gutterBottom variant="h5" sx={{marginBottom:"33px"}} >
                    Reach Out Directly
                </Typography>
                <Typography variant="body1" >
                    We are incredibly excited to <br/>
                    hear your stories and feedback.
                </Typography>
               
        </Paper>
       
    )
}
export default Expreience;