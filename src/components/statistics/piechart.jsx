import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const PieActiveArc = ({ data }) => {
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={180}
      label={({ dataEntry }) => (
        <text
          x={dataEntry.x}
          y={dataEntry.y}
          style={{ fontSize: 12, fill: "black" }} // Change fill color to black
        >
          {`${dataEntry.label} (${dataEntry.value.toFixed(2)} MMK)`}
        </text>
      )}
    />
  );
};

export default PieActiveArc;
