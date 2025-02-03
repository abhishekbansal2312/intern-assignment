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
    return <div>Please Select Stock and Duration</div>;
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
    <div className="max-w-4xl mx-auto p-4 bg-white  rounded-lg">
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
        <h3 className="text-center font-semibold text-2xl mb-4 text-gray-800">
          Stock Details
        </h3>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full md:w-full table-auto border-collapse rounded-lg bg-white">
            <thead className="bg-gray-200 text-gray-700 text-sm md:text-base">
              <tr>
                <th className="border p-2 md:p-4 text-left font-medium">
                  Date
                </th>
                <th className="border p-2 md:p-4 text-left font-medium">
                  Price
                </th>
                <th className="border p-2 md:p-4 text-left font-medium">
                  Change
                </th>
                <th className="border p-2 md:p-4 text-left font-medium">
                  Change (%)
                </th>
                <th className="border p-2 md:p-4 text-left font-medium">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm md:text-base">
              {stockData.map((entry, index) => (
                <tr
                  key={index}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="border p-2 md:p-4">
                    {formatDate(entry.timestamp)}
                  </td>
                  <td className="border p-2 md:p-4 text-green-500 font-semibold">
                    {entry.price}
                  </td>
                  <td
                    className={`border p-2 md:p-4 ${
                      entry.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {entry.change}
                  </td>
                  <td
                    className={`border p-2 md:p-4 ${
                      entry.change_percent >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {entry.change_percent}%
                  </td>
                  <td className="border p-2 md:p-4">{entry.volume}</td>
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
