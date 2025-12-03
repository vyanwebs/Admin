import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Input,
  Button,
  Tag,
  Space,
  message,
  Popconfirm,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Grid } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchOffers,
  addOffer,
  updateOffer,
  deleteOffer,
} from "../../../redux/Slice/specialOffer/offerSlice";
import MaleSpecialOfferForm, {
  type SpecialOffer,
} from "./MaleSpecialOfferForm";

const { Search } = Input;

const MaleSpecialOffers: React.FC = () => {
  const screens = Grid.useBreakpoint();
  const dispatch = useAppDispatch();
  const { offers, loading } = useAppSelector((state: any) => state.offers);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingOffer, setEditingOffer] = useState<SpecialOffer | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const maleOffers = offers.filter(
    (offer: SpecialOffer) => offer.gender === "male"
  );

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      if (id) {
        await dispatch(updateOffer({ id, formData })).unwrap();
        message.success("Offer updated successfully");
      } else {
        await dispatch(addOffer(formData)).unwrap();
        message.success("Offer added successfully");
      }
      setModalVisible(false);
      setEditingOffer(null);
      dispatch(fetchOffers());
    } catch (error: any) {
      message.error(error || "Failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteOffer(id)).unwrap();
      message.success("Offer deleted");
      dispatch(fetchOffers());
    } catch (error) {
      message.error("Failed to delete");
    }
  };

  const filteredOffers = maleOffers.filter((offer: SpecialOffer) =>
    offer.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="offer"
            style={{
              width: 60,
              height: 60,
              borderRadius: 6,
              objectFit: "cover",
            }}
          />
        ) : (
          <Tag color="red">No Image</Tag>
        ),
    },
    { title: "Title", dataIndex: "title" },
    {
      title: "Discount",
      dataIndex: "discount",
      render: (d: number) => `${d}%`,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (d: string) => <Tag color="blue">{d}</Tag>,
    },
    { title: "Description", dataIndex: "description", ellipsis: true },
    {
      title: "Actions",
      render: (_: any, record: SpecialOffer) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingOffer(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="Delete this offer?"
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
      title={`Male Special Offers (${maleOffers.length})`}
      extra={
        !screens.xs && (
          <Space>
            <Button
              icon={<ReloadOutlined />}
              loading={loading}
              onClick={() => dispatch(fetchOffers())}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingOffer(null);
                setModalVisible(true);
              }}
            >
              Add New
            </Button>
          </Space>
        )
      }
    >
      {/* Search + Buttons (Responsive Row) */}
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12}>
          <Search
            placeholder="Search offers..."
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
                loading={loading}
                block
                onClick={() => dispatch(fetchOffers())}
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
                  setEditingOffer(null);
                  setModalVisible(true);
                }}
              >
                Add Offer
              </Button>
            </Col>
          </>
        )}
      </Row>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filteredOffers}
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800 }}
        style={{ marginTop: 16 }}
      />

      <MaleSpecialOfferForm
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingOffer(null);
        }}
        onSubmit={handleAddOrUpdate}
        initialData={editingOffer}
        loading={loading}
      />
    </Card>
  );
};

export default MaleSpecialOffers;
