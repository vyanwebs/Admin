// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   Table,
//   Button,
//   Input,
//   Row,
//   Col,
//   Tag,
//   message,
//   Select,
// } from "antd";
// import { ReloadOutlined } from "@ant-design/icons";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import {
//   fetchOrders,
//   updateOrderStatus,
// } from "../../redux/Slice/Orders/orderSlice";

// const { Option } = Select;

// const OrdersTablePage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { orders = [], loading, error } = useAppSelector(
//     (state: any) => state.orders
//   );

//   const [searchText, setSearchText] = useState("");

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) message.error(error);
//   }, [error]);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Delivered":
//         return "green";
//       case "Processing":
//         return "gold";
//       case "Cart":
//         return "grey";
//       default:
//         return "red";
//     }
//   };

//   const handleStatusUpdate = async (id: string, newStatus: string) => {
//     try {
//       await dispatch(updateOrderStatus({ id, status: newStatus })).unwrap();
//       message.success("Status updated successfully");
//       dispatch(fetchOrders());
//     } catch (err: any) {
//       message.error(err || "Failed to update status");
//     }
//   };

//   const filteredOrders = orders.filter((item: any) =>
//     item.productName?.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const columns = [
//     {
//       title: "User Name",
//       dataIndex: "userId",
//       responsive: ["sm"],
//       render: (user: any) => user?.fullName || "N/A",
//     },
//     {
//       title: "Order Code",
//       dataIndex: "orderCode",
//       responsive: ["xs", "sm", "md"],
//     },
//     {
//       title: "Product",
//       dataIndex: "productName",
//       responsive: ["xs", "sm", "md"],
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//       render: (amt: number) => `₹${amt}`,
//       responsive: ["sm", "md"],
//     },
//     {
//       title: "Qty",
//       dataIndex: "quantity",
//       responsive: ["sm", "md"],
//     },
//     {
//       title: "Status",
//       dataIndex: "orderStatus",
//       render: (status: string, record: any) => (
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <Tag color={getStatusColor(status)}>{status}</Tag>

//           {status !== "Cart" && (
//             <Select
//               defaultValue={status}
//               style={{
//                 width: 140,
//                 marginLeft: 8,
//                 minWidth: 100,
//               }}
//               onChange={(val) => handleStatusUpdate(record._id, val)}
//             >
//               <Option value="Processing">Processing</Option>
//               <Option value="Delivered">Delivered</Option>
//             </Select>
//           )}
//         </div>
//       ),
//       responsive: ["xs", "sm", "md"],
//     },
//   ];

//   return (
//     <Card
//       style={{ borderRadius: 12 }}
//       title={<span style={{ fontSize: 20, fontWeight: 600 }}>Manage Orders</span>}
//       extra={
//         <Button
//           icon={<ReloadOutlined />}
//           loading={loading}
//           onClick={() => dispatch(fetchOrders())}
//           type="default"
//           style={{ borderRadius: 6 }}
//         >
//           Refresh
//         </Button>
//       }
//     >
//       {/* Search Input Responsive */}
//       <Row
//         gutter={[16, 16]}
//         justify="space-between"
//         align="middle"
//         style={{ marginBottom: 16 }}
//       >
//         <Col xs={24} sm={12} md={8} lg={6}>
//           <Input
//             placeholder="Search product..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             style={{
//               width: "100%",
//               borderRadius: 6,
//               padding: 8,
//             }}
//           />
//         </Col>
//       </Row>

//       {/* Orders Table */}
//       <Table
//         loading={loading}
//         columns={columns}
//         dataSource={filteredOrders}
//         rowKey="_id"
//         pagination={{ pageSize: 10 }}
//         scroll={{ x: "max-content" }}
//         style={{ borderRadius: 12 }}
//       />
//     </Card>
//   );
// };

// export default OrdersTablePage;



import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Row,
  Col,
  Tag,
  message,
  Select,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchOrders,
  updateOrderStatus,
} from "../../redux/Slice/Orders/orderSlice";

import type { ColumnsType } from "antd/es/table";

const { Option } = Select;

const OrdersTablePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders = [], loading, error } = useAppSelector(
    (state: any) => state.orders
  );

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) message.error(error);
  }, [error]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "green";
      case "Processing":
        return "gold";
      case "Cart":
        return "grey";
      default:
        return "red";
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await dispatch(updateOrderStatus({ id, status: newStatus })).unwrap();
      message.success("Status updated successfully");
      dispatch(fetchOrders());
    } catch (err: any) {
      message.error(err || "Failed to update status");
    }
  };

  const filteredOrders = orders.filter((item: any) =>
    item.productName?.toLowerCase().includes(searchText.toLowerCase())
  );

  // ================= FIX: Correct Typed Columns ==================
  const columns: ColumnsType<any> = [
    {
      title: "User Name",
      dataIndex: "userId",
      responsive: ["sm"],
      render: (user: any) => user?.fullName || "N/A",
    },
    {
      title: "Order Code",
      dataIndex: "orderCode",
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "Product",
      dataIndex: "productName",
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amt: number) => `₹${amt}`,
      responsive: ["sm", "md"],
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      responsive: ["sm", "md"],
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      responsive: ["xs", "sm", "md"],
      render: (status: string, record: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tag color={getStatusColor(status)}>{status}</Tag>

          {status !== "Cart" && (
            <Select
              defaultValue={status}
              style={{
                width: 140,
                marginLeft: 8,
                minWidth: 100,
              }}
              onChange={(val) => handleStatusUpdate(record._id, val)}
            >
              <Option value="Processing">Processing</Option>
              <Option value="Delivered">Delivered</Option>
            </Select>
          )}
        </div>
      ),
    },
  ];

  return (
    <Card
      style={{ borderRadius: 12 }}
      title={<span style={{ fontSize: 20, fontWeight: 600 }}>Manage Orders</span>}
      extra={
        <Button
          icon={<ReloadOutlined />}
          loading={loading}
          onClick={() => dispatch(fetchOrders())}
          type="default"
          style={{ borderRadius: 6 }}
        >
          Refresh
        </Button>
      }
    >
      <Row
        gutter={[16, 16]}
        justify="space-between"
        align="middle"
        style={{ marginBottom: 16 }}
      >
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input
            placeholder="Search product..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: "100%",
              borderRadius: 6,
              padding: 8,
            }}
          />
        </Col>
      </Row>

      <Table
        loading={loading}
        columns={columns}
        dataSource={filteredOrders}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        style={{ borderRadius: 12 }}
      />
    </Card>
  );
};

export default OrdersTablePage;
