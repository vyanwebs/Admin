// // // // import React, { useState, useEffect } from "react";
// // // // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // // // import {
// // // //   fetchUsers,
// // // //   createUser,
// // // //   updateUser,
// // // //   deleteUser,
// // // //   resetUserState,
// // // // } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // // // import type { IUser } from "../../redux/types/usera.types";
// // // // import { Modal, Button, Table, Input, Tag, Avatar, Popconfirm, Card, Space, message } from "antd";
// // // // import { SearchOutlined, EditOutlined, DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
// // // // import UserForm from "./UserForm";

// // // // const { Search } = Input;
// // // // const ManageUsers: React.FC = () => {
// // // //   const dispatch = useAppDispatch();
// // // //   const { users, loading, error } = useAppSelector((state) => state.users);

// // // //   const [searchTerm, setSearchTerm] = useState("");
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [pageSize, setPageSize] = useState(10);
// // // //   const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
// // // //   const [isModalVisible, setIsModalVisible] = useState(false);
// // // //   const [isEditMode, setIsEditMode] = useState(false);

// // // //   useEffect(() => {
// // // //     const req = dispatch(fetchUsers());
// // // //     return () => req.abort();
// // // //   }, [dispatch]);

// // // //   useEffect(() => {
// // // //     if (error) {
// // // //       message.error(error);
// // // //       dispatch(resetUserState());
// // // //     }
// // // //   }, [error, dispatch]);

// // // //   // const filteredUsers = users
// // // //   // .filter((user) =>  user.role ==== "admin")
// // // //   // .filter((user)=>
// // // //   //   user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //   //   user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //   //   user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   // );

// // // //         const filteredUsers = users
// // // //   .filter((user) => user.role === "admin") 
// // // //   .filter((user) =>
// // // //     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   );
   


// // // //   const paginatedUsers = filteredUsers.slice(
// // // //     (currentPage - 1) * pageSize,
// // // //     currentPage * pageSize
// // // //   );

// // // //   const handleSearch = (value: string) => {
// // // //     setSearchTerm(value);
// // // //     setCurrentPage(1);
// // // //   };

// // // //   const handleEditUser = (user: IUser) => {
// // // //     setSelectedUser(user);
// // // //     setIsEditMode(true);
// // // //     setIsModalVisible(true);
// // // //   };

// // // //   const handleCreateUser = () => {
// // // //     setSelectedUser(null);
// // // //     setIsEditMode(false);
// // // //     setIsModalVisible(true);
// // // //   };

// // // //   const handleDeleteUser = async (id: string) => {
// // // //     const result = await dispatch(deleteUser(id));
// // // //     if (deleteUser.fulfilled.match(result)) {
// // // //       message.success("User deleted successfully");
// // // //     }
// // // //   };

// // // //   const handleFormSubmit = async (values: Partial<IUser>) => {
// // // //     if (isEditMode && selectedUser) {
// // // //       const result = await dispatch(updateUser({ id: selectedUser._id, data: values }));
// // // //       if (updateUser.fulfilled.match(result)) {
// // // //         message.success("User updated successfully");
// // // //         setIsModalVisible(false);
// // // //       }
// // // //     } else {
// // // //       const result = await dispatch(createUser(values));
// // // //       if (createUser.fulfilled.match(result)) {
// // // //         message.success("User created successfully");
// // // //         dispatch(fetchUsers());
// // // //         setIsModalVisible(false);
// // // //       }
// // // //     }
// // // //   };

// // // //   const columns = [
// // // //     {
// // // //       title: "S.No",
// // // //       key: "sno",
// // // //       render: (_: any, __: any, index: number) => index + 1,
// // // //     },
// // // //     {
// // // //       title: "Image",
// // // //       key: "avatar",
// // // //       render: (_: any, record: IUser) => (
// // // //         <Avatar src={record.avatar as string} size={50}>
// // // //           {record.firstName?.[0]}
// // // //           {record.lastName?.[0]}
// // // //         </Avatar>
// // // //       ),
// // // //     },
// // // //     {
// // // //       title: "Admin",
// // // //       key: "admin",
// // // //       render: (_: any, record: IUser) => (
// // // //         <div>
// // // //           <div className="font-medium">
// // // //             {record.firstName} {record.lastName}
// // // //           </div>
// // // //           <div className="text-gray-500 text-sm">{record.email}</div>
// // // //         </div>
// // // //       ),
// // // //     },
// // // //     // {
// // // //     //   title: "Password",
// // // //     //   dataIndex: "password",
// // // //     //   key: "password",
// // // //     //   render: (password: string) => password || "-",
// // // //     // },
// // // //     {
// // // //       title: "Status",
// // // //       dataIndex: "isActive",
// // // //       key: "status",
// // // //       render: (isActive: boolean) => (
// // // //         <Tag color={isActive ? "green" : "red"}>
// // // //           {isActive ? "Active" : "Inactive"}
// // // //         </Tag>
// // // //       ),
// // // //     },
// // // //     {
// // // //       title: "Expire Date",
// // // //       dataIndex: "expireDate",
// // // //       key: "expireDate",
// // // //       render: (date: string) => (date ? new Date(date).toLocaleDateString() : "-"),
// // // //     },
// // // //      {
// // // //     title: "App Name",
// // // //     dataIndex: "appName",
// // // //     key: "appName",
// // // //     render: (appName: string) => appName || "N/A",
// // // //   },
// // // //      {
// // // //     title: "Registration Code",
// // // //     dataIndex: "appRegistrationCode", 
// // // //     key: "appRegistrationCode",
// // // //     render: (code: string) => code || "N/A",
// // // //   },
// // // //     {
// // // //       title: "Actions",
// // // //       key: "actions",
// // // //       render: (_: any, record: IUser) => (
// // // //         <Space size="middle">
// // // //           <Button
// // // //             icon={<EditOutlined />}
// // // //             onClick={() => handleEditUser(record)}
// // // //           />
// // // //           <Popconfirm
// // // //             title="Are you sure to delete this user?"
// // // //             onConfirm={() => handleDeleteUser(record._id)}
// // // //             okText="Yes"
// // // //             cancelText="No"
// // // //           >
// // // //             <Button danger icon={<DeleteOutlined />} />
// // // //           </Popconfirm>
// // // //         </Space>
// // // //       ),
// // // //     },
// // // //   ];

