import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Modal,
  Box,
  Typography,
  Fade,
  LinearProgress,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ProgressBar = ({ amount, spentamount }) => {
  const amountValue = parseInt(amount); // Convert amount to integer
  const spentamountValue = parseInt(spentamount);
  const progressValue = (spentamountValue / amountValue) * 100;
  return (
    <Box sx={{ width: "612px" }}>
      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{
          height: 28.72,
          bgcolor: " #D9D9D9B2",
          //direction: isOverspent ? "rtl" : "ltr", // Reverse direction for overspent values only
          "& .MuiLinearProgress-bar": {
            bgcolor:
              progressValue > 50
                ? "#FF0000" // Red for normal spending
                : "#00F79E", // Green for staying within the limit
          },
        }}
      />
    </Box>
  );
};
const Bigprogress = ({ reason, amount, spentamount, remainamount, fact }) => {
  return (
    <Box
      sx={{
        width: "731px",
        height: "150px",
        backgroundColor: "#FFF2F2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "0px",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          width: "612px",
          height: "59.57px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            marginTop: "22.34px",
            fontSize: "24px",
            lineHeight: "29.05px",
            fontWeight: "500",
            letterSpacing: "1%",
          }}
        >
          {reason}
        </Typography>

        <Typography
          sx={{
            marginTop: "22.34px",
            fontSize: "24px",
            lineHeight: "29.05px",
            fontWeight: "500",
            letterSpacing: "1%",
          }}
        >
          {amount}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "612px",
          height: "28.72px",
          //backgroundColor: "green",
        }}
      >
        <ProgressBar amount={amount} spentamount={spentamount} />
      </Box>
      <Box
        sx={{
          //backgroundColor: "yellow",
          width: "612px",
          height: "54px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "612px",
            height: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              lineHeight: "24.2px",
              letterSpacing: "1%",
              fontWeight: "700",
            }}
          >
            {spentamount}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              lineHeight: "24.2px",
              letterSpacing: "1%",
              fontWeight: "700",
            }}
          >
            {remainamount}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "612px",
            height: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              lineHeight: "24.2px",
              letterSpacing: "1%",
              fontWeight: "700",
            }}
          >
            Spent
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              lineHeight: "24.2px",
              letterSpacing: "1%",
              fontWeight: "700",
            }}
          >
            {fact}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const BudgetProgressModal = ({ open, handleClose, header }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      //closeAfterTransition
      //BackdropComponent={Backdrop}
      //BackdropProps={{
      //timeout: 500,
      //}
      //}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "807px",
            alignItems: "center",
            height: "883px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            color: "black",
            border: "1px solid #000",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "145px",
              display: "flex",
              alignItems: "center",
              //backgroundColor: "red",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {" "}
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontSize: "32px",
                fontWeight: "600",
                lineHeight: "48px",
                letterSpacing: "1%",
                marginTop: "10px",
              }}
            >
              {header}
            </Typography>
            <Box
              sx={{
                marginTop: "10px",
                width: "454px",
                height: "39px",
                border: "1px solid black",
                borderRadius: "12px",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "91px",
                  height: "100%",
                  border: "1px solid black",
                  borderRadius: "12px 0px 0px 12px",
                }}
              >
                <IconButton
                  //onclick={BudgetProgressModal}
                  sx={{
                    width: "91px",
                    height: "100%",
                    border: "1px solid black",
                    borderRadius: "12px 0px 0px 12px",
                    alignItems: "center",
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  width: "272px",
                  height: "100%",
                  border: "1px solid black",
                  backgroundColor: "#240202",
                  color: "white",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "1%",
                    textAlign: "center",
                    marginTop: "5px",
                  }}
                >
                  This {header}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "91px",
                  height: "100%",
                  border: "1px solid black",
                  borderRadius: "0px 12px 12px 0px",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    width: "91px",
                    height: "100%",
                    border: "1px solid black",
                    borderRadius: "0px 12px 12px 0px",
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              height: "728px",
              width: "100%",
              //backgroundColor: "green",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Bigprogress
              reason={"Home"}
              amount={"500,000.00 MMK"}
              spentamount={"79,000.00MMK"}
              remainamount={"421,000.00MMK"}
              fact={"Remains"}
            />
            <Bigprogress
              reason={"Home"}
              amount={"500,000.00 MMK"}
              spentamount={"79,000.00MMK"}
              remainamount={"421,000.00MMK"}
              fact={"Remains"}
            />
            <Bigprogress
              reason={"Fashion"}
              amount={"500,000.00 MMK"}
              spentamount={"490,000.00MMK"}
              remainamount={"66.00MMK"}
              fact={"Overspent"}
            />
            <Bigprogress
              reason={"Fashion"}
              amount={"500,000.00 MMK"}
              spentamount={"490,000.00MMK"}
              remainamount={"66.00MMK"}
              fact={"Overspent"}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default BudgetProgressModal;
