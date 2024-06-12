import * as React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { Owe } from "./Owe";
import { Lend } from "./Lend";
import { ShowMoreBtn } from "../utils";

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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Header box of Budget */}
      <Box
        sx={{
          height: "23px",
          marginBottom: "13.5px",
          width: "317.5px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="title">Debt List</Typography>
        <ShowMoreBtn to={"/lists"} />
      </Box>
      {/* Small line */}
      <Divider
        sx={{
          width: "calc(100% - 64px)",
          backgroundColor: "black",
          marginBottom: "8px",
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
