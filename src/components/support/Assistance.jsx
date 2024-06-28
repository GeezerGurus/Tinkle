import React from "react"
import CampaignIcon from '@mui/icons-material/Campaign';
import { 
    useTheme, 
    Box,
    Paper,
    Typography, 
    
    } from "@mui/material";
import { tokens } from "../../theme";
 
const Assistance=({Title, Description})=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <Paper sx={{
            width:"390px",
            height:"370px",
            padding:"56px 20px",
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
                    Immediate Assistance?
                </Typography>
                <Typography variant="body1" >
                    Come chat with us any time on<br/>
                    our official Face Book Page. <br />
                    <a href="" style={{ textDecoration: "none"}}>Geezers Co. </a>
                </Typography>

               
        </Paper>
       
    )
}
export default Assistance;