
// // import React, { useEffect, useState } from "react";
// // import {
// //   Table,
// //   Card,
// //   Tag,
// //   Space,
// //   Button,
// //   message,
// //   Tabs,
// //   DatePicker,
// //   Badge,
// //   Radio,
// // } from "antd";
// // import dayjs, { Dayjs } from "dayjs";
// // import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// // import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // import { fetchAppointments, acceptAppointment } from "../../redux/Slice/appointment/appointmentSlice";
// // import { ReloadOutlined } from "@ant-design/icons";

// // dayjs.extend(isSameOrAfter);
// // dayjs.extend(isSameOrBefore);

// // const { TabPane } = Tabs;

// // interface AppointmentRecord {
// //   _id: string;
// //   userId: { _id: string; fullName: string };
// //   appointmentCode: string;
// //   date: string;
// //   time: string;
// //   appointmentStatus: string;
// //   chairNo: number;
// //   email: string;
// //   services: string[];
// //   fromDateTime: string;
// //   toDateTime: string;
// //   updatedAt: string;
// // }

// // const AppointmentsPage: React.FC = () => {
// //   const dispatch = useAppDispatch();
// //   const { appointments, loading } = useAppSelector((state) => state.appointments);

// //   const [filterStatus, setFilterStatus] = useState<string>("All");
// //   const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
// //   const [dateFilterType, setDateFilterType] = useState<"today" | "weekly" | "monthly" | "custom" | null>(null);

// //   useEffect(() => {
// //     dispatch(fetchAppointments());
// //   }, [dispatch]);

// //   const handleAccept = async (appointment: { appointmentCode: string; email: string }) => {
// //     try {
// //       await dispatch(acceptAppointment(appointment)).unwrap();
// //       message.success("Appointment accepted!");
// //       dispatch(fetchAppointments());
// //     } catch (err: any) {
// //       message.error(err?.message || "Something went wrong");
// //     }
// //   };

// //   const handleRefresh = () => {
// //     dispatch(fetchAppointments());
// //     message.success("Appointments refreshed!");
// //   };

// //   const handleDateFilterChange = (value: typeof dateFilterType) => {
// //     setDateFilterType(value);
// //     if (value === "today") setSelectedDate(dayjs());
// //     else setSelectedDate(null);
// //   };

// //   const filteredByDateAppointments = appointments.filter((a) => {
// //     const appDate = dayjs(a.date, "YYYY-MM-DD");
// //     switch (dateFilterType) {
// //       case "today":
// //         return appDate.isSame(dayjs(), "day");
// //       case "weekly":
// //         const startOfWeek = dayjs().startOf("week");
// //         const endOfWeek = dayjs().endOf("week");
// //         return appDate.isSameOrAfter(startOfWeek, "day") && appDate.isSameOrBefore(endOfWeek, "day");
// //       case "monthly":
// //         return appDate.isSame(dayjs(), "month");
// //       case "custom":
// //         return selectedDate ? appDate.isSame(selectedDate, "day") : true;
// //       default:
// //         return true;
// //     }
// //   });

// //   const allCount = filteredByDateAppointments.length;
// //   const pendingCount = filteredByDateAppointments.filter((a) => a.appointmentStatus.toLowerCase() === "pending").length;
// //   const acceptedCount = filteredByDateAppointments.filter((a) => a.appointmentStatus.toLowerCase() === "accepted").length;

// //   const filteredAppointments =
// //     filterStatus === "All"
// //       ? filteredByDateAppointments
// //       : filteredByDateAppointments.filter((a) => a.appointmentStatus.toLowerCase() === filterStatus.toLowerCase());

