import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CreateList, ListBox } from "../../components/to buy list";
import { tokens } from "../../theme";
import { BackBtn, Loader, SpeedDial } from "../../components/utils";
import { getListsToBuy } from "../../api/listsToBuy";
import { ToBuyListImage } from "../../assets/empty";

const ToBuyList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLists = async () => {
    setIsLoading(true);
    const res = await getListsToBuy();
    setLists(res || []);
    setIsLoading(false);
    
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: lists.length === 0 ? `url(${ToBuyListImage})` : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "40%",
        backgroundPosition: "center",
        position: "relative",
        gap: 1,
      }}
    >
      <Loader isLoading={isLoading} />
      <BackBtn />

      <Typography
        variant="h4"
        gutterBottom
        sx={{
          borderBottom: `3px solid ${colors.purple[600]}`,
          mt: isSmallScreen ? 10 : undefined,
        }}
      >
        Your Lists
      </Typography>

      <Box
        sx={{
          width: isMediumScreen ? "90%" : isLargeScreen ? "100%" : "56%",
          height: "781px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflowY: "auto",
          gap: "14px",
        }}
      >
        {lists.map((list, index) => (
          <ListBox
            key={index}
            
            id={list._id}
            name={list.name}
            description={list.description}
            refresh={fetchLists}
          />
        ))}
      </Box>

      <SpeedDial modal={<CreateList refresh={fetchLists} />} />
    </Box>
  );
};

export default ToBuyList;
