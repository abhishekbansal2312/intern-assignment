import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://intern-assignment-sz92.onrender.com/api/stocks";

let globalAbortController = null;

const initialState = {
  stocks: [],
  selectedStock: null,
  stockData: [],
  loading: false,
  error: null,
};

const shortPolling = async (stockId, duration, dispatch, signal) => {
  try {
    while (!signal.aborted) {
      const response = await axios.post(
        `${API_BASE_URL}/${stockId}`,
        { duration },
        { signal }
      );
      const data = response.data;

      console.log("Polling Data:", data);

      dispatch(updateStockData(data));

      if (data.status === "COMPLETE") {
        console.log("Polling complete.");
        return data;
      }

      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, 2000);
        signal.addEventListener("abort", () => {
          clearTimeout(timeout);
          console.log("Polling aborted.");
          reject(new Error("Polling Aborted"));
        });
      });
    }
  } catch (error) {
    if (axios.isCancel(error) || error.message === "Polling Aborted") {
      console.log("Polling stopped.");
      return null;
    }
    console.error("Polling error:", error);
    throw error;
  }
};

export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
});

export const fetchStockData = createAsyncThunk(
  "stocks/fetchStockData",
  async ({ stockId, duration }, { dispatch, rejectWithValue }) => {
    try {
      if (globalAbortController) globalAbortController.abort();

      globalAbortController = new AbortController();

      dispatch(clearStockData());

      return await shortPolling(
        stockId,
        duration,
        dispatch,
        globalAbortController.signal
      );
    } catch (error) {
      return rejectWithValue(error.message);
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
      state.loading = false;
      state.error = null;
    },
    updateStockData: (state, action) => {
      state.stockData = action.payload;
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
        state.stockData = action.payload || state.stockData;
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedStock, clearStockData, updateStockData } =
  stockSlice.actions;

export default stockSlice.reducer;
