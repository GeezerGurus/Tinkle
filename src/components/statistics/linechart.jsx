import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, labels, height }) => {
  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: data.income,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0,
      },
      {
        label: "Expenses",
        data: data.expenses,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: height || "100%",
        overflowX: "auto",
        paddingBottom: "20px",
      }}
    >
      <div style={{ width: `${labels.length * 40}px`, height: "100%" }}>
        <Line data={lineChartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