// // // //   return (
// // // //     <div className="p-6">
    
// // // //       <Card
// // // //         title="Subadmin Management"
// // // //         extra={
// // // //           <Button
// // // //             className="bg-gray-700"
// // // //             type="primary"
// // // //             icon={<UserAddOutlined />}
// // // //             onClick={handleCreateUser}
// // // //           >
// // // //             Add Subadmin
// // // //           </Button>
// // // //         }
// // // //       >
// // // //         <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// // // //           <Search
// // // //             placeholder="Search users..."
// // // //             allowClear
// // // //             enterButton={<Button type="primary" icon={<SearchOutlined />} />}
// // // //             size="large"
// // // //             onSearch={handleSearch}
// // // //             onChange={(e) => setSearchTerm(e.target.value)}
// // // //             className="w-full md:w-1/2 bg-[#2523232c]"
// // // //           />
// // // //         </div>
        
// // // //         <Table
// // // //           // {JSON.stringify(fetchUsers)}
// // // //           columns={columns}
// // // //           dataSource={paginatedUsers}
// // // //           rowKey="_id"
// // // //           loading={loading}
// // // //           pagination={{
// // // //             current: currentPage,
// // // //             pageSize,
// // // //             total: filteredUsers.length,
// // // //             showSizeChanger: true,
// // // //             pageSizeOptions: ["10", "20", "50"],
// // // //             onChange: (page, size) => {
// // // //               setCurrentPage(page);
// // // //               setPageSize(size || 10);
// // // //             },
// // // //           }}
// // // //         />
// // // //       </Card>

// // // //       <Modal
// // // //         title={isEditMode ? "Edit User" : "Create Subadmin"}
// // // //         visible={isModalVisible}
// // // //         onCancel={() => setIsModalVisible(false)}
// // // //         footer={null}
// // // //         width={800}
// // // //         destroyOnClose
// // // //       >
// // // //         <UserForm
// // // //           initialValues={selectedUser || undefined}
// // // //           onSubmit={handleFormSubmit}
// // // //           isEditMode={isEditMode}
// // // //           loading={loading}
// // // //         />
// // // //       </Modal>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ManageUsers;

// // // import React, { useState, useEffect } from "react";
// // // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // // import {
// // //   fetchUsers,
// // //   createUser,
// // //   updateUser,
// // //   deleteUser,
// // //   resetUserState,
// // // } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // // import type { IUser } from "../../redux/types/usera.types";
// // // import { Modal, Button, Table, Input, Tag, Avatar, Popconfirm, Card, Space, message } from "antd";
// // // import { SearchOutlined, EditOutlined, DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
// // // import UserForm from "./UserForm";
// // // import dayjs from "dayjs";

// // // const { Search } = Input;

// // // const ManageUsers: React.FC = () => {
// // //   const dispatch = useAppDispatch();
// // //   const { users, loading, error } = useAppSelector((state) => state.users);

// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [pageSize, setPageSize] = useState(10);
// // //   const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
// // //   const [isModalVisible, setIsModalVisible] = useState(false);
// // //   const [isEditMode, setIsEditMode] = useState(false);

// // //   useEffect(() => {
// // //     const req = dispatch(fetchUsers());
// // //     return () => req.abort();
// // //   }, [dispatch]);

// // //   useEffect(() => {
// // //     if (error) {
// // //       message.error(error);
// // //       dispatch(resetUserState());
// // //     }
// // //   }, [error, dispatch]);

// // //   const filteredUsers = users
// // //     .filter((user) => user.role === "admin")
// // //     .filter((user) =>
// // //       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
// // //     );

