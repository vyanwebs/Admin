import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Popconfirm,
  Input,
  Row,
  Col,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { Grid } from "antd";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchHomeServices,
  addHomeService,
  updateHomeService,
  deleteHomeService,
} from "../../../redux/Slice/homeservice/homeServiceSlice";

import MaleHomeServiceForm from "./MaleHomeServiceForm";

const { Search } = Input;

const MaleHomeService: React.FC = () => {
  const screens = Grid.useBreakpoint();
  const dispatch = useAppDispatch();
  const { data = [], loading = false } = useAppSelector((state) => state.homeServices);

  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchHomeServices("male"));
  }, [dispatch]);

  const handleSubmit = async (formData: FormData, id?: string) => {
    try {
      if (id) {
        await dispatch(updateHomeService({ id, formData })).unwrap();
      } else {
        await dispatch(addHomeService(formData)).unwrap();
      }
      setModalVisible(false);
      setEditing(null);
      dispatch(fetchHomeServices("male"));
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteHomeService(id));
    dispatch(fetchHomeServices("male"));
  };

  const filtered = data
    .filter((s) => s.gender === "male")
    .filter((s) => s.name?.toLowerCase().includes(searchText.toLowerCase()));

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
          <Tag color="red">No Image</Tag>
        ),
    },
    { title: "Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price", render: (p: number) => `₹${p}` },
    { title: "Description", dataIndex: "description", ellipsis: true, width: "35%" },
    {
      title: "Actions",
      render: (_: any, row: any) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
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
      title={`Male Home Services (${filtered.length})`}
      extra={
        !screens.xs && (
          <Space>
            <Button icon={<ReloadOutlined />} onClick={() => dispatch(fetchHomeServices("male"))}>
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditing(null);
                setModalVisible(true);
              }}
            >
              Add New
            </Button>
          </Space>
        )
      }
    >
      {/* Search + Responsive Buttons */}
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12}>
          <Search
            placeholder="Search services..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ width: "100%" }}
          />
        </Col>

        {screens.xs && (
          <>
            <Col xs={24}>
              <Button
                block
                icon={<ReloadOutlined />}
                onClick={() => dispatch(fetchHomeServices("male"))}
              >
                Refresh
              </Button>
            </Col>
            <Col xs={24}>
              <Button
                block
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditing(null);
                  setModalVisible(true);
                }}
              >
                Add Service
              </Button>
            </Col>
          </>
        )}
      </Row>

      <Table
        rowKey={(r) => r._id}
        columns={columns}
        dataSource={filtered}
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800 }}
        style={{ marginTop: 16 }}
      />

      <MaleHomeServiceForm
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

export default MaleHomeService;
