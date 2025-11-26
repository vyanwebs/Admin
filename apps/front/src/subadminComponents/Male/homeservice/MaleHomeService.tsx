// // MaleHomeService.tsx
// import React, { useEffect, useState } from "react";
// import { Card, Table, Button, Space, Tag, Popconfirm, Input, Modal } from "antd";
// import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import {
//   fetchHomeServices,
//   addHomeService,
//   updateHomeService,
//   deleteHomeService,
// } from "../../../redux/Slice/homeservice/homeServiceSlice";
// import MaleHomeServiceForm, { type HomeService } from "./MaleHomeServiceForm";

// const { Search } = Input;

// const MaleHomeService: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { data = [], loading = false } = useAppSelector((state) => state.homeServices);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [editingService, setEditingService] = useState<HomeService | null>(null);
//   const [searchText, setSearchText] = useState("");
//   const [submitLoading, setSubmitLoading] = useState(false);

//   useEffect(() => {
//     dispatch(fetchHomeServices("male"));
//   }, [dispatch]);

//   const handleAddOrUpdate = async (formData: FormData, id?: string) => {
//     try {
//       setSubmitLoading(true);
//       if (id) {
//         await dispatch(updateHomeService({ id, formData })).unwrap();
//       } else {
//         await dispatch(addHomeService(formData)).unwrap();
//       }
//       setModalVisible(false);
//       setEditingService(null);
//       dispatch(fetchHomeServices("male"));
//     } catch (err: any) {
//       console.error(err);
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await dispatch(deleteHomeService(id)).unwrap();
//       dispatch(fetchHomeServices("male"));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleModalOk = () => {
//     const formButton = document.querySelector(".male-home-service-form-submit-button");
//     if (formButton) (formButton as HTMLButtonElement).click();
//   };

//   const filteredServices = data
//     .filter((s) => s.gender === "male")
//     .filter((s) => s.name?.toLowerCase().includes(searchText.toLowerCase()));

//   const columns = [
//     {
//       title: "Image",
//       dataIndex: "image",
//       render: (img: string) =>
//         img ? <img src={img} width={60} height={60} style={{ borderRadius: 6, objectFit: "cover" }} /> : <Tag color="red">No Image</Tag>,
//     },
//     { title: "Name", dataIndex: "name" },
//     { title: "Price", dataIndex: "price", render: (p: number) => `₹${p}` },
//     { title: "Description", dataIndex: "description", ellipsis: true, width: "35%" },
//     {
//       title: "Actions",
//       render: (_: any, record: HomeService) => (
//         <Space>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => {
//               setEditingService(record);
//               setModalVisible(true);
//             }}
//           />
//           <Popconfirm title="Delete?" onConfirm={() => handleDelete(record._id!)}>
//             <Button danger icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Card
//       title={`Male Home Services (${filteredServices.length})`}
//       extra={
//         <Space>
//           <Button icon={<ReloadOutlined />} onClick={() => dispatch(fetchHomeServices("male"))} loading={loading}>
//             Refresh
//           </Button>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => {
//               setEditingService(null);
//               setModalVisible(true);
//             }}
//           >
//             Add New
//           </Button>
//         </Space>
//       }
//     >
//       <Search
//         placeholder="Search services..."
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//         allowClear
//         style={{ marginBottom: 16, width: "50%" }}
//       />

//       <Table
//         rowKey="_id"
//         columns={columns}
//         dataSource={filteredServices}
//         loading={loading || submitLoading}
//         pagination={{ pageSize: 5 }}
//         scroll={{ x: 800 }}
//       />

//       <Modal
//         title={editingService ? "Edit Male Home Service" : "Add Male Home Service"}
//         open={modalVisible}
//         onCancel={() => {
//           setModalVisible(false);
//           setEditingService(null);
//         }}
//         onOk={handleModalOk}
//         confirmLoading={submitLoading}
//         width={700}
//         destroyOnClose
//       >
//         <MaleHomeServiceForm
//           visible={modalVisible}
//           onCancel={() => {
//             setModalVisible(false);
//             setEditingService(null);
//           }}
//           onSubmit={handleAddOrUpdate}
//           initialData={editingService}
//           loading={submitLoading}
//         />
//       </Modal>
//     </Card>
//   );
// };

