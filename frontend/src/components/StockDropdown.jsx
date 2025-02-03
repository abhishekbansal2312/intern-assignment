import React from "react";

const StockDropdown = ({
  stocks,
  selectedStock,
  onStockSelect,
  onDurationChange,
}) => {
  return (
    <div className="w-full max-w-xs mx-auto">
      <label htmlFor="stock-select" className="block text-lg font-medium mb-2">
        Select Stock
      </label>
      <select
        id="stock-select"
        onChange={(e) => onStockSelect(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select a stock</option>
        {stocks.map((stock) => (
          <option key={stock.id} value={stock.id}>
            {stock.name}
          </option>
        ))}
      </select>

      {selectedStock && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Available Durations</h3>
          <div className="flex justify-center space-x-4 mt-2">
            {selectedStock.available.map((duration) => (
              <button
                key={duration}
                onClick={() => onDurationChange(duration)}
                className="px-4 py-2 rounded-md text-sm font-semibold bg-gray-100 text-gray-800 hover:bg-blue-300 transition"
              >
                {duration}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockDropdown;
