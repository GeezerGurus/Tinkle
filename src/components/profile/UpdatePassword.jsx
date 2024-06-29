import { Box, Typography, TextField,Button } from "@mui/material";

const UpdatePassword = () => {
  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        width: "807px",
        height: "677px",
        borderRadius: "8px",
        border: "1px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "77px",
        }}
      >
        <Typography
          sx={{
            textAlign:"center",
            fontFamily: "Inter",
            fontWeight: "600",
            fontSize: "32px",
            lineHeight: "48px",
          }}
        >
          Update your password
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          width: "688px",
          height: "530px",
          marginTop: "20px",
          marginLeft: "59px",
          gap: "44px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: "400",
            fontSize: "20px",
            lineHeight: "30px",
            textAlign: "center",
          }}
        >
          Enter your current password and new password
        </Typography>
        <Box sx={{ width: "688px", height: "111px" }}>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: "400",
              fontSize: "20px",
              lineHeight: "30px",
            }}
          >
            Current Password
          </Typography>
          <TextField
            variant="outlined"
            size="medium"
            sx={{ width: "687px", height: "56px" }}
          ></TextField>
        </Box>
        <Box sx={{ width: "688px", height: "111px" }}>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: "400",
              fontSize: "20px",
              lineHeight: "30px",
            }}
          >
            New Password
          </Typography>
          <TextField
            variant="outlined"
            size="medium"
            sx={{ width: "687px", height: "56px" }}
          ></TextField>
        </Box>
        <Box sx={{ width: "688px", height: "111px" }}>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: "400",
              fontSize: "20px",
              lineHeight: "30px",
            }}
          >
            Confirm New Password
          </Typography>
          <TextField
            variant="outlined"
            size="medium"
            sx={{ width: "687px", height: "56px" }}
          ></TextField>
        </Box>
        <Button variant="contained" sx={{ width: "156px", height: "38px", borderRadius: "4px", alignSelf:"center"}}>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "30px",
              textAlign: "center",
              textTransform:"capitalize"
            }}
          >
            Confirm
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default UpdatePassword;