// //   const columns = [
// //     {
// //       title: "Full Name",
// //       key: "fullName",
// //       render: (_: any, record: AppointmentRecord) => record.userId?.fullName || "N/A",
// //     },
// //     { title: "Appointment Code", dataIndex: "appointmentCode", key: "appointmentCode" },
// //     {
// //       title: "Booked At",
// //       key: "bookedAt",
// //       render: (_: any, record: AppointmentRecord) =>
// //         dayjs(record.updatedAt).format("DDMMMYYYY hh:mm A"),
// //     },
// //     { title: "Time", dataIndex: "time", key: "time" },
// //     {
// //       title: "Status",
// //       dataIndex: "appointmentStatus",
// //       key: "status",
// //       render: (status: string, record: AppointmentRecord) => (
// //         <Space>
// //           <Tag
// //             color={
// //               status.toLowerCase() === "accepted"
// //                 ? "green"
// //                 : status.toLowerCase() === "pending"
// //                 ? "orange"
// //                 : "red"
// //             }
// //           >
// //             {status.toUpperCase()}
// //           </Tag>
// //           {status.toLowerCase() === "pending" && (
// //             <Button
// //               type="primary"
// //               size="small"
// //               onClick={() =>
// //                 handleAccept({
// //                   appointmentCode: record.appointmentCode,
// //                   email: record.email,
// //                 })
// //               }
// //             >
// //               Accept
// //             </Button>
// //           )}
// //         </Space>
// //       ),
// //     },
// //     { title: "Chair No", dataIndex: "chairNo", key: "chairNo" },
// //     { title: "Email", dataIndex: "email", key: "email" },
// //     {
// //       title: "Services",
// //       dataIndex: "services",
// //       key: "services",
// //       render: (services: string[]) => {
// //         try {
// //           const parsed = services
// //             .map((s) => (typeof s === "string" && s.startsWith("[") ? JSON.parse(s) : s))
// //             .flat();
// //           return parsed.join(", ");
// //         } catch {
// //           return services.join(", ");
// //         }
// //       },
// //     },
// //     { title: "From", dataIndex: "fromDateTime", key: "fromDateTime" },
// //     { title: "To", dataIndex: "toDateTime", key: "toDateTime" },
// //   ];

// //   return (
// //     <div className="p-5 flex justify-center bg-gray-100 min-h-screen">
// //       <Card className="w-full max-w-7xl shadow-2xl rounded-3xl">
// //         <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
// //           <h2 className="text-3xl font-bold text-gray-800">Manage Appointments</h2>

// //           <Space>
// //             <Radio.Group onChange={(e) => handleDateFilterChange(e.target.value)} value={dateFilterType}>
// //               <Radio.Button value="today">Today</Radio.Button>
// //               <Radio.Button value="weekly">This Week</Radio.Button>
// //               <Radio.Button value="monthly">This Month</Radio.Button>
// //               <Radio.Button value="custom">Custom Date</Radio.Button>
// //             </Radio.Group>

// //             {dateFilterType === "custom" && (
// //               <DatePicker
// //                 value={selectedDate}
// //                 onChange={(date) => setSelectedDate(date)}
// //                 className="rounded-lg"
// //               />
// //             )}

// //             <Button
// //               icon={<ReloadOutlined />}
// //               onClick={handleRefresh}
// //             >
// //               Refresh
// //             </Button>
// //           </Space>
// //         </div>
// // {/* 
// //         <Tabs
// //           defaultActiveKey="All"
// //           onChange={(key) => setFilterStatus(key)}
// //           size="large"
// //           className="mb-4"
// //         >
// //           <TabPane tab={<Badge count={allCount} color="blue">All</Badge>} key="All" />
// //           <TabPane tab={<Badge count={pendingCount} color="orange">Pending</Badge>} key="Pending" />
// //           <TabPane tab={<Badge count={acceptedCount} color="green">Accepted</Badge>} key="Accepted" />
// //         </Tabs> */}

// // <Tabs
// //   defaultActiveKey="Pending"
// //   onChange={(key) => setFilterStatus(key)}
// //   size="large"
// //   className="mb-4"
// // >
// //   <TabPane tab={<Badge count={pendingCount} color="orange">Pending</Badge>} key="Pending" />
// //   <TabPane tab={<Badge count={acceptedCount} color="green">Accepted</Badge>} key="Accepted" />
// //   <TabPane tab={<Badge count={allCount} color="blue">All</Badge>} key="All" />
// // </Tabs>



