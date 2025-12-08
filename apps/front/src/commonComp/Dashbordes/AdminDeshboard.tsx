// // import React, { useEffect } from "react";
// // import { Card, Row, Col, Statistic, message } from "antd";
// // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // import {
// // 	fetchUsers,
// // 	resetUserState,
// // } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // import { UserOutlined, } from "@ant-design/icons";
// // import SubscriptionTimer from "./SubscriptionTimer"; 
// // // import dayjs from "dayjs";
// // const AdminDashboard: React.FC = () => {
// // 	const dispatch = useAppDispatch();
// // 	const { users, loading, error } = useAppSelector((state) => state.users);

// // 	// ✅ assuming logged-in subadmin info stored in localStorage or Redux
// // 	//const subAdmin = JSON.parse(localStorage.getItem("user") || "{}");
// // 	//const expiryDate = subAdmin?.expireDate;
// // 	const expiryDate = "2025-12-25T00:00:00.000Z"; 

// // 	useEffect(() => {
// // 		const req = dispatch(fetchUsers());
// // 		return () => req.abort();
// // 	}, [dispatch]);

// // 	useEffect(() => {
// // 		if (error) {
// // 			message.error(error);
// // 			dispatch(resetUserState());
// // 		}
// // 	}, [error, dispatch]);

// // 	const totalUsers = users.length;
// // 	// const totalAdmins = users.filter((u) => u.role === "admin").length;
// // 	// const totalSubAdmins = users.filter(
// // 	// 	(u) => (u.role as string) === "subadmin"
// // 	// ).length;

// // 	return (
// // 		<div className="p-6">
// // 			<h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

// // 			{/* ✅ Show Timer Only if expiryDate is available */}
// // 			{expiryDate && <SubscriptionTimer expiryDate={expiryDate} />}

// // 			<Row gutter={[16, 16]}>
// // 				<Col xs={24} sm={12} md={8}>
// // 					<Card bordered={false}>
// // 						<Statistic
// // 							title="Total Users"
// // 							value={totalUsers}
// // 							prefix={<UserOutlined />}
// // 							loading={loading}
// // 						/>
// // 					</Card>
// // 				</Col>
// // {/* 
// // 				<Col xs={24} sm={12} md={8}>
// // 					<Card bordered={false}>
// // 						<Statistic
// // 							title="Total Subadmins"
// // 							value={totalSubAdmins}
// // 							prefix={<TeamOutlined />}
// // 							loading={loading}
// // 						/>
// // 					</Card>
// // 				</Col>
// // 				<Col xs={24} sm={12} md={8}>
// // 					<Card bordered={false}>
// // 						<Statistic
// // 							title="Total Admins"
// // 							value={totalAdmins}
// // 							prefix={<CrownOutlined />}
// // 							loading={loading}
// // 						/>
// // 					</Card>
// // 				</Col> */}
// // 			</Row>
// // 		</div>
// // 	);
// // };

// // export default AdminDashboard;





// // ====================== AdminDashboard.tsx ======================

// // import React, { useEffect, useState } from "react";
// // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // import { getUserProfile } from "../../redux/Slice/authSlice";
// // import SubscriptionTimer from "./SubscriptionTimer";

// // const AdminDashboard: React.FC = () => {
// //   const dispatch = useAppDispatch();
// //   const user = useAppSelector((state) => state.auth.user);

// //   const [expiryDate, setExpiryDate] = useState<string | null>(null);

// //   useEffect(() => {
// //     const loadExpiry = async () => {
// //       // 1️⃣ If Redux has user → use that
// //       if (user?.subscriptionEndDate) {
// //         setExpiryDate(user.subscriptionEndDate);
// //         localStorage.setItem("subscriptionExpiry", user.subscriptionEndDate);
// //         return;
// //       }

// //       // 2️⃣ Check localStorage
// //       const local = localStorage.getItem("subscriptionExpiry");
// //       if (local) {
// //         setExpiryDate(local);
// //       }

// //       // 3️⃣ Fetch fresh user profile from server
// //       try {
// //         const result = await dispatch(getUserProfile()).unwrap();

// //         if (result?.subscriptionEndDate) {
// //           setExpiryDate(result.subscriptionEndDate);
// //           localStorage.setItem(
// //             "subscriptionExpiry",
// //             result.subscriptionEndDate
// //           );
// //         }
// //       } catch (err) {
// //         console.log("Error loading profile:", err);
// //       }
// //     };

