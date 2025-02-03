import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStocks,
  setSelectedStock,
  fetchStockData,
} from "../redux/stockSlice";
import { setDuration } from "../redux/durationSlice";
import StockDropdown from "../components/StockDropdown";
import DurationSelector from "../components/DurationSelector";
import StockGraph from "../components/StockGraph";

const HomePage = () => {
  const dispatch = useDispatch();

  // Select state from Redux
  const { stocks, selectedStock, stockData, loading, error } = useSelector(
    (state) => state.stock
  );
  const { selectedDuration } = useSelector((state) => state.duration);

  useEffect(() => {
    // Fetch stocks when the page is loaded
    dispatch(fetchStocks());
  }, [dispatch]);

  const handleStockSelect = (stockId) => {
    // Find the selected stock object from the stocks list
    const selected = stocks.find((stock) => stock.id === stockId);
    dispatch(setSelectedStock(selected));
    dispatch(setDuration("")); // Reset duration to default value
  };

  const handleDurationChange = (duration) => {
    // Set the selected duration and fetch the stock data for the selected stock and duration
    dispatch(setDuration(duration));
    if (selectedStock) {
      dispatch(fetchStockData({ stockId: selectedStock.id, duration }));
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-center">
        Stock Market Dashboard
      </h1>

      {/* Stock selection dropdown */}
      <StockDropdown stocks={stocks} onStockSelect={handleStockSelect} />

      {/* Show Duration Selector if a stock is selected */}
      {selectedStock && (
        <DurationSelector
          availableDurations={selectedStock.available}
          selectedDuration={selectedDuration}
          onDurationChange={handleDurationChange}
        />
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error handling */}
      {error && (
        <div className="mt-8 text-red-600 text-center">
          <p>{error}</p>
        </div>
      )}

      {/* Stock Graph */}
      {stockData.length > 0 && !loading && !error && (
        <StockGraph data={stockData} />
      )}
    </div>
  );
};

export default HomePage;