// //         <Table
// //           rowKey="_id"
// //           loading={loading}
// //           dataSource={filteredAppointments}
// //           columns={columns}
// //           pagination={{ pageSize: 10 }}
// //           scroll={{ x: 1600 }}
// //           bordered
// //           rowClassName={() => "hover:shadow-lg hover:bg-gray-50 transition duration-300"}
// //         />
// //       </Card>
// //     </div>
// //   );
// // };

// // export default AppointmentsPage;

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   Card,
//   Tag,
//   Space,
//   Button,
//   message,
//   Tabs,
//   DatePicker,
//   Badge,
//   Radio,
// } from "antd";
// import dayjs, { Dayjs } from "dayjs";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import {
//   fetchAppointments,
//   acceptAppointment,
// } from "../../redux/Slice/appointment/appointmentSlice";
// import { ReloadOutlined } from "@ant-design/icons";

// dayjs.extend(isSameOrAfter);
// dayjs.extend(isSameOrBefore);

// const { TabPane } = Tabs;

// interface AppointmentRecord {
//   _id: string;
//   userId: { _id: string; fullName: string };
//   appointmentCode: string;
//   date: string;
//   time: string;
//   appointmentStatus: string;
//   chairNo: number;
//   email: string;
//   services: string[];
//   fromDateTime: string;
//   toDateTime: string;
//   updatedAt: string;
// }

// const AppointmentsPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { appointments, loading } = useAppSelector(
//     (state) => state.appointments
//   );

//   const [filterStatus, setFilterStatus] = useState<string>("Pending");
//   const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
//   const [dateFilterType, setDateFilterType] = useState<
//     "today" | "weekly" | "monthly" | "custom" | null
//   >(null);

//   useEffect(() => {
//     dispatch(fetchAppointments());
//   }, [dispatch]);

//   const handleAccept = async (appointment: {
//     appointmentCode: string;
//     email: string;
//   }) => {
//     try {
//       await dispatch(acceptAppointment(appointment)).unwrap();
//       message.success("Appointment accepted!");
//       dispatch(fetchAppointments());
//     } catch (err: any) {
//       message.error(err?.message || "Something went wrong");
//     }
//   };

//   const handleRefresh = () => {
//     dispatch(fetchAppointments());
//     message.success("Appointments refreshed!");
//   };

//   const handleDateFilterChange = (
//     value: "today" | "weekly" | "monthly" | "custom" | null
//   ) => {
//     setDateFilterType(value);

//     if (value === "today") setSelectedDate(dayjs());
//     else setSelectedDate(null);
//   };

//   // ================= DATE FILTER ==================
//   const filteredByDateAppointments = appointments.filter((a) => {
//     const appDate = dayjs(a.date, "YYYY-MM-DD");

//     switch (dateFilterType) {
//       case "today":
//         return appDate.isSame(dayjs(), "day");

//       case "weekly": {
//         const start = dayjs().startOf("week").add(1, "day"); // Monday
//         const end = dayjs().endOf("week").add(1, "day"); // Sunday
//         return (
//           appDate.isSameOrAfter(start, "day") &&
//           appDate.isSameOrBefore(end, "day")
//         );
//       }

//       case "monthly":
//         return appDate.isSame(dayjs(), "month");

//       case "custom":
//         return selectedDate
//           ? appDate.isSame(selectedDate, "day")
//           : true;

//       default:
//         return true;
//     }
//   });

//   // ================= COUNTS ==================
//   const allCount = filteredByDateAppointments.length;
//   const pendingCount = filteredByDateAppointments.filter(
//     (a) =>
//       a.appointmentStatus?.toString().trim().toLowerCase() === "pending"
//   ).length;

//   const acceptedCount = filteredByDateAppointments.filter(
//     (a) =>
//       a.appointmentStatus?.toString().trim().toLowerCase() === "accepted"
//   ).length;

//   // ================= STATUS FILTER ==================
//   const filteredAppointments =
//     filterStatus === "All"
//       ? filteredByDateAppointments
//       : filteredByDateAppointments.filter(
//           (a) =>
//             a.appointmentStatus
//               ?.toString()
//               .trim()
//               .toLowerCase() === filterStatus.trim().toLowerCase()
//         );