// //     loadExpiry();
// //   }, [user, dispatch]);

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       {/* ================= TIMER SHOWS HERE ================= */}
// //       {expiryDate && <SubscriptionTimer expiryDate={expiryDate} />}

// //       {/* Your remaining dashboard UI */}
// //       <h1>Welcome to Admin Dashboard</h1>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;


// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { getUserProfile } from "../../redux/Slice/authSlice";
// import SubscriptionTimer from "./SubscriptionTimer";
// import dayjs from "dayjs";

// const AdminDashboard: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.auth.user);

//   const [expiryDate, setExpiryDate] = useState<string | null>(null);

//   // ✅ Load profile ONLY if not already loaded
//   useEffect(() => {
//     if (!user) {
//       dispatch(getUserProfile());
//     }
//   }, [dispatch]); // 🔥 remove user from dependencies

//   // ✅ Set expiry date AFTER user loads
//   useEffect(() => {
//     if (user?.subscriptionEndDate) {
//       setExpiryDate(user.subscriptionEndDate);
//       localStorage.setItem("subscriptionExpiry", user.subscriptionEndDate);
//     } else {
//       const local = localStorage.getItem("subscriptionExpiry");
//       if (local) setExpiryDate(local);
//     }
//   }, [user]); // this is OK



// const [showTimer, setShowTimer] = useState(false);

// useEffect(() => {
//   if (!expiryDate) return;

//   const now = dayjs();
//   const exp = dayjs(expiryDate);

//   const diffInDays = exp.diff(now, "day");

//   if (diffInDays <= 30) {
//     setShowTimer(true);  // show timer only in last month
//   } else {
//     setShowTimer(false);
//   }
// }, [expiryDate]);


//   return (
//     <div style={{ padding: "20px" }}>
//       {expiryDate && <SubscriptionTimer expiryDate={expiryDate} />}
//       <h1>Welcome to Admin Dashboard</h1>
//     </div>
//   );
// };

// export default AdminDashboard;



// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { getUserProfile } from "../../redux/Slice/authSlice";
// import SubscriptionTimer from "./SubscriptionTimer";
// import dayjs from "dayjs";

// const AdminDashboard: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.auth.user);

//   const [expiryDate, setExpiryDate] = useState<string | null>(null);
//   const [showTimer, setShowTimer] = useState(false);
  
//   // Load Profile (only once)
//   useEffect(() => {
//     if (!user) {
//       dispatch(getUserProfile());
//     }
//   }, [dispatch]);

//   // Set expiry after profile loaded
//   useEffect(() => {
//     if (user?.subscriptionEndDate) {
//       setExpiryDate(user.subscriptionEndDate);
//       localStorage.setItem("subscriptionExpiry", user.subscriptionEndDate);
//     } else {
//       const local = localStorage.getItem("subscriptionExpiry");
//       if (local) setExpiryDate(local);
//     }
//   }, [user]);

//   // Show timer only if within 30 days
//   useEffect(() => {
//     if (!expiryDate) return;

//     const now = dayjs();
//     const exp = dayjs(expiryDate);

//     const diffInDays = exp.diff(now, "day");

//     if (diffInDays <= 30) {
//       setShowTimer(true);
//     } else {
//       setShowTimer(false);
//     }
//   }, [expiryDate]);

//   return (
//     <div style={{ padding: "20px" }}>
//             <h1>Welcome to Admin Dashboard</h1>

//       {/* FIXED: Show only if within 1 month */}
//       {showTimer && expiryDate && (
//         <SubscriptionTimer expiryDate={expiryDate} />
//       )}
 
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// import { getUserProfile } from "../../redux/Slice/authSlice";
// import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";

// import SubscriptionTimer from "./SubscriptionTimer";
// import dayjs from "dayjs";
// import { Table, Card, Tag, Avatar } from "antd";

// const AdminDashboard: React.FC = () => {
//   const dispatch = useAppDispatch();

//   const user = useAppSelector((state) => state.auth.user);
//   const { users, loading } = useAppSelector((state) => state.users);

//   const [expiryDate, setExpiryDate] = useState<string | null>(null);
//   const [showTimer, setShowTimer] = useState(false);

//   // Load Profile
//   useEffect(() => {
//     if (!user) {
//       dispatch(getUserProfile());
//     }
//   }, [dispatch]);

//   // Fetch Users
//   useEffect(() => {
//     const req = dispatch(fetchUsers());
//     return () => req.abort();
//   }, [dispatch]);

