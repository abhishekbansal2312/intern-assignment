import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://intern-assignment-sz92.onrender.com/api/stocks";

const initialState = {
  stocks: [],
  selectedStock: null,
  stockData: [],
  loading: false,
  error: null,
};

export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  try {
    const response = await axios.get(API_BASE_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
});

export const fetchStockData = createAsyncThunk(
  "stocks/fetchStockData",
  async ({ stockId, duration }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${stockId}`,
        { duration },
        { withCredentials: true }
      );
      return response.data;
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

      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.stockData = action.payload;
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedStock, clearStockData } = stockSlice.actions;

export default stockSlice.reducer;