//   // ================= TABLE COLUMNS ==================
//   const columns = [
//     {
//       title: "Full Name",
//       key: "fullName",
//       render: (_: any, record: AppointmentRecord) =>
//         record.userId?.fullName || "N/A",
//     },
//     { title: "Appointment Code", dataIndex: "appointmentCode", key: "appointmentCode" },

//     {
//       title: "Booked At",
//       key: "bookedAt",
//       render: (_: any, record: AppointmentRecord) =>
//         dayjs(record.updatedAt).format("DD MMM YYYY hh:mm A"),
//     },

//     { title: "Time", dataIndex: "time", key: "time" },

//     {
//       title: "Status",
//       dataIndex: "appointmentStatus",
//       key: "status",
//       render: (status: string, record: AppointmentRecord) => (
//         <Space>
//           <Tag
//             color={
//               status.toLowerCase() === "accepted"
//                 ? "green"
//                 : status.toLowerCase() === "pending"
//                 ? "orange"
//                 : "red"
//             }
//           >
//             {status.toUpperCase()}
//           </Tag>

//           {status.toLowerCase() === "pending" && (
//             <Button
//               type="primary"
//               size="small"
//               onClick={() =>
//                 handleAccept({
//                   appointmentCode: record.appointmentCode,
//                   email: record.email,
//                 })
//               }
//             >
//               Accept
//             </Button>
//           )}
//         </Space>
//       ),
//     },

//     { title: "Chair No", dataIndex: "chairNo", key: "chairNo" },

//     { title: "Email", dataIndex: "email", key: "email" },

//     {
//       title: "Services",
//       dataIndex: "services",
//       key: "services",
//       render: (services: string[]) => {
//         try {
//           const parsed = services
//             .map((s) =>
//               typeof s === "string" && s.startsWith("[") ? JSON.parse(s) : s
//             )
//             .flat();
//           return parsed.join(", ");
//         } catch {
//           return services.join(", ");
//         }
//       },
//     },

//     { title: "From", dataIndex: "fromDateTime", key: "fromDateTime" },
//     { title: "To", dataIndex: "toDateTime", key: "toDateTime" },
//   ];

//   return (
//     <div className="p-5 flex justify-center bg-gray-100 min-h-screen">
//       <Card className="w-full max-w-7xl shadow-xl rounded-3xl">

//         {/* HEADER + DATE FILTERS */}
//         <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
//           <h2 className="text-3xl font-bold text-gray-800">
//             Manage Appointments
//           </h2>

//           <Space>
//             <Radio.Group
//               onChange={(e) => handleDateFilterChange(e.target.value)}
//               value={dateFilterType}
//             >
//               <Radio.Button value="today">Today</Radio.Button>
//               <Radio.Button value="weekly">This Week</Radio.Button>
//               <Radio.Button value="monthly">This Month</Radio.Button>
//               <Radio.Button value="custom">Custom Date</Radio.Button>
//             </Radio.Group>

//             {dateFilterType === "custom" && (
//               <DatePicker
//                 value={selectedDate}
//                 onChange={(date) => setSelectedDate(date)}
//               />
//             )}

//             <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
//               Refresh
//             </Button>
//           </Space>
//         </div>

//         {/* STATUS TABS */}
//         <Tabs
//           defaultActiveKey="Pending"
//           onChange={(key) => setFilterStatus(key)}
//           size="large"
//           className="mb-4"
//         >
//           <TabPane
//             tab={<Badge count={pendingCount} color="orange">Pending</Badge>}
//             key="Pending"
//           />
//           <TabPane
//             tab={<Badge count={acceptedCount} color="green">Accepted</Badge>}
//             key="Accepted"
//           />
//           <TabPane
//             tab={<Badge count={allCount} color="blue">All</Badge>}
//             key="All"
//           />
//         </Tabs>

