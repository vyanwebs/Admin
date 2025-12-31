// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // import { getUserProfile } from "../../redux/Slice/authSlice";
// // // // // // // // import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // // // // // // // import SubscriptionTimer from "./SubscriptionTimer";
// // // // // // // // import dayjs from "dayjs";
// // // // // // // // import { Card, Row, Col, Statistic, Typography } from "antd";
// // // // // // // // import type { IUser } from "../../redux/types/usera.types";
// // // // // // // // import DashboardCharts from "../../subadminComponents/ChartsAdmin/DashboardCharts"
// // // // // // // // import { fetchAppointments } from "../../redux/Slice/appointment/appointmentSlice";

// // // // // // // // const { Title } = Typography;

// // // // // // // // const AdminDashboard: React.FC = () => {
// // // // // // // //   const dispatch = useAppDispatch();
// // // // // // // //   const navigate = useNavigate();
 
// // // // // // // //     const { appointments } = useAppSelector((state) => state.appointments);


// // // // // // // //   const user = useAppSelector((state) => state.auth.user);
// // // // // // // //   const { users } = useAppSelector((state) => state.users);

// // // // // // // //   const [expiryDate, setExpiryDate] = useState<string | null>(null);
// // // // // // // //   const [showTimer, setShowTimer] = useState(false);

// // // // // // // // useEffect(() => {
// // // // // // // //   dispatch(fetchAppointments());
// // // // // // // // }, [dispatch]);
  
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!user) dispatch(getUserProfile());
// // // // // // // //   }, [dispatch, user]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const req = dispatch(fetchUsers());
// // // // // // // //     return () => req.abort();
// // // // // // // //   }, [dispatch]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (user?.subscriptionEndDate) {
// // // // // // // //       const expString =
// // // // // // // //         user.subscriptionEndDate instanceof Date
// // // // // // // //           ? user.subscriptionEndDate.toISOString()
// // // // // // // //           : String(user.subscriptionEndDate);

// // // // // // // //       setExpiryDate(expString);
// // // // // // // //       localStorage.setItem("subscriptionExpiry", expString);
// // // // // // // //     } else {
// // // // // // // //       const local = localStorage.getItem("subscriptionExpiry");
// // // // // // // //       if (local) setExpiryDate(local);
// // // // // // // //     }
// // // // // // // //   }, [user]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!expiryDate) return;

// // // // // // // //     const now = dayjs();
// // // // // // // //     const exp = dayjs(expiryDate);
// // // // // // // //     const diffInDays = exp.diff(now, "day");

// // // // // // // //     setShowTimer(diffInDays <= 30);
// // // // // // // //   }, [expiryDate]);

// // // // // // // //   const normalUsers: IUser[] = users.filter((u: IUser) => u.role === "user");
  
// // // // // // // //   const pendingAppointmentsCount = appointments.filter(
// // // // // // // //     (a) => a.appointmentStatus.toLowerCase() === "pending"
// // // // // // // //   ).length;

// // // // // // // //   return (
// // // // // // // //     <div style={{ padding: "30px" }}>
// // // // // // // //       <Title level={2} style={{ marginBottom: 20 }}>
// // // // // // // //         Welcome, {user?.firstName || "Admin"}!
// // // // // // // //       </Title>

// // // // // // // //       {showTimer && expiryDate && (
// // // // // // // //         <Card
// // // // // // // //           style={{
// // // // // // // //             marginBottom: 30,
// // // // // // // //             borderRadius: 12,
// // // // // // // //             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// // // // // // // //             background: "#fffbe6",
// // // // // // // //             cursor: "default",
// // // // // // // //           }}
// // // // // // // //         >
// // // // // // // //           <SubscriptionTimer expiryDate={expiryDate} />
// // // // // // // //         </Card>
// // // // // // // //       )}
// // // // // // // // <Row gutter={[24, 24]}>
  

// // // // // // // //   {/* Orders Card */}
// // // // // // // //   <Col xs={24} sm={12} md={8} lg={6}>
// // // // // // // //     <Card
// // // // // // // //       hoverable
// // // // // // // //       onClick={() => navigate("/admin/Appointment")}
// // // // // // // //       style={{
// // // // // // // //         borderRadius: 12,
// // // // // // // //         boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
// // // // // // // //         textAlign: "center",
// // // // // // // //         cursor: "pointer",
// // // // // // // //       }}
// // // // // // // //     >
// // // // // // // //       <Statistic
// // // // // // // //         title="Appointments"
// // // // // // // //          value={pendingAppointmentsCount} 
// // // // // // // //         valueStyle={{ color: "#52c41a", fontSize: 36 }}
// // // // // // // //       />
// // // // // // // //     </Card>
// // // // // // // //   </Col>
// // // // // // // //   <Col xs={24} sm={12} md={8} lg={6}>
// // // // // // // //     <Card
// // // // // // // //       hoverable
// // // // // // // //       onClick={() => navigate("/admin/orders")}
// // // // // // // //       style={{
// // // // // // // //         borderRadius: 12,
// // // // // // // //         boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
// // // // // // // //         textAlign: "center",
// // // // // // // //         cursor: "pointer",
// // // // // // // //       }}
// // // // // // // //     >
// // // // // // // //       <Statistic
// // // // // // // //         title="Orders"
// // // // // // // //         // value={orders.length} 
// // // // // // // //         valueStyle={{ color: "#52c41a", fontSize: 36 }}
// // // // // // // //       />
// // // // // // // //     </Card>
// // // // // // // //   </Col>
// // // // // // // //   {/* Total Users Card */}
// // // // // // // //   <Col xs={24} sm={12} md={8} lg={6}>
// // // // // // // //     <Card
// // // // // // // //       hoverable
// // // // // // // //       onClick={() => navigate("/admin/totalusers")}
// // // // // // // //       style={{
// // // // // // // //         borderRadius: 12,
// // // // // // // //         boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
// // // // // // // //         textAlign: "center",
// // // // // // // //         cursor: "pointer",
// // // // // // // //       }}
// // // // // // // //     >
// // // // // // // //       <Statistic
// // // // // // // //         title="Total Users"
// // // // // // // //         value={normalUsers.length}
// // // // // // // //         valueStyle={{ color: "#1890ff", fontSize: 36 }}
// // // // // // // //       />
// // // // // // // //     </Card>
// // // // // // // //   </Col>

// // // // // // // // </Row>

     
// // // // // // // //       {/* <DashboardCharts /> */}

// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default AdminDashboard;




// // // // // // // // //  <Row gutter={[24, 24]}>
// // // // // // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // // // // // //           <Card
// // // // // // // // //             hoverable
// // // // // // // // //             onClick={() => navigate("/admin/totalusers")}
// // // // // // // // //             style={{
// // // // // // // // //               borderRadius: 12,
// // // // // // // // //               boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
// // // // // // // // //               textAlign: "center",
// // // // // // // // //               cursor: "pointer",
// // // // // // // // //             }}
// // // // // // // // //           >
// // // // // // // // //             <Statistic
// // // // // // // // //               title="Total Users"
// // // // // // // // //               value={normalUsers.length}
// // // // // // // // //               valueStyle={{ color: "#1890ff", fontSize: 36 }}
// // // // // // // // //             />
// // // // // // // // //           </Card>
// // // // // // // // //         </Col>

// // // // // // // // //         {/* Future cards can be added here, e.g., total subadmins, active subscriptions */}
// // // // // // // // //       </Row>

// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import { getUserProfile } from "../../redux/Slice/authSlice";
// // // // // // // import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // // // // // // import { fetchAppointments } from "../../redux/Slice/appointment/appointmentSlice";
// // // // // // // import SubscriptionTimer from "./SubscriptionTimer";
// // // // // // // import dayjs from "dayjs";
// // // // // // // import { Card, Row, Col, Statistic, Typography } from "antd";
// // // // // // // import type { IUser } from "../../redux/types/usera.types";
// // // // // // // import DashboardCharts from "../../subadminComponents/ChartsAdmin/DashboardCharts";

// // // // // // // const { Title } = Typography;

// // // // // // // const AdminDashboard: React.FC = () => {
// // // // // // //   const dispatch = useAppDispatch();
// // // // // // //   const navigate = useNavigate();

// // // // // // //   const user = useAppSelector((state) => state.auth.user);
// // // // // // //   const { users } = useAppSelector((state) => state.users);
// // // // // // //   const { appointments } = useAppSelector((state) => state.appointments);

// // // // // // //   const [expiryDate, setExpiryDate] = useState<string | null>(null);
// // // // // // //   const [showTimer, setShowTimer] = useState(false);

// // // // // // //   useEffect(() => {
// // // // // // //     if (!user) dispatch(getUserProfile());
// // // // // // //   }, [dispatch, user]);

// // // // // // //   useEffect(() => {
// // // // // // //     const req = dispatch(fetchUsers());
// // // // // // //     return () => req.abort();
// // // // // // //   }, [dispatch]);

// // // // // // //   // Fetch appointments on dashboard load
// // // // // // //   useEffect(() => {
// // // // // // //     dispatch(fetchAppointments());
// // // // // // //   }, [dispatch]);

// // // // // // //   useEffect(() => {
// // // // // // //     if (user?.subscriptionEndDate) {
// // // // // // //       const expString =
// // // // // // //         user.subscriptionEndDate instanceof Date
// // // // // // //           ? user.subscriptionEndDate.toISOString()
// // // // // // //           : String(user.subscriptionEndDate);

// // // // // // //       setExpiryDate(expString);
// // // // // // //       localStorage.setItem("subscriptionExpiry", expString);
// // // // // // //     } else {
// // // // // // //       const local = localStorage.getItem("subscriptionExpiry");
// // // // // // //       if (local) setExpiryDate(local);
// // // // // // //     }
// // // // // // //   }, [user]);

// // // // // // //   useEffect(() => {
// // // // // // //     if (!expiryDate) return;

// // // // // // //     const now = dayjs();
// // // // // // //     const exp = dayjs(expiryDate);
// // // // // // //     const diffInDays = exp.diff(now, "day");

// // // // // // //     setShowTimer(diffInDays <= 30);
// // // // // // //   }, [expiryDate]);

// // // // // // //   const normalUsers: IUser[] = users.filter((u: IUser) => u.role === "user");

// // // // // // //   // Appointment counts
// // // // // // //   const pendingAppointmentsCount = appointments.filter(
// // // // // // //     (a) => a.appointmentStatus.toLowerCase() === "pending"
// // // // // // //   ).length;

// // // // // // //   const acceptedAppointmentsCount = appointments.filter(
// // // // // // //     (a) => a.appointmentStatus.toLowerCase() === "accepted"
// // // // // // //   ).length;

// // // // // // //   const allAppointmentsCount = appointments.length;

