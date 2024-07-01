import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const PieActiveArc = ({ data }) => {
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30 },
        },
      ]}
      height={250}
      label={({ dataEntry }) => (
        <text>{`${dataEntry.label} (${dataEntry.value.toFixed(2)} MMK)`}</text>
      )}
    />
  );
};

export default PieActiveArc;
