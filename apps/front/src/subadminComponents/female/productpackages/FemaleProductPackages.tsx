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
  Row,
  Col,
  Grid,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  ManOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchProductPackages,
  addProductPackage,
  updateProductPackage,
  deleteProductPackage,
} from "../../../redux/Slice/productPackage/productPackageSlice";
import FemaleProductPackageForm, {
  type ProductPackage,
} from "./FemaleProductPackageForm";

const { Search } = Input;

const FemaleProductPackages: React.FC = () => {
  const screens = Grid.useBreakpoint();
  const dispatch = useAppDispatch();
  const {
    packages = [],
    loading = false,
    error = null,
  } = useAppSelector((state: any) => state.productPackages);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState<ProductPackage | null>(
    null
  );
  const [searchText, setSearchText] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProductPackages());
  }, [dispatch]);

  useEffect(() => {
    if (error) message.error(error);
  }, [error]);

  const femalePackages = packages.filter(
    (pkg: ProductPackage) => pkg.gender === "female"
  );

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      setSubmitLoading(true);
      if (id) {
        await dispatch(updateProductPackage({ id, formData })).unwrap();
        message.success("female product package updated successfully");
      } else {
        await dispatch(addProductPackage(formData)).unwrap();
        message.success("female product package added successfully");
      }
      setModalVisible(false);
      setEditingPackage(null);
      dispatch(fetchProductPackages());
    } catch (error: any) {
      message.error(error || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteProductPackage(id)).unwrap();
      message.success("🗑️ Female product package deleted successfully");
      dispatch(fetchProductPackages());
    } catch {
      message.error("Failed to delete product package");
    }
  };

  const handleModalOk = () => {
    const packageForm = document.querySelector(
      ".female-product-package-form-submit-button"
    );
    if (packageForm) (packageForm as HTMLButtonElement).click();
  };

  const filteredPackages = femalePackages.filter(
    (pkg: ProductPackage) =>
      pkg.name.toLowerCase().includes(searchText.toLowerCase()) ||
      pkg.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      pkg.offers?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img: string) =>
        img ? (
          <img
            src={img}
            alt="package"
            width={60}
            height={60}
            style={{ borderRadius: 6, objectFit: "cover" }}
          />
        ) : (
          <Tag color="red">No Image</Tag>
        ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `₹${price}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: string[]) => (
        <div style={{ maxWidth: 200 }}>
          {items?.slice(0, 2).map((item, idx) => (
            <div key={idx} style={{ fontSize: 12 }}>
              • {item}
            </div>
          ))}
          {items?.length > 2 && (
            <div style={{ fontSize: 12, color: "#999" }}>
              +{items.length - 2} more
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Offers",
      dataIndex: "offers",
      key: "offers",
      ellipsis: true,
      render: (offers: string) => offers || "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ProductPackage) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPackage(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this female product package?"
            onConfirm={() => handleDelete(record._id!)}
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
      title={
        <span>
          <ManOutlined style={{ marginRight: 8 }} />
          Female Product Packages ({femalePackages.length})
        </span>
      }
      extra={
        !screens.xs && (
          <Space>
            <Button
              icon={<ReloadOutlined />}
              loading={loading}
              onClick={() => dispatch(fetchProductPackages())}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingPackage(null);
                setModalVisible(true);
              }}
            >
              Add Package
            </Button>
          </Space>
        )
      }
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12}>
          <Search
            placeholder="Search female product packages..."
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
                icon={<ReloadOutlined />}
                block
                loading={loading}
                onClick={() => dispatch(fetchProductPackages())}
              >
                Refresh
              </Button>
            </Col>
            <Col xs={24}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                block
                onClick={() => {
                  setEditingPackage(null);
                  setModalVisible(true);
                }}
              >
                Add Package
              </Button>
            </Col>
          </>
        )}
      </Row>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filteredPackages}
        loading={loading}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 16 }}
        scroll={{ x: 900 }} // horizontal scroll for mobile
        locale={{ emptyText: "No female product packages found" }}
      />

      <Modal
        title={
          editingPackage
            ? "Edit Female Product Package"
            : "Add Female Product Package"
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingPackage(null);
        }}
        onOk={handleModalOk}
        okText={editingPackage ? "Update" : "Add Package"}
        confirmLoading={submitLoading}
        width={screens.xs ? "95%" : 700}
        destroyOnClose
      >
        <FemaleProductPackageForm
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingPackage(null);
          }}
          onSubmit={handleAddOrUpdate}
          initialData={editingPackage}
          loading={submitLoading}
        />
      </Modal>
    </Card>
  );
};

export default FemaleProductPackages;