//   // Subscription expiry logic
//   useEffect(() => {
//     if (user?.subscriptionEndDate) {
//       setExpiryDate(user.subscriptionEndDate);
//       localStorage.setItem("subscriptionExpiry", user.subscriptionEndDate);
//     } else {
//       const local = localStorage.getItem("subscriptionExpiry");
//       if (local) setExpiryDate(local);
//     }
//   }, [user]);

//   // Timer — only show if <= 30 days
//   useEffect(() => {
//     if (!expiryDate) return;

//     const now = dayjs();
//     const exp = dayjs(expiryDate);
//     const diffInDays = exp.diff(now, "day");

//     setShowTimer(diffInDays <= 30);
//   }, [expiryDate]);

//   // TABLE COLUMNS
//   const columns = [
//     {
//       title: "Image",
//       key: "avatar",
//       render: (_: any, record: any) => (
//         <Avatar src={record.avatar} size={45}>
//           {record.firstName?.[0]}
//         </Avatar>
//       ),
//     },
//     {
//       title: "Name",
//       key: "name",
//       render: (_: any, record: any) => (
//         <div>
//           <strong>
//             {record.firstName} {record.lastName}
//           </strong>
//           <br />
//           <small>{record.email}</small>
//         </div>
//       ),
//     },
//     {
//       title: "Status",
//       key: "status",
//       render: (_: any, record: any) => (
//         <Tag color={record.isActive ? "green" : "red"}>
//           {record.isActive ? "Active" : "Inactive"}
//         </Tag>
//       ),
//     },
//     {
//       title: "Subscription",
//       key: "subscription",
//       render: (_: any, record: any) => (
//         <>
//           {record.subscriptionPeriod === "halfyearly" && "Half-Yearly"}
//           {record.subscriptionPeriod === "yearly" && "Yearly"}
//           {!record.subscriptionPeriod && "-"}
//         </>
//       ),
//     },
//     {
//       title: "Start Date",
//       key: "start",
//       render: (_: any, record: any) =>
//         record.subscriptionStartDate
//           ? dayjs(record.subscriptionStartDate).format("DD/MM/YYYY")
//           : "-",
//     },
//     {
//       title: "End Date",
//       key: "end",
//       render: (_: any, record: any) =>
//         record.subscriptionEndDate
//           ? dayjs(record.subscriptionEndDate).format("DD/MM/YYYY")
//           : "-",
//     },
//   ];

//   // ONLY ROLE === "user"
//   const normalUsers = users.filter((u) => u.role === "user");

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Welcome to Admin Dashboard</h1>

//       {/* Subscription Timer */}
//       {showTimer && expiryDate && (
//         <SubscriptionTimer expiryDate={expiryDate} />
//       )}

//       {/* User Table */}
//       <Card title="Users List" className="mt-4">
//         <Table
//           columns={columns}
//           dataSource={normalUsers}
//           rowKey="_id"
//           loading={loading}
//           pagination={{ pageSize: 10 }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboard;




// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// import { getUserProfile } from "../../redux/Slice/authSlice";
// import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";

// import SubscriptionTimer from "./SubscriptionTimer";
// import dayjs from "dayjs";
// import { Table, Card, Tag, Avatar } from "antd";

// const AdminDashboard: React.FC = () => {
//   const dispatch = useAppDispatch();

//   const user = useAppSelector((state) => state.auth.user);
//   const { users, loading } = useAppSelector((state) => state.users);

//   const [expiryDate, setExpiryDate] = useState<string | null>(null);
//   const [showTimer, setShowTimer] = useState(false);

//   // Load Profile
//   useEffect(() => {
//     if (!user) {
//       dispatch(getUserProfile());
//     }
//   }, [dispatch]);

//   // Fetch Users
//   useEffect(() => {
//     const req = dispatch(fetchUsers());
//     return () => req.abort();
//   }, [dispatch]);

//   // Subscription expiry logic (FIXED)
//   useEffect(() => {
//     if (user?.subscriptionEndDate) {
//       const expString =
//         user.subscriptionEndDate instanceof Date
//           ? user.subscriptionEndDate.toISOString()
//           : String(user.subscriptionEndDate);

//       setExpiryDate(expString);
//       localStorage.setItem("subscriptionExpiry", expString);
//     } else {
//       const local = localStorage.getItem("subscriptionExpiry");
//       if (local) setExpiryDate(local);
//     }
//   }, [user]);