// export default MaleHomeService;

// MaleHomeService.tsx
import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Popconfirm,
  Input,
  Modal,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchHomeServices,
  addHomeService,
  updateHomeService,
  deleteHomeService,
} from "../../../redux/Slice/homeservice/homeServiceSlice";

import MaleHomeServiceForm, { type HomeService } from "./MaleHomeServiceForm";

const { Search } = Input;

const MaleHomeService: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data = [], loading = false } = useAppSelector(
    (state) => state.homeServices
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState<HomeService | null>(
    null
  );
  const [searchText, setSearchText] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchHomeServices("male"));
  }, [dispatch]);

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      setSubmitLoading(true);
      if (id) {
        await dispatch(updateHomeService({ id, formData })).unwrap();
      } else {
        await dispatch(addHomeService(formData)).unwrap();
      }

      setModalVisible(false);
      setEditingService(null);
      dispatch(fetchHomeServices("male"));
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteHomeService(id)).unwrap();
      dispatch(fetchHomeServices("male"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalOk = () => {
    const formButton = document.querySelector(
      ".male-home-service-form-submit-button"
    );
    if (formButton) (formButton as HTMLButtonElement).click();
  };

  const filteredServices = data
    .filter((s) => s.gender === "male")
    .filter((s) =>
      s.name?.toLowerCase().includes(searchText.toLowerCase())
    );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      width: 80,
      render: (img: string) =>
        img ? (
          <img
            src={img}
            className="w-[55px] h-[55px] rounded-lg object-cover shadow-sm"
          />
        ) : (
          <Tag color="red">No Image</Tag>
        ),
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Price",
      dataIndex: "price",
      render: (p: number) => (
        <span className="text-green-600 font-semibold">₹{p}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
      width: "35%",
    },
    {
      title: "Actions",
      width: 140,
      render: (_: any, record: HomeService) => (
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
            title="Delete?"
            onConfirm={() => handleDelete(record._id!)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-2 sm:p-4">
      <Card
        className="shadow-lg rounded-xl"
        title={
          <span className="font-semibold text-lg">
            Male Home Services ({filteredServices.length})
          </span>
        }
        extra={
          // DESKTOP/TABLET Buttons
          <div className="hidden sm:flex gap-2">
            <Button
              icon={<ReloadOutlined />}
              onClick={() => dispatch(fetchHomeServices("male"))}
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
              Add New
            </Button>
          </div>
        }
      >
        {/* MOBILE BUTTONS (title ke neeche) */}
        <div className="flex sm:hidden flex-col gap-2 mb-3">
          <Button
            icon={<ReloadOutlined />}
            onClick={() => dispatch(fetchHomeServices("male"))}
            loading={loading}
            className="w-full"
          >
            Refresh
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="w-full"
            onClick={() => {
              setEditingService(null);
              setModalVisible(true);
            }}
          >
            Add New
          </Button>
        </div>

        {/* SEARCH BAR */}
        <Search
          placeholder="Search services..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          size="large"
          className="mb-4 w-full"
        />

        {/* TABLE */}
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={filteredServices}
          loading={loading || submitLoading}
          pagination={{ pageSize: 5, responsive: true }}
          scroll={{ x: 600 }}
          className="rounded-lg shadow-sm"
        />

        {/* MODAL */}
        <Modal
          title={editingService ? "Edit Service" : "Add New Service"}
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingService(null);
          }}
          onOk={handleModalOk}
          confirmLoading={submitLoading}
          width={700}
          destroyOnClose
        >
          <MaleHomeServiceForm
            visible={modalVisible}
            onCancel={() => {
              setModalVisible(false);
              setEditingService(null);
            }}
            onSubmit={handleAddOrUpdate}
            initialData={editingService}
            loading={submitLoading}
          />
        </Modal>
      </Card>
    </div>
  );
};

export default MaleHomeService;