// // // // // // //   return (
// // // // // // //     <div style={{ padding: "30px" }}>
// // // // // // //       <Title level={2} style={{ marginBottom: 20 }}>
// // // // // // //         Welcome, {user?.firstName || "Admin"}!
// // // // // // //       </Title>

// // // // // // //       {showTimer && expiryDate && (
// // // // // // //         <Card
// // // // // // //           style={{
// // // // // // //             marginBottom: 30,
// // // // // // //             borderRadius: 12,
// // // // // // //             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// // // // // // //             background: "#fffbe6",
// // // // // // //             cursor: "default",
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           <SubscriptionTimer expiryDate={expiryDate} />
// // // // // // //         </Card>
// // // // // // //       )}

// // // // // // //       <Row gutter={[24, 24]}>
// // // // // // //         {/* Pending Appointments */}
// // // // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // // // //           <Card
// // // // // // //             hoverable
// // // // // // //             onClick={() => navigate("/admin/Appointment")}
// // // // // // //             style={{
// // // // // // //               borderRadius: 12,
// // // // // // //               boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
// // // // // // //               textAlign: "center",
// // // // // // //               cursor: "pointer",
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <Statistic
// // // // // // //               title="Pending Appointments"
// // // // // // //               value={pendingAppointmentsCount}
// // // // // // //               valueStyle={{ color: "#faad14", fontSize: 36 }}
// // // // // // //             />
// // // // // // //           </Card>
// // // // // // //         </Col>

// // // // // // //         {/* Accepted Appointments */}
// // // // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // // // //           <Card
// // // // // // //             hoverable
// // // // // // //             onClick={() => navigate("/admin/Appointment")}
// // // // // // //             style={{
// // // // // // //               borderRadius: 12,
// // // // // // //               boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
// // // // // // //               textAlign: "center",
// // // // // // //               cursor: "pointer",
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <Statistic
// // // // // // //               title="Accepted Appointments"
// // // // // // //               value={acceptedAppointmentsCount}
// // // // // // //               valueStyle={{ color: "#52c41a", fontSize: 36 }}
// // // // // // //             />
// // // // // // //           </Card>
// // // // // // //         </Col>

// // // // // // //         {/* All Appointments */}
// // // // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // // // //           <Card
// // // // // // //             hoverable
// // // // // // //             onClick={() => navigate("/admin/Appointment")}
// // // // // // //             style={{
// // // // // // //               borderRadius: 12,
// // // // // // //               boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
// // // // // // //               textAlign: "center",
// // // // // // //               cursor: "pointer",
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <Statistic
// // // // // // //               title="All Appointments"
// // // // // // //               value={allAppointmentsCount}
// // // // // // //               valueStyle={{ color: "#1890ff", fontSize: 36 }}
// // // // // // //             />
// // // // // // //           </Card>
// // // // // // //         </Col>

// // // // // // //         {/* Total Users Card */}
// // // // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // // // //           <Card
// // // // // // //             hoverable
// // // // // // //             onClick={() => navigate("/admin/totalusers")}
// // // // // // //             style={{
// // // // // // //               borderRadius: 12,
// // // // // // //               boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
// // // // // // //               textAlign: "center",
// // // // // // //               cursor: "pointer",
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <Statistic
// // // // // // //               title="Total Users"
// // // // // // //               value={normalUsers.length}
// // // // // // //               valueStyle={{ color: "#1890ff", fontSize: 36 }}
// // // // // // //             />
// // // // // // //           </Card>
// // // // // // //         </Col>
// // // // // // //       </Row>

// // // // // // //       {/* <DashboardCharts /> */}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default AdminDashboard;

// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import { getUserProfile } from "../../redux/Slice/authSlice";
// // // // // // import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // // // // // import { fetchAppointments } from "../../redux/Slice/appointment/appointmentSlice";
// // // // // // import SubscriptionTimer from "./SubscriptionTimer";
// // // // // // import dayjs from "dayjs";
// // // // // // import { Card, Row, Col, Statistic, Typography, Divider } from "antd";
// // // // // // import type { IUser } from "../../redux/types/usera.types";
// // // // // // import DashboardCharts from "../../subadminComponents/ChartsAdmin/DashboardCharts";

// // // // // // const { Title } = Typography;

// // // // // // const AdminDashboard: React.FC = () => {
// // // // // //   const dispatch = useAppDispatch();
// // // // // //   const navigate = useNavigate();

// // // // // //   const user = useAppSelector((state) => state.auth.user);
// // // // // //   const { users } = useAppSelector((state) => state.users);
// // // // // //   const { appointments } = useAppSelector((state) => state.appointments);

// // // // // //   const [expiryDate, setExpiryDate] = useState<string | null>(null);
// // // // // //   const [showTimer, setShowTimer] = useState(false);

// // // // // //   useEffect(() => {
// // // // // //     if (!user) dispatch(getUserProfile());
// // // // // //   }, [dispatch, user]);

// // // // // //   useEffect(() => {
// // // // // //     const req = dispatch(fetchUsers());
// // // // // //     return () => req.abort();
// // // // // //   }, [dispatch]);

// // // // // //   useEffect(() => {
// // // // // //     dispatch(fetchAppointments());
// // // // // //   }, [dispatch]);

// // // // // //   useEffect(() => {
// // // // // //     if (user?.subscriptionEndDate) {
// // // // // //       const expString =
// // // // // //         user.subscriptionEndDate instanceof Date
// // // // // //           ? user.subscriptionEndDate.toISOString()
// // // // // //           : String(user.subscriptionEndDate);

// // // // // //       setExpiryDate(expString);
// // // // // //       localStorage.setItem("subscriptionExpiry", expString);
// // // // // //     } else {
// // // // // //       const local = localStorage.getItem("subscriptionExpiry");
// // // // // //       if (local) setExpiryDate(local);
// // // // // //     }
// // // // // //   }, [user]);

// // // // // //   useEffect(() => {
// // // // // //     if (!expiryDate) return;

// // // // // //     const now = dayjs();
// // // // // //     const exp = dayjs(expiryDate);
// // // // // //     const diffInDays = exp.diff(now, "day");

// // // // // //     setShowTimer(diffInDays <= 30);
// // // // // //   }, [expiryDate]);

// // // // // //   const normalUsers: IUser[] = users.filter((u: IUser) => u.role === "user");

// // // // // //   // Appointment counts
// // // // // //   const pendingAppointmentsCount = appointments.filter(
// // // // // //     (a) => a.appointmentStatus.toLowerCase() === "pending"
// // // // // //   ).length;

// // // // // //   const acceptedAppointmentsCount = appointments.filter(
// // // // // //     (a) => a.appointmentStatus.toLowerCase() === "accepted"
// // // // // //   ).length;

// // // // // //   const allAppointmentsCount = appointments.length;

// // // // // //   return (
// // // // // //     <div style={{ padding: "30px" }}>
// // // // // //       <Title level={2} style={{ marginBottom: 20 }}>
// // // // // //         Welcome, {user?.firstName || "Admin"}!
// // // // // //       </Title>

// // // // // //       {showTimer && expiryDate && (
// // // // // //         <Card
// // // // // //           style={{
// // // // // //             marginBottom: 30,
// // // // // //             borderRadius: 12,
// // // // // //             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// // // // // //             background: "#fffbe6",
// // // // // //             cursor: "default",
// // // // // //           }}
// // // // // //         >
// // // // // //           <SubscriptionTimer expiryDate={expiryDate} />
// // // // // //         </Card>
// // // // // //       )}

// // // // // //       {/* ================= Appointments Section ================= */}
// // // // // //       <Divider orientation="left" style={{ fontSize: 18, fontWeight: "bold" }}>
// // // // // //         Appointments
// // // // // //       </Divider>

// // // // // //       <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
// // // // // //         {/* Pending Appointments */}
// // // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // // //           <Card
// // // // // //             hoverable
// // // // // //             onClick={() => navigate("/admin/Appointment")}
// // // // // //             style={{
// // // // // //               borderRadius: 12,
// // // // // //               boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
// // // // // //               textAlign: "center",
// // // // // //               cursor: "pointer",
// // // // // //               transition: "transform 0.2s",
// // // // // //             }}
// // // // // //             className="hover:scale-105"
// // // // // //           >
// // // // // //             <Statistic
// // // // // //               title="Pending"
// // // // // //               value={pendingAppointmentsCount}
// // // // // //               valueStyle={{ color: "#faad14", fontSize: 36 }}
// // // // // //             />
// // // // // //           </Card>
// // // // // //         </Col>

// // // // // //         {/* Accepted Appointments */}
// // // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // // //           <Card
// // // // // //             hoverable
// // // // // //             onClick={() => navigate("/admin/Appointment")}
// // // // // //             style={{
// // // // // //               borderRadius: 12,
// // // // // //               boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
// // // // // //               textAlign: "center",
// // // // // //               cursor: "pointer",
// // // // // //               transition: "transform 0.2s",
// // // // // //             }}
// // // // // //             className="hover:scale-105"
// // // // // //           >
// // // // // //             <Statistic
// // // // // //               title="Accepted"
// // // // // //               value={acceptedAppointmentsCount}
// // // // // //               valueStyle={{ color: "#52c41a", fontSize: 36 }}
// // // // // //             />
// // // // // //           </Card>
// // // // // //         </Col>

// // // // // //         {/* All Appointments */}
// // // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // // //           <Card
// // // // // //             hoverable
// // // // // //             onClick={() => navigate("/admin/Appointment")}
// // // // // //             style={{
// // // // // //               borderRadius: 12,
// // // // // //               boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
// // // // // //               textAlign: "center",
// // // // // //               cursor: "pointer",
// // // // // //               transition: "transform 0.2s",
// // // // // //             }}
// // // // // //             className="hover:scale-105"
// // // // // //           >
// // // // // //             <Statistic
// // // // // //               title="All"
// // // // // //               value={allAppointmentsCount}
// // // // // //               valueStyle={{ color: "#1890ff", fontSize: 36 }}
// // // // // //             />
// // // // // //           </Card>
// // // // // //         </Col>
// // // // // //       </Row>

// // // // // //       {/* ================= Users Section ================= */}
// // // // // //       <Divider orientation="left" style={{ fontSize: 18, fontWeight: "bold" }}>
// // // // // //         Users
// // // // // //       </Divider>

// // // // // //       <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
// // // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // // //           <Card
// // // // // //             hoverable
// // // // // //             onClick={() => navigate("/admin/totalusers")}
// // // // // //             style={{
// // // // // //               borderRadius: 12,
// // // // // //               boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
// // // // // //               textAlign: "center",
// // // // // //               cursor: "pointer",
// // // // // //               transition: "transform 0.2s",
// // // // // //             }}
// // // // // //             className="hover:scale-105"
// // // // // //           >
// // // // // //             <Statistic
// // // // // //               title="Total Users"
// // // // // //               value={normalUsers.length}
// // // // // //               valueStyle={{ color: "#1890ff", fontSize: 36 }}
// // // // // //             />
// // // // // //           </Card>
// // // // // //         </Col>
// // // // // //       </Row>

