import React from "react";

const StockDropdown = ({ stocks, onStockSelect }) => {
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
    </div>
  );
};

export default StockDropdown;
