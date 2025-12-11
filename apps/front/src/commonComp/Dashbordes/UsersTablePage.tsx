// // // // import React, { useEffect } from "react";
// // // // import { Table, Card } from "antd";
// // // // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // // // import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // // // import type { ColumnsType } from "antd/es/table";
// // // // import type { IUser } from "../../redux/types/usera.types";

// // // // const UsersTablePage: React.FC = () => {
// // // //   const dispatch = useAppDispatch();
// // // //   const { users, loading } = useAppSelector((state) => state.users);

// // // //   // 🔥 Fetch users on load
// // // //   useEffect(() => {
// // // //     const req = dispatch(fetchUsers());
// // // //     return () => req.abort();
// // // //   }, [dispatch]);

// // // //   // 🎯 Only Normal Users
// // // //   const normalUsers = users.filter((u: IUser) => u.role === "user");

// // // //   // 📌 TABLE COLUMNS
// // // //   const columns: ColumnsType<IUser> = [
// // // //     {
// // // //       title: "Name",
// // // //       key: "name",
// // // //       render: (_: unknown, record: IUser) => (
// // // //         <strong>
// // // //           {record.firstName} {record.lastName}
// // // //         </strong>
// // // //       ),
// // // //     },
// // // //     {
// // // //       title: "Phone",
// // // //       dataIndex: "phone",
// // // //       key: "phone",
// // // //       render: (phone: string | undefined) => phone || "-",
// // // //     },
// // // //     {
// // // //       title: "Email",
// // // //       dataIndex: "email",
// // // //       key: "email",
// // // //     },
// // // //     {
// // // //       title: "Gender",
// // // //       dataIndex: "gender",
// // // //       key: "gender",
// // // //       render: (gender: string | undefined) => gender || "-",
// // // //     },
// // // //   ];

// // // //   return (
// // // //     <div style={{ padding: 20 }}>
// // // //       <h1>All Users</h1>
// // // //       <Card>
// // // //         <Table<IUser>
// // // //           columns={columns}
// // // //           dataSource={normalUsers}
// // // //           rowKey={(item) => item._id}
// // // //           loading={loading}
// // // //           pagination={{ pageSize: 10 }}
// // // //         />
// // // //       </Card>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UsersTablePage;

// // // // import React, { useEffect } from "react";
// // // // import { Table, Card } from "antd";
// // // // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // // // import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // // // import type { ColumnsType } from "antd/es/table";
// // // // import type { IUser } from "../../redux/types/usera.types";

// // // // const UsersTablePage: React.FC = () => {
// // // //   const dispatch = useAppDispatch();

// // // //   // 🔐 Logged-in user (auth slice)
// // // //   const { user: loggedInUser } = useAppSelector((state) => state.auth);

// // // //   // 📌 All users list
// // // //   const { users, loading } = useAppSelector((state) => state.users);

// // // //   // 🔥 Fetch all users on load
// // // //   useEffect(() => {
// // // //     const req = dispatch(fetchUsers());
// // // //     return () => req.abort();
// // // //   }, [dispatch]);

// // // //   // ⭐ Only show the logged-in user in table
// // // //   const filteredUser = users.filter(
// // // //     (u: IUser) => u._id === loggedInUser?._id
// // // //   );

// // // //   // 📌 TABLE COLUMNS (Name, Phone, Email, Gender)
// // // //   const columns: ColumnsType<IUser> = [
// // // //     {
// // // //       title: "Name",
// // // //       key: "name",
// // // //       render: (_, record) => (
// // // //         <strong>
// // // //           {record.firstName} {record.lastName}
// // // //         </strong>
// // // //       ),
// // // //     },
// // // //     {
// // // //       title: "Phone",
// // // //       dataIndex: "phone",
// // // //       key: "phone",
// // // //       render: (p) => p || "-",
// // // //     },
// // // //     {
// // // //       title: "Email",
// // // //       dataIndex: "email",
// // // //       key: "email",
// // // //     },
// // // //     {
// // // //       title: "Gender",
// // // //       dataIndex: "gender",
// // // //       key: "gender",
// // // //       render: (g) => g || "-",
// // // //     },
// // // //   ];

// // // //   return (
// // // //     <div style={{ padding: 20 }}>
// // // //       <h1>User Details</h1>

// // // //       <Card>
// // // //         <Table<IUser>
// // // //           columns={columns}
// // // //           dataSource={filteredUser}
// // // //           rowKey={(item) => item._id}
// // // //           loading={loading}
// // // //           pagination={false}
// // // //         />
// // // //       </Card>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UsersTablePage;

