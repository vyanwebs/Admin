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

// redux/Slice/appointment/appointmentSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface IAppointment {
  _id: string;
  username?: string;
  phone?: string;
  service?: string;
  date: string;
  time: string;
  appointmentStatus: "Pending" | "Accepted" | "Cancelled";
  appointmentCode?: string;
  chairNo?: number;
  email?: string;
  services?: string[];
  fromDateTime?: string;
  toDateTime?: string;
  userId?: {
    _id: string;
    fullName: string;
  };
  updatedAt?: string;
  
 // fullName?: string;
}

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

// Fetch All Appointments
export const fetchAppointments = createAsyncThunk(
  "appointments/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/appointments"); // your backend endpoint
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to load appointments");
    }
  }
);

// Accept Appointment
// export const acceptAppointment = createAsyncThunk(
//   "appointments/accept",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       // hitting your verify endpoint with appointmentCode and email
//       await API.post("/appointments/verify-appointment", { appointmentCode: id });
//       return id;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Failed to accept appointment");
//     }
//   }
// );

// redux/Slice/appointment/appointmentSlice.ts
export const acceptAppointment = createAsyncThunk(
  "appointments/accept",
  async (appointment: { appointmentCode: string; email: string }, { rejectWithValue }) => {
    try {
      await API.post("/appointments/verify-appointment", {
        appointmentCode: appointment.appointmentCode,
        email: appointment.email,
      });
      return appointment.appointmentCode;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to accept appointment");
    }
  }
);



const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(acceptAppointment.fulfilled, (state, action) => {
        // update appointment locally
        const index = state.appointments.findIndex((a) => a.appointmentCode === action.payload);
        if (index !== -1) {
          state.appointments[index].appointmentStatus = "Accepted";
        }
      })
      .addCase(acceptAppointment.rejected, (state, action: any) => {
        state.error = action.payload;
      });
  },
});

export default appointmentsSlice.reducer;
