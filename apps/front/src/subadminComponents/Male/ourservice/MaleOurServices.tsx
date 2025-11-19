import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Modal,
  Space,
  Tag,
  Popconfirm,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchServices,
  addService,
  updateService,
  deleteService,
} from "../../../redux/Slice/OurService/commonServiceSlice";

import MaleOurServiceForm from "./MaleOurServiceForm";

const { Search } = Input;

const MaleOurServices: React.FC = () => {
  const dispatch = useAppDispatch();
  const { services = [], loading = false, error = null } = useAppSelector(
    (state: any) => state.commonService
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchServices("male"));
  }, [dispatch]);

  useEffect(() => {
    if (error) message.error(error);
  }, [error]);

  const maleServices = services.filter((s: any) => s.gender === "male");

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      setSubmitLoading(true);
      if (id)
        await dispatch(updateService({ id, formData })).unwrap();
      else
        await dispatch(addService(formData)).unwrap();

      message.success("✔ Operation successful");
      setModalVisible(false);
      setEditingService(null);
      dispatch(fetchServices("male"));
    } catch (err: any) {
      message.error(err || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteService(id)).unwrap();
      message.success("🗑️ Deleted successfully");
      dispatch(fetchServices("male"));
    } catch {
      message.error("Failed to delete service");
    }
  };

  const handleModalOk = () => {
    const submitBtn = document.querySelector(
      ".male-service-form-submit-button"
    ) as HTMLButtonElement | null;

    if (submitBtn) submitBtn.click();
  };

  const filteredServices = maleServices.filter((s: any) =>
    (s.title || "").toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (img: string) =>
        img ? (
          <img
            src={img}
            alt="service"
            width={60}
            height={60}
            style={{ borderRadius: 6, objectFit: "cover" }}
          />
        ) : (
          <Tag color="red">No Image</Tag>
        ),
    },

    { title: "Title", dataIndex: "title", key: "title" },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (p: number | string) => `₹${p}`,
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (c: string) => <Tag color="blue">{c}</Tag>,
    },

    {
      title: "About",
      dataIndex: "extra",
      key: "extra",
      ellipsis: true,
    },

    {
      title: "Estimated Time",
      dataIndex: "estimatedTime",
      key: "estimatedTime",
      render: (t: number) => `${t} min`,
    },

    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingService(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={`Male Services (${maleServices.length})`}
      extra={
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => dispatch(fetchServices("male"))}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingService(null);
              setModalVisible(true);
            }}
          >
            Add Service
          </Button>
        </Space>
      }
    >
      <Search
        placeholder="Search male services..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        style={{ marginBottom: 16, width: "50%" }}
      />

      <Table
        rowKey={(r: any) => r._id}
        columns={columns}
        dataSource={filteredServices}
        loading={loading}
        pagination={{ pageSize: 6 }}
        locale={{ emptyText: "No male services found" }}
      />

      <Modal
        title={editingService ? "Edit Male Service" : "Add Service"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingService(null);
        }}
        onOk={handleModalOk}
        okText={editingService ? "Update" : "Create"}
        confirmLoading={submitLoading}
        width={700}
        destroyOnClose
      >
        <MaleOurServiceForm
          visible={modalVisible}
          onSubmit={handleAddOrUpdate}
          initialData={editingService}
          loading={submitLoading}
        />
      </Modal>
    </Card>
  );
};

export default MaleOurServices;