// // // // // //       {/* <DashboardCharts /> */}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default AdminDashboard;

// // // // // import React, { useEffect, useState } from "react";
// // // // // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import { getUserProfile } from "../../redux/Slice/authSlice";
// // // // // import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // // // // import { fetchAppointments } from "../../redux/Slice/appointment/appointmentSlice";
// // // // // import SubscriptionTimer from "./SubscriptionTimer";
// // // // // import dayjs from "dayjs";
// // // // // import {
// // // // //   Card,
// // // // //   Row,
// // // // //   Col,
// // // // //   Typography,
// // // // //   Badge,
// // // // //   Statistic,
// // // // //   Divider,
// // // // // } from "antd";
// // // // // import {
// // // // //   UsergroupAddOutlined,
// // // // //   ScheduleOutlined,
// // // // //   CheckCircleOutlined,
// // // // //   FileTextOutlined,
// // // // // } from "@ant-design/icons";
// // // // // import DashboardCharts from "../../subadminComponents/ChartsAdmin/DashboardCharts";
// // // // // import type { IUser } from "../../redux/types/usera.types";

// // // // // const { Title } = Typography;

// // // // // const AdminDashboard: React.FC = () => {
// // // // //   const dispatch = useAppDispatch();
// // // // //   const navigate = useNavigate();

// // // // //   const user = useAppSelector((state) => state.auth.user);
// // // // //   const { users } = useAppSelector((state) => state.users);
// // // // //   const { appointments } = useAppSelector((state) => state.appointments);

// // // // //   const [expiryDate, setExpiryDate] = useState<string | null>(null);
// // // // //   const [showTimer, setShowTimer] = useState(false);

// // // // //   useEffect(() => {
// // // // //     if (!user) dispatch(getUserProfile());
// // // // //   }, [dispatch, user]);

// // // // //   useEffect(() => {
// // // // //     dispatch(fetchUsers());
// // // // //     dispatch(fetchAppointments());
// // // // //   }, [dispatch]);

// // // // //   useEffect(() => {
// // // // //     if (user?.subscriptionEndDate) {
// // // // //       const expString =
// // // // //         user.subscriptionEndDate instanceof Date
// // // // //           ? user.subscriptionEndDate.toISOString()
// // // // //           : String(user.subscriptionEndDate);
// // // // //       setExpiryDate(expString);
// // // // //       localStorage.setItem("subscriptionExpiry", expString);
// // // // //     } else {
// // // // //       const local = localStorage.getItem("subscriptionExpiry");
// // // // //       if (local) setExpiryDate(local);
// // // // //     }
// // // // //   }, [user]);

// // // // //   useEffect(() => {
// // // // //     if (!expiryDate) return;
// // // // //     const now = dayjs();
// // // // //     const exp = dayjs(expiryDate);
// // // // //     const diffInDays = exp.diff(now, "day");
// // // // //     setShowTimer(diffInDays <= 30);
// // // // //   }, [expiryDate]);

// // // // //   const normalUsers: IUser[] = users.filter((u) => u.role === "user");

// // // // //   // Appointment counts
// // // // //   const pendingAppointmentsCount = appointments.filter(
// // // // //     (a) => a.appointmentStatus.toLowerCase() === "pending"
// // // // //   ).length;
// // // // //   const acceptedAppointmentsCount = appointments.filter(
// // // // //     (a) => a.appointmentStatus.toLowerCase() === "accepted"
// // // // //   ).length;
// // // // //   const allAppointmentsCount = appointments.length;

// // // // //   // Card styles
// // // // //   const cardStyle = (color: string) => ({
// // // // //     borderRadius: 12,
// // // // //     boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
// // // // //     textAlign: "center",
// // // // //     cursor: "pointer",
// // // // //     background: color,
// // // // //     transition: "transform 0.2s",
// // // // //   });

// // // // //   const hoverEffect = { transform: "scale(1.05)" };

// // // // //   return (
// // // // //     <div style={{ padding: "30px" }}>
// // // // //       {/* Welcome */}
// // // // //       <Title level={2} style={{ marginBottom: 10 }}>
// // // // //         Welcome, {user?.firstName || "Admin"}!
// // // // //       </Title>

// // // // //       {showTimer && expiryDate && (
// // // // //         <SubscriptionTimer expiryDate={expiryDate} />
// // // // //       )}

// // // // //       {/* ================= Appointments Section ================= */}
// // // // //       <Divider orientation="left" style={{ fontSize: 18, fontWeight: "bold" }}>
// // // // //         Appointments
// // // // //       </Divider>

// // // // //       <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
// // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // //           <Card
// // // // //             hoverable
// // // // //             onClick={() => navigate("/admin/Appointment")}
// // // // //             styles={cardStyle("#fff7e6")}
// // // // //             bodyStyle={{ display: "flex", alignItems: "center", gap: 15 }}
// // // // //           >
// // // // //             <ScheduleOutlined style={{ fontSize: 40, color: "#faad14" }} />
// // // // //             <div>
// // // // //               <Statistic
// // // // //                 title="Pending"
// // // // //                 value={pendingAppointmentsCount}
// // // // //                 valueStyle={{ color: "#faad14", fontSize: 28 }}
// // // // //               />
// // // // //               <Badge status="warning" text="Pending" />
// // // // //             </div>
// // // // //           </Card>
// // // // //         </Col>

// // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // //           <Card
// // // // //             hoverable
// // // // //             onClick={() => navigate("/admin/Appointment")}
// // // // //             styles={cardStyle("#f6ffed")}
// // // // //             bodyStyle={{ display: "flex", alignItems: "center", gap: 15 }}
// // // // //           >
// // // // //             <CheckCircleOutlined style={{ fontSize: 40, color: "#52c41a" }} />
// // // // //             <div>
// // // // //               <Statistic
// // // // //                 title="Accepted"
// // // // //                 value={acceptedAppointmentsCount}
// // // // //                 valueStyle={{ color: "#52c41a", fontSize: 28 }}
// // // // //               />
// // // // //               <Badge status="success" text="Accepted" />
// // // // //             </div>
// // // // //           </Card>
// // // // //         </Col>

// // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // //           <Card
// // // // //             hoverable
// // // // //             onClick={() => navigate("/admin/Appointment")}
// // // // //             styles={cardStyle("#e6f7ff")}
// // // // //             bodyStyle={{ display: "flex", alignItems: "center", gap: 15 }}
// // // // //           >
// // // // //             <FileTextOutlined style={{ fontSize: 40, color: "#1890ff" }} />
// // // // //             <div>
// // // // //               <Statistic
// // // // //                 title="All"
// // // // //                 value={allAppointmentsCount}
// // // // //                 valueStyle={{ color: "#1890ff", fontSize: 28 }}
// // // // //               />
// // // // //               <Badge status="processing" text="All" />
// // // // //             </div>
// // // // //           </Card>
// // // // //         </Col>
// // // // //       </Row>

// // // // //       {/* ================= Users Section ================= */}
// // // // //       <Divider orientation="left" style={{ fontSize: 18, fontWeight: "bold" }}>
// // // // //         Users
// // // // //       </Divider>

// // // // //       <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
// // // // //         <Col xs={24} sm={12} md={8} lg={6}>
// // // // //           <Card
// // // // //             hoverable
// // // // //             onClick={() => navigate("/admin/totalusers")}
// // // // //             styles={cardStyle("#fff0f6")}
// // // // //             bodyStyle={{ display: "flex", alignItems: "center", gap: 15 }}
// // // // //           >
// // // // //             <UsergroupAddOutlined style={{ fontSize: 40, color: "#eb2f96" }} />
// // // // //             <div>
// // // // //               <Statistic
// // // // //                 title="Total Users"
// // // // //                 value={normalUsers.length}
// // // // //                 valueStyle={{ color: "#eb2f96", fontSize: 28 }}
// // // // //               />
// // // // //             </div>
// // // // //           </Card>
// // // // //         </Col>
// // // // //       </Row>

// // // // //       <DashboardCharts />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default AdminDashboard;



// // // // import React, { useEffect, useState } from "react";
// // // // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { getUserProfile } from "../../redux/Slice/authSlice";
// // // // import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // // // import { fetchAppointments } from "../../redux/Slice/appointment/appointmentSlice";
// // // // import { Card, Row, Col, Typography, Space, Badge } from "antd";
// // // // import { UserOutlined, CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
// // // // import dayjs from "dayjs";
// // // // import type { IUser } from "../../redux/types/usera.types";
// // // // import { fetchOrders } from "../../redux/Slice/Orders/orderSlice";


// // // // const { Title, Text } = Typography;

// // // // const AdminDashboard: React.FC = () => {
// // // //   const dispatch = useAppDispatch();
// // // //   const navigate = useNavigate();

// // // //   const user = useAppSelector((state) => state.auth.user);
// // // //   const { users } = useAppSelector((state) => state.users);
// // // //   const { appointments } = useAppSelector((state) => state.appointments);

// // // //   const [expiryDate, setExpiryDate] = useState<string | null>(null);
// // // //   const [timeLeft, setTimeLeft] = useState<string>("");

// // // //   const { orders } = useAppSelector((state) => state.orders);
 

// // // //   useEffect(() => {
// // // //     if (!user) dispatch(getUserProfile());
// // // //     dispatch(fetchUsers());
// // // //     dispatch(fetchAppointments());
// // // //   }, [dispatch, user]);

// // // //   useEffect(() => {
// // // //     if (user?.subscriptionEndDate) {
// // // //       const expString = user.subscriptionEndDate instanceof Date
// // // //         ? user.subscriptionEndDate.toISOString()
// // // //         : String(user.subscriptionEndDate);
// // // //       setExpiryDate(expString);
// // // //       localStorage.setItem("subscriptionExpiry", expString);
// // // //     }
// // // //   }, [user]);

// // // //    useEffect(() => {
// // // //   dispatch(fetchOrders());
// // // // }, [dispatch]);

// // // //   // Timer countdown
// // // //   useEffect(() => {
// // // //     if (!expiryDate) return;

// // // //     const interval = setInterval(() => {
// // // //       const now = dayjs();
// // // //       const exp = dayjs(expiryDate);
// // // //       const diff = exp.diff(now);

// // // //       if (diff <= 0) {
// // // //         setTimeLeft("Expired");
// // // //         clearInterval(interval);
// // // //         return;
// // // //       }

// // // //       const hours = Math.floor(diff / (1000 * 60 * 60));
// // // //       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
// // // //       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

