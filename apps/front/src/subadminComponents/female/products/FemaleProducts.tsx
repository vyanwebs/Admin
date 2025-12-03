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
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../redux/Slice/product/productSlice";
import FemaleProductForm, { type Product } from "./FemaleProductForm";

const { Search } = Input;

const FemaleProducts: React.FC = () => {
  const screens = Grid.useBreakpoint();
  const dispatch = useAppDispatch();
  const {
    products = [],
    loading = false,
    error = null,
  } = useAppSelector((state: any) => state.products);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchText, setSearchText] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) message.error(error);
  }, [error]);

  const FemaleProducts = products.filter((p: Product) => p.gender === "female");

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      setSubmitLoading(true);
      if (id) {
        await dispatch(updateProduct({ id, formData })).unwrap();
        message.success("✅ Female product updated successfully");
      } else {
        await dispatch(addProduct(formData)).unwrap();
        message.success("✅ Female product added successfully");
      }
      setModalVisible(false);
      setEditingProduct(null);
      dispatch(fetchProducts());
    } catch (error: any) {
      message.error(error || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      message.success("🗑️ female product deleted successfully");
      dispatch(fetchProducts());
    } catch {
      message.error("Failed to delete product");
    }
  };

  const handleModalOk = () => {
    const productForm = document.querySelector(
      ".female-product-form button[type='submit']"
    );
    if (productForm) (productForm as HTMLButtonElement).click();
  };

  const filteredProducts = FemaleProducts.filter(
    (product: Product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.tag?.toLowerCase().includes(searchText.toLowerCase())
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
            alt="product"
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
      render: (price: string) => `₹${price}`,
    },
    {
      title: "Offer",
      dataIndex: "offer",
      key: "offer",
      render: (offer: string) => offer || "-",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: string) => rating || "-",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      render: (tag: string) => (tag ? <Tag color="blue">{tag}</Tag> : "-"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Icon",
      dataIndex: "icons",
      key: "icons",
      render: (icons: string[]) =>
        icons && icons.length > 0 ? (
          <img
            src={icons[0]}
            alt="icon"
            width={40}
            height={40}
            style={{ borderRadius: 6, objectFit: "cover" }}
          />
        ) : (
          <Tag>No Icon</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingProduct(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this female product?"
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
      title={`Female Products (${FemaleProducts.length})`}
      extra={
        !screens.xs && (
          <Space>
            <Button
              icon={<ReloadOutlined />}
              loading={loading}
              onClick={() => dispatch(fetchProducts())}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingProduct(null);
                setModalVisible(true);
              }}
            >
              Add Product
            </Button>
          </Space>
        )
      }
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12}>
          <Search
            placeholder="Search female products..."
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
                onClick={() => dispatch(fetchProducts())}
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
                  setEditingProduct(null);
                  setModalVisible(true);
                }}
              >
                Add Product
              </Button>
            </Col>
          </>
        )}
      </Row>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filteredProducts}
        loading={loading}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 16 }}
        scroll={{ x: 900 }} // ✅ horizontal scroll for mobile
      />

      <Modal
        title={editingProduct ? "Edit Female Product" : "Add Product"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingProduct(null);
        }}
        onOk={handleModalOk}
        okText={editingProduct ? "Update" : "Create"}
        confirmLoading={submitLoading}
        width={screens.xs ? "95%" : 700}
        destroyOnClose
      >
        <FemaleProductForm
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingProduct(null);
          }}
          onSubmit={handleAddOrUpdate}
          initialData={editingProduct}
          loading={submitLoading}
        />
      </Modal>
    </Card>
  );
};

export default FemaleProducts;
