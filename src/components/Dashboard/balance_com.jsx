import { Button, Box, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
export const Balancecom = ({ Icon, Reason, Amount, Color }) => {
  return (
    // bigbox
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
        color: "black",
        width: "210px",
        height: "211px",
        border: "1px",
        borderRadius: "8px",
      }}
    >
      {/* toprow box */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "88px",
          justifyContent: "space-between",
        }}
      >
        {/* Bag icon box */}
        <Box
          sx={{
            display: "flex",
            width: "64px",
            height: "64px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Color,
            borderRadius: "50%",
            margin: "24px",
          }}
        >
          <Icon
            sx={{
              fontSize: "40px",
            }}
          />
        </Box>

        {/* menu icon box */}
        <Box
          sx={{
            display: "flex",
            width: "8px",
            height: "30px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            marginTop: "20px",
            marginRight: "20px",
          }}
        >
          {" "}
          <Button
            sx={{
              minWidth: "10px",
              minHeight: "32px",
              padding: "0px",
            }}
          >
            <MoreVertIcon
              sx={{
                fontSize: "30px",
              }}
            />
          </Button>
        </Box>
      </Box>

      {/* second row box */}
      <Box
        sx={{
          marginTop: "19px",
          marginLeft: "24px",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            // fontFamily: "Inter",
            fontWeight: "600",
            lineHeight: "30px",
          }}
        >
          {Reason}
        </Typography>
      </Box>
      {/* third row box */}
      <Box
        sx={{
          marginTop: "19px",
          marginLeft: "24px",
          marginBottom: "30px",
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: "600",
            lineHeight: "32px",
            letterSpacing: "1%",
          }}
        >
          {Amount}
        </Typography>
      </Box>
    </Box>
  );
};

export default Balancecom;