// // // //       setTimeLeft(`${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`);
// // // //     }, 1000);

// // // //     return () => clearInterval(interval);
// // // //   }, [expiryDate]);

// // // //   // Users stats
// // // //   const normalUsers: IUser[] = users.filter((u) => u.role === "user");
// // // //   const activeUsersCount = normalUsers.filter(u => u.isActive).length;

// // // //   // Appointments stats
// // // //   const pendingAppointmentsCount = appointments.filter(a => a.appointmentStatus.toLowerCase() === "pending").length;
// // // //   const acceptedAppointmentsCount = appointments.filter(a => a.appointmentStatus.toLowerCase() === "accepted").length;
// // // //   const allAppointmentsCount = appointments.length;
// // // // //order status
// // // // const totalOrders = orders.length;

// // // // const processingOrders = orders.filter(
// // // //   (o) => o.orderStatus === "Processing"
// // // // ).length;

// // // // const deliveredOrders = orders.filter(
// // // //   (o) => o.orderStatus === "Delivered"
// // // // ).length;



// // // //   return (
// // // //     <div style={{ padding: 24 }}>
// // // //       {/* Welcome + Timer */}
// // // //       <div style={{ marginBottom: 24 }}>
// // // //         <Title level={2}>Welcome, {user?.firstName || "Admin"}!</Title>
// // // //         {expiryDate && (
// // // //           <Card style={{ backgroundColor: "#fffbe6", borderRadius: 12, display: "inline-block", padding: "12px 24px" }}>
// // // //             <Text strong>Subscription ends in: </Text>
// // // //             <Badge count={timeLeft} style={{ backgroundColor: "#fa8c16", fontSize: 16 }} />
// // // //           </Card>
// // // //         )}
// // // //       </div>

// // // //       {/* Dashboard Cards */}
// // // //       <Row gutter={[24, 24]}>
// // // //         {/* Appointments Card */}
// // // //         <Col xs={24} md={12}>
// // // //           <Card title={<Space><CalendarOutlined /> Appointments</Space>} style={{ borderRadius: 12 }}>
// // // //             <Row gutter={[16,16]}>
// // // //               <Col span={8}>
// // // //                 <Card
// // // //                   hoverable
// // // //                   onClick={() => navigate("/admin/Appointment")}
// // // //                   style={{ textAlign: "center", borderRadius: 12, backgroundColor:"#fff7e6" }}
// // // //                 >
// // // //                   <ClockCircleOutlined style={{ fontSize: 28, color: "#fa8c16" }} />
// // // //                   <Title level={3} style={{ margin:"8px 0" }}>{pendingAppointmentsCount}</Title>
// // // //                   <Text>Pending</Text>
// // // //                 </Card>
// // // //               </Col>
// // // //               <Col span={8}>
// // // //                 <Card
// // // //                   hoverable
// // // //                   onClick={() => navigate("/admin/Appointment")}
// // // //                   style={{ textAlign: "center", borderRadius: 12, backgroundColor:"#f6ffed" }}
// // // //                 >
// // // //                   <CheckCircleOutlined style={{ fontSize: 28, color: "#52c41a" }} />
// // // //                   <Title level={3} style={{ margin:"8px 0" }}>{acceptedAppointmentsCount}</Title>
// // // //                   <Text>Accepted</Text>
// // // //                 </Card>
// // // //               </Col>
// // // //               <Col span={8}>
// // // //                 <Card
// // // //                   hoverable
// // // //                   onClick={() => navigate("/admin/Appointment")}
// // // //                   style={{ textAlign: "center", borderRadius: 12, backgroundColor:"#e6f7ff" }}
// // // //                 >
// // // //                   <CalendarOutlined style={{ fontSize: 28, color: "#1890ff" }} />
// // // //                   <Title level={3} style={{ margin:"8px 0" }}>{allAppointmentsCount}</Title>
// // // //                   <Text>All</Text>
// // // //                 </Card>
// // // //               </Col>
// // // //             </Row>
// // // //           </Card>
// // // //         </Col>
       
// // // //    {/* Orders Card */}
// // // // <Col xs={24} md={12}>
// // // //   <Card
// // // //     title={
// // // //       <Space>
// // // //         <UserOutlined /> Orders
// // // //       </Space>
// // // //     }
// // // //     style={{ borderRadius: 12 }}
// // // //   >
// // // //     <Row gutter={[16, 16]}>
// // // //       {/* Total Orders */}
// // // //       <Col span={8}>
// // // //         <Card
// // // //           hoverable
// // // //           onClick={() => navigate("/admin/orders")}
// // // //           style={{
// // // //             textAlign: "center",
// // // //             borderRadius: 12,
// // // //             backgroundColor: "#e6f7ff",
// // // //           }}
// // // //         >
// // // //           <UserOutlined style={{ fontSize: 26, color: "#1890ff" }} />
// // // //           <Title level={3} style={{ margin: "8px 0" }}>
// // // //             {totalOrders}
// // // //           </Title>
// // // //           <Text>Total</Text>
// // // //         </Card>
// // // //       </Col>

// // // //       {/* Processing Orders */}
// // // //       <Col span={8}>
// // // //         <Card
// // // //           hoverable
// // // //           onClick={() => navigate("/admin/orders")}
// // // //           style={{
// // // //             textAlign: "center",
// // // //             borderRadius: 12,
// // // //             backgroundColor: "#fff7e6",
// // // //           }}
// // // //         >
// // // //           <ClockCircleOutlined style={{ fontSize: 26, color: "#fa8c16" }} />
// // // //           <Title level={3} style={{ margin: "8px 0" }}>
// // // //             {processingOrders}
// // // //           </Title>
// // // //           <Text>Processing</Text>
// // // //         </Card>
// // // //       </Col>

// // // //       {/* Delivered Orders */}
// // // //       <Col span={8}>
// // // //         <Card
// // // //           hoverable
// // // //           onClick={() => navigate("/admin/orders")}
// // // //           style={{
// // // //             textAlign: "center",
// // // //             borderRadius: 12,
// // // //             backgroundColor: "#f6ffed",
// // // //           }}
// // // //         >
// // // //           <CheckCircleOutlined style={{ fontSize: 26, color: "#52c41a" }} />
// // // //           <Title level={3} style={{ margin: "8px 0" }}>
// // // //             {deliveredOrders}
// // // //           </Title>
// // // //           <Text>Delivered</Text>
// // // //         </Card>
// // // //       </Col>
// // // //     </Row>
// // // //   </Card>
// // // // </Col>

// // // //         {/* Users Card */}
// // // //         <Col xs={24} md={12}>
// // // //           <Card title={<Space><UserOutlined /> Users</Space>} style={{ borderRadius: 12 }}>
// // // //             <Row gutter={[16,16]}>
// // // //               <Col span={12}>
// // // //                 <Card
// // // //                   hoverable
// // // //                   onClick={() => navigate("/admin/totalusers")}
// // // //                   style={{ textAlign: "center", borderRadius: 12, backgroundColor:"#e6f7ff" }}
// // // //                 >
// // // //                   <UserOutlined style={{ fontSize: 28, color: "#1890ff" }} />
// // // //                   <Title level={3} style={{ margin:"8px 0" }}>{normalUsers.length}</Title>
// // // //                   <Text>Total Users</Text>
// // // //                 </Card>
// // // //               </Col>
// // // //               <Col span={12}>
// // // //                 <Card
// // // //                   hoverable
// // // //                   onClick={() => navigate("/admin/totalusers")}
// // // //                   style={{ textAlign: "center", borderRadius: 12, backgroundColor:"#f6ffed" }}
// // // //                 >
// // // //                   <UserOutlined style={{ fontSize: 28, color: "#52c41a" }} />
// // // //                   <Title level={3} style={{ margin:"8px 0" }}>{activeUsersCount}</Title>
// // // //                   <Text>Active Users</Text>
// // // //                 </Card>
// // // //               </Col>
// // // //             </Row>
// // // //           </Card>
// // // //         </Col>

    

// // // //       </Row>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AdminDashboard;


// // // import React, { useEffect, useState, useMemo } from "react";
// // // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // // import { useNavigate } from "react-router-dom";
// // // import { getUserProfile } from "../../redux/Slice/authSlice";
// // // import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // // import { fetchAppointments } from "../../redux/Slice/appointment/appointmentSlice";
// // // import { fetchOrders } from "../../redux/Slice/Orders/orderSlice";

// // // import {
// // //   Card,
// // //   Row,
// // //   Col,
// // //   Typography,
// // //   Space,
// // //   Badge,
// // //   Divider,
// // // } from "antd";
// // // import {
// // //   UserOutlined,
// // //   CalendarOutlined,
// // //   CheckCircleOutlined,
// // //   ClockCircleOutlined,
// // // } from "@ant-design/icons";
// // // import dayjs from "dayjs";
// // // import type { IUser } from "../../redux/types/usera.types";

// // // // Recharts
// // // import {
// // //   ResponsiveContainer,
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // //   PieChart,
// // //   Pie,
// // //   Cell,
// // //   Legend,
// // // } from "recharts";

// // // const { Title, Text } = Typography;

// // // const COLORS = ["#1890ff", "#fa8c16", "#52c41a", "#ff4d4f"];

// // // const AdminDashboard: React.FC = () => {
// // //   const dispatch = useAppDispatch();
// // //   const navigate = useNavigate();

// // //   const user = useAppSelector((state) => state.auth.user);
// // //   const { users } = useAppSelector((state) => state.users);
// // //   const { appointments } = useAppSelector((state) => state.appointments);
// // //   const { orders } = useAppSelector((state) => state.orders);

// // //   const [expiryDate, setExpiryDate] = useState<string | null>(null);
// // //   const [timeLeft, setTimeLeft] = useState<string>("");

// // //   // Initial data fetch
// // //   useEffect(() => {
// // //     if (!user) dispatch(getUserProfile());
// // //     dispatch(fetchUsers());
// // //     dispatch(fetchAppointments());
// // //     dispatch(fetchOrders());
// // //   }, [dispatch, user]);

// // //   // Subscription expiry
// // //   useEffect(() => {
// // //     if (user?.subscriptionEndDate) {
// // //       const expString =
// // //         user.subscriptionEndDate instanceof Date
// // //           ? user.subscriptionEndDate.toISOString()
// // //           : String(user.subscriptionEndDate);

// // //       setExpiryDate(expString);
// // //       localStorage.setItem("subscriptionExpiry", expString);
// // //     }
// // //   }, [user]);

// // //   // Countdown timer
// // //   useEffect(() => {
// // //     if (!expiryDate) return;

// // //     const interval = setInterval(() => {
// // //       const now = dayjs();
// // //       const exp = dayjs(expiryDate);
// // //       const diff = exp.diff(now);

// // //       if (diff <= 0) {
// // //         setTimeLeft("Expired");
// // //         clearInterval(interval);
// // //         return;
// // //       }

