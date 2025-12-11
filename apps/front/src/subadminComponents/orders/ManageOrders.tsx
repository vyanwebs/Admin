import React, { useState, useEffect } from "react";
import { Table, Input, Button, Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchOrders,
  updateOrderStatus,
} from "../../redux/Slice/Orders/orderSlice";

import OrderForm from "./OrderForm";
import { EditOutlined } from "@ant-design/icons";

const ManageOrders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state) => state.orders);

  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    setFilteredOrders(
      orders.filter((o) =>
        o?.userName?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [orders, search]);

  const handleEdit = (record: any) => {
    setInitialData(record);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: any, id?: string) => {
    await dispatch(updateOrderStatus({ id, data: values }));
    setIsModalOpen(false);
    setInitialData(null);
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (a: number) => `₹${a}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          Edit Status
        </Button>
      ),
    },
  ];

  return (
    <Card title="Manage Orders">
      <Input
        placeholder="Search by customer name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 300, marginBottom: 20 }}
      />

      <Table
        rowKey="_id"
        columns={columns}
        loading={loading}
        dataSource={filteredOrders}
      />

      <OrderForm
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={initialData}
      />
    </Card>
  );
};

export default ManageOrders;
