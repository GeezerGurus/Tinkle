import * as React from "react";
import { Box, Divider } from "@mui/material";
import { Owe } from "./Owe";
import { Lend } from "./Lend";
import { ShowMoreBtn, Heading } from "../utils";

const Debt = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box
      sx={{
        width: "369px",
        height: "267px",
        backgroundColor: "white",
        borderRadius: "0 0 8px 8px",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "301px",
          marginLeft: "26px",
          height: "54.5px",
        }}
      >
        <Heading>Debt List</Heading>
        <ShowMoreBtn />
      </Box>
      <Divider
        sx={{
          backgroundColor: "black",
          margin: "0px 30px 0",
        }}
      ></Divider>
      {checked ? (
        <Lend checked={checked} handleChange={handleChange} />
      ) : (
        <Owe checked={checked} handleChange={handleChange} />
      )}
    </Box>
  );
};

export default Debt;
