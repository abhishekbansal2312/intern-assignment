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

const StockGraph = ({ data }) => {
  console.log("Stock Data for Chart:", data);

  const stockData = data?.data; // Use optional chaining to safely access data

  // If stockData is undefined or not an array, return early with a loading message
  if (!stockData || !Array.isArray(stockData)) {
    return <div>Loading or no data available...</div>;
  }

  // Map through the stockData to extract timestamps and prices for the chart
  const chartData = {
    labels: stockData.map((entry) => entry.timestamp), // Use timestamp for x-axis labels
    datasets: [
      {
        label: "Stock Price",
        data: stockData.map((entry) => entry.price), // Use price for y-axis data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Stock Price Over Time",
        font: { size: 16 },
      },
    },
  };

  return (
    <div className="mt-6 max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg text-center font-semibold mb-4">
        Stock Price Graph
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StockGraph;
