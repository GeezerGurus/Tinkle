import React, { useState } from "react";
import {
  IconButton,
  Box,
  Typography,
  Menu,
  MenuItem,
  Paper,
  useTheme,
  Modal,
  Stack,
  useMediaQuery,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import EditAccount from "../settings/EditAccount";
import { ConfirmModal } from "../utils";
import AccountIcons from "../utils/AccountIcons";
import { deleteAccount } from "../../api/accountApi";
import { isLeaf } from "@mui/x-data-grid";

export const Account = ({
  id,
  refresh,
  type,
  Title,
  Amount,
  BgColor,
  isMediumScreen,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modal, setModal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //account data fetch
  const types = [
    { value: "Cash", icon: AccountIcons[0], text: "Cash" },
    { value: "Bank", icon: AccountIcons[1], text: "Bank" },
    { value: "Saving", icon: AccountIcons[2], text: "Saving" },
    { value: "General", icon: AccountIcons[3], text: "General" },
    { value: "Investment", icon: AccountIcons[4], text: "Investment" },
    { value: "Loan", icon: AccountIcons[5], text: "Loan" },
    { value: "Card", icon: AccountIcons[6], text: "Card" },
    { value: "Insurance", icon: AccountIcons[7], text: "Insurance" },
    { value: "Bonus", icon: AccountIcons[8], text: "Bonus" },
    { value: "EMoney", icon: AccountIcons[9], text: "EMoney" },
  ];
  const accountType = types.find((t) => t.value === type);

  return (
    <Paper
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 0 0 24px",
        backgroundColor: BgColor,
        width: isMediumScreen ? "45%" : isLargest ? "24%" : "210px",
        height: isMediumScreen ? "73px" : "211px",
        borderRadius: "16px",
      }}
    >
      {/* Icon  */}
      <Box
        sx={{
          display: isMediumScreen ? "none" : "flex",
          width: "64px",
          height: "64px",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.backGround,
          borderRadius: "50%",
        }}
      >
        {accountType && (
          <accountType.icon
            sx={{
              fontSize: "40px",
              color: colors.text.text1,
              bgcolor: colors.backGround,
            }}
          />
        )}
      </Box>

      {/* Menu  */}
      <Box sx={{ position: "absolute", top: 3, right: 3 }}>
        <IconButton
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon
            sx={{
              fontSize: isMediumScreen ? "24px" : "32px",
            }}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setModal("edit");
              setOpenModal(true);
            }}
            sx={isMediumScreen ? { fontSize: "12px" } : { fontSize: "16px" }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setModal("delete");
              setOpenModal(true);
            }}
            sx={isMediumScreen ? { fontSize: "12px" } : { fontSize: "16px" }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Box>

      <Box sx={{ mt: isMediumScreen ? -1 : 0 }}>
        {/* Title  */}
        <Typography variant={isMediumScreen ? "body3" : "h6"} gutterBottom>
          {Title}
        </Typography>
        {/* Amount  */}
        <Stack direction={"row"} alignItems="center" gap={1}>
          <Typography
            variant={isMediumScreen ? "body2" : isLargeScreen ? "body3" : "h4"}
            gutterBottom
          >
            {Amount} {isMediumScreen ? "MMK" : ""}
          </Typography>
          <Typography
            variant={isLaptop ? "body2" : "body1"}
            display={isMediumScreen ? "none" : ""}
          >
            MMK
          </Typography>
        </Stack>
      </Box>
      {/* Edit modal  */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {modal === "edit" ? (
            <EditAccount
              name={Title}
              balance={Amount}
              type={type}
              refresh={refresh}
              id={id}
              onClose={() => setOpenModal(false)}
            />
          ) : (
            <ConfirmModal
              onClick={() => {
                deleteAccount(id);
              }}
              refresh={refresh}
              snackbarText={"Account deleted!"}
              color={colors.extra.red_accent}
              highlight={"Delete"}
              description={
                <>
                  Sure you really want to delete the account <b>{Title}</b>? The
                  account will be removed from your budgets. All account
                  transactions, standing orders, and debts will be irrevocably
                  lost.
                </>
              }
              promptText={"Do you really want to Delete?"}
              onClose={() => {
                setOpenModal(false);
              }}
            />
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default Account;
