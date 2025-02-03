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

  const { stocks, selectedStock, stockData, loading, error } = useSelector(
    (state) => state.stock
  );
  console.log(stockData, "stock data");

  const { selectedDuration } = useSelector((state) => state.duration);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  const handleStockSelect = (stockId) => {
    const selected = stocks.find((stock) => stock.id === stockId);
    dispatch(setSelectedStock(selected));
    dispatch(setDuration(""));
  };

  const handleDurationChange = (duration) => {
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

      <StockDropdown stocks={stocks} onStockSelect={handleStockSelect} />

      {selectedStock && (
        <DurationSelector
          availableDurations={selectedStock.available}
          selectedDuration={selectedDuration}
          onDurationChange={handleDurationChange}
        />
      )}

      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="mt-8 text-red-600 text-center">
          <p>{error}</p>
        </div>
      )}

      {stockData && stockData !== 0 ? (
        <StockGraph data={stockData} />
      ) : (
        <p>No data available for the selected stock and duration.</p>
      )}
    </div>
  );
};

export default HomePage;
