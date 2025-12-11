// import React, { useEffect, useState } from "react";
// import { Card, Form, Input, Button, message, Modal } from "antd";
// import {
//   MailOutlined,
//   BarcodeOutlined,
//   NumberOutlined,
//   CheckCircleOutlined,
// } from "@ant-design/icons";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import {
//   verifyAppointment,
//   resetAppointmentState,
// } from "../../redux/Slice/appointment/appointmentSlice";

// const AppointmentForm: React.FC = () => {
//   const [form] = Form.useForm();
//   const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
//   const dispatch = useAppDispatch();

//   const {
//     loading,
//     success,
//     message: successMsg,
//     error,
//   } = useAppSelector((state) => state.appointment);

//   const handleSubmit = (values: {
//     email: string;
//     appointmentCode: string;
//     chairNo: string;
//   }) => {
//     dispatch(verifyAppointment(values));
//   };

//   useEffect(() => {
//     if (success) {
//       setIsSuccessModalVisible(true);
//       form.resetFields();
//     } else if (error) {
//       message.error(error || "Verification failed");
//       dispatch(resetAppointmentState());
//     }
//   }, [success, error, successMsg, dispatch, form]);

//   const handleModalClose = () => {
//     setIsSuccessModalVisible(false);
//     dispatch(resetAppointmentState());
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
//       {/* Success Confirmation Modal */}
//       <Modal
//         title={
//           <div className="flex items-center gap-2 text-green-600">
//             <CheckCircleOutlined className="text-2xl" />
//             <span className="text-xl font-semibold">
//               Appointment Confirmed!
//             </span>
//           </div>
//         }
//         open={isSuccessModalVisible}
//         onOk={handleModalClose}
//         onCancel={handleModalClose}
//         okText="Great!"
//         cancelButtonProps={{ style: { display: "none" } }}
//         centered
//         width={400}
//       >
//         <div className="py-4 text-center">
//           <CheckCircleOutlined className="text-5xl text-green-500 mb-4" />
//           <p className="text-lg text-gray-700 mb-2">
//             {successMsg || "Your appointment has been successfully confirmed!"}
//           </p>
//           <p className="text-gray-500 text-sm">
//             You can now proceed with your appointment.
//           </p>
//         </div>
//       </Modal>

//       <Card
//         title={
//           <span className="text-xl font-semibold text-gray-700">
//             Verify Appointment
//           </span>
//         }
//         className="w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg border border-gray-200 rounded-2xl bg-white"
//       >
//         <Form
//           layout="vertical"
//           form={form}
//           onFinish={handleSubmit}
//           requiredMark={false}
//           className="mt-4 space-y-4"
//         >
//           {/* Email Field */}
//           <Form.Item
//             label={<span className="text-gray-600 font-medium">Email</span>}
//             name="email"
//             rules={[
//               { required: true, message: "Please enter the email" },
//               { type: "email", message: "Please enter a valid email" },
//             ]}
//           >
//             <Input
//               size="large"
//               prefix={<MailOutlined className="text-gray-400" />}
//               placeholder="Enter email address"
//               className="rounded-lg"
//             />
//           </Form.Item>

//           {/* Appointment Code */}
//           <Form.Item
//             label={
//               <span className="text-gray-600 font-medium">
//                 Appointment Code
//               </span>
//             }
//             name="appointmentCode"
//             rules={[
//               { required: true, message: "Please enter appointment code" },
//             ]}
//           >
//             <Input
//               size="large"
//               prefix={<BarcodeOutlined className="text-gray-400" />}
//               placeholder="Enter appointment code"
//               className="rounded-lg"
//             />
//           </Form.Item>

//           {/* Chair Number */}
//           <Form.Item
//             label={
//               <span className="text-gray-600 font-medium">Chair Number</span>
//             }
//             name="chairNo"
//             rules={[{ required: true, message: "Please enter chair number" }]}
//           >
//             <Input
//               size="large"
//               prefix={<NumberOutlined className="text-gray-400" />}
//               placeholder="Enter chair number"
//               className="rounded-lg"
//             />
//           </Form.Item>

//           {/* Submit Button */}
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               icon={<CheckCircleOutlined />}
//               loading={loading}
//               className="w-full mt-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
//               size="large"
//             >
//               {loading ? "Verifying..." : "Verify Appointment"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default AppointmentForm;



import React, { useEffect } from "react";
import { Table, Card, Button, Tag, Space, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchAppointments,
  acceptAppointment,
  rejectAppointment,
} from "../../redux/Slice/appointment/appointmentSlice";

import type { ColumnsType } from "antd/es/table";
import type { IAppointment } from "../../redux/types/usera.types";

const ManageAppointments: React.FC = () => {
  const dispatch = useAppDispatch();

  // ⬇ Correct selector (same structure as AppointmentForm)
  const { appointments, loading, error } = useAppSelector(
    (state) => state.appointment
  );

  // ⬇ Fetch appointments at mount
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // ⬇ Show backend error
  useEffect(() => {
    if (error) message.error(error);
  }, [error]);

  // Accept
  const handleAccept = (id: string) => {
    dispatch(acceptAppointment(id));
  };

  // Reject
  const handleReject = (id: string) => {
    dispatch(rejectAppointment(id));
  };

  // TABLE COLUMNS
  const columns: ColumnsType<IAppointment> = [
    {
      title: "Appointment ID",
      dataIndex: "_id",
      key: "_id",
      width: 200,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Service",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        const statusColor =
          record.status === "accepted"
            ? "green"
            : record.status === "rejected"
            ? "red"
            : "orange";

        return <Tag color={statusColor}>{record.status.toUpperCase()}</Tag>;
      },
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            disabled={record.status !== "pending"}
            onClick={() => handleAccept(record._id)}
          >
            Accept
          </Button>

          <Button
            danger
            type="default"
            disabled={record.status !== "pending"}
            onClick={() => handleReject(record._id)}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 flex justify-center">
      <Card
        title={
          <span className="text-xl font-semibold text-gray-700">
            Manage Appointments
          </span>
        }
        className="w-full max-w-6xl shadow-lg border border-gray-200 rounded-2xl bg-white"
      >
        <Table
          columns={columns}
          dataSource={appointments}
          rowKey={(item) => item._id}
          loading={loading}
          pagination={{ pageSize: 8 }}
          scroll={{ x: 800 }}
          locale={{ emptyText: "No appointments found" }}
        />
      </Card>
    </div>
  );
};

export default ManageAppointments;
