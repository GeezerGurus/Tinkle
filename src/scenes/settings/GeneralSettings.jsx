import React, { useState } from "react";
import { tokens } from "../../theme";
import {
  Typography,
  useTheme,
  Box,
  Paper,
  Stack,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  Modal,
} from "@mui/material";
import { EntrySelect } from "../../components/utils";
import ShieldIcon from "@mui/icons-material/Shield";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteProfile from "../../components/settings/DeleteProfile";

const GeneralSettings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const [interval, setInterval] = useState("monthly");
  return (
    // Container
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(4),
        width: "100%",
        height: "100%",
      }}
    >
      {/* Main Box  */}
      <Paper
        sx={{
          width: "954px",
          height: "791px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 85px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: theme.spacing(4),
          }}
        >
          {/* Title  */}
          <Typography variant="title3" sx={{ borderBottom: "1px solid black" }}>
            General
          </Typography>
          {/* Contents  */}
          <Box
            sx={{
              display: "flex",
              gap: "130px",
              justifyContent: "space-around",
            }}
          >
            {/* Left  */}
            <Stack gap={2}>
              <Typography variant="text2">
                Default interval on Dashboard
              </Typography>
              <EntrySelect
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                sx={{ width: "220px", height: "56px" }}
              >
                <MenuItem value="monthly">This month</MenuItem>
                <MenuItem value="yearly">This year</MenuItem>
              </EntrySelect>
            </Stack>
            {/* Right  */}
            <Stack gap={2}>
              <Typography variant="text2">Number format</Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Hide decimal within amount"
              />
            </Stack>
          </Box>
          {/* Title 2  */}
          <Typography variant="title3" sx={{ borderBottom: "1px solid black" }}>
            Personal data & Privacy
          </Typography>
          {/* Contents 2 */}
          <Stack gap={2}>
            <Typography variant="text2">Documents to review</Typography>
            <Stack direction={"row"} justifyContent={"space-around"} gap={5}>
              <Button
                variant="outlined"
                startIcon={<ShieldIcon sx={{ color: "#006EEF" }} />}
                sx={{
                  width: "179px",
                  height: "44px",
                  borderRadius: 4,
                  border: "2px solid #006EEF",
                }}
              >
                Privacy policies
              </Button>
              <Button
                variant="outlined"
                startIcon={<InsertDriveFileIcon sx={{ color: "#006EEF" }} />}
                sx={{
                  width: "179px",
                  height: "44px",
                  borderRadius: 4,
                  border: "2px solid #006EEF",
                }}
              >
                Terms of service
              </Button>
            </Stack>
          </Stack>
          {/* Data portability  */}
          <Stack
            gap={2}
            borderBottom={"1px solid black"}
            pb={2}
            width={"796px"}
          >
            <Typography variant="text2">Data portability</Typography>
            <Typography
              variant="text2"
              sx={{ lineHeight: "150%", fontWeight: "400" }}
            >
              You have right to change your personal data by editing your
              profile information, change your transaction data for cash
              accounts by editing them. You can delete your transactions from
              linked accounts by deleting the whole set of transactions - this
              data is not editable.
            </Typography>
            <Typography
              variant="text2"
              sx={{ lineHeight: "150%", fontWeight: "400" }}
            >
              You have right to be informed about the data we hold about you and
              you can transfer your data and you have right to be forgotten and
              delete all your data - all of which you can do by sending us an
              email to support@budgetbakers.com.
            </Typography>
            <Typography
              variant="text2"
              sx={{ lineHeight: "150%", fontWeight: "400" }}
            >
              In case you have any specific issues or request, please contact
              our Data Protection Officer on email: dpo@budgetbakers.com.
            </Typography>
          </Stack>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            sx={{
              backgroundColor: "#E00000",
              borderRadius: 2,
              width: "247px",
              alignSelf: "center",
              textTransform: "none",
            }}
          >
            <Typography sx={{ lineHeight: "28px", fontSize: "15px" }}>
              Delete user profile and data
            </Typography>
          </Button>
        </Box>
      </Paper>
      {/* Delete Profile Modal*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <DeleteProfile onClose={() => setOpen(false)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default GeneralSettings;