// // //       const hours = Math.floor(diff / (1000 * 60 * 60));
// // //       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
// // //       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

// // //       setTimeLeft(
// // //         `${hours.toString().padStart(2, "0")}:` +
// // //           `${minutes.toString().padStart(2, "0")}:` +
// // //           `${seconds.toString().padStart(2, "0")}`
// // //       );
// // //     }, 1000);

// // //     return () => clearInterval(interval);
// // //   }, [expiryDate]);

// // //   // ======== Derived stats (memoized) ========

// // //   const { normalUsersCount, activeUsersCount } = useMemo(() => {
// // //     const normalUsers: IUser[] = users.filter((u) => u.role === "user");
// // //     const active = normalUsers.filter((u) => u.isActive).length;
// // //     return {
// // //       normalUsersCount: normalUsers.length,
// // //       activeUsersCount: active,
// // //     };
// // //   }, [users]);

// // //   const {
// // //     pendingAppointmentsCount,
// // //     acceptedAppointmentsCount,
// // //     allAppointmentsCount,
// // //   } = useMemo(() => {
// // //     const pending = appointments.filter(
// // //       (a) => a.appointmentStatus?.toLowerCase() === "pending"
// // //     ).length;
// // //     const accepted = appointments.filter(
// // //       (a) => a.appointmentStatus?.toLowerCase() === "accepted"
// // //     ).length;

// // //     return {
// // //       pendingAppointmentsCount: pending,
// // //       acceptedAppointmentsCount: accepted,
// // //       allAppointmentsCount: appointments.length,
// // //     };
// // //   }, [appointments]);

// // //   const {
// // //     totalOrders,
// // //     processingOrders,
// // //     deliveredOrders,
// // //     cancelledOrders,
// // //   } = useMemo(() => {
// // //     const total = orders.length;
// // //     const processing = orders.filter(
// // //       (o) => o.orderStatus === "Processing"
// // //     ).length;
// // //     const delivered = orders.filter(
// // //       (o) => o.orderStatus === "Delivered"
// // //     ).length;
// // //     const cancelled = orders.filter(
// // //       (o) => o.orderStatus === "Cancelled"
// // //     ).length;

// // //     return {
// // //       totalOrders: total,
// // //       processingOrders: processing,
// // //       deliveredOrders: delivered,
// // //       cancelledOrders: cancelled,
// // //     };
// // //   }, [orders]);

// // //   // ======== Chart data ========

// // //   const appointmentChartData = useMemo(
// // //     () => [
// // //       { name: "Pending", value: pendingAppointmentsCount },
// // //       { name: "Accepted", value: acceptedAppointmentsCount },
// // //       { name: "All", value: allAppointmentsCount },
// // //     ],
// // //     [pendingAppointmentsCount, acceptedAppointmentsCount, allAppointmentsCount]
// // //   );

// // //   const orderChartData = useMemo(
// // //     () => [
// // //       { name: "Processing", value: processingOrders },
// // //       { name: "Delivered", value: deliveredOrders },
// // //       { name: "Cancelled", value: cancelledOrders },
// // //     ],
// // //     [processingOrders, deliveredOrders, cancelledOrders]
// // //   );

// // //   const userChartData = useMemo(
// // //     () => [
// // //       { name: "Active", value: activeUsersCount },
// // //       { name: "Inactive", value: normalUsersCount - activeUsersCount },
// // //     ],
// // //     [normalUsersCount, activeUsersCount]
// // //   );

// // //   return (
// // //     <div style={{ padding: 24 }}>
// // //       {/* Header + Subscription */}
// // //       <div
// // //         style={{
// // //           marginBottom: 24,
// // //           display: "flex",
// // //           justifyContent: "space-between",
// // //           alignItems: "center",
// // //           flexWrap: "wrap",
// // //           gap: 16,
// // //         }}
// // //       >
// // //         <div>
// // //           <Title level={2} style={{ marginBottom: 0 }}>
// // //             Welcome, {user?.firstName || "Admin"}!
// // //           </Title>
// // //           <Text type="secondary">
// // //             Here is a quick overview of your platform activity.
// // //           </Text>
// // //         </div>

// // //         {expiryDate && (
// // //           <Card
// // //             size="small"
// // //             style={{
// // //               backgroundColor: "#fffbe6",
// // //               borderRadius: 12,
// // //               minWidth: 260,
// // //             }}
// // //           >
// // //             <Space>
// // //               <Text strong>Subscription ends in:</Text>
// // //               <Badge
// // //                 count={timeLeft}
// // //                 style={{
// // //                   backgroundColor: timeLeft === "Expired" ? "#ff4d4f" : "#fa8c16",
// // //                   fontSize: 14,
// // //                   padding: "0 12px",
// // //                 }}
// // //               />
// // //             </Space>
// // //           </Card>
// // //         )}
// // //       </div>

// // //       {/* Top stats cards */}
// // //       <Row gutter={[24, 24]}>
// // //         {/* Appointments stats */}
// // //         <Col xs={24} md={8}>
// // //           <Card
// // //             title={
// // //               <Space>
// // //                 <CalendarOutlined /> Appointments
// // //               </Space>
// // //             }
// // //             style={{ borderRadius: 12 }}
// // //           >
// // //             <Row gutter={[16, 16]}>
// // //               <Col span={8}>
// // //                 <Card
// // //                   hoverable
// // //                   onClick={() => navigate("/admin/Appointment")}
// // //                   style={{
// // //                     textAlign: "center",
// // //                     borderRadius: 12,
// // //                     backgroundColor: "#fff7e6",
// // //                   }}
// // //                   bodyStyle={{ padding: 12 }}
// // //                 >
// // //                   <ClockCircleOutlined
// // //                     style={{ fontSize: 24, color: "#fa8c16" }}
// // //                   />
// // //                   <Title level={4} style={{ margin: "6px 0" }}>
// // //                     {pendingAppointmentsCount}
// // //                   </Title>
// // //                   <Text>Pending</Text>
// // //                 </Card>
// // //               </Col>
// // //               <Col span={8}>
// // //                 <Card
// // //                   hoverable
// // //                   onClick={() => navigate("/admin/Appointment")}
// // //                   style={{
// // //                     textAlign: "center",
// // //                     borderRadius: 12,
// // //                     backgroundColor: "#f6ffed",
// // //                   }}
// // //                   bodyStyle={{ padding: 12 }}
// // //                 >
// // //                   <CheckCircleOutlined
// // //                     style={{ fontSize: 24, color: "#52c41a" }}
// // //                   />
// // //                   <Title level={4} style={{ margin: "6px 0" }}>
// // //                     {acceptedAppointmentsCount}
// // //                   </Title>
// // //                   <Text>Accepted</Text>
// // //                 </Card>
// // //               </Col>
// // //               <Col span={8}>
// // //                 <Card
// // //                   hoverable
// // //                   onClick={() => navigate("/admin/Appointment")}
// // //                   style={{
// // //                     textAlign: "center",
// // //                     borderRadius: 12,
// // //                     backgroundColor: "#e6f7ff",
// // //                   }}
// // //                   bodyStyle={{ padding: 12 }}
// // //                 >
// // //                   <CalendarOutlined
// // //                     style={{ fontSize: 24, color: "#1890ff" }}
// // //                   />
// // //                   <Title level={4} style={{ margin: "6px 0" }}>
// // //                     {allAppointmentsCount}
// // //                   </Title>
// // //                   <Text>All</Text>
// // //                 </Card>
// // //               </Col>
// // //             </Row>
// // //           </Card>
// // //         </Col>

// // //         {/* Orders stats */}
// // //         <Col xs={24} md={8}>
// // //           <Card
// // //             title={
// // //               <Space>
// // //                 <UserOutlined /> Orders
// // //               </Space>
// // //             }
// // //             style={{ borderRadius: 12 }}
// // //           >
// // //             <Row gutter={[16, 16]}>
// // //               <Col span={8}>
// // //                 <Card
// // //                   hoverable
// // //                   onClick={() => navigate("/admin/orders")}
// // //                   style={{
// // //                     textAlign: "center",
// // //                     borderRadius: 12,
// // //                     backgroundColor: "#e6f7ff",
// // //                   }}
// // //                   bodyStyle={{ padding: 12 }}
// // //                 >
// // //                   <UserOutlined
// // //                     style={{ fontSize: 24, color: "#1890ff" }}
// // //                   />
// // //                   <Title level={4} style={{ margin: "6px 0" }}>
// // //                     {totalOrders}
// // //                   </Title>
// // //                   <Text>Total</Text>
// // //                 </Card>
// // //               </Col>
// // //               <Col span={8}>
// // //                 <Card
// // //                   hoverable
// // //                   onClick={() => navigate("/admin/orders")}
// // //                   style={{
// // //                     textAlign: "center",
// // //                     borderRadius: 12,
// // //                     backgroundColor: "#fff7e6",
// // //                   }}
// // //                   bodyStyle={{ padding: 12 }}
// // //                 >
// // //                   <ClockCircleOutlined
// // //                     style={{ fontSize: 24, color: "#fa8c16" }}
// // //                   />
// // //                   <Title level={4} style={{ margin: "6px 0" }}>
// // //                     {processingOrders}
// // //                   </Title>
// // //                   <Text>Processing</Text>
// // //                 </Card>
// // //               </Col>
// // //               <Col span={8}>
// // //                 <Card
// // //                   hoverable
// // //                   onClick={() => navigate("/admin/orders")}
// // //                   style={{
// // //                     textAlign: "center",
// // //                     borderRadius: 12,
// // //                     backgroundColor: "#f6ffed",
// // //                   }}
// // //                   bodyStyle={{ padding: 12 }}
// // //                 >
// // //                   <CheckCircleOutlined
// // //                     style={{ fontSize: 24, color: "#52c41a" }}
// // //                   />
// // //                   <Title level={4} style={{ margin: "6px 0" }}>
// // //                     {deliveredOrders}
// // //                   </Title>
// // //                   <Text>Delivered</Text>
// // //                 </Card>
// // //               </Col>
// // //             </Row>
// // //           </Card>
// // //         </Col>