//         {/* TABLE */}
//         <Table
//           rowKey="_id"
//           loading={loading}
//           dataSource={filteredAppointments}
//           columns={columns}
//           pagination={{ pageSize: 10 }}
//           scroll={{ x: 1600 }}
//           bordered
//           rowClassName={() =>
//             "hover:shadow-lg hover:bg-gray-50 transition duration-300"
//           }
//         />
//       </Card>
//     </div>
//   );
// };

// export default AppointmentsPage;

import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Tag,
  Space,
  Button,
  message,
  Tabs,
  DatePicker,
  Badge,
  Radio,
  Input,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchAppointments,
  acceptAppointment,
} from "../../redux/Slice/appointment/appointmentSlice";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { TabPane } = Tabs;

interface AppointmentRecord {
  _id: string;
  userId: { _id: string; fullName: string };
  appointmentCode: string;
  date: string;
  time: string;
  appointmentStatus: string;
  chairNo: number;
  email: string;
  services: string[];
  fromDateTime: string;
  toDateTime: string;
  updatedAt: string;
}

const AppointmentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { appointments, loading } = useAppSelector(
    (state) => state.appointments
  );

  const [filterStatus, setFilterStatus] = useState<string>("Pending");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [dateFilterType, setDateFilterType] = useState<
    "today" | "weekly" | "monthly" | "custom" | null
  >(null);

  // ⭐ NEW: Search State
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleAccept = async (appointment: {
    appointmentCode: string;
    email: string;
  }) => {
    try {
      await dispatch(acceptAppointment(appointment)).unwrap();
      message.success("Appointment accepted!");
      dispatch(fetchAppointments());
    } catch (err: any) {
      message.error(err?.message || "Something went wrong");
    }
  };

  const handleRefresh = () => {
    dispatch(fetchAppointments());
    message.success("Appointments refreshed!");
  };

  const handleDateFilterChange = (
    value: "today" | "weekly" | "monthly" | "custom" | null
  ) => {
    setDateFilterType(value);

    if (value === "today") setSelectedDate(dayjs());
    else setSelectedDate(null);
  };

  // ================= DATE FILTER ==================
  const filteredByDateAppointments = appointments.filter((a) => {
    const appDate = dayjs(a.date, "YYYY-MM-DD");

    switch (dateFilterType) {
      case "today":
        return appDate.isSame(dayjs(), "day");

      case "weekly": {
        const start = dayjs().startOf("week").add(1, "day"); // Monday
        const end = dayjs().endOf("week").add(1, "day"); // Sunday
        return (
          appDate.isSameOrAfter(start, "day") &&
          appDate.isSameOrBefore(end, "day")
        );
      }

      case "monthly":
        return appDate.isSame(dayjs(), "month");

      case "custom":
        return selectedDate
          ? appDate.isSame(selectedDate, "day")
          : true;

      default:
        return true;
    }
  });

  // ================= STATUS FILTER ==================
  const filteredByStatus =
    filterStatus === "All"
      ? filteredByDateAppointments
      : filteredByDateAppointments.filter(
          (a) =>
            a.appointmentStatus
              ?.toString()
              .trim()
              .toLowerCase() === filterStatus.trim().toLowerCase()
        );

  // ⭐⭐ ================= SEARCH FILTER (GLOBAL SEARCH) ==================
  const finalFilteredAppointments = filteredByStatus.filter((a) => {
    const search = searchText.toLowerCase();

    return (
      a.userId?.fullName?.toLowerCase().includes(search) ||
      a.email?.toLowerCase().includes(search) ||
      a.appointmentCode?.toLowerCase().includes(search) ||
      a.appointmentStatus?.toLowerCase().includes(search) ||
      a.time?.toLowerCase().includes(search) ||
      a.date?.toLowerCase().includes(search) ||
      a.fromDateTime?.toLowerCase().includes(search) ||
      a.toDateTime?.toLowerCase().includes(search) ||
      a.chairNo?.toString().includes(search) ||
      a.services?.some((s) => s.toLowerCase().includes(search))
    );
  });

  // ================= COUNTS ==================
  const allCount = filteredByDateAppointments.length;
  const pendingCount = filteredByDateAppointments.filter(
    (a) =>
      a.appointmentStatus?.toString().trim().toLowerCase() === "pending"
  ).length;

  const acceptedCount = filteredByDateAppointments.filter(
    (a) =>
      a.appointmentStatus?.toString().trim().toLowerCase() === "accepted"
  ).length;

  // ================= TABLE COLUMNS ==================
  const columns = [
    {
      title: "Full Name",
      key: "fullName",
      render: (_: any, record: AppointmentRecord) =>
        record.userId?.fullName || "N/A",
    },
    { title: "Appointment Code", dataIndex: "appointmentCode", key: "appointmentCode" },

    {
      title: "Booked At",
      key: "bookedAt",
      render: (_: any, record: AppointmentRecord) =>
        dayjs(record.updatedAt).format("DD MMM YYYY hh:mm A"),
    },

    { title: "Time", dataIndex: "time", key: "time" },

    {
      title: "Status",
      dataIndex: "appointmentStatus",
      key: "status",
      render: (status: string, record: AppointmentRecord) => (
        <Space>
          <Tag
            color={
              status.toLowerCase() === "accepted"
                ? "green"
                : status.toLowerCase() === "pending"
                ? "orange"
                : "red"
            }
          >
            {status.toUpperCase()}
          </Tag>

          {status.toLowerCase() === "pending" && (
            <Button
              type="primary"
              size="small"
              onClick={() =>
                handleAccept({
                  appointmentCode: record.appointmentCode,
                  email: record.email,
                })
              }
            >
              Accept
            </Button>
          )}
        </Space>
      ),
    },

    { title: "Chair No", dataIndex: "chairNo", key: "chairNo" },
    { title: "Email", dataIndex: "email", key: "email" },

    {
      title: "Services",
      dataIndex: "services",
      key: "services",
      render: (services: string[]) => {
        try {
          const parsed = services
            .map((s) =>
              typeof s === "string" && s.startsWith("[") ? JSON.parse(s) : s
            )
            .flat();
          return parsed.join(", ");
        } catch {
          return services.join(", ");
        }
      },
    },

    { title: "From", dataIndex: "fromDateTime", key: "fromDateTime" },
    { title: "To", dataIndex: "toDateTime", key: "toDateTime" },
  ];

  return (
    <div className="p-5 flex justify-center bg-gray-100 min-h-screen">
      <Card className="w-full max-w-7xl shadow-xl rounded-3xl">

        {/* HEADER + DATE FILTERS */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 className="text-3xl font-bold text-gray-800">
            Manage Appointments
          </h2>

          <Space>
            <Radio.Group
              onChange={(e) => handleDateFilterChange(e.target.value)}
              value={dateFilterType}
            >
              <Radio.Button value="today">Today</Radio.Button>
              <Radio.Button value="weekly">This Week</Radio.Button>
              <Radio.Button value="monthly">This Month</Radio.Button>
              <Radio.Button value="custom">Custom Date</Radio.Button>
            </Radio.Group>

            {dateFilterType === "custom" && (
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            )}

            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              Refresh
            </Button>
          </Space>
        </div>

        {/* ⭐ SEARCH INPUT */}
        <Input
          placeholder="Search (name, email, code, services, date, time, status...)"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: "15px", height: 40 }}
        />

        {/* STATUS TABS */}
        <Tabs
          defaultActiveKey="Pending"
          onChange={(key) => setFilterStatus(key)}
          size="large"
          className="mb-4"
        >
          <TabPane
            tab={<Badge count={pendingCount} color="orange">Pending</Badge>}
            key="Pending"
          />
          <TabPane
            tab={<Badge count={acceptedCount} color="green">Accepted</Badge>}
            key="Accepted"
          />
          <TabPane
            tab={<Badge count={allCount} color="blue">All</Badge>}
            key="All"
          />
        </Tabs>

        {/* TABLE */}
        <Table
          rowKey="_id"
          loading={loading}
          dataSource={finalFilteredAppointments}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1600 }}
          bordered
          rowClassName={() =>
            "hover:shadow-lg hover:bg-gray-50 transition duration-300"
          }
        />
      </Card>
    </div>
  );
};

export default AppointmentsPage;
