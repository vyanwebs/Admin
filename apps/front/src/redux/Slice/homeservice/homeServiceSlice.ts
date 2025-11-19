import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios"; 

export interface HomeService {
  _id?: string;
  name: string;
  price: number;
  description: string;
  gender: string;
  image?: string;
}

interface StateType {
  data: HomeService[];
  loading: boolean;
  error: string | null;
}

const initialState: StateType = {
  data: [],
  loading: false,
  error: null,
};

// 🌟 FETCH SERVICES BY GENDER
export const fetchHomeServices = createAsyncThunk(
  "homeServices/fetch",
  async (gender: string, { rejectWithValue }) => {
    try {
      const res = await API.get(`/home-services?gender=${gender}`);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

// 🌟 ADD SERVICE
export const addHomeService = createAsyncThunk(
  "homeServices/add",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await API.post(`/home-services/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to add");
    }
  }
);

// 🌟 UPDATE SERVICE
export const updateHomeService = createAsyncThunk(
  "homeServices/update",
  async (
    { id, formData }: { id: string; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await API.put(`/home-services/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to update");
    }
  }
);

// 🌟 DELETE SERVICE
export const deleteHomeService = createAsyncThunk(
  "homeServices/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await API.delete(`/home-services/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue("Failed to delete");
    }
  }
);

const homeServiceSlice = createSlice({
  name: "homeServices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchHomeServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })

      // ADD
      .addCase(addHomeService.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateHomeService.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteHomeService.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      });
  },
});

export default homeServiceSlice.reducer;