// // //         {/* Users stats */}
// // //         <Col xs={24} md={8}>
// // //           <Card
// // //             title={
// // //               <Space>
// // //                 <UserOutlined /> Users
// // //               </Space>
// // //             }
// // //             style={{ borderRadius: 12 }}
// // //           >
// // //             <Row gutter={[16, 16]}>
// // //               <Col span={12}>
// // //                 <Card
// // //                   hoverable
// // //                   onClick={() => navigate("/admin/totalusers")}
// // //                   style={{
// // //                     textAlign: "center",
// // //                     borderRadius: 12,
// // //                     backgroundColor: "#e6f7ff",
// // //                   }}
// // //                   bodyStyle={{ padding: 12 }}
// // //                 >
// // //                   <UserOutlined
// // //                     style={{ fontSize: 24, color: "#1890ff" }}
// // //                   />
// // //                   <Title level={4} style={{ margin: "6px 0" }}>
// // //                     {normalUsersCount}
// // //                   </Title>
// // //                   <Text>Total Users</Text>
// // //                 </Card>
// // //               </Col>
// // //               <Col span={12}>
// // //                 <Card
// // //                   hoverable
// // //                   onClick={() => navigate("/admin/totalusers")}
// // //                   style={{
// // //                     textAlign: "center",
// // //                     borderRadius: 12,
// // //                     backgroundColor: "#f6ffed",
// // //                   }}
// // //                   bodyStyle={{ padding: 12 }}
// // //                 >
// // //                   <UserOutlined
// // //                     style={{ fontSize: 24, color: "#52c41a" }}
// // //                   />
// // //                   <Title level={4} style={{ margin: "6px 0" }}>
// // //                     {activeUsersCount}
// // //                   </Title>
// // //                   <Text>Active Users</Text>
// // //                 </Card>
// // //               </Col>
// // //             </Row>
// // //           </Card>
// // //         </Col>
// // //       </Row>

// // //       <Divider />

// // //       {/* Charts row */}
// // //       <Row gutter={[24, 24]}>
// // //         {/* Appointment bar chart */}
// // //         <Col xs={24} md={12}>
// // //           <Card
// // //             title="Appointments Overview"
// // //             style={{ borderRadius: 12, height: "100%" }}
// // //           >
// // //             <div style={{ width: "100%", height: 260 }}>
// // //               <ResponsiveContainer>
// // //                 <BarChart data={appointmentChartData}>
// // //                   <XAxis dataKey="name" />
// // //                   <YAxis allowDecimals={false} />
// // //                   <Tooltip />
// // //                   <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#1890ff" />
// // //                 </BarChart>
// // //               </ResponsiveContainer>
// // //             </div>
// // //           </Card>
// // //         </Col>

// // //         {/* Orders pie chart + users bar */}
// // //         <Col xs={24} md={12}>
// // //           <Row gutter={[24, 24]}>
// // //             <Col xs={24}>
// // //               <Card
// // //                 title="Orders Status Distribution"
// // //                 style={{ borderRadius: 12 }}
// // //               >
// // //                 <div style={{ width: "100%", height: 260 }}>
// // //                   <ResponsiveContainer>
// // //                     <PieChart>
// // //                       <Pie
// // //                         data={orderChartData}
// // //                         dataKey="value"
// // //                         nameKey="name"
// // //                         cx="50%"
// // //                         cy="50%"
// // //                         outerRadius={80}
// // //                         label
// // //                       >
// // //                         {orderChartData.map((entry, index) => (
// // //                           <Cell
// // //                             key={`cell-${index}`}
// // //                             fill={COLORS[index % COLORS.length]}
// // //                           />
// // //                         ))}
// // //                       </Pie>
// // //                       <Tooltip />
// // //                       <Legend />
// // //                     </PieChart>
// // //                   </ResponsiveContainer>
// // //                 </div>
// // //               </Card>
// // //             </Col>

// // //             <Col xs={24}>
// // //               <Card title="Users Activity" style={{ borderRadius: 12 }}>
// // //                 <div style={{ width: "100%", height: 200 }}>
// // //                   <ResponsiveContainer>
// // //                     <BarChart data={userChartData}>
// // //                       <XAxis dataKey="name" />
// // //                       <YAxis allowDecimals={false} />
// // //                       <Tooltip />
// // //                       <Bar dataKey="value" fill="#52c41a" radius={[4, 4, 0, 0]} />
// // //                     </BarChart>
// // //                   </ResponsiveContainer>
// // //                 </div>
// // //               </Card>
// // //             </Col>
// // //           </Row>
// // //         </Col>
// // //       </Row>
// // //     </div>
// // //   );
// // // };

// // // export default AdminDashboard;


// // import React, { useEffect, useState, useMemo } from "react";
// // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // import { useNavigate } from "react-router-dom";
// // import { getUserProfile } from "../../redux/Slice/authSlice";
// // import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// // import { fetchAppointments } from "../../redux/Slice/appointment/appointmentSlice";
// // import { fetchOrders } from "../../redux/Slice/Orders/orderSlice";

// // import {
// //   Card,
// //   Row,
// //   Col,
// //   Typography,
// //   Space,
// //   Badge,
// //   Divider,
// // } from "antd";
// // import {
// //   UserOutlined,
// //   CalendarOutlined,
// //   CheckCircleOutlined,
// //   ClockCircleOutlined,
// // } from "@ant-design/icons";
// // import dayjs from "dayjs";
// // import type { IUser } from "../../redux/types/usera.types";

// // // Charts
// // import {
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Legend,
// // } from "recharts";

// // const { Title, Text } = Typography;

// // const COLORS = ["#1890ff", "#fa8c16", "#52c41a", "#ff4d4f"];

// // const AdminDashboard: React.FC = () => {
// //   const dispatch = useAppDispatch();
// //   const navigate = useNavigate();

// //   const user = useAppSelector((state) => state.auth.user);
// //   const { users } = useAppSelector((state) => state.users);
// //   const { appointments } = useAppSelector((state) => state.appointments);
// //   const { orders } = useAppSelector((state) => state.orders);

// //   const [expiryDate, setExpiryDate] = useState<string | null>(null);
// //   const [timeLeft, setTimeLeft] = useState<string>("");

// //   // ===== Fetch initial data =====
// //   useEffect(() => {
// //     if (!user) dispatch(getUserProfile());
// //     dispatch(fetchUsers());
// //     dispatch(fetchAppointments());
// //     dispatch(fetchOrders());
// //   }, [dispatch, user]);

// //   // ===== Store subscription expiry =====
// //   useEffect(() => {
// //     if (user?.subscriptionEndDate) {
// //       const exp = dayjs(user.subscriptionEndDate).toISOString();
// //       setExpiryDate(exp);
// //       localStorage.setItem("subscriptionExpiry", exp);
// //     } else {
// //       const saved = localStorage.getItem("subscriptionExpiry");
// //       if (saved) setExpiryDate(saved);
// //     }
// //   }, [user]);

// //   // ===== FIXED COUNTDOWN TIMER =====
// //   useEffect(() => {
// //     if (!expiryDate) return;

// //     const interval = setInterval(() => {
// //       const now = dayjs();
// //       const expiry = dayjs(expiryDate);

// //       let diffSeconds = expiry.diff(now, "second");

// //       if (diffSeconds <= 0) {
// //         setTimeLeft("Expired");
// //         clearInterval(interval);
// //         return;
// //       }

// //       const days = Math.floor(diffSeconds / (24 * 60 * 60));
// //       diffSeconds %= 24 * 60 * 60;

// //       const hours = Math.floor(diffSeconds / (60 * 60));
// //       diffSeconds %= 60 * 60;

// //       const minutes = Math.floor(diffSeconds / 60);
// //       const seconds = diffSeconds % 60;

// //       setTimeLeft(
// //         `${days}d ${hours.toString().padStart(2, "0")}h ` +
// //         `${minutes.toString().padStart(2, "0")}m ` +
// //         `${seconds.toString().padStart(2, "0")}s`
// //       );
// //     }, 1000);

// //     return () => clearInterval(interval);
// //   }, [expiryDate]);

// //   // ===== Derived stats =====
// //   const { normalUsersCount, activeUsersCount } = useMemo(() => {
// //     const normal = users.filter((u: IUser) => u.role === "user");
// //     return {
// //       normalUsersCount: normal.length,
// //       activeUsersCount: normal.filter((u) => u.isActive).length,
// //     };
// //   }, [users]);

// //   const {
// //     pendingAppointmentsCount,
// //     acceptedAppointmentsCount,
// //     allAppointmentsCount,
// //   } = useMemo(() => {
// //     return {
// //       pendingAppointmentsCount: appointments.filter(
// //         (a) => a.appointmentStatus?.toLowerCase() === "pending"
// //       ).length,
// //       acceptedAppointmentsCount: appointments.filter(
// //         (a) => a.appointmentStatus?.toLowerCase() === "accepted"
// //       ).length,
// //       allAppointmentsCount: appointments.length,
// //     };
// //   }, [appointments]);

// //   const { totalOrders, processingOrders, deliveredOrders } = useMemo(() => {
// //     return {
// //       totalOrders: orders.length,
// //       processingOrders: orders.filter(
// //         (o) => o.orderStatus === "Processing"
// //       ).length,
// //       deliveredOrders: orders.filter(
// //         (o) => o.orderStatus === "Delivered"
// //       ).length,
// //     };
// //   }, [orders]);

// //   // ===== Chart Data =====
// //   const appointmentChartData = [
// //     { name: "Pending", value: pendingAppointmentsCount },
// //     { name: "Accepted", value: acceptedAppointmentsCount },
// //     { name: "All", value: allAppointmentsCount },
// //   ];

// //   const orderChartData = [
// //     { name: "Processing", value: processingOrders },
// //     { name: "Delivered", value: deliveredOrders },
// //   ];

// //   const userChartData = [
// //     { name: "Active", value: activeUsersCount },
// //     { name: "Inactive", value: normalUsersCount - activeUsersCount },
// //   ];

// //   return (
// //     <div style={{ padding: 24 }}>
// //       {/* Header */}
// //       <div
// //         style={{
// //           marginBottom: 24,
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           flexWrap: "wrap",
// //           gap: 16,
// //         }}
// //       >
// //         <div>
// //           <Title level={2} style={{ marginBottom: 0 }}>
// //             Welcome, {user?.firstName || "Admin"}!
// //           </Title>
// //           <Text type="secondary">
// //             Here is a quick overview of your platform activity.
// //           </Text>
// //         </div>

// //         {expiryDate && (
// //           <Card
// //             size="small"
// //             style={{
// //               background: "#fffbe6",
// //               borderRadius: 12,
// //             }}
// //           >
// //             <Space>
// //               <Text strong>Subscription ends in:</Text>
// //               <Badge
// //                 count={timeLeft}
// //                 style={{
// //                   backgroundColor:
// //                     timeLeft === "Expired" ? "#ff4d4f" : "#fa8c16",
// //                   padding: "0 12px",
// //                   fontSize: 14,
// //                 }}
// //               />
// //             </Space>
// //           </Card>
// //         )}
// //       </div>