// // //   const paginatedUsers = filteredUsers.slice(
// // //     (currentPage - 1) * pageSize,
// // //     currentPage * pageSize
// // //   );

// // //   const handleSearch = (value: string) => {
// // //     setSearchTerm(value);
// // //     setCurrentPage(1);
// // //   };

// // //   const handleEditUser = (user: IUser) => {
// // //     setSelectedUser(user);
// // //     setIsEditMode(true);
// // //     setIsModalVisible(true);
// // //   };

// // //   const handleCreateUser = () => {
// // //     setSelectedUser(null);
// // //     setIsEditMode(false);
// // //     setIsModalVisible(true);
// // //   };

// // //   const handleDeleteUser = async (id: string) => {
// // //     const result = await dispatch(deleteUser(id));
// // //     if (deleteUser.fulfilled.match(result)) {
// // //       message.success("User deleted successfully");
// // //     }
// // //   };

// // //   const handleFormSubmit = async (values: Partial<IUser>) => {
// // //     if (isEditMode && selectedUser) {
// // //       const result = await dispatch(updateUser({ id: selectedUser._id, data: values }));
// // //       if (updateUser.fulfilled.match(result)) {
// // //         message.success("User updated successfully");
// // //         setIsModalVisible(false);
// // //       }
// // //     } else {
// // //       const result = await dispatch(createUser(values));
// // //       if (createUser.fulfilled.match(result)) {
// // //         message.success("User created successfully");
// // //         dispatch(fetchUsers());
// // //         setIsModalVisible(false);
// // //       }
// // //     }
// // //   };

// // //   const columns = [
// // //     {
// // //       title: "S.No",
// // //       key: "sno",
// // //       render: (_: any, __: any, index: number) => index + 1,
// // //     },
// // //     {
// // //       title: "Image",
// // //       key: "avatar",
// // //       render: (_: any, record: IUser) => (
// // //         <Avatar src={record.avatar as string} size={50}>
// // //           {record.firstName?.[0]}
// // //           {record.lastName?.[0]}
// // //         </Avatar>
// // //       ),
// // //     },
// // //     {
// // //       title: "Admin",
// // //       key: "admin",
// // //       render: (_: any, record: IUser) => (
// // //         <div>
// // //           <div className="font-medium">
// // //             {record.firstName} {record.lastName}
// // //           </div>
// // //           <div className="text-gray-500 text-sm">{record.email}</div>
// // //         </div>
// // //       ),
// // //     },
// // //     {
// // //       title: "Status",
// // //       dataIndex: "isActive",
// // //       key: "status",
// // //       render: (isActive: boolean) => (
// // //         <Tag color={isActive ? "green" : "red"}>
// // //           {isActive ? "Active" : "Inactive"}
// // //         </Tag>
// // //       ),
// // //     },
// // //     {
// // //     title: "Subscription Period",
// // //     dataIndex: "subscriptionPeriod",
// // //     key: "subscriptionPeriod",
// // //     render: (period: string) => {
// // //       if (period === "halfyearly") return "Half-Yearly";
// // //       if (period === "yearly") return "Yearly";
// // //       return "-";
// // //     },
// // //   },
// // //   {
// // //   title: "Start Date",
// // //   dataIndex: "subscriptionStartDate",
// // //   key: "subscriptionStartDate",
// // //   render: (date: string) => (date ? dayjs(date).format('DD/MM/YYYY') : "-"),
// // // },
// // // {
// // //   title: "End Date", 
// // //   dataIndex: "subscriptionEndDate",
// // //   key: "subscriptionEndDate",
// // //   render: (date: string) => (date ? dayjs(date).format('DD/MM/YYYY') : "-"),
// // // },
// // //     {
// // //       title: "App Name",
// // //       dataIndex: "appName",
// // //       key: "appName",
// // //       render: (appName: string) => appName || "N/A",
// // //     },
// // //     {
// // //       title: "Registration Code",
// // //       dataIndex: "appRegistrationCode",
// // //       key: "appRegistrationCode",
// // //       render: (code: string) => code || "N/A",
// // //     },
// // //     {
// // //       title: "Actions",
// // //       key: "actions",
// // //       render: (_: any, record: IUser) => (
// // //         <Space size="middle">
// // //           <Button icon={<EditOutlined />} onClick={() => handleEditUser(record)} />
// // //           <Popconfirm
// // //             title="Are you sure to delete this user?"
// // //             onConfirm={() => handleDeleteUser(record._id)}
// // //             okText="Yes"
// // //             cancelText="No"
// // //           >
// // //             <Button danger icon={<DeleteOutlined />} />
// // //           </Popconfirm>
// // //         </Space>
// // //       ),
// // //     },
// // //   ];

