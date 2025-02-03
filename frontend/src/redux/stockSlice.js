import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/stocks";

const initialState = {
  stocks: [],
  selectedStock: null,
  stockData: [],
  loading: false,
  error: null,
};

// Async action to fetch all stocks
export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  try {
    const response = await axios.get(API_BASE_URL, { withCredentials: true });
    return response.data; // Assumed that response.data is an array of stocks
  } catch (error) {
    throw error.response?.data || error.message;
  }
});

// Async action to fetch stock data based on selected stock and duration
export const fetchStockData = createAsyncThunk(
  "stocks/fetchStockData",
  async ({ stockId, duration }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${stockId}`,
        { duration },
        { withCredentials: true }
      );
      return response.data; // Assumed that response.data contains the stock data
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },
    clearStockData: (state) => {
      state.stockData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchStocks actions
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle fetchStockData actions
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.stockData = action.payload; // Store the fetched stock data
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedStock, clearStockData } = stockSlice.actions;

export default stockSlice.reducer;
