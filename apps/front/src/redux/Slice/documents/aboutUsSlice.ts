import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface AboutUs {
  _id: string;
  title: string;
  content: string;
  updatedAt: string;
}

interface AboutUsState {
  aboutUs: AboutUs | null;
  loading: boolean;
  error: string | null;
}

const initialState: AboutUsState = {
  aboutUs: null,
  loading: false,
  error: null,
};

// 🔹 Fetch About Us
export const fetchAboutUs = createAsyncThunk(
  "aboutUs/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/about-us");
      console.log("AboutUs API response:", data);
      // Handle array or object response
      if (Array.isArray(data.data)) return data.data[0] || null;
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🔹 Create or update About Us
export const createOrUpdateAboutUs = createAsyncThunk(
  "aboutUs/createOrUpdate",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/about-us", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save about us"
      );
    }
  }
);

const aboutUsSlice = createSlice({
  name: "aboutUs",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAboutUs: (state) => {
      state.aboutUs = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAboutUs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutUs.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutUs = action.payload;
      })
      .addCase(fetchAboutUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create/Update
      .addCase(createOrUpdateAboutUs.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdateAboutUs.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutUs = action.payload;
      })
      .addCase(createOrUpdateAboutUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearAboutUs } = aboutUsSlice.actions;
export default aboutUsSlice.reducer;
