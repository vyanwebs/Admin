// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../../../api/axios";

// export const verifyAppointment = createAsyncThunk(
//   "appointment/verify",
//   async (
//     payload: { email: string; appointmentCode: string; chairNo: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await API.post(
//         "/appointments/verify-appointment",
//         payload
//       );
//       return data;
//     } catch (error: any) {
//       console.error(" Verify appointment error:", error);
//       return rejectWithValue(
//         error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Something went wrong while verifying appointment"
//       );
//     }
//   }
// );

// interface AppointmentState {
//   loading: boolean;
//   success: boolean;
//   message: string | null;
//   error: string | null;
// }

// const initialState: AppointmentState = {
//   loading: false,
//   success: false,
//   message: null,
//   error: null,
// };

// const appointmentSlice = createSlice({
//   name: "appointment",
//   initialState,
//   reducers: {
//     resetAppointmentState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.message = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(verifyAppointment.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(verifyAppointment.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = action.payload?.success || false;
//         state.message =
//           action.payload?.message || "Appointment verified successfully";
//       })
//       .addCase(verifyAppointment.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { resetAppointmentState } = appointmentSlice.actions;
// export default appointmentSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios"; // axios instance
import type { IUser, IAppointment } from "../../types/usera.types";

interface AppointmentState {
  appointments: IAppointment[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  error: null,
};

// Fetch all appointments
export const fetchAppointments = createAsyncThunk(
  "appointment/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/appointments");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch appointments");
    }
  }
);

// Accept appointment
export const acceptAppointment = createAsyncThunk(
  "appointment/accept",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/appointments/${id}/accept`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to accept appointment");
    }
  }
);

// Reject appointment
export const rejectAppointment = createAsyncThunk(
  "appointment/reject",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/appointments/${id}/reject`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to reject appointment");
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    resetAppointmentState: (state) => {
      state.appointments = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch appointments
      .addCase(fetchAppointments.pending, (state) => { state.loading = true; })
      .addCase(fetchAppointments.fulfilled, (state, action) => { state.loading = false; state.appointments = action.payload; })
      .addCase(fetchAppointments.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // Accept appointment
      .addCase(acceptAppointment.fulfilled, (state, action) => {
        const idx = state.appointments.findIndex(a => a._id === action.payload._id);
        if (idx !== -1) state.appointments[idx] = action.payload;
      })

      // Reject appointment
      .addCase(rejectAppointment.fulfilled, (state, action) => {
        const idx = state.appointments.findIndex(a => a._id === action.payload._id);
        if (idx !== -1) state.appointments[idx] = action.payload;
      });
  },
});

export const { resetAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;
