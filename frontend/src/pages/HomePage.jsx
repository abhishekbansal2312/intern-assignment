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
    <div className="p-8 bg-gray-50 min-h-screen ">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 ">
        Stock Market Dashboard
      </h1>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <StockDropdown stocks={stocks} onStockSelect={handleStockSelect} />
          </div>

          {selectedStock && (
            <div className="space-y-4">
              <DurationSelector
                availableDurations={selectedStock.available}
                selectedDuration={selectedDuration}
                onDurationChange={handleDurationChange}
              />
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center mt-8">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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
            <p className="text-center text-gray-600">
              No data available for the selected stock and duration.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
