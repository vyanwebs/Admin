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
import type { ColumnsType } from "antd/es/table";
import type { IAppointment } from "../../redux/Slice/appointment/appointmentSlice";
import { useSearchParams } from "react-router-dom";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

//const { TabPane } = Tabs;

const AppointmentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { appointments, loading } = useAppSelector(
    (state) => state.appointments
  );

const [searchParams] = useSearchParams();
const statusFromDashboard = searchParams.get("status"); 
// "pending" | "accepted" | "all"


  const [filterStatus, setFilterStatus] = useState<string>("Pending");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [dateFilterType, setDateFilterType] = useState<
    "today" | "weekly" | "monthly" | "custom" | null
  >(null);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleAccept = async (data: { appointmentCode: string; email: string }) => {
    try {
      await dispatch(acceptAppointment(data)).unwrap();
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
        const start = dayjs().startOf("week").add(1, "day");
        const end = dayjs().endOf("week").add(1, "day");
        return (
          appDate.isSameOrAfter(start, "day") &&
          appDate.isSameOrBefore(end, "day")
        );
      }

      case "monthly":
        return appDate.isSame(dayjs(), "month");

      case "custom":
        return selectedDate ? appDate.isSame(selectedDate, "day") : true;

      default:
        return true;
    }
  });

  // ================= STATUS FILTER ==================
  // const filteredByStatus =
  //   filterStatus === "All"
  //     ? filteredByDateAppointments
  //     : filteredByDateAppointments.filter(
  //         (a) =>
  //           a.appointmentStatus.toLowerCase() ===
  //           filterStatus.toLowerCase()
  //       );

  const filteredByStatus =
  filterStatus === "All"
    ? filteredByDateAppointments
    : filteredByDateAppointments.filter(
        (a) =>
          a.appointmentStatus.toLowerCase() ===
          filterStatus.toLowerCase()
      );

  // ================= SEARCH FILTER ==================
  const finalFilteredAppointments = filteredByStatus.filter((a) => {
    const s = searchText.toLowerCase();

    return (
      a.userId?.fullName?.toLowerCase().includes(s) ||
      a.email?.toLowerCase().includes(s) ||
      a.appointmentCode?.toLowerCase().includes(s) ||
      a.appointmentStatus?.toLowerCase().includes(s) ||
      a.time?.toLowerCase().includes(s) ||
      a.date?.toLowerCase().includes(s) ||
      a.fromDateTime?.toLowerCase().includes(s) ||
      a.toDateTime?.toLowerCase().includes(s) ||
      a.chairNo?.toString().includes(s) ||
      a.services?.some((service) =>
        service.toLowerCase().includes(s)
      )
    );
  });

  // ================= COUNTS ==================
  // const allCount = filteredByDateAppointments.length;
  // const pendingCount = filteredByDateAppointments.filter(
  //   (a) => a.appointmentStatus.toLowerCase() === "pending"
  // ).length;

  // const acceptedCount = filteredByDateAppointments.filter(
  //   (a) => a.appointmentStatus.toLowerCase() === "accepted"
  // ).length;

const allCount = filteredByDateAppointments.length;

const pendingCount = filteredByDateAppointments.filter(
  (a) => a.appointmentStatus.toLowerCase() === "pending"
).length;

const acceptedCount = filteredByDateAppointments.filter(
  (a) => a.appointmentStatus.toLowerCase() === "accepted"
).length;


useEffect(() => {
  if (statusFromDashboard) {
    if (statusFromDashboard === "all") setFilterStatus("All");
    if (statusFromDashboard === "pending") setFilterStatus("Pending");
    if (statusFromDashboard === "accepted") setFilterStatus("Accepted");
  }
}, [statusFromDashboard]);


  // ================= TABLE COLUMNS ==================
  const columns: ColumnsType<IAppointment> = [
    {
      title: "User Name",
      key: "fullName",
      render: (_, record) => record.userId?.fullName || "N/A",
    },
    { title: "Appointment Code", dataIndex: "appointmentCode", key: "appointmentCode" },

    {
      title: "Booked At",
      key: "bookedAt",
      render: (_, record) =>
        dayjs(record.updatedAt).format("DD MMM YYYY hh:mm A"),
    },

    { title: "Time", dataIndex: "time", key: "time" },

    {
      title: "Status",
      dataIndex: "appointmentStatus",
      key: "status",
      render: (status, record) => (
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
                  appointmentCode: record.appointmentCode ?? "",
                  email: record.email ?? "",
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
      render: (services) => services.join(", "),
    },

    { title: "From", dataIndex: "fromDateTime", key: "fromDateTime" },
    { title: "To", dataIndex: "toDateTime", key: "toDateTime" },
  ];

  return (
    <div className="p-5 flex justify-center bg-gray-100 min-h-screen">
      <Card className="w-full max-w-7xl shadow-xl rounded-3xl">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 className="text-3xl font-bold text-gray-800">
            Manage Appointments
          </h2>

          <Space wrap>
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

        <Input
          placeholder="Search (name, email, code, services...)"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: "15px", height: 40 }}
        />
{/* 
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
        </Tabs> */}
        <Tabs
  activeKey={filterStatus}
  onChange={(key) => setFilterStatus(key)}
>
  <Tabs.TabPane
    key="Pending"
    tab={<Badge count={pendingCount} color="orange">Pending</Badge>}
  />

  <Tabs.TabPane
    key="Accepted"
    tab={<Badge count={acceptedCount} color="green">Accepted</Badge>}
  />

  <Tabs.TabPane
    key="All"
    tab={<Badge count={allCount} color="blue">All</Badge>}
  />
</Tabs>


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
