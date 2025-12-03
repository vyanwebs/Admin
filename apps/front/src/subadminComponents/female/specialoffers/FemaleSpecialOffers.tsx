import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Input,
  Button,
  Tag,
  Space,
  Popconfirm,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
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
import FemaleSpecialOfferForm, {
  type SpecialOffer,
} from "./FemaleSpecialOfferForm";

const { Search } = Input;

const FemaleSpecialOffers: React.FC = () => {
  const screens = Grid.useBreakpoint();
  const dispatch = useAppDispatch();
  const { offers, loading } = useAppSelector((state: any) => state.offers);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingOffer, setEditingOffer] = useState<SpecialOffer | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const femaleOffers = offers.filter(
    (offer: SpecialOffer) => offer.gender === "female"
  );

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      if (id) {
        await dispatch(updateOffer({ id, formData })).unwrap();
      } else {
        await dispatch(addOffer(formData)).unwrap();
      }
      setModalVisible(false);
      setEditingOffer(null);
      dispatch(fetchOffers());
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteOffer(id)).unwrap();
    dispatch(fetchOffers());
  };

  const filteredOffers = femaleOffers.filter((offer: SpecialOffer) =>
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
      title={`Female Special Offers (${femaleOffers.length})`}
      extra={
        !screens.xs && (
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => dispatch(fetchOffers())}
              loading={loading}
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
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12}>
          <Search
            placeholder="Search female offers..."
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
                onClick={() => dispatch(fetchOffers())}
                loading={loading}
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

      <FemaleSpecialOfferForm
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

export default FemaleSpecialOffers;
