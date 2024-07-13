import { Box, List } from "@mui/material";
import React, { useState, useEffect } from "react";
import SavingItem from "./SavingItem";
import { getGoals } from "../../api/goals";
import { GoalActiveImage } from "../../assets/empty/index";
import { Loader } from "../utils";

export const Active = ({ isSmallScreen, state }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(state || "active");

  const fetchGoals = async () => {
    setIsLoading(true);
    const res = await getGoals();
    setLists(res || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGoals();
  }, [page]);

  const filteredGoals = lists.filter((list) => {
    if (page === "active") {
      return list.state === "active";
    } else if (page === "paused") {
      return list.state === "paused";
    } else if (page === "reached") {
      return list.state === "reached";
    } else {
      return false;
    }
  });

  return (
    <Box
      sx={{
        width: isSmallScreen ? "90%" : "65%",
        height: "779px",
        gap: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "0px 2%",

        backgroundImage:
          filteredGoals.length === 0 ? `url(${GoalActiveImage})` : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "center",
      }}
    >
      <Loader isLoading={isLoading} />
      {filteredGoals.map((list, index) => (
        <SavingItem
          key={index}
          id={list._id}
          name={list.name}
          icon={list.icon}
          bgcolor={list.color}
          goal={list.amount}
          saved={list.saveamount}
          createdAt={list.createdAt}
          updatedAt={list.updatedAt}
          date={list.desireDate}
          state={list.state}
          refresh={fetchGoals}
        />
      ))}
    </Box>
  );
};

export default Active;