// // // import React, { useEffect } from "react";
// // // import { Table, Card } from "antd";
// // // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // // import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // // import type { ColumnsType } from "antd/es/table";
// // // import type { IUser } from "../../redux/types/usera.types";

// // // const UsersTablePage: React.FC = () => {
// // //   const dispatch = useAppDispatch();
// // //   const { user: loggedInUser } = useAppSelector((state) => state.auth);
// // //   const { users, loading } = useAppSelector((state) => state.users);

// // //   useEffect(() => {
// // //     const req = dispatch(fetchUsers());
// // //     return () => req.abort();
// // //   }, [dispatch]);

// // //   const filteredUsers = users.filter((u: IUser) => {
// // //     if (!loggedInUser) return false;
// // //     if (loggedInUser.role === "superadmin") return true;
// // //     if (loggedInUser.role === "admin") return u.subAdminId === loggedInUser._id;
// // //     return u._id === loggedInUser._id;
// // //   });

// // //   const columns: ColumnsType<IUser> = [
// // //     {
// // //       title: "Name",
// // //       key: "name",
// // //       render: (_, record) => <strong>{record.firstName} {record.lastName}</strong>,
// // //     },
// // //     {
// // //       title: "Phone",
// // //       dataIndex: "phone",
// // //       key: "phone",
// // //       render: (p) => p || "-",
// // //     },
// // //     {
// // //       title: "Email",
// // //       dataIndex: "email",
// // //       key: "email",
// // //     },
// // //     {
// // //       title: "Gender",
// // //       dataIndex: "gender",
// // //       key: "gender",
// // //       render: (g) => g || "-",
// // //     },
// // //   ];

// // //   return (
// // //     <div style={{ padding: 20 }}>
// // //       <h1>User Details</h1>
// // //       <Card>
// // //         <Table<IUser>
// // //           columns={columns}
// // //           dataSource={filteredUsers}
// // //           rowKey={(item) => item._id}
// // //           loading={loading}
// // //           pagination={false}
// // //         />
// // //       </Card>
// // //     </div>
// // //   );
// // // };

// // // export default UsersTablePage;



// // import React, { useEffect } from "react";
// // import { Table, Card } from "antd";
// // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // import type { ColumnsType } from "antd/es/table";
// // import type { IUser } from "../../redux/types/usera.types";

// // const UsersTablePage: React.FC = () => {
// //   const dispatch = useAppDispatch();
// //   const { user: loggedInUser } = useAppSelector((state) => state.auth);
// //   const { users, loading } = useAppSelector((state) => state.users);

// //   useEffect(() => {
// //     const req = dispatch(fetchUsers());
// //     return () => req.abort();
// //   }, [dispatch]);

// //   const filteredUsers = users.filter((u: IUser) => {
// //     if (!loggedInUser) return false;
// //     if (loggedInUser.role === "superadmin") return true;
// //     if (loggedInUser.role === "admin") return u.subAdminId?.toString() === loggedInUser._id;
// //     return u._id === loggedInUser._id;
// //   });

// //   const columns: ColumnsType<IUser> = [
// //     {
// //       title: "Name",
// //       key: "name",
// //       render: (_, record) => <strong>{record.firstName} {record.lastName}</strong>,
// //     },
// //     {
// //       title: "Phone",
// //       dataIndex: "phone",
// //       key: "phone",
// //       render: (p) => p || "-",
// //     },
// //     {
// //       title: "Email",
// //       dataIndex: "email",
// //       key: "email",
// //     },
// //     {
// //       title: "Gender",
// //       dataIndex: "gender",
// //       key: "gender",
// //       render: (g) => g || "-",
// //     },
// //   ];

// //   return (
// //     <div style={{ padding: 20 }}>
// //       <h1>User Details</h1>
// //       <Card>
// //         <Table<IUser>
// //           columns={columns}
// //           dataSource={filteredUsers}
// //           rowKey={(item) => item._id}
// //           loading={loading}
// //           pagination={false}
// //         />
// //       </Card>
// //     </div>
// //   );
// // };

// // export default UsersTablePage;



// import React, { useEffect } from "react";
// import { Table, Card } from "antd";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// import type { ColumnsType } from "antd/es/table";
// import type { IUser } from "../../redux/types/usera.types";

// const UsersTablePage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { user: loggedInUser } = useAppSelector((state) => state.auth);
//   const { users, loading } = useAppSelector((state) => state.users);

