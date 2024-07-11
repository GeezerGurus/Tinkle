import {React,useState,useEffect} from "react";
import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SavingItem from "./SavingItem";
import { getGoals } from "../../api/goals";
import { GoalReachedImage } from "../../assets/empty";
import { Loader } from "../utils";

export const Reached = ({isSmallScreen,state}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(state||"active")

  const fetchGoals=async()=>{
    setIsLoading(true);
    const res = await getGoals();
    setLists(res || []);
    setIsLoading(false);
    
    
  }
  useEffect(() => {
    fetchGoals();
    
  }, []);

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
        filteredGoals.length === 0 ? `url(${GoalReachedImage})` : "none",
      backgroundRepeat: "no-repeat",
      backgroundSize: "60%",
      backgroundPosition: "center",
        
      }}
    >{filteredGoals.map((list, index) => (
          <SavingItem
            key={index}
            id={list._id}
            icon={list.icon}
            bgcolor={list.color}
            name={list.name}
            goal={list.amount}
            saved={list.amount}
            createdAt={list.createdAt}
            updatedAt={list.updatedAt}
            date={list.desireDate}
            state={list.state}
            refresh={fetchGoals}
          />
        ))
      }
    </Box>
  );
};

export default Reached;
