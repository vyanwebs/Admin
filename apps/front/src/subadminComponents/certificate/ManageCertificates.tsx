import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Modal,
  message,
  Space,
  Tag,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} from "../../redux/Slice/Uploadcertificate/certificateSlice";
import CertificateForm, { type Certificate } from "./CertificateForm";

const { Search } = Input;

const ManageCertificates: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    certificates = [],
    loading = false,
    error = null,
  } = useAppSelector((state: any) => state.certificates);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCertificate, setEditingCertificate] =
    useState<Certificate | null>(null);

  const [searchText, setSearchText] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCertificates());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      setSubmitLoading(true);

      if (id) {
        await dispatch(updateCertificate({ id, formData })).unwrap();
        message.success("Certificate updated");
      } else {
        await dispatch(addCertificate(formData)).unwrap();
        message.success("Certificate added");
      }

      setModalVisible(false);
      setEditingCertificate(null);
      dispatch(fetchCertificates());
    } catch (error: any) {
      message.error(error?.message || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCertificate(id)).unwrap();
      message.success("Deleted successfully");
      dispatch(fetchCertificates());
    } catch {
      message.error("Failed to delete");
    }
  };

  const handleModalOk = () => {
    const btn = document.querySelector(".certificate-form-submit-button");
    if (btn) (btn as HTMLButtonElement).click();
  };

  const filteredCertificates = certificates.filter((cert: Certificate) =>
    cert.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Certificate Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) =>
        imageUrl ? (
          <img
            src={imageUrl}
            alt="Certificate"
            style={{
              width: 70,
              height: 55,
              borderRadius: 6,
              objectFit: "cover",
            }}
          />
        ) : (
          <Tag color="red">No Image</Tag>
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Uploaded Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Certificate) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingCertificate(record);
              setModalVisible(true);
            }}
          />

          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDelete(record._id!)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span>
            Certificate Management &nbsp; ({certificates.length} certificates)
          </span>

          <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-auto">
            <Button
              icon={<ReloadOutlined />}
              onClick={() => dispatch(fetchCertificates())}
              loading={loading}
              className="w-full md:w-auto"
            >
              Refresh
            </Button>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingCertificate(null);
                setModalVisible(true);
              }}
              className="w-full md:w-auto"
            >
              Add Certificate
            </Button>
          </div>
        </div>
      }
    >
      <Search
        placeholder="Search certificates..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        className="mb-4 w-full md:w-1/2"
      />

      <div style={{ overflowX: "auto" }}>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={filteredCertificates}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>

      <Modal
        open={modalVisible}
        title={editingCertificate ? "Edit Certificate" : "Add Certificate"}
        onCancel={() => {
          setModalVisible(false);
          setEditingCertificate(null);
        }}
        onOk={handleModalOk}
        okText={editingCertificate ? "Update" : "Create"}
        confirmLoading={submitLoading}
        destroyOnClose
        width={600}
      >
        <CertificateForm
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingCertificate(null);
          }}
          onSubmit={handleAddOrUpdate}
          initialData={editingCertificate}
          loading={submitLoading}
        />
      </Modal>
    </Card>
  );
};

export default ManageCertificates;