//   useEffect(() => {
//     const req = dispatch(fetchUsers());
//     return () => req.abort();
//   }, [dispatch]);

//   const filteredUsers = users.filter((u: IUser) => {
//     if (!loggedInUser) return false;
//     if (loggedInUser.role === "superadmin") return true;
//     if (loggedInUser.role === "admin")
//       return u.subAdminId?.toString() === loggedInUser._id;
//     return u._id === loggedInUser._id;
//   });

//   const columns: ColumnsType<IUser> = [
//     {
//       title: "Name",
//       key: "name",
//       render: (_, record) => (
//         <strong>{record.firstName} {record.lastName}</strong>
//       ),
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "phone",
//       render: (p) => p || "-",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Gender",
//       dataIndex: "gender",
//       key: "gender",
//       render: (g) => g || "-",
//     },
//   ];

//   return (
//     <div className="p-4 sm:p-6 md:p-8">
//       <h1 className="text-2xl font-semibold mb-4">User Details</h1>
//       <Card className="overflow-x-auto">
//         <div className="min-w-[600px]">
//           <Table<IUser>
//             columns={columns}
//             dataSource={filteredUsers}
//             rowKey={(item) => item._id}
//             loading={loading}
//             pagination={false}
//             scroll={{ x: 600 }} // allows horizontal scroll if content is too wide
//           />
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default UsersTablePage;


import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Row,
  Col,
  Space,
  Grid,
  Tag,
  message,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
import type { ColumnsType } from "antd/es/table";
import type { IUser } from "../../redux/types/usera.types";

const { Search } = Input;

const UsersTablePage: React.FC = () => {
  const screens = Grid.useBreakpoint();
  const dispatch = useAppDispatch();

  const { user: loggedInUser } = useAppSelector((state) => state.auth);
  const { users = [], loading = false, error = null } = useAppSelector(
    (state) => state.users
  );

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const req = dispatch(fetchUsers());
    return () => req.abort(); // Auto abort on unmount
  }, [dispatch]);

  useEffect(() => {
    if (error) message.error(error);
  }, [error]);

  // ----------- Filtering Based on Logged-In User Role ---------------
  const filteredUsers = users.filter((u: IUser) => {
    if (!loggedInUser) return false;

    if (loggedInUser.role === "superadmin") return true;

    if (loggedInUser.role === "admin")
      return u.subAdminId?.toString() === loggedInUser._id;

    return u._id === loggedInUser._id;
  });

  // ----------- Search Filter ---------------
  const searchedUsers = filteredUsers.filter((u) =>
    `${u.firstName} ${u.lastName}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // ----------- Table Columns ---------------
  const columns: ColumnsType<IUser> = [
    {
      title: "Name",
      key: "name",
      render: (_, r) => (
        <strong>
          {r.firstName} {r.lastName}
        </strong>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (p) => p || "-",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (e) => <span className="text-blue-600">{e}</span>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (g) => (g ? <Tag color="cyan">{g}</Tag> : "-"),
    },
    // {
    //   title: "Role",
    //   dataIndex: "role",
    //   key: "role",
    //   render: (r) => <Tag color={r === "admin" ? "green" : "blue"}>{r}</Tag>,
    // },
  ];

  return (
    <Card
      title={`Users (${searchedUsers.length})`}
      className="shadow-md rounded-xl"
    >
      {/* Responsive Search + Refresh */}
      <Row gutter={[12, 12]} align="middle" style={{ marginBottom: 12 }}>
        {/* Search Box */}
        <Col xs={24} sm={12}>
          <Search
            placeholder="Search users..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ width: "100%" }}
          />
        </Col>

        {/* Desktop Buttons */}
        {!screens.xs && (
          <Col sm={12} style={{ textAlign: "right" }}>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                loading={loading}
                onClick={() => dispatch(fetchUsers())}
              >
                Refresh
              </Button>
            </Space>
          </Col>
        )}

        {/* Mobile Buttons */}
        {screens.xs && (
          <Col xs={24}>
            <Button
              icon={<ReloadOutlined />}
              loading={loading}
              onClick={() => dispatch(fetchUsers())}
              block
            >
              Refresh
            </Button>
          </Col>
        )}
      </Row>

      {/* Table */}
      <Table<IUser>
        columns={columns}
        dataSource={searchedUsers}
        rowKey={(item) => item._id}
        loading={loading}
        pagination={{ pageSize: 8 }}
        scroll={{ x: 600 }}
        locale={{ emptyText: "No users found" }}
      />
    </Card>
  );
};

export default UsersTablePage;
