import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import BookMarkIcon from "@mui/icons-material/Bookmark";
import DotIcon from "@mui/icons-material/FiberManualRecord";
import { tokens } from "../../theme";

const VideoContents = ({ title, author, pathImage, vdavatar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        alignContent: "center",
        width: "426px",
        height: "319px",
        borderRadius: "16px",
        padding: "16px",
      }}
    >
      <Card sx={{border: "2px solid black"}}> 
        <CardMedia
          image={pathImage}
          sx={{ width: "394px", height: "232px", borderRadius: "12px" }}
        />
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              flexDirection="column"
              width="350px"
              height="47px"
            >
              <Typography textAlign="left" variant="body3">
                {title}
              </Typography>
              <Box
                width="100%"
                height="25px"
                display="flex"
                sx={{ gap: "4px", marginTop: "4px" }}
              >
                <Avatar
                  src={vdavatar} // Replace with your image variable or URL
                  sx={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "16px",
                  }}
                ></Avatar>
                <Typography variant="body4" sx={{alignSelf:"center"}}>{author}</Typography>
                <DotIcon
                  sx={{ width: "4px", height: "4px", alignSelf: "center" }}
                />
                <Typography variant="body5">1.3M views</Typography>
                <DotIcon
                  sx={{ width: "4px", height: "4px", alignSelf: "center" }}
                />
                <Typography variant="body5">2 days ago</Typography>
              </Box>
            </Box>
            <IconButton sx={{ alignSelf: "flex-start" }}>
              <BookMarkIcon sx={{color: colors.purple[600]}} />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default VideoContents;