// // //   return (
// // //     <div className="p-6">
// // //       <Card
// // //         title="Subadmin Management"
// // //         extra={
// // //           <Button
// // //             className="bg-gray-700"
// // //             type="primary"
// // //             icon={<UserAddOutlined />}
// // //             onClick={handleCreateUser}
// // //           >
// // //             Add Subadmin
// // //           </Button>
// // //         }
// // //       >
// // //         <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// // //           <Search
// // //             placeholder="Search users..."
// // //             allowClear
// // //             enterButton={<Button type="primary" icon={<SearchOutlined />} />}
// // //             size="large"
// // //             onSearch={handleSearch}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //             className="w-full md:w-1/2 bg-[#2523232c]"
// // //           />
// // //         </div>

// // //         <Table
// // //           columns={columns}
// // //           dataSource={paginatedUsers}
// // //           rowKey="_id"
// // //           loading={loading}
// // //           pagination={{
// // //             current: currentPage,
// // //             pageSize,
// // //             total: filteredUsers.length,
// // //             showSizeChanger: true,
// // //             pageSizeOptions: ["10", "20", "50"],
// // //             onChange: (page, size) => {
// // //               setCurrentPage(page);
// // //               setPageSize(size || 10);
// // //             },
// // //           }}
// // //         />
// // //       </Card>

// // //       <Modal
// // //         title={isEditMode ? "Edit User" : "Create Subadmin"}
// // //         open={isModalVisible}
// // //         onCancel={() => setIsModalVisible(false)}
// // //         footer={null}
// // //         width={800}
// // //         destroyOnClose
// // //       >
// // //         <UserForm
// // //           initialValues={selectedUser || undefined}
// // //           onSubmit={handleFormSubmit}
// // //           isEditMode={isEditMode}
// // //           loading={loading}
// // //         />

// // //       </Modal>
// // //     </div> 
// // //   );
// // // };

// // // export default ManageUsers;



// // import React, { useState, useEffect } from "react";
// // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // import {
// //   fetchUsers,
// //   createUser,
// //   updateUser,
// //   deleteUser,
// //   resetUserState,
// // } from "../../redux/Slice/useSliceForAdmin/userSlice";

// // import type { IUser } from "../../redux/types/usera.types";
// // import {
// //   Modal,
// //   Button,
// //   Table,
// //   Input,
// //   Tag,
// //   Avatar,
// //   Popconfirm,
// //   Card,
// //   Space,
// //   message,
// //   Grid,
// //   Row,
// //   Col,
// // } from "antd";
// // import {
// //   SearchOutlined,
// //   EditOutlined,
// //   DeleteOutlined,
// //   UserAddOutlined,
// // } from "@ant-design/icons";

// // import UserForm from "./UserForm";
// // import dayjs from "dayjs";

// // const { Search } = Input;

// // const ManageUsers: React.FC = () => {
// //   const screens = Grid.useBreakpoint(); // ⭐ For responsiveness

// //   const dispatch = useAppDispatch();
// //   const { users, loading, error } = useAppSelector((state) => state.users);

// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [pageSize, setPageSize] = useState(10);
// //   const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
// //   const [isModalVisible, setIsModalVisible] = useState(false);
// //   const [isEditMode, setIsEditMode] = useState(false);