// //       {/* Top Cards */}
// //       <Row gutter={[24, 24]}>
// //         {/* Appointments */}
// //         <Col xs={24} md={8}>
// //           <Card title="Appointments" style={{ borderRadius: 12 }}>
// //             <Row gutter={16}>
// //               <Col span={8}>
// //                 <StatCard
// //                   icon={<ClockCircleOutlined />}
// //                   value={pendingAppointmentsCount}
// //                   label="Pending"
// //                   bg="#fff7e6"
// //                   color="#fa8c16"
// //                   onClick={() => navigate("/admin/Appointment")}
// //                 />
// //               </Col>
// //               <Col span={8}>
// //                 <StatCard
// //                   icon={<CheckCircleOutlined />}
// //                   value={acceptedAppointmentsCount}
// //                   label="Accepted"
// //                   bg="#f6ffed"
// //                   color="#52c41a"
// //                   onClick={() => navigate("/admin/Appointment")}
// //                 />
// //               </Col>
// //               <Col span={8}>
// //                 <StatCard
// //                   icon={<CalendarOutlined />}
// //                   value={allAppointmentsCount}
// //                   label="All"
// //                   bg="#e6f7ff"
// //                   color="#1890ff"
// //                   onClick={() => navigate("/admin/Appointment")}
// //                 />
// //               </Col>
// //             </Row>
// //           </Card>
// //         </Col>

// //         {/* Orders */}
// //         <Col xs={24} md={8}>
// //           <Card title="Orders" style={{ borderRadius: 12 }}>
// //             <Row gutter={16}>
// //               <Col span={8}>
// //                 <StatCard
// //                   icon={<UserOutlined />}
// //                   value={totalOrders}
// //                   label="Total"
// //                   bg="#e6f7ff"
// //                   color="#1890ff"
// //                 />
// //               </Col>
// //               <Col span={8}>
// //                 <StatCard
// //                   icon={<ClockCircleOutlined />}
// //                   value={processingOrders}
// //                   label="Processing"
// //                   bg="#fff7e6"
// //                   color="#fa8c16"
// //                 />
// //               </Col>
// //               <Col span={8}>
// //                 <StatCard
// //                   icon={<CheckCircleOutlined />}
// //                   value={deliveredOrders}
// //                   label="Delivered"
// //                   bg="#f6ffed"
// //                   color="#52c41a"
// //                 />
// //               </Col>
// //             </Row>
// //           </Card>
// //         </Col>

// //         {/* Users */}
// //         <Col xs={24} md={8}>
// //           <Card title="Users" style={{ borderRadius: 12 }}>
// //             <Row gutter={16}>
// //               <Col span={12}>
// //                 <StatCard
// //                   icon={<UserOutlined />}
// //                   value={normalUsersCount}
// //                   label="Total Users"
// //                   bg="#e6f7ff"
// //                   color="#1890ff"
// //                 />
// //               </Col>
// //               <Col span={12}>
// //                 <StatCard
// //                   icon={<UserOutlined />}
// //                   value={activeUsersCount}
// //                   label="Active Users"
// //                   bg="#f6ffed"
// //                   color="#52c41a"
// //                 />
// //               </Col>
// //             </Row>
// //           </Card>
// //         </Col>
// //       </Row>

// //       <Divider />

// //       {/* Charts */}
// //       <Row gutter={[24, 24]}>
// //         <Col xs={24} md={12}>
// //           <Card title="Appointments Overview" style={{ borderRadius: 12 }}>
// //             <ResponsiveContainer width="100%" height={260}>
// //               <BarChart data={appointmentChartData}>
// //                 <XAxis dataKey="name" />
// //                 <YAxis allowDecimals={false} />
// //                 <Tooltip />
// //                 <Bar dataKey="value" fill="#1890ff" radius={[6, 6, 0, 0]} />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </Card>
// //         </Col>

// //         <Col xs={24} md={12}>
// //           <Card title="Orders Status Distribution" style={{ borderRadius: 12 }}>
// //             <ResponsiveContainer width="100%" height={260}>
// //               <PieChart>
// //                 <Pie
// //                   data={orderChartData}
// //                   dataKey="value"
// //                   nameKey="name"
// //                   outerRadius={90}
// //                   label
// //                 >
// //                   {orderChartData.map((_, i) => (
// //                     <Cell key={i} fill={COLORS[i]} />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //                 <Legend />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;

// // // ===== Reusable Stat Card =====
// // const StatCard = ({
// //   icon,
// //   value,
// //   label,
// //   bg,
// //   color,
// //   onClick,
// // }: any) => (
// //   <Card
// //     hoverable
// //     onClick={onClick}
// //     style={{
// //       textAlign: "center",
// //       background: bg,
// //       borderRadius: 14,
// //     }}
// //     bodyStyle={{ padding: 16 }}
// //   >
// //     <div style={{ fontSize: 26, color }}>{icon}</div>
// //     <Title level={4} style={{ margin: "6px 0" }}>
// //       {value}
// //     </Title>
// //     <Text>{label}</Text>
// //   </Card>
// // );

// import React, { useEffect, useState, useMemo } from "react";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { useNavigate } from "react-router-dom";
// import { getUserProfile } from "../../redux/Slice/authSlice";
// import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
// import { fetchAppointments } from "../../redux/Slice/appointment/appointmentSlice";
// import { fetchOrders } from "../../redux/Slice/Orders/orderSlice";

// import {
//   Card,
//   Row,
//   Col,
//   Typography,
//   Space,
//   Badge,
//   Divider,
// } from "antd";
// import {
//   UserOutlined,
//   CalendarOutlined,
//   CheckCircleOutlined,
//   ClockCircleOutlined,
// } from "@ant-design/icons";
// import dayjs from "dayjs";
// import duration from "dayjs/plugin/duration";
// import type { IUser } from "../../redux/types/usera.types";

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// dayjs.extend(duration);

// const { Title, Text } = Typography;
// const COLORS = ["#1890ff", "#fa8c16", "#52c41a", "#ff4d4f"];

// const AdminDashboard: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const user = useAppSelector((state) => state.auth.user);
//   const { users } = useAppSelector((state) => state.users);
//   const { appointments } = useAppSelector((state) => state.appointments);
//   const { orders } = useAppSelector((state) => state.orders);

//   const [expiryDate, setExpiryDate] = useState<string | null>(null);
//   const [timeLeft, setTimeLeft] = useState<string | null>(null);

//   // ===== Fetch initial data =====
//   useEffect(() => {
//     if (!user) dispatch(getUserProfile());
//     dispatch(fetchUsers());
//     dispatch(fetchAppointments());
//     dispatch(fetchOrders());
//   }, [dispatch, user]);

//   // ===== Store subscription expiry =====
//   useEffect(() => {
//     if (user?.subscriptionEndDate) {
//       const exp = dayjs(user.subscriptionEndDate).toISOString();
//       setExpiryDate(exp);
//       localStorage.setItem("subscriptionExpiry", exp);
//     } else {
//       const saved = localStorage.getItem("subscriptionExpiry");
//       if (saved) setExpiryDate(saved);
//     }
//   }, [user]);

//   // ===== Correct Timer (1 month before expiry) =====
//   useEffect(() => {
//     if (!expiryDate) return;

//     const expiry = dayjs(expiryDate);
//     const startDate = expiry.subtract(1, "month"); // 1 month before

//     const updateTimer = () => {
//       const now = dayjs();

//       if (now.isBefore(startDate)) {
//         setTimeLeft(null); // Timer not started yet
//         return;
//       }

//       const diff = expiry.diff(now);
//       if (diff <= 0) {
//         setTimeLeft("Subscription Expired");
//         return;
//       }

//       const dur = dayjs.duration(diff);
//       const days = Math.floor(dur.asDays());
//       const hours = dur.hours();
//       const minutes = dur.minutes();
//       const seconds = dur.seconds();

//       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//     };

//     updateTimer();
//     const interval = setInterval(updateTimer, 1000);
//     return () => clearInterval(interval);
//   }, [expiryDate]);

//   // ===== Derived stats =====
//   const { normalUsersCount, activeUsersCount } = useMemo(() => {
//     const normal = users.filter((u: IUser) => u.role === "user");
//     return {
//       normalUsersCount: normal.length,
//       activeUsersCount: normal.filter((u) => u.isActive).length,
//     };
//   }, [users]);

//   const {
//     pendingAppointmentsCount,
//     acceptedAppointmentsCount,
//     allAppointmentsCount,
//   } = useMemo(() => {
//     return {
//       pendingAppointmentsCount: appointments.filter(
//         (a) => a.appointmentStatus?.toLowerCase() === "pending"
//       ).length,
//       acceptedAppointmentsCount: appointments.filter(
//         (a) => a.appointmentStatus?.toLowerCase() === "accepted"
//       ).length,
//       allAppointmentsCount: appointments.length,
//     };
//   }, [appointments]);

//   const { totalOrders, processingOrders, deliveredOrders } = useMemo(() => {
//     return {
//       totalOrders: orders.length,
//       processingOrders: orders.filter(
//         (o) => o.orderStatus === "Processing"
//       ).length,
//       deliveredOrders: orders.filter(
//         (o) => o.orderStatus === "Delivered"
//       ).length,
//     };
//   }, [orders]);

//   // ===== Chart Data =====
//   const appointmentChartData = [
//     { name: "Pending", value: pendingAppointmentsCount },
//     { name: "Accepted", value: acceptedAppointmentsCount },
//     { name: "All", value: allAppointmentsCount },
//   ];

//   const orderChartData = [
//     { name: "Processing", value: processingOrders },
//     { name: "Delivered", value: deliveredOrders },
//   ];

//   const userChartData = [
//     { name: "Active", value: activeUsersCount },
//     { name: "Inactive", value: normalUsersCount - activeUsersCount },
//   ];

//   return (
//     <div style={{ padding: 24 }}>
//       {/* Header + Subscription Timer */}
//       <div
//         style={{
//           marginBottom: 24,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexWrap: "wrap",
//           gap: 16,
//         }}
//       >
//         <div>
//           <Title level={2} style={{ marginBottom: 0 }}>
//             Welcome, {user?.firstName || "Admin"}!
//           </Title>
//           {/* <Text type="secondary">
//             Here is a quick overview of your platform activity.
//           </Text> */}
//         </div>

//         {timeLeft && (
//           <Card
//             size="small"
//             style={{
//               background: "#fffbe6",
//               borderRadius: 12,
//             }}
//           >
//             <Space>
//               <Text strong>Subscription ends in:</Text>
//               <Badge
//                 count={timeLeft}
//                 style={{
//                   backgroundColor:
//                     timeLeft === "Subscription Expired" ? "#ff4d4f" : "#fa8c16",
//                   padding: "0 12px",
//                   fontSize: 14,
//                 }}
//               />
//             </Space>
//           </Card>
//         )}
//       </div>

