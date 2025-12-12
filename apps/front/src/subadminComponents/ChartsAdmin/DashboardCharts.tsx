// import React from "react";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Tooltip,
//   Legend,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Cell,
// } from "recharts";
// import { Card, Row, Col, Typography } from "antd";

// const { Title } = Typography;

// // Dummy chart data — API integrate karne par replace kar dena
// const userGrowthData = [
//   { month: "Jan", users: 20 },
//   { month: "Feb", users: 45 },
//   { month: "Mar", users: 30 },
//   { month: "Apr", users: 60 },
//   { month: "May", users: 75 },
// ];

// const userStatusPie = [
//   { name: "Active Users", value: 120 },
//   { name: "Inactive Users", value: 35 },
// ];

// const orderTrendData = [
//   { month: "Jan", orders: 90 },
//   { month: "Feb", orders: 120 },
//   { month: "Mar", orders: 150 },
//   { month: "Apr", orders: 130 },
// ];

// const orderStatusPie = [
//   { name: "Delivered", value: 150 },
//   { name: "Pending", value: 45 },
//   { name: "Cancelled", value: 20 },
//   // ❌ IN_CART not shown
// ];

// const bookingTrendData = [
//   { month: "Jan", bookings: 40 },
//   { month: "Feb", bookings: 55 },
//   { month: "Mar", bookings: 70 },
//   { month: "Apr", bookings: 90 },
// ];

// const bookingStatusPie = [
//   { name: "Confirmed", value: 80 },
//   { name: "Pending", value: 25 },
//   { name: "Cancelled", value: 12 },
// ];

// const COLORS = ["#1890ff", "#52c41a", "#faad14", "#ff4d4f"];

// const DashboardCharts = () => {
//   return (
//     <div style={{ padding: "20px" }}>
//       <Title level={3} style={{ marginBottom: "20px" }}>
//         📊 Analytics Dashboard
//       </Title>

//       {/* USERS SECTION */}
//       <Title level={4} style={{ marginTop: "30px" }}>
//         👥 Users Analytics
//       </Title>

//       <Row gutter={[24, 24]}>
//         {/* User Growth Line Chart */}
//         <Col xs={24} lg={16}>
//           <Card title="User Growth (Monthly)" bordered style={{ borderRadius: 12 }}>
//             <LineChart width={400} height={150} data={userGrowthData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="users" stroke="#1890ff" strokeWidth={3} />
//             </LineChart>
//           </Card>
//         </Col>

//         {/* Active vs Inactive Users */}
//         <Col xs={24} lg={8}>
//           <Card title="Active vs Inactive Users" style={{ borderRadius: 12 }}>
//             <PieChart width={160} height={150}>
//               <Pie
//                 data={userStatusPie}
//                 cx={150}
//                 cy={140}
//                 outerRadius={100}
//                 label
//                 dataKey="value"
//               >
//                 {userStatusPie.map((_, idx) => (
//                   <Cell key={idx} fill={COLORS[idx]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </Card>
//         </Col>
//       </Row>

//       {/* ORDERS SECTION */}
//       <Title level={4} style={{ marginTop: "50px" }}>
//         📦 Orders Analytics
//       </Title>

//       <Row gutter={[24, 24]}>
//         {/* Orders Trend */}
//         <Col xs={24} lg={16}>
//           <Card title="Orders (Monthly)" bordered style={{ borderRadius: 12 }}>
//             <BarChart width={600} height={300} data={orderTrendData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />

//               <Bar dataKey="orders" fill="#52c41a" />
//             </BarChart>
//           </Card>
//         </Col>

//         {/* Orders by Status */}
//         <Col xs={24} lg={8}>
//           <Card title="Orders by Status" style={{ borderRadius: 12 }}>
//             <PieChart width={320} height={300}>
//               <Pie
//                 data={orderStatusPie}
//                 cx={150}
//                 cy={140}
//                 outerRadius={100}
//                 label
//                 dataKey="value"
//               >
//                 {orderStatusPie.map((_, idx) => (
//                   <Cell key={idx} fill={COLORS[idx]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </Card>
//         </Col>
//       </Row>

//       {/* BOOKINGS SECTION */}
//       <Title level={4} style={{ marginTop: "50px" }}>
//         📅 Booking Analytics
//       </Title>

//       <Row gutter={[24, 24]}>
//         {/* Booking trend */}
//         <Col xs={24} lg={16}>
//           <Card title="Bookings (Monthly)" bordered style={{ borderRadius: 12 }}>
//             <LineChart width={600} height={300} data={bookingTrendData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="bookings" stroke="#faad14" strokeWidth={3} />
//             </LineChart>
//           </Card>
//         </Col>

