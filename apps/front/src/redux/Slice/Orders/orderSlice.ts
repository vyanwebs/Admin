// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import API from "../../../api/axios";

// // export interface Order {
// //   _id: string;
// //   userName: string;
// //   amount: number;
// //   status: string;
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // interface OrderState {
// //   orders: Order[];
// //   loading: boolean;
// //   error: string | null;
// // }

// // const initialState: OrderState = {
// //   orders: [],
// //   loading: false,
// //   error: null,
// // };

// // // 🔹 Get all orders
// // export const fetchOrders = createAsyncThunk(
// //   "orders/fetchAll",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const { data } = await API.get("/orders");
// //       return data.data;
// //     } catch (error: any) {
// //       return rejectWithValue(error.response?.data?.error || error.message);
// //     }
// //   }
// // );

// // // 🔹 Update only order status (PATCH)
// // export const updateOrderStatus = createAsyncThunk(
// //   "orders/updateStatus",
// //   async (
// //     { id, status }: { id: string; status: string },
// //     { rejectWithValue }
// //   ) => {
// //     try {
// //       const { data } = await API.patch(`/orders/${id}`, { status });
// //       return data.data;
// //     } catch (error: any) {
// //       return rejectWithValue(error.response?.data?.message || "Failed to update status");
// //     }
// //   }
// // );

// // const orderSlice = createSlice({
// //   name: "orders",
// //   initialState,
// //   reducers: {
// //     clearError: (state) => {
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // 🔹 Fetch
// //       .addCase(fetchOrders.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchOrders.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.orders = action.payload;
// //       })
// //       .addCase(fetchOrders.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload as string;
// //       })

// //       // 🔹 Update Status
// //       .addCase(updateOrderStatus.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(updateOrderStatus.fulfilled, (state, action) => {
// //         state.loading = false;
// //         const index = state.orders.findIndex((o) => o._id === action.payload._id);
// //         if (index !== -1) {
// //           state.orders[index] = action.payload;
// //         }
// //       })
// //       .addCase(updateOrderStatus.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload as string;
// //       });
// //   },
// // });

// // export const { clearError } = orderSlice.actions;
// // export default orderSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../../../api/axios";

// export interface Order {
//   _id: string;
//   orderCode: string;
//   productName: string;
//   productDescription: string;
//   amount: number;
//   quantity: number;
//   orderStatus: "Processing" | "Delivered" | "Cart";
//   userId: { fullName: string };
//   createdAt: string;
//   updatedAt: string;
// }

// interface OrderState {
//   orders: Order[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: OrderState = {
//   orders: [],
//   loading: false,
//   error: null,
// };

// // 🔹 Fetch Orders (Correct endpoint)
// export const fetchOrders = createAsyncThunk(
//   "orders/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await API.get("/order/admin-get-user-orders");
//       return data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.error || "Failed to fetch orders"
//       );
//     }
//   }
// );

// // 🔹 Update order status (Correct endpoint)
// export const updateOrderStatus = createAsyncThunk(
//   "orders/updateStatus",
//   async (
//     { id, status }: { id: string; status: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await API.patch(`/order/update-order/${id}`, {
//         orderStatus: status,
//       });
//       return data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.error || "Failed to update status"
//       );
//     }
//   }
// );

// const orderSlice = createSlice({
//   name: "orders",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // FETCH ORDERS
//       .addCase(fetchOrders.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(fetchOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // UPDATE ORDER STATUS
//       .addCase(updateOrderStatus.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateOrderStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.orders.findIndex(
//           (o) => o._id === action.payload._id
//         );
//         if (index !== -1) state.orders[index] = action.payload;
//       })
//       .addCase(updateOrderStatus.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { clearError } = orderSlice.actions;

// export default orderSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface Order {
  _id: string;
  orderCode: string;
  productName: string;
  productDescription: string;
  amount: number;
  quantity: number;
  orderStatus: "Processing" | "Delivered";
  userId: { fullName: string };
  createdAt: string;
  updatedAt: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// 🔹 Fetch orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/order/admin-get-user-orders");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch orders");
    }
  }
);

// 🔹 Update order status (status-only)
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const { data } = await API.patch(`/order/update-order-status/${id}`, {
        orderStatus: status,
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to update status");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = orderSlice.actions;
export default orderSlice.reducer;