//       {/* Top Cards */}
//       <Row gutter={[24, 24]}>
//         {/* Appointments */}
//         <Col xs={24} md={8}>
//           <Card title="Appointments" style={{ borderRadius: 12 }}>
//             <Row gutter={16}>
//               <Col span={8}>
//                 <StatCard
//                   icon={<ClockCircleOutlined />}
//                   value={pendingAppointmentsCount}
//                   label="Pending"
//                   bg="#fff7e6"
//                   color="#fa8c16"
//                   onClick={() => navigate("/admin/Appointment?status=pending")}
//                 />
//               </Col>
//               <Col span={8}>
//                 <StatCard
//                   icon={<CheckCircleOutlined />}
//                   value={acceptedAppointmentsCount}
//                   label="Accepted"
//                   bg="#f6ffed"
//                   color="#52c41a"
//                   onClick={() => navigate("/admin/Appointment?status=accepted")}
//                 />
//               </Col>
//               <Col span={8}>
//                 <StatCard
//                   icon={<CalendarOutlined />}
//                   value={allAppointmentsCount}
//                   label="All"
//                   bg="#e6f7ff"
//                   color="#1890ff"
//                   onClick={() => navigate("/admin/Appointment?status=all")}
//                 />
//               </Col>
//             </Row>
//           </Card>
//         </Col>

//         {/* Orders */}
//         <Col xs={24} md={8}>
//           <Card title="Orders" style={{ borderRadius: 12 }}>
//             <Row gutter={16}>
           
//               <Col span={8}>
//                 <StatCard
//                   icon={<ClockCircleOutlined />}
//                   value={processingOrders}
//                   label="Processing"
//                   bg="#fff7e6"
//                   color="#fa8c16"
//                                     onClick={() => navigate("/admin/orders")}

//                 />
//               </Col>
//               <Col span={8}>
//                 <StatCard
//                   icon={<CheckCircleOutlined />}
//                   value={deliveredOrders}
//                   label="Delivered"
//                   bg="#f6ffed"
//                   color="#52c41a"
//                                     onClick={() => navigate("/admin/orders")}

//                 />
//               </Col>
//                  <Col span={8}>
//                 <StatCard
//                   icon={<UserOutlined />}
//                   value={totalOrders}
//                   label="Total"
//                   bg="#e6f7ff"
//                   color="#1890ff"
//                   onClick={() => navigate("/admin/orders")}

//                 />
//               </Col>
//             </Row>
//           </Card>
//         </Col>

//         {/* Users */}
//         <Col xs={24} md={8}>
//           <Card title="Users" style={{ borderRadius: 12 }}>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <StatCard
//                   icon={<UserOutlined />}
//                   value={normalUsersCount}
//                   label="Total Users"
//                   bg="#e6f7ff"
//                   color="#1890ff"
//                onClick={() => navigate("/admin/totalusers")}

//                 />
//               </Col>
//               <Col span={12}>
//                 <StatCard
//                   icon={<UserOutlined />}
//                   value={activeUsersCount}
//                   label="Active Users"
//                   bg="#f6ffed"
//                   color="#52c41a"
//                                  onClick={() => navigate("/admin/totalusers")}

//                 />
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>

//       <Divider />

//       {/* Charts */}
//       <Row gutter={[24, 24]}>
//         <Col xs={24} md={12}>
//           <Card title="Appointments Overview" style={{ borderRadius: 12 }}>
//             <ResponsiveContainer width="100%" height={260}>
//               <BarChart data={appointmentChartData}>
//                 <XAxis dataKey="name" />
//                 <YAxis allowDecimals={false} />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#1890ff" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </Card>
//         </Col>

//         <Col xs={24} md={12}>
//           <Card title="Orders Status Distribution" style={{ borderRadius: 12 }}>
//             <ResponsiveContainer width="100%" height={260}>
//               <PieChart>
//                 <Pie
//                   data={orderChartData}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={90}
//                   label
//                 >
//                   {orderChartData.map((_, i) => (
//                     <Cell key={i} fill={COLORS[i]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default AdminDashboard;

// // ===== Reusable Stat Card =====
// const StatCard = ({
//   icon,
//   value,
//   label,
//   bg,
//   color,
//   onClick,
// }: any) => (
//   <Card
//     hoverable
//     onClick={onClick}
//     style={{
//       textAlign: "center",
//       background: bg,
//       borderRadius: 14,
//     }}
//     bodyStyle={{ padding: 16 }}
//   >
//     <div style={{ fontSize: 26, color }}>{icon}</div>
//     <Title level={4} style={{ margin: "6px 0" }}>
//       {value}
//     </Title>
//     <Text>{label}</Text>
//   </Card>
// );

import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../redux/Slice/authSlice";
import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
import { fetchAppointments } from "../../redux/Slice/appointment/appointmentSlice";
import { fetchOrders } from "../../redux/Slice/Orders/orderSlice";

import {
  Card,
  Row,
  Col,
  Typography,
  Space,
  Badge,
  Divider,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import type { IUser } from "../../redux/types/usera.types";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

dayjs.extend(duration);

const { Title, Text } = Typography;
const COLORS = ["#1890ff", "#fa8c16", "#52c41a", "#ff4d4f"];

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const { users } = useAppSelector((state) => state.users);
  const { appointments } = useAppSelector((state) => state.appointments);
  const { orders } = useAppSelector((state) => state.orders);

  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  // ===== Fetch initial data =====
  useEffect(() => {
    if (!user) dispatch(getUserProfile());
    dispatch(fetchUsers());
    dispatch(fetchAppointments());
    dispatch(fetchOrders());
  }, [dispatch, user]);

  // ===== Store subscription expiry =====
  useEffect(() => {
    if (user?.subscriptionEndDate) {
      const exp = dayjs(user.subscriptionEndDate).toISOString();
      setExpiryDate(exp);
      localStorage.setItem("subscriptionExpiry", exp);
    } else {
      const saved = localStorage.getItem("subscriptionExpiry");
      if (saved) setExpiryDate(saved);
    }
  }, [user]);

  // ===== Subscription Timer =====
  useEffect(() => {
    if (!expiryDate) return;

    const expiry = dayjs(expiryDate);
    const startDate = expiry.subtract(1, "month");

    const updateTimer = () => {
      const now = dayjs();

      if (now.isBefore(startDate)) {
        setTimeLeft(null);
        return;
      }

      const diff = expiry.diff(now);
      if (diff <= 0) {
        setTimeLeft("Subscription Expired");
        return;
      }

      const dur = dayjs.duration(diff);
      setTimeLeft(
        `${Math.floor(dur.asDays())}d ${dur.hours()}h ${dur.minutes()}m ${dur.seconds()}s`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  // ===== Derived Stats =====
  const { normalUsersCount, activeUsersCount } = useMemo(() => {
    const normal = users.filter((u: IUser) => u.role === "user");
    return {
      normalUsersCount: normal.length,
      activeUsersCount: normal.filter((u) => u.isActive).length,
    };
  }, [users]);

  const pendingAppointmentsCount = appointments.filter(
    (a) => a.appointmentStatus?.toLowerCase() === "pending"
  ).length;

  const acceptedAppointmentsCount = appointments.filter(
    (a) => a.appointmentStatus?.toLowerCase() === "accepted"
  ).length;

  const allAppointmentsCount = appointments.length;

  const processingOrders = orders.filter(
    (o) => o.orderStatus === "Processing"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.orderStatus === "Delivered"
  ).length;

  const totalOrders = orders.length;

  // ===== Chart Data =====
  const appointmentChartData = [
    { name: "Pending", value: pendingAppointmentsCount },
    { name: "Accepted", value: acceptedAppointmentsCount },
    { name: "All", value: allAppointmentsCount },
  ];

  const orderChartData = [
    { name: "Processing", value: processingOrders },
    { name: "Delivered", value: deliveredOrders },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <Title level={2}>Welcome, {user?.firstName || "Admin"}!</Title>

        {timeLeft && (
          <Card size="small" style={{ background: "#fffbe6", borderRadius: 12 }}>
            <Space>
              <Text strong>Subscription ends in:</Text>
              <Badge
                count={timeLeft}
                style={{
                  backgroundColor:
                    timeLeft === "Subscription Expired"
                      ? "#ff4d4f"
                      : "#fa8c16",
                  padding: "0 12px",
                }}
              />
            </Space>
          </Card>
        )}
      </div>

      {/* TOP CARDS */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card title="Appointments" bordered={false}>
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12} md={8}>
                <StatCard
                  icon={<ClockCircleOutlined />}
                  value={pendingAppointmentsCount}
                  label="Pending"
                  color="#fa8c16"
                  onClick={() =>
                    navigate("/admin/Appointment?status=pending")
                  }
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <StatCard
                  icon={<CheckCircleOutlined />}
                  value={acceptedAppointmentsCount}
                  label="Accepted"
                  color="#52c41a"
                  onClick={() =>
                    navigate("/admin/Appointment?status=accepted")
                  }
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <StatCard
                  icon={<CalendarOutlined />}
                  value={allAppointmentsCount}
                  label="All"
                  color="#1890ff"
                  onClick={() => navigate("/admin/Appointment")}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <Card title="Orders" bordered={false}>
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12} md={8}>
                <StatCard
                  icon={<ClockCircleOutlined />}
                  value={processingOrders}
                  label="Processing"
                  color="#fa8c16"
                  onClick={() => navigate("/admin/orders")}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <StatCard
                  icon={<CheckCircleOutlined />}
                  value={deliveredOrders}
                  label="Delivered"
                  color="#52c41a"
                  onClick={() => navigate("/admin/orders")}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <StatCard
                  icon={<UserOutlined />}
                  value={totalOrders}
                  label="Total"
                  color="#1890ff"
                  onClick={() => navigate("/admin/orders")}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <Card title="Users" bordered={false}>
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12}>
                <StatCard
                  icon={<UserOutlined />}
                  value={normalUsersCount}
                  label="Total Users"
                  color="#1890ff"
                  onClick={() => navigate("/admin/totalusers")}
                />
              </Col>
              <Col xs={24} sm={12}>
                <StatCard
                  icon={<UserOutlined />}
                  value={activeUsersCount}
                  label="Active Users"
                  color="#52c41a"
                  onClick={() => navigate("/admin/totalusers")}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* CHARTS */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Appointments Overview">
            <ResponsiveContainer width="100%" aspect={2.5}>
              <BarChart data={appointmentChartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#1890ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Orders Status">
            <ResponsiveContainer width="100%" aspect={2.5}>
              <PieChart>
                <Pie data={orderChartData} dataKey="value" label>
                  {orderChartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;

// ===== Stat Card =====
const StatCard = ({ icon, value, label, color, onClick }: any) => (
  <Card
    hoverable
    onClick={onClick}
    style={{ textAlign: "center", borderRadius: 14 }}
  >
    <div style={{ fontSize: 24, color }}>{icon}</div>
    <Title level={4}>{value}</Title>
    <Text>{label}</Text>
  </Card>
);