// //   useEffect(() => {
// //     const req = dispatch(fetchUsers());
// //     return () => req.abort();
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (error) {
// //       message.error(error);
// //       dispatch(resetUserState());
// //     }
// //   }, [error, dispatch]);

// //   // const filteredUsers = users
// //   //   .filter((user) => user.role === "admin")
// //   //   .filter(
// //   //     (user) =>
// //   //       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //   //       user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //   //       user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
// //   //   );

// //   const filteredUsers = users
// //   .filter((user) => user.role === "admin")
// //   .filter((user) => {
// //     const term = searchTerm.toLowerCase();

// //     const email = user.email?.toLowerCase() || "";
// //     const first = user.firstName?.toLowerCase() || "";
// //     const last = user.lastName?.toLowerCase() || "";

// //     return (
// //       email.includes(term) ||
// //       first.includes(term) ||
// //       last.includes(term)
// //     );
// //   });


// //   const paginatedUsers = filteredUsers.slice(
// //     (currentPage - 1) * pageSize,
// //     currentPage * pageSize
// //   );

  
// //   const handleSearch = (value: string) => {
// //     setSearchTerm(value);
// //     setCurrentPage(1);
// //   };

// //   const handleEditUser = (user: IUser) => {
// //     setSelectedUser(user);
// //     setIsEditMode(true);
// //     setIsModalVisible(true);
// //   };

// //   const handleCreateUser = () => {
// //     setSelectedUser(null);
// //     setIsEditMode(false);
// //     setIsModalVisible(true);
// //   };

// //   const handleDeleteUser = async (id: string) => {
// //     const result = await dispatch(deleteUser(id));
// //     if (deleteUser.fulfilled.match(result)) {
// //       message.success("User deleted successfully");
// //     }
// //   };

// //   const handleFormSubmit = async (values: Partial<IUser>) => {
// //     if (isEditMode && selectedUser) {
// //       const result = await dispatch(
// //         updateUser({ id: selectedUser._id, data: values })
// //       );
// //       if (updateUser.fulfilled.match(result)) {
// //         message.success("User updated successfully");
// //         setIsModalVisible(false);
// //       }
// //     } else {
// //       const result = await dispatch(createUser(values));
// //       if (createUser.fulfilled.match(result)) {
// //         message.success("User created successfully");
// //         dispatch(fetchUsers());
// //         setIsModalVisible(false);
// //       }
// //     }
// //   };

// //   const columns = [
// //     {
// //       title: "S.No",
// //       key: "sno",
// //       render: (_: any, __: any, index: number) => index + 1,
// //     },
// //     {
// //       title: "Image",
// //       key: "avatar",
// //       render: (_: any, record: IUser) => (
// //         <Avatar src={record.avatar as string} size={50}>
// //           {record.firstName?.[0]}
// //           {record.lastName?.[0]}
// //         </Avatar>
// //       ),
// //     },
// //     {
// //       title: "Admin",
// //       key: "admin",
// //       render: (_: any, record: IUser) => (
// //         <div>
// //           <div className="font-medium">
// //             {record.firstName} {record.lastName}
// //           </div>
// //           <div className="text-gray-500 text-sm">{record.email}</div>
// //         </div>
// //       ),
// //     },
// //     {
// //       title: "Status",
// //       dataIndex: "isActive",
// //       key: "status",
// //       render: (isActive: boolean) => (
// //         <Tag color={isActive ? "green" : "red"}>
// //           {isActive ? "Active" : "Inactive"}
// //         </Tag>
// //       ),
// //     },
// //     {
// //       title: "Subscription Period",
// //       dataIndex: "subscriptionPeriod",
// //       key: "subscriptionPeriod",
// //       render: (period: string) => {
// //         if (period === "halfyearly") return "Half-Yearly";
// //         if (period === "yearly") return "Yearly";
// //         return "-";
// //       },
// //     },
// //     {
// //       title: "Start Date",
// //       dataIndex: "subscriptionStartDate",
// //       key: "subscriptionStartDate",
// //       render: (date: string) =>
// //         date ? dayjs(date).format("DD/MM/YYYY") : "-",
// //     },
// //     {
// //       title: "End Date",
// //       dataIndex: "subscriptionEndDate",
// //       key: "subscriptionEndDate",
// //       render: (date: string) =>
// //         date ? dayjs(date).format("DD/MM/YYYY") : "-",
// //     },
// //     {
// //       title: "App Name",
// //       dataIndex: "appName",
// //       key: "appName",
// //       render: (appName: string) => appName || "N/A",
// //     },
// //     {
// //       title: "Registration Code",
// //       dataIndex: "appRegistrationCode",
// //       key: "appRegistrationCode",
// //       render: (code: string) => code || "N/A",
// //     },
// //     {
// //       title: "Actions",
// //       key: "actions",
// //       render: (_: any, record: IUser) => (
// //         <Space size="middle">
// //           <Button
// //             icon={<EditOutlined />}
// //             onClick={() => handleEditUser(record)}
// //           />
// //           <Popconfirm
// //             title="Are you sure to delete this user?"
// //             onConfirm={() => handleDeleteUser(record._id)}
// //             okText="Yes"
// //             cancelText="No"
// //           >
// //             <Button danger icon={<DeleteOutlined />} />
// //           </Popconfirm>
// //         </Space>
// //       ),
// //     },
// //   ];

// //   return (
// //     <div className="p-6">
// //       <Card title="Subadmin Management">
// //         {/* ⭐ OurServices style responsive header */}
// //         <Row gutter={[12, 12]} className="mb-4">
          
// //           {/* Search */}
// //           <Col xs={24} sm={12}>
// //             {/* <Search
// //               placeholder="Search users..."
// //               allowClear
// //               enterButton={<Button type="primary" icon={<SearchOutlined />} />}
// //               size="large"
// //               onSearch={handleSearch}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="w-full bg-[#2523232c]"
// //             /> */}
// //             <Search
// //   placeholder="Search Subadmin..."
// //   allowClear
// //   size="large"
// //   onChange={(e) => handleSearch(e.target.value)}
// //   className="w-full"
// //   prefix={<SearchOutlined />}
// // />

// //           </Col>

// //           {/* Desktop Add Button */}
// //           {!screens.xs && (
// //             <Col sm={12} style={{ textAlign: "right" }}>
// //               <Button
// //                 className="bg-gray-700"
// //                 type="primary"
// //                 icon={<UserAddOutlined />}
// //                 onClick={handleCreateUser}
// //               >
// //                 Add Subadmin
// //               </Button>
// //             </Col>
// //           )}

// //           {/* Mobile Add Button */}
// //           {screens.xs && (
// //             <Col xs={24}>
// //               <Button
// //                 type="primary"
// //                 icon={<UserAddOutlined />}
// //                 onClick={handleCreateUser}
// //                 block
// //                 className="bg-gray-700"
// //               >
// //                 Add Subadmin
// //               </Button>
// //             </Col>
// //           )}
// //         </Row>

// //         {/* Table */}
// //         <Table
// //           columns={columns}
// //           dataSource={paginatedUsers}
// //           rowKey="_id"
// //           loading={loading}
// //           pagination={{
// //             current: currentPage,
// //             pageSize,
// //             total: filteredUsers.length,
// //             showSizeChanger: true,
// //             pageSizeOptions: ["10", "20", "50"],
// //             onChange: (page, size) => {
// //               setCurrentPage(page);
// //               setPageSize(size || 10);
// //             },
// //           }}
// //           scroll={{ x: 1000 }} // ⭐ Mobile table support
// //         />
// //       </Card>

// //       {/* Modal */}
// //       <Modal
// //         title={isEditMode ? "Edit User" : "Create Subadmin"}
// //         open={isModalVisible}
// //         onCancel={() => setIsModalVisible(false)}
// //         footer={null}
// //         width={screens.xs ? "95%" : 800}
// //         destroyOnClose
// //       >
// //         <UserForm
// //           initialValues={selectedUser || undefined}
// //           onSubmit={handleFormSubmit}
// //           isEditMode={isEditMode}
// //           loading={loading}
// //         />
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default ManageUsers;


// import React, { useState, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import {
//   fetchUsers,
//   createUser,
//   updateUser,
//   deleteUser,
//   resetUserState,
// } from "../../redux/Slice/useSliceForAdmin/userSlice";

// import type { IUser } from "../../redux/types/usera.types";
// import {
//   Modal,
//   Button,
//   Table,
//   Input,
//   Tag,
//   Avatar,
//   Popconfirm,
//   Card,
//   Space,
//   message,
//   Grid,
//   Row,
//   Col,
//   Typography,
// } from "antd";
// import {
//   SearchOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   UserAddOutlined,
// } from "@ant-design/icons";

// import UserForm from "./UserForm";
// import dayjs from "dayjs";

// const { Search } = Input;
// const { Title, Text } = Typography;

// const ManageUsers: React.FC = () => {
//   const screens = Grid.useBreakpoint();
//   const dispatch = useAppDispatch();
//   const { users, loading, error } = useAppSelector((state) => state.users);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     const req = dispatch(fetchUsers());
//     return () => req.abort();
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       message.error(error);
//       dispatch(resetUserState());
//     }
//   }, [error, dispatch]);

//   /* ================= FILTER ================= */
//   const filteredUsers = users
//     .filter((u) => u.role === "admin")
//     .filter((u) => {
//       const term = searchTerm.toLowerCase();
//       return (
//         u.email?.toLowerCase().includes(term) ||
//         u.fullName?.toLowerCase().includes(term)
//       );
//     });

//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   /* ================= HANDLERS ================= */
//   const handleCreateUser = () => {
//     setSelectedUser(null);
//     setIsEditMode(false);
//     setIsModalVisible(true);
//   };

//   const handleEditUser = (user: IUser) => {
//     setSelectedUser(user);
//     setIsEditMode(true);
//     setIsModalVisible(true);
//   };

//   const handleDeleteUser = async (id: string) => {
//     const result = await dispatch(deleteUser(id));
//     if (deleteUser.fulfilled.match(result)) {
//       message.success("User deleted successfully");
//     }
//   };

//   const handleFormSubmit = async (values: Partial<IUser>) => {
//     if (isEditMode && selectedUser) {
//       const result = await dispatch(
//         updateUser({ id: selectedUser._id, data: values })
//       );
//       if (updateUser.fulfilled.match(result)) {
//         message.success("User updated successfully");
//         setIsModalVisible(false);
//       }
//     } else {
//       const result = await dispatch(createUser(values));
//       if (createUser.fulfilled.match(result)) {
//         message.success("User created successfully");
//         setIsModalVisible(false);
//         dispatch(fetchUsers());
//       }
//     }
//   };

//   /* ================= TABLE ================= */
//   const columns = [
//     {
//       title: "S.No",
//       render: (_: any, __: any, index: number) => index + 1,
//       width: 60,
//       align: "center",
//     },
//     {
//       title: "Admin",
//       render: (_: any, r: IUser) => {
//         const initials =
//           r.fullName
//             ?.split(" ")
//             .map((n) => n[0])
//             .join("")
//             .slice(0, 2) || "U";

//         return (
//           <div className="flex items-center gap-3">
//             <Avatar size={48} src={r.avatar || undefined}>
//               {initials}
//             </Avatar>
//             <div>
//               <Title level={5} style={{ margin: 0 }}>
//                 {r.fullName || "N/A"}
//               </Title>
//               <Text type="secondary">{r.email}</Text>
//             </div>
//           </div>
//         );
//       },
//     },
//     {
//       title: "Status",
//       dataIndex: "isActive",
//       align: "center",
//       render: (isActive: boolean) => (
//         <Tag color={isActive ? "green" : "red"} className="px-4 py-1 rounded-full">
//           {isActive ? "Active" : "Inactive"}
//         </Tag>
//       ),
//     },
//     {
//       title: "Subscription",
//       render: (_: any, r: IUser) => (
//         <div className="text-sm">
//           <Tag color="blue" className="mb-1">
//             {r.subscriptionPeriod === "halfyearly"
//               ? "Half-Yearly"
//               : r.subscriptionPeriod === "yearly"
//               ? "Yearly"
//               : "-"}
//           </Tag>
//           <div>
//             <strong>Start:</strong>{" "}
//             {r.subscriptionStartDate
//               ? dayjs(r.subscriptionStartDate).format("DD/MM/YYYY")
//               : "-"}
//           </div>
//           <div>
//             <strong>End:</strong>{" "}
//             {r.subscriptionEndDate
//               ? dayjs(r.subscriptionEndDate).format("DD/MM/YYYY")
//               : "-"}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "No. of Chairs",
//       align: "center",
//       render: (_: any, r: IUser) => (
//         <Tag
//           color={
//             r.noOfChairs > 10 ? "green" : r.noOfChairs > 0 ? "orange" : "red"
//           }
//           className="px-5 rounded-full font-semibold"
//         >
//           {r.noOfChairs || 0}
//         </Tag>
//       ),
//     },
//     {
//       title: "App Info",
//       render: (_: any, r: IUser) => (
//         <Space direction="vertical" size={0}>
//           <Tag color="cyan">{r.appName || "N/A"}</Tag>
//           <Tag color="purple">{r.appRegistrationCode || "N/A"}</Tag>
//         </Space>
//       ),
//     },
//     {
//       title: "Actions",
//       align: "center",
//       render: (_: any, r: IUser) => (
//         <Space>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => handleEditUser(r)}
//           />
//           <Popconfirm
//             title="Delete this user?"
//             onConfirm={() => handleDeleteUser(r._id)}
//           >
//             <Button danger icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6">
//       <Card title="Subadmin Management" className="shadow-xl rounded-xl">
//         <Row gutter={[12, 12]} className="mb-4">
//           <Col xs={24} sm={12}>
//             <Search
//               placeholder="Search by name or email..."
//               allowClear
//               size="large"
//               prefix={<SearchOutlined />}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Col>
//           <Col xs={24} sm={12} style={{ textAlign: screens.xs ? "left" : "right" }}>
//             <Button
//               type="primary"
//               icon={<UserAddOutlined />}
//               onClick={handleCreateUser}
//               className="bg-gray-700"
//             >
//               Add Subadmin
//             </Button>
//           </Col>
//         </Row>

//         <Table
//           rowKey="_id"
//           columns={columns}
//           dataSource={paginatedUsers}
//           loading={loading}
//           pagination={{
//             current: currentPage,
//             pageSize,
//             total: filteredUsers.length,
//             showSizeChanger: true,
//             pageSizeOptions: ["10", "20", "50"],
//             onChange: (p, s) => {
//               setCurrentPage(p);
//               setPageSize(s || 10);
//             },
//           }}
//           scroll={{ x: "max-content" }}
//         />
//       </Card>

//       <Modal
//         open={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//         title={isEditMode ? "Edit Subadmin" : "Create Subadmin"}
//         width={screens.xs ? "95%" : 800}
//         destroyOnClose
//       >
//         <UserForm
//           initialValues={selectedUser || undefined}
//           onSubmit={handleFormSubmit}
//           isEditMode={isEditMode}
//           loading={loading}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default ManageUsers;
import type { ColumnsType } from "antd/es/table";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  resetUserState,
  toggleUserStatus,
} from "../../redux/Slice/useSliceForAdmin/userSlice";

