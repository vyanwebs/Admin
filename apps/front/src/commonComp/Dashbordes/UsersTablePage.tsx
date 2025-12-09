// import React, { useEffect } from "react";
// import { Table, Card } from "antd";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// import type { ColumnsType } from "antd/es/table";
// import type { IUser } from "../../redux/types/usera.types";

// const UsersTablePage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { users, loading } = useAppSelector((state) => state.users);

//   // 🔥 Fetch users on load
//   useEffect(() => {
//     const req = dispatch(fetchUsers());
//     return () => req.abort();
//   }, [dispatch]);

//   // 🎯 Only Normal Users
//   const normalUsers = users.filter((u: IUser) => u.role === "user");

//   // 📌 TABLE COLUMNS
//   const columns: ColumnsType<IUser> = [
//     {
//       title: "Name",
//       key: "name",
//       render: (_: unknown, record: IUser) => (
//         <strong>
//           {record.firstName} {record.lastName}
//         </strong>
//       ),
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "phone",
//       render: (phone: string | undefined) => phone || "-",
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
//       render: (gender: string | undefined) => gender || "-",
//     },
//   ];

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>All Users</h1>
//       <Card>
//         <Table<IUser>
//           columns={columns}
//           dataSource={normalUsers}
//           rowKey={(item) => item._id}
//           loading={loading}
//           pagination={{ pageSize: 10 }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default UsersTablePage;

import React, { useEffect } from "react";
import { Table, Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
import type { ColumnsType } from "antd/es/table";
import type { IUser } from "../../redux/types/usera.types";

const UsersTablePage: React.FC = () => {
  const dispatch = useAppDispatch();

  // 🔐 Logged-in user (auth slice)
  const { user: loggedInUser } = useAppSelector((state) => state.auth);

  // 📌 All users list
  const { users, loading } = useAppSelector((state) => state.users);

  // 🔥 Fetch all users on load
  useEffect(() => {
    const req = dispatch(fetchUsers());
    return () => req.abort();
  }, [dispatch]);

  // ⭐ Only show the logged-in user in table
  const filteredUser = users.filter(
    (u: IUser) => u._id === loggedInUser?._id
  );

  // 📌 TABLE COLUMNS (Name, Phone, Email, Gender)
  const columns: ColumnsType<IUser> = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <strong>
          {record.firstName} {record.lastName}
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
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (g) => g || "-",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>User Details</h1>

      <Card>
        <Table<IUser>
          columns={columns}
          dataSource={filteredUser}
          rowKey={(item) => item._id}
          loading={loading}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default UsersTablePage;