//         {/* Bookings by Status */}
//         <Col xs={24} lg={8}>
//           <Card title="Bookings by Status" style={{ borderRadius: 12 }}>
//             <PieChart width={320} height={300}>
//               <Pie
//                 data={bookingStatusPie}
//                 cx={150}
//                 cy={140}
//                 outerRadius={100}
//                 label
//                 dataKey="value"
//               >
//                 {bookingStatusPie.map((_, idx) => (
//                   <Cell key={idx} fill={COLORS[idx]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default DashboardCharts;


import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Card, Row, Col, Typography } from "antd";

const { Title } = Typography;

// Dummy Data
const userGrowthData = [
  { month: "Jan", users: 20 },
  { month: "Feb", users: 45 },
  { month: "Mar", users: 30 },
  { month: "Apr", users: 60 },
  { month: "May", users: 75 },
];

const userStatusPie = [
  { name: "Active Users", value: 120 },
  { name: "Inactive Users", value: 35 },
];

const orderTrendData = [
  { month: "Jan", orders: 90 },
  { month: "Feb", orders: 120 },
  { month: "Mar", orders: 150 },
  { month: "Apr", orders: 130 },
];

const orderStatusPie = [
  { name: "Delivered", value: 150 },
  { name: "Pending", value: 45 },
  { name: "Cancelled", value: 20 },
];

const bookingTrendData = [
  { month: "Jan", bookings: 40 },
  { month: "Feb", bookings: 55 },
  { month: "Mar", bookings: 70 },
  { month: "Apr", bookings: 90 },
];

const bookingStatusPie = [
  { name: "Confirmed", value: 80 },
  { name: "Pending", value: 25 },
  { name: "Cancelled", value: 12 },
];

const COLORS = ["#1890ff", "#52c41a", "#faad14", "#ff4d4f"];

const DashboardCharts = () => {
  return (
    <div style={{ padding: "10px" }}>
      <Title level={3} style={{ marginBottom: 10 }}>
        📊 Analytics Dashboard
      </Title>

      {/* USERS */}
      <Title level={4} style={{ marginTop: 20 }}>
        👥 Users Analytics
      </Title>

      <Row gutter={[16, 16]}>
        {/* USER GROWTH */}
        <Col xs={24} md={16}>
          <Card size="small" title="User Growth" style={{ borderRadius: 10 }}>
            <div style={{ width: "100%", height: 180 }}>
              <ResponsiveContainer>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#1890ff" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* USER STATUS */}
        <Col xs={24} md={8}>
          <Card size="small" title="Active vs Inactive" style={{ borderRadius: 10 }}>
            <div style={{ width: "100%", height: 180 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={userStatusPie} outerRadius={55} label dataKey="value">
                    {userStatusPie.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* ORDERS */}
      <Title level={4} style={{ marginTop: 30 }}>
        📦 Orders Analytics
      </Title>

      <Row gutter={[16, 16]}>
        {/* ORDERS TREND */}
        <Col xs={24} md={16}>
          <Card size="small" title="Orders Trend" style={{ borderRadius: 10 }}>
            <div style={{ width: "100%", height: 180 }}>
              <ResponsiveContainer>
                <BarChart data={orderTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#52c41a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* ORDERS STATUS */}
        <Col xs={24} md={8}>
          <Card size="small" title="Orders by Status" style={{ borderRadius: 10 }}>
            <div style={{ width: "100%", height: 180 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={orderStatusPie} outerRadius={55} label dataKey="value">
                    {orderStatusPie.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* BOOKINGS */}
      <Title level={4} style={{ marginTop: 30 }}>
        📅 Booking Analytics
      </Title>

      <Row gutter={[16, 16]}>
        {/* BOOKINGS TREND */}
        <Col xs={24} md={16}>
          <Card size="small" title="Bookings Trend" style={{ borderRadius: 10 }}>
            <div style={{ width: "100%", height: 180 }}>
              <ResponsiveContainer>
                <LineChart data={bookingTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookings" stroke="#faad14" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* BOOKINGS STATUS */}
        <Col xs={24} md={8}>
          <Card size="small" title="Bookings by Status" style={{ borderRadius: 10 }}>
            <div style={{ width: "100%", height: 180 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={bookingStatusPie} outerRadius={55} label dataKey="value">
                    {bookingStatusPie.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCharts;
