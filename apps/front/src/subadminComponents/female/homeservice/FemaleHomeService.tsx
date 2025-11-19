import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Space,
  Tag,
  Popconfirm,
  message,
  Input,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchHomeServices,
  addHomeService,
  updateHomeService,
  deleteHomeService,
} from "../../../redux/Slice/homeservice/homeServiceSlice";

import FemaleHomeServiceForm from "./FemaleHomeServiceForm";

const { Search } = Input;

const FemaleHomeService = () => {
  const dispatch = useAppDispatch();
  const homeServiceState = useAppSelector((state) => state.homeServices || {});
  const { data = [], loading = false } = homeServiceState;

  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchHomeServices("female"));
  }, [dispatch]);

  const handleSubmit = async (formData: FormData, id?: string) => {
    try {
      if (id) {
        await dispatch(updateHomeService({ id, formData })).unwrap();
      } else {
        await dispatch(addHomeService(formData)).unwrap();
      }
      message.success("Success!");
      setModalVisible(false);
      setEditing(null);
      dispatch(fetchHomeServices("female"));
    } catch (err: any) {
      message.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteHomeService(id));
    dispatch(fetchHomeServices("female"));
  };

  // 🔥 FINAL FIX — yaha gender filter add kiya
  const filtered = data
    .filter((s) => s.gender === "female")
    .filter((s) =>
      s?.name?.toLowerCase().includes(searchText.toLowerCase())
    );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (img: string) =>
        img ? (
          <img
            src={img}
            width={60}
            height={60}
            style={{ borderRadius: 8, objectFit: "cover" }}
          />
        ) : (
          <Tag>No Image</Tag>
        ),
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Price",
      dataIndex: "price",
      render: (p: number) => `₹${p}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "35%",
      ellipsis: true,
    },
    {
      title: "Actions",
      render: (_: any, row: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => {
              setEditing(row);
              setModalVisible(true);
            }}
          />
          <Popconfirm title="Delete?" onConfirm={() => handleDelete(row._id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Female Home Services"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditing(null);
            setModalVisible(true);
          }}
        >
          Add
        </Button>
      }
    >
      <Search
        placeholder="Search services..."
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Table
        columns={columns}
        dataSource={filtered}
        loading={loading}
        rowKey={(r) => r._id}
      />

      <FemaleHomeServiceForm
        open={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        initialData={editing}
        loading={loading}
      />
    </Card>
  );
};

export default FemaleHomeService;