import type { IUser } from "../../redux/types/usera.types";
import {
  Modal,
  Button,
  Table,
  Input,
  Tag,
  Avatar,
  Popconfirm,
  Card,
  Space,
  message,
  Grid,
  Row,
  Col,
  Switch,
  Typography,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import UserForm from "./UserForm";
import dayjs from "dayjs";

const { Search } = Input;
const { Title, Text } = Typography;

const ManageUsers: React.FC = () => {
  const screens = Grid.useBreakpoint();
  const dispatch = useAppDispatch();

  const { users, loading, error } = useAppSelector((state) => state.users);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const req = dispatch(fetchUsers());
    return () => req.abort();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(resetUserState());
    }
  }, [error, dispatch]);

  /* ================= FILTER ================= */
  const filteredUsers = users
    .filter((u) => u.role === "admin")
    .filter((u) => {
      const term = searchTerm.toLowerCase();
      return (
        u.email?.toLowerCase().includes(term) ||
        u.fullName?.toLowerCase().includes(term)
      );
    });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  /* ================= HANDLERS ================= */
  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const handleEditUser = (user: IUser) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleDeleteUser = async (id: string) => {
    const result = await dispatch(deleteUser(id));
    if (deleteUser.fulfilled.match(result)) {
      message.success("User deleted successfully");
      dispatch(fetchUsers());
    }
  };

  const handleToggleStatus = async (user: IUser) => {
    const result = await dispatch(toggleUserStatus(user._id));
    if (toggleUserStatus.fulfilled.match(result)) {
      message.success(
        `User ${result.payload.isActive ? "Activated" : "Deactivated"}`
      );
      dispatch(fetchUsers());
    }
  };

  const handleFormSubmit = async (values: Partial<IUser>) => {
    if (isEditMode && selectedUser) {
      const result = await dispatch(
        updateUser({ id: selectedUser._id, data: values })
      );
      if (updateUser.fulfilled.match(result)) {
        message.success("User updated successfully");
        setIsModalVisible(false);
        dispatch(fetchUsers());
      }
    } else {
      const result = await dispatch(createUser(values));
      if (createUser.fulfilled.match(result)) {
        message.success("User created successfully");
        setIsModalVisible(false);
        dispatch(fetchUsers());
      }
    }
  };

  /* ================= TABLE ================= */
