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
  TextField,
} from "@mui/material";
import { ConfirmModal } from "../../components/utils";
import ShieldIcon from "@mui/icons-material/Shield";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

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
          borderRadius: "12px",
          width: "56%",
          height: "791px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "48px 48px",
          backgroundColor: colors.purple[50],
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
          <Typography
            variant="h4"
            gutterBottom
            sx={{ borderBottom: `2px solid ${colors.purple[600]}` }}
          >
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
            <Stack gap={1}>
              <Typography variant="body2">
                Default interval on Dashboard
              </Typography>
              <TextField
                select
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                sx={{ width: "220px", height: "56px" }}
              >
                <MenuItem value="monthly">This month</MenuItem>
                <MenuItem value="yearly">This year</MenuItem>
              </TextField>
            </Stack>
            {/* Right  */}
            <Stack gap={1}>
              <Typography variant="body2">Number format</Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Hide decimal within amount"
              />
            </Stack>
          </Box>
          {/* Title 2  */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ borderBottom: `2px solid ${colors.purple[600]}` }}
          >
            Personal data & Privacy
          </Typography>
          {/* Contents 2 */}
          <Stack gap={2}>
            <Typography variant="body2">Documents to review</Typography>
            <Stack direction={"row"} justifyContent={"space-around"} gap={5}>
              <Button
                variant="outlined"
                startIcon={<ShieldIcon sx={{ color: colors.purple[600] }} />}
                sx={{
                  width: "179px",
                  height: "44px",
                  borderRadius: "28px",
                  border: `2px solid ${colors.purple[600]}`,
                  textTransform: "none",
                }}
              >
                <Typography variant="body2"> Privacy policies</Typography>
              </Button>
              <Button
                variant="outlined"
                startIcon={
                  <InsertDriveFileIcon sx={{ color: colors.purple[600] }} />
                }
                sx={{
                  width: "179px",
                  height: "44px",
                  borderRadius: "28px",
                  border: `2px solid ${colors.purple[600]}`,
                  textTransform: "none",
                }}
              >
                <Typography variant="body2"> Terms of service </Typography>
              </Button>
            </Stack>
          </Stack>
          {/* Data portability  */}
          <Stack
            gap={2}
            borderBottom={`2px solid ${colors.purple[600]}`}
            pb={2}
            width={"100%"}
          >
            <Typography variant="body2">Data portability</Typography>
            <Typography variant="body2">
              You have right to change your personal data by editing your
              profile information, change your transaction data for cash
              accounts by editing them. You can delete your transactions from
              linked accounts by deleting the whole set of transactions - this
              data is not editable. You have right to be informed about the data
              we hold about you and you can transfer your data and you have
              right to be forgotten and delete all your data - all of which you
              can do by sending us an email to support@budgetbakers.com. In case
              you have any specific issues or request, please contact our Data
              Protection Officer on email: dpo@budgetbakers.com.
            </Typography>
          </Stack>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            sx={{
              backgroundColor: colors.extra.red_accent,
              borderRadius: 2,
              borderRadius: "8px",
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
          <ConfirmModal
            onClose={() => setOpen(false)}
            color={colors.extra.red_accent}
            highlight={"DELETE"}
            promptText={"DELETE PROFILE AND ALL DATA?"}
            description={
              <>
                All financial transaction, bank connection and profile
                information is
                <br /> irreversibly deleted and all data is lost.
              </>
            }
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default GeneralSettings;
