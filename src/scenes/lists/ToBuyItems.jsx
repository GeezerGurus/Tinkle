import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { AddItem, ItemBox } from "../../components/to buy list";
import { getItemsToBuy } from "../../api/itemsToBuy";
import toDoListImage from "../../assets/to_do_list.png";
import { tokens } from "../../theme";
import { BackBtn, Loader, SpeedDial } from "../../components/utils";
import { getListToBuy } from "../../api/listsToBuy";

const ToBuyItems = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState("active");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listName, setListName] = useState("");
  const { listId } = useParams();

  const fetchItems = async () => {
    setIsLoading(true);
    const res = await getItemsToBuy(listId);
    setItems(res || []);
    setIsLoading(false);
  };

  const fetchList = async () => {
    const res = await getListToBuy(listId);
    setListName(res.name);
  };

  useEffect(() => {
    fetchList();
    fetchItems();
  }, []);

  const filteredItems =
    page === "active"
      ? items.filter((item) => !item.ispurchased)
      : items.filter((item) => item.ispurchased);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : isMediumScreen ? "90vw" : "100%",
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
      <Loader isLoading={isLoading} />

      {/* Back button  */}
      <BackBtn />

      <ButtonGroup
        fullWidth={isSmallScreen ? "90%" : isMediumScreen ? "80%" : undefined}
        variant="contained"
        sx={{
          borderRadius: "16px",
          border: `1px solid ${colors.purple[600]}`,
          mt: isMediumScreen ? 10 : undefined,
        }}
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
        {listName}
      </Typography>

      <Box
        sx={{
          width: isSmallScreen ? "90%" : "74%",
          height: isMediumScreen ? "auto" : "781px",
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
            refresh={fetchItems}
            listId={listId}
            name={item.name}
            description={item.description}
            date={new Date(item.updatedAt).toISOString().split("T")[0]}
            ispurchased={item.ispurchased}
            itemId={item._id}
          />
        ))}
      </Box>
        
      {/* Add item  */}
      <SpeedDial
        modal={<AddItem listId={listId} items={items} refresh={fetchItems} />}
      />
    </Box>
  );
};

export default ToBuyItems;
