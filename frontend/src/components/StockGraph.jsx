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

  const stockData = data?.data;

  if (!stockData || !Array.isArray(stockData)) {
    return <div>Loading or no data available...</div>;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  // Stock Price Chart Data
  const stockPriceChartData = {
    labels: stockData.map((entry) => formatDate(entry.timestamp)),
    datasets: [
      {
        label: "Stock Price",
        data: stockData.map((entry) => entry.price),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
        fill: true,
      },
    ],
  };

  // Price Change Chart Data
  const priceChangeChartData = {
    labels: stockData.map((entry) => formatDate(entry.timestamp)),
    datasets: [
      {
        label: "Price Change (%)",
        data: stockData.map((entry) => entry.change_percent),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataPoint = stockData[tooltipItem.dataIndex];
            return [
              `Price: $${dataPoint.price}`,
              `Change: ${dataPoint.change}`,
              `Change (%): ${dataPoint.change_percent}%`,
              `Volume: ${dataPoint.volume}`,
            ];
          },
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg text-center font-semibold mb-4">Stock Data</h2>

      <div className="mb-6">
        <h3 className="text-center font-semibold mb-4">
          Stock Price Over Time
        </h3>
        <Line data={stockPriceChartData} options={options} />
      </div>

      <div className="mb-6">
        <h3 className="text-center font-semibold mb-4">
          Price Change (%) Over Time
        </h3>
        <Line data={priceChangeChartData} options={options} />
      </div>

      <div className="mt-6">
        <h3 className="text-center font-semibold">Stock Details</h3>
        <div className="overflow-x-auto mt-4">
          <table className="w-full table-auto border-collapse text-sm sm:text-base">
            <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Change</th>
                <th className="border p-2">Change (%)</th>
                <th className="border p-2">Volume</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((entry, index) => (
                <tr key={index}>
                  <td className="border p-2">{formatDate(entry.timestamp)}</td>
                  <td className="border p-2">${entry.price}</td>
                  <td className="border p-2">{entry.change}</td>
                  <td className="border p-2">{entry.change_percent}%</td>
                  <td className="border p-2">{entry.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockGraph;
