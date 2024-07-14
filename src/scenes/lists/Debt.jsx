import React, { useCallback, useState, useEffect } from "react";
import { tokens } from "../../theme";
import {
  Box,
  Button,
  ButtonGroup,
  useTheme,
  styled,
  Typography,
  SpeedDial,
  SpeedDialAction,
  Modal,
  useMediaQuery,
} from "@mui/material";
import { ActivePage, AddDebt, ClosedPage } from "../../components/debt list";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { getDebtRecord } from "../../api/debtRecordApi";
import { Loader } from "../../components/utils";

const Debt = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState("active");
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));

  const StyledButton = styled(Button)(({ theme }) => ({
    width: isMediumScreen ? "60%" : "433px",
    height: isMediumScreen ? "100%" : "37px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.neutral.dark,
      color: "white",
    },
    borderRadius: "16px",
  }));

  const actions = [
    {
      icon: (
        <PowerSettingsNewIcon
          sx={{
            transform: "rotate(180deg)",
            color: "green",
          }}
        />
      ),
      name: "Lend",
    },
    {
      icon: <PowerSettingsNewIcon sx={{ color: "red" }} />,
      name: "Owe",
    },
  ];

  const handlePage = useCallback((event) => {
    setPage(event.target.value);
  }, []);

  const fetchRecords = async () => {
    setIsLoading(true);
    const res = await getDebtRecord();
    setItems(res.data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const active = items?.filter((item) => item.amount !== 0) || [];
  const closed = items?.filter((item) => item.amount === 0) || [];

  // console.log(`Active : ${active}`);
  // console.log(`Closed : ${closed.map((item) => item)}`);

  const renderPage = () => {
    if (page === "active") {
      return <ActivePage items={active} refresh={fetchRecords} />;
    } else if (page === "closed") {
      return <ClosedPage items={closed} refresh={fetchRecords} />;
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    // Container
    <Box
      sx={{
        width: isMediumScreen ? "100%" : isLaptop ? `92vw` : "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Loader isLoading={isLoading} />
      {/* Main  */}
      <Box
        sx={{
          marginTop: theme.spacing(3),
          width: isMediumScreen ? "90%" : "1249px",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: theme.spacing(3),
        }}
      >
        {/* Top nav  */}
        <ButtonGroup
          sx={{
            width: isMediumScreen ? "100%" : undefined,
            borderRadius: "16px",
          }}
        >
          <StyledButton
            value="active"
            onClick={handlePage}
            sx={{
              backgroundColor: page === "active" ? colors.purple[600] : "white",
              color: page === "active" ? "white" : colors.purple[600],
              "&:hover": {
                backgroundColor:
                  page === "active" ? colors.purple[200] : colors.purple[100],
              },
            }}
          >
            <Typography variant="body2">Active</Typography>
          </StyledButton>
          <StyledButton
            value="closed"
            onClick={handlePage}
            sx={{
              backgroundColor: page === "closed" ? colors.purple[600] : "white",
              color: page === "closed" ? "white" : colors.purple[600],
              "&:hover": {
                backgroundColor:
                  page === "closed" ? colors.purple[200] : colors.purple[100],
              },
            }}
          >
            <Typography variant="body2">Closed</Typography>
          </StyledButton>
        </ButtonGroup>
        {/* Rendering  */}
        {renderPage()}

        {/* MUI speed dial  */}
        <SpeedDial
          ariaLabel="SpeedDial"
          sx={{
            bottom: 16,
            right: 16,
            position: "fixed",
          }}
          color={colors.button.button2}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipOpen
              tooltipTitle={action.name}
              onClick={() => {
                setModal(action.name);
                setOpenModal(true);
              }}
            />
          ))}
        </SpeedDial>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Render different components based on selected action */}
          {modal === "Lend" ? (
            <AddDebt
              action={"lend"}
              onClose={handleCloseModal}
              refresh={fetchRecords}
            />
          ) : (
            <AddDebt
              action={"owe"}
              onClose={handleCloseModal}
              refresh={fetchRecords}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Debt;
