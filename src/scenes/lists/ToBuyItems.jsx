import React, { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Typography, useTheme } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { AddItem, ItemBox } from "../../components/to buy list";
import { getItemsToBuy } from "../../api/itemsToBuy";
import toDoListImage from "../../assets/to_do_list.png";
import { tokens } from "../../theme";
import { BackBtn, SpeedDial } from "../../components/utils";

const ToBuyItems = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState("active");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { listId } = useParams();

  const fetchItems = async () => {
    setIsLoading(true);
    let timeoutId;

    const res = await getItemsToBuy();

    timeoutId = setTimeout(() => {
      setItems(res);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems =
    items && items.length > 0
      ? page === "active"
        ? items.filter((item) => !item.isPurchased)
        : items.filter((item) => item.isPurchased)
      : [];

  return (
    <Box
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
        backgroundImage:
          filteredItems.length === 0 ? `url(${toDoListImage})` : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "40%",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Loading  */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Back button  */}
      <BackBtn />

      <ButtonGroup
        variant="contained"
        sx={{ borderRadius: "16px", border: `1px solid ${colors.purple[600]}` }}
      >
        <Button
          value="active"
          onClick={() => setPage("active")}
          sx={{
            textTransform: "none",
            borderRadius: "16px",
            width: "433px",
            height: "42px",
            backgroundColor: page === "active" ? colors.purple[600] : "white",
            color: page === "active" ? "white" : colors.purple[600],
            "&:hover": {
              backgroundColor:
                page === "active" ? colors.purple[200] : "darkgrey",
            },
          }}
        >
          <Typography variant="body2">Active</Typography>
        </Button>
        <Button
          value="closed"
          onClick={() => setPage("closed")}
          sx={{
            textTransform: "none",
            borderRadius: "16px",
            width: "433px",
            height: "42px",
            backgroundColor: page === "closed" ? colors.purple[600] : "white",
            color: page === "closed" ? "white" : colors.purple[600],
            "&:hover": {
              backgroundColor:
                page === "closed" ? colors.purple[200] : "darkgrey",
            },
          }}
        >
          <Typography variant="body2">Closed</Typography>
        </Button>
      </ButtonGroup>

      <Typography
        variant="h4"
        gutterBottom
        sx={{ borderBottom: `3px solid ${colors.purple[600]}` }}
      >
        {listId}
      </Typography>

      <Box
        sx={{
          width: "900px",
          height: "781px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflowY: "auto",
          gap: "14px",
        }}
      >
        {filteredItems.map((item, index) => (
          <ItemBox
            key={index}
            name={item.name}
            quantity={item.quantity}
            description={item.description}
            price={item.price}
            isPurchased={item.isPurchased}
            itemId={item._id}
            refresh={fetchItems}
          />
        ))}
      </Box>

      {/* Add item  */}
      <SpeedDial modal={<AddItem items={items} refresh={fetchItems} />} />
    </Box>
  );
};

export default ToBuyItems;
