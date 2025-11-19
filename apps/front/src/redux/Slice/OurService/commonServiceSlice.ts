import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface Service {
  _id: string;
  title: string;
  category: string;
  price: string;
  about: string;
  gender: string;
  image: string;
}

interface ServiceState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
};

// Fetch all
export const fetchServices = createAsyncThunk("services/fetchAll", async (gender: string, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/ourservice?gender=${gender}`);
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Add
export const addService = createAsyncThunk("services/add", async (formData: FormData, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/ourservice", formData, { headers: { "Content-Type": "multipart/form-data" } });
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to add service");
  }
});

// Update
export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/ourservice/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update service");
    }
  }
);

// Delete
export const deleteService = createAsyncThunk("services/delete", async (id: string, { rejectWithValue }) => {
  try {
    await API.delete(`/ourservice/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete service");
  }
});

const commonServiceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => { state.loading = true; })
      .addCase(fetchServices.fulfilled, (state, action) => { state.loading = false; state.services = action.payload; })
      .addCase(fetchServices.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      .addCase(addService.pending, (state) => { state.loading = true; })
      .addCase(addService.fulfilled, (state, action) => { state.loading = false; state.services.unshift(action.payload); })
      .addCase(addService.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      .addCase(updateService.pending, (state) => { state.loading = true; })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.services[index] = action.payload;
      })
      .addCase(updateService.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      .addCase(deleteService.pending, (state) => { state.loading = true; })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter((s) => s._id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export default commonServiceSlice.reducer;