const columns: ColumnsType<IUser> = [
    {
      title: "S.No",
      render: (_: any, __: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
      width: 70,
align: "center" as const
    },
    {
      title: "Admin",
      render: (_: any, r: IUser) => (
        <div className="flex items-center gap-3">
          {/* <Avatar size={48} src={r.avatar || undefined}>
            {r.fullName?.[0]}
          </Avatar> */}
          <Avatar
  size={48}
  src={
    typeof r.avatar === "string"
      ? r.avatar
      : r.avatar?.url
  }
>
  {r.fullName?.[0]}
</Avatar>

          <div>
            <Title level={5} style={{ margin: 0 }}>
              {r.fullName}
            </Title>
            <Text type="secondary">{r.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      render: (_: any, r: IUser) => (
        <Switch
          checked={r.isActive}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          loading={loading}
          onChange={() => handleToggleStatus(r)}
          style={{
            backgroundColor: r.isActive ? "#16a34a" : "#dc2626",
            width: 90,
          }}
        />
      ),
      align: "center",
      width: 140,
    },
    {
      title: "Subscription",
      render: (_: any, r: IUser) => (
        <div className="flex flex-col gap-1">
          <Tag color="blue" className="rounded-full w-fit">
            {r.subscriptionPeriod === "halfyearly"
              ? "Half-Yearly"
              : r.subscriptionPeriod === "yearly"
              ? "Yearly"
              : "-"}
          </Tag>
          <Text type="secondary" className="text-xs">
            {r.subscriptionStartDate
              ? dayjs(r.subscriptionStartDate).format("DD/MM/YYYY")
              : "-"}{" "}
            →{" "}
            {r.subscriptionEndDate
              ? dayjs(r.subscriptionEndDate).format("DD/MM/YYYY")
              : "-"}
          </Text>
        </div>
      ),
    },
    {
      title: "No of Chairs",
      render: (_: any, r: IUser) => (
        <Tag
color={(r.noOfChairs ?? 0) > 5 ? "green" : "orange"}
          className="px-4 rounded-full font-medium"
        >
          {r.noOfChairs || 0}
        </Tag>
      ),
      align: "center",
      width: 120,
    },
    {
      title: "App Info",
      render: (_: any, r: IUser) => (
        <div className="flex flex-col gap-1">
          <Tag color="cyan">{r.appName || "N/A"}</Tag>
          <Tag color="purple">{r.appRegistrationCode || "N/A"}</Tag>
        </div>
      ),
    },
    {
      title: "Actions",
      render: (_: any, r: IUser) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(r)}
          />
          <Popconfirm
            title="Delete this user?"
            onConfirm={() => handleDeleteUser(r._id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
      align: "center",
      width: 140,
    },
  ];

  return (
    <div className="p-6">
      <Card className="shadow-xl rounded-xl">
        {/* HEADER */}
        <Row gutter={[12, 12]} className="mb-4" justify="space-between">
          <Col xs={24} sm={12}>
            <Search
              placeholder="Search Subadmin..."
              allowClear
              size="large"
              prefix={<SearchOutlined />}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </Col>

          <Col xs={24} sm={12} style={{ textAlign: screens.xs ? "left" : "right" }}>
            <Space>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={handleCreateUser}
                style={{ backgroundColor: "#1f2937" }}
              >
                Add Subadmin
              </Button>
              <Button
                icon={<ReloadOutlined />}
                loading={loading}
                onClick={() => dispatch(fetchUsers())}
              >
                Refresh
              </Button>
            </Space>
          </Col>
        </Row>

        {/* TABLE */}
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={paginatedUsers}
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize,
            total: filteredUsers.length,
            showSizeChanger: true,
            onChange: (p, s) => {
              setCurrentPage(p);
              setPageSize(s || 10);
            },
          }}
          scroll={{ x: "max-content" }}
        />
      </Card>

      {/* MODAL */}
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        title={isEditMode ? "Edit Subadmin" : "Create Subadmin"}
        width={screens.xs ? "95%" : 800}
        destroyOnClose
      >
        <UserForm
          initialValues={selectedUser || undefined}
          onSubmit={handleFormSubmit}
          isEditMode={isEditMode}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default ManageUsers;