//   // Timer — only show if <= 30 days
//   useEffect(() => {
//     if (!expiryDate) return;

//     const now = dayjs();
//     const exp = dayjs(expiryDate);
//     const diffInDays = exp.diff(now, "day");

//     setShowTimer(diffInDays <= 30);
//   }, [expiryDate]);

//   // TABLE COLUMNS
//   const columns = [
//     {
//       title: "Image",
//       key: "avatar",
//       render: (_: any, record: any) => (
//         <Avatar src={record.avatar} size={45}>
//           {record.firstName?.[0]}
//         </Avatar>
//       ),
//     },
//     {
//       title: "Name",
//       key: "name",
//       render: (_: any, record: any) => (
//         <div>
//           <strong>
//             {record.firstName} {record.lastName}
//           </strong>
//           <br />
//           <small>{record.email}</small>
//         </div>
//       ),
//     },
//     {
//       title: "Status",
//       key: "status",
//       render: (_: any, record: any) => (
//         <Tag color={record.isActive ? "green" : "red"}>
//           {record.isActive ? "Active" : "Inactive"}
//         </Tag>
//       ),
//     },
//     {
//       title: "Subscription",
//       key: "subscription",
//       render: (_: any, record: any) => (
//         <>
//           {record.subscriptionPeriod === "halfyearly" && "Half-Yearly"}
//           {record.subscriptionPeriod === "yearly" && "Yearly"}
//           {!record.subscriptionPeriod && "-"}
//         </>
//       ),
//     },
//     {
//       title: "Start Date",
//       key: "start",
//       render: (_: any, record: any) =>
//         record.subscriptionStartDate
//           ? dayjs(record.subscriptionStartDate).format("DD/MM/YYYY")
//           : "-",
//     },
//     {
//       title: "End Date",
//       key: "end",
//       render: (_: any, record: any) =>
//         record.subscriptionEndDate
//           ? dayjs(record.subscriptionEndDate).format("DD/MM/YYYY")
//           : "-",
//     },
//   ];

//   // ONLY ROLE === "user"
//   const normalUsers = users.filter((u) => u.role === "user");

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Welcome to Admin Dashboard</h1>

//       {/* Subscription Timer */}
//       {showTimer && expiryDate && (
//         <SubscriptionTimer expiryDate={expiryDate} />
//       )}

//       {/* User Table */}
//       <Card title="Users List" className="mt-4">
//         <Table
//           columns={columns}
//           dataSource={normalUsers}
//           rowKey="_id"
//           loading={loading}
//           pagination={{ pageSize: 10 }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

import { getUserProfile } from "../../redux/Slice/authSlice";
import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";

import SubscriptionTimer from "./SubscriptionTimer";
import dayjs from "dayjs";
import { Card } from "antd";
import type { IUser } from "../../redux/types/usera.types";

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const { users } = useAppSelector((state) => state.users);

  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    if (!user) dispatch(getUserProfile());
  }, [dispatch, user]);

  useEffect(() => {
    const req = dispatch(fetchUsers());
    return () => req.abort();
  }, [dispatch]);

  useEffect(() => {
    if (user?.subscriptionEndDate) {
      const expString =
        user.subscriptionEndDate instanceof Date
          ? user.subscriptionEndDate.toISOString()
          : String(user.subscriptionEndDate);

      setExpiryDate(expString);
      localStorage.setItem("subscriptionExpiry", expString);
    } else {
      const local = localStorage.getItem("subscriptionExpiry");
      if (local) setExpiryDate(local);
    }
  }, [user]);

  useEffect(() => {
    if (!expiryDate) return;

    const now = dayjs();
    const exp = dayjs(expiryDate);
    const diffInDays = exp.diff(now, "day");

    setShowTimer(diffInDays <= 30);
  }, [expiryDate]);

  const normalUsers: IUser[] = users.filter((u: IUser) => u.role === "user");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Admin Dashboard</h1>

      {showTimer && expiryDate && <SubscriptionTimer expiryDate={expiryDate} />}

      <Card
        title="Total Users"
        onClick={() => navigate("/admin/totalusers")}
        style={{
          width: 250,
          cursor: "pointer",
          textAlign: "center",
          marginTop: 20,
          border: "2px solid #1890ff",
        }}
      >
        <h2>{normalUsers.length}</h2>
      </Card>
    </div>
  );
};

export default AdminDashboard;
