
// // // // import React, { useState, useEffect } from "react";
// // // // import {
// // // //   Form,
// // // //   Input,
// // // //   Select,
// // // //   Upload,
// // // //   Button,
// // // //   DatePicker,
// // // //   InputNumber,
// // // //   message,
// // // // } from "antd";
// // // // import { UploadOutlined } from "@ant-design/icons";
// // // // import dayjs from "dayjs";

// // // // const { Option } = Select;

// // // // interface UserFormProps {
// // // //   initialValues?: any;
// // // //   onSubmit: (values: any) => void;
// // // //   isEditMode?: boolean;
// // // //   loading?: boolean;
// // // // }

// // // // const UserForm: React.FC<UserFormProps> = ({
// // // //   initialValues,
// // // //   onSubmit,
// // // //   isEditMode,
// // // //   loading,
// // // // }) => {
// // // //   const [form] = Form.useForm();
// // // //   const [isCustom, setIsCustom] = useState(false);

// // // //   useEffect(() => {
// // // //     if (initialValues?.subscriptionPeriod === "custom") {
// // // //       setIsCustom(true);
// // // //     }
// // // //   }, [initialValues]);

// // // //   const handleSubscriptionChange = (value: string) => {
// // // //     setIsCustom(value === "custom");
// // // //     if (value !== "custom") {
// // // //       form.setFieldValue("customDate", undefined);
// // // //     }
// // // //   };

// // // //   const handleFinish = (values: any) => {
// // // //     const startDate = new Date().toISOString();
// // // //     let endDate: string | undefined;

// // // //     if (values.subscriptionPeriod === "halfyearly") {
// // // //       endDate = dayjs().add(6, "month").toISOString();
// // // //     } else if (values.subscriptionPeriod === "yearly") {
// // // //       endDate = dayjs().add(1, "year").toISOString();
// // // //     } else if (values.subscriptionPeriod === "custom") {
// // // //       endDate = values.customDate?.toISOString();
// // // //     }

// // // //     const payload = {
// // // //       ...values,
// // // //       isActive: values.status === "active",
// // // //       subscriptionStartDate: startDate,
// // // //       subscriptionEndDate: endDate,
// // // //     };

// // // //     onSubmit(payload);
// // // //   };

// // // //   const getInitialValues = () => {
// // // //     if (!initialValues) return {};

// // // //     return {
// // // //       ...initialValues,
// // // //           noOfChairs: initialValues.noOfChairs, 
// // // //       status: initialValues.isActive ? "active" : "inactive",
// // // //       customDate: initialValues.subscriptionEndDate
// // // //         ? dayjs(initialValues.subscriptionEndDate)
// // // //         : undefined,
// // // //     };
// // // //   };

// // // //   return (
// // // //     <div className="bg-white p-4 sm:p-6 rounded-xl">
// // // //       <Form
// // // //         layout="vertical"
// // // //         form={form}
// // // //         onFinish={handleFinish}
// // // //         initialValues={getInitialValues()}
// // // //         validateTrigger="onBlur"
// // // //         className="grid grid-cols-1 sm:grid-cols-2 gap-6"
// // // //       >
// // // //         {/* Full Name */}
// // // //         <Form.Item
// // // //           label="Full Name"
// // // //           name="fullName"
// // // //           rules={[
// // // //             { required: true, message: "Full name is required" },
// // // //             { min: 3, message: "Minimum 3 characters required" },
// // // //           ]}
// // // //         >
// // // //           <Input size="large" placeholder="Enter full name" />
// // // //         </Form.Item>

// // // //         {/* Email */}
// // // //         <Form.Item
// // // //           label="Email"
// // // //           name="email"
// // // //           rules={[
// // // //             { required: true, message: "Email is required" },
// // // //             { type: "email", message: "Enter a valid email address" },
// // // //           ]}
// // // //         >
// // // //           <Input size="large" placeholder="example@email.com" />
// // // //         </Form.Item>

// // // //         {/* Password */}
// // // //         {!isEditMode && (
// // // //           <Form.Item
// // // //             label="Password"
// // // //             name="password"
// // // //             rules={[
// // // //               { required: true, message: "Password is required" },
// // // //               {
// // // //                 pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
// // // //                 message:
// // // //                   "Password must contain 1 uppercase letter and 1 number",
// // // //               },
// // // //             ]}
// // // //             className="sm:col-span-2"
// // // //           >
// // // //             <Input.Password size="large" placeholder="Enter password" />
// // // //           </Form.Item>
// // // //         )}

// // // //         {/* Phone */}
// // // //         <Form.Item
// // // //           label="Phone"
// // // //           name="phone"
// // // //           rules={[
// // // //             { required: true, message: "Phone number is required" },
// // // //             {
// // // //               pattern: /^[6-9]\d{9}$/,
// // // //               message: "Enter a valid 10-digit Indian phone number",
// // // //             },
// // // //           ]}
// // // //         >
// // // //           <Input size="large" placeholder="Enter phone number" maxLength={10} />
// // // //         </Form.Item>

// // // //         {/* Address */}
// // // //         <Form.Item
// // // //           label="Address"
// // // //           name="address"
// // // //           rules={[
// // // //             { required: true, message: "Address is required" },
// // // //             { min: 5, message: "Address must be at least 5 characters" },
// // // //           ]}
// // // //         >
// // // //           <Input size="large" placeholder="Enter address" />
// // // //         </Form.Item>

// // // //         {/* Status */}
// // // //         <Form.Item
// // // //           label="Status"
// // // //           name="status"
// // // //           rules={[{ required: true, message: "Please select status" }]}
// // // //         >
// // // //           <Select size="large" placeholder="Select status">
// // // //             <Option value="active">Active</Option>
// // // //             <Option value="inactive">Inactive</Option>
// // // //           </Select>
// // // //         </Form.Item>

// // // //         {/* Subscription */}
// // // //         <Form.Item
// // // //           label="Subscription Period"
// // // //           name="subscriptionPeriod"
// // // //           rules={[{ required: true, message: "Select subscription period" }]}
// // // //         >
// // // //           <Select size="large" onChange={handleSubscriptionChange}>
// // // //             <Option value="halfyearly">Half-Yearly</Option>
// // // //             <Option value="yearly">Yearly</Option>
// // // //           </Select>
// // // //         </Form.Item>

// // // //         {/* Chairs */}
// // // //         <Form.Item
// // // //           label="Number of Chairs"
// // // //           name="noOfChairs"
// // // //           rules={[
// // // //             { required: true, message: "Number of chairs is required" },
// // // //             {
// // // //               validator: (_, value) =>
// // // //                 value > 0
// // // //                   ? Promise.resolve()
// // // //                   : Promise.reject("Minimum 1 chair required"),
// // // //             },
// // // //           ]}
// // // //         >
// // // //           <InputNumber
// // // //             size="large"
// // // //             min={1}
// // // //             className="w-full"
// // // //             placeholder="Enter number of chairs"
// // // //           />
// // // //         </Form.Item>

// // // //         {/* Custom Date */}
// // // //         {isCustom && (
// // // //           <Form.Item
// // // //             label="Custom Expiry Date"
// // // //             name="customDate"
// // // //             rules={[
// // // //               { required: true, message: "Please select expiry date" },
// // // //             ]}
// // // //             className="sm:col-span-2"
// // // //           >
// // // //             <DatePicker
// // // //               size="large"
// // // //               className="w-full"
// // // //               disabledDate={(current) =>
// // // //                 current && current < dayjs().startOf("day")
// // // //               }
// // // //             />
// // // //           </Form.Item>
// // // //         )}

// // // //         {/* Image */}
// // // //         <Form.Item
// // // //           label="Image"
// // // //           name="image"
// // // //           valuePropName="fileList"
// // // //           getValueFromEvent={(e: any) => e?.fileList}
// // // //           rules={[
// // // //             {
// // // //               validator: (_, fileList) => {
// // // //                 if (isEditMode) return Promise.resolve();
// // // //                 if (!fileList || fileList.length === 0) {
// // // //                   return Promise.reject("Please upload an image");
// // // //                 }
// // // //                 const file = fileList[0]?.originFileObj;
// // // //                 if (file.size > 2 * 1024 * 1024) {
// // // //                   return Promise.reject("Image must be smaller than 2MB");
// // // //                 }
// // // //                 return Promise.resolve();
// // // //               },
// // // //             },
// // // //           ]}
// // // //           className="sm:col-span-2"
// // // //         >
// // // //           <Upload beforeUpload={() => false} listType="picture-card" maxCount={1}>
// // // //             <div>
// // // //               <UploadOutlined />
// // // //               <div className="mt-2 text-sm">Upload Image</div>
// // // //             </div>
// // // //           </Upload>
// // // //         </Form.Item>

// // // //         {/* Submit */}
// // // //         <div className="sm:col-span-2 flex justify-end">
// // // //           <Button
// // // //             type="primary"
// // // //             htmlType="submit"
// // // //             size="large"
// // // //             loading={loading}
// // // //           >
// // // //             {isEditMode ? "Update" : "Create"}
// // // //           </Button>
// // // //         </div>
// // // //       </Form>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UserForm;


// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Form,
// // //   Input,
// // //   Select,
// // //   Upload,
// // //   Button,
// // //   DatePicker,
// // //   InputNumber,
// // // } from "antd";
// // // import { UploadOutlined } from "@ant-design/icons";
// // // import dayjs from "dayjs";

// // // const { Option } = Select;

// // // interface UserFormProps {
// // //   initialValues?: any;
// // //   onSubmit: (values: any) => void;
// // //   isEditMode?: boolean;
// // //   loading?: boolean;
// // // }

// // // const UserForm: React.FC<UserFormProps> = ({
// // //   initialValues,
// // //   onSubmit,
// // //   isEditMode = false,
// // //   loading = false,
// // // }) => {
// // //   const [form] = Form.useForm();
// // //   const [isCustom, setIsCustom] = useState(false);

// // //   /* ---------- HANDLE EDIT PREFILL ---------- */
// // //   useEffect(() => {
// // //     if (initialValues?.subscriptionPeriod === "custom") {
// // //       setIsCustom(true);
// // //     }
// // //   }, [initialValues]);

// // //   /* ---------- SUBSCRIPTION CHANGE ---------- */
// // //   const handleSubscriptionChange = (value: string) => {
// // //     setIsCustom(value === "custom");
// // //     if (value !== "custom") {
// // //       form.setFieldValue("customDate", undefined);
// // //     }
// // //   };

// // //   /* ---------- SUBMIT ---------- */
// // //   const handleFinish = (values: any) => {
// // //     let subscriptionStartDate = initialValues?.subscriptionStartDate;
// // //     let subscriptionEndDate = initialValues?.subscriptionEndDate;

// // //     // ✅ Create mode only
// // //     if (!isEditMode) {
// // //       subscriptionStartDate = new Date().toISOString();

// // //       if (values.subscriptionPeriod === "halfyearly") {
// // //         subscriptionEndDate = dayjs().add(6, "month").toISOString();
// // //       } else if (values.subscriptionPeriod === "yearly") {
// // //         subscriptionEndDate = dayjs().add(1, "year").toISOString();
// // //       } else if (values.subscriptionPeriod === "custom") {
// // //         subscriptionEndDate = values.customDate?.toISOString();
// // //       }
// // //     }

// // //     const payload = {
// // //       ...values,
// // //       noOfChairs: Number(values.noOfChairs), // ⭐ IMPORTANT
// // //       isActive: values.status === "active",
// // //       subscriptionStartDate,
// // //       subscriptionEndDate,
// // //     };

// // //     onSubmit(payload);
// // //   };

// // //   /* ---------- INITIAL VALUES ---------- */
// // //   const getInitialValues = () => {
// // //     if (!initialValues) return {};

// // //     return {
// // //       ...initialValues,
// // //       noOfChairs: initialValues.noOfChairs,
// // //       status: initialValues.isActive ? "active" : "inactive",
// // //       customDate: initialValues.subscriptionEndDate
// // //         ? dayjs(initialValues.subscriptionEndDate)
// // //         : undefined,
// // //     };
// // //   };

// // //   return (
// // //     <div className="bg-white p-4 sm:p-6 rounded-xl">
// // //       <Form
// // //         layout="vertical"
// // //         form={form}
// // //         onFinish={handleFinish}
// // //         initialValues={getInitialValues()}
// // //         className="grid grid-cols-1 sm:grid-cols-2 gap-6"
// // //       >
// // //         {/* Full Name */}
// // //         <Form.Item
// // //           label="Full Name"
// // //           name="fullName"
// // //           rules={[
// // //             { required: true, message: "Full name is required" },
// // //             { min: 3, message: "Minimum 3 characters required" },
// // //           ]}
// // //         >
// // //           <Input size="large" />
// // //         </Form.Item>

// // //         {/* Email */}
// // //         <Form.Item
// // //           label="Email"
// // //           name="email"
// // //           rules={[
// // //             { required: true, message: "Email is required" },
// // //             { type: "email", message: "Invalid email" },
// // //           ]}
// // //         >
// // //           <Input size="large" />
// // //         </Form.Item>

// // //         {/* Password */}
// // //         {!isEditMode && (
// // //           <Form.Item
// // //             label="Password"
// // //             name="password"
// // //             rules={[
// // //               { required: true, message: "Password is required" },
// // //               {
// // //                 pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
// // //                 message: "1 uppercase & 1 number required",
// // //               },
// // //             ]}
// // //             className="sm:col-span-2"
// // //           >
// // //             <Input.Password size="large" />
// // //           </Form.Item>
// // //         )}

// // //         {/* Phone */}
// // //         <Form.Item
// // //           label="Phone"
// // //           name="phone"
// // //           rules={[
// // //             { required: true },
// // //             { pattern: /^[6-9]\d{9}$/, message: "Invalid phone number" },
// // //           ]}
// // //         >
// // //           <Input maxLength={10} size="large" />
// // //         </Form.Item>

// // //         {/* Address */}
// // //         <Form.Item
// // //           label="Address"
// // //           name="address"
// // //           rules={[{ required: true, min: 5 }]}
// // //         >
// // //           <Input size="large" />
// // //         </Form.Item>

// // //         {/* Status */}
// // //         <Form.Item
// // //           label="Status"
// // //           name="status"
// // //           rules={[{ required: true }]}
// // //         >
// // //           <Select size="large">
// // //             <Option value="active">Active</Option>
// // //             <Option value="inactive">Inactive</Option>
// // //           </Select>
// // //         </Form.Item>

// // //         {/* Subscription */}
// // //         <Form.Item
// // //           label="Subscription Period"
// // //           name="subscriptionPeriod"
// // //           rules={[{ required: true }]}
// // //         >
// // //           <Select size="large" onChange={handleSubscriptionChange}>
// // //             <Option value="halfyearly">Half-Yearly</Option>
// // //             <Option value="yearly">Yearly</Option>
// // //           </Select>
// // //         </Form.Item>

// // //         {/* No of Chairs */}
// // //         <Form.Item
// // //           label="Number of Chairs"
// // //           name="noOfChairs"
// // //           rules={[
// // //             { required: true },
// // //             {
// // //               validator: (_, value) =>
// // //                 value > 0
// // //                   ? Promise.resolve()
// // //                   : Promise.reject("Minimum 1 chair required"),
// // //             },
// // //           ]}
// // //         >
// // //           <InputNumber min={1} size="large" className="w-full" />
// // //         </Form.Item>

// // //         {/* Image */}
// // //         <Form.Item
// // //           label="Image"
// // //           name="image"
// // //           valuePropName="fileList"
// // //           getValueFromEvent={(e: any) => e?.fileList}
// // //           rules={[
// // //             {
// // //               validator: (_, fileList) => {
// // //                 if (isEditMode) return Promise.resolve();
// // //                 if (!fileList?.length) {
// // //                   return Promise.reject("Upload image");
// // //                 }
// // //                 return Promise.resolve();
// // //               },
// // //             },
// // //           ]}
// // //           className="sm:col-span-2"
// // //         >
// // //           <Upload beforeUpload={() => false} listType="picture-card" maxCount={1}>
// // //             <UploadOutlined />
// // //           </Upload>
// // //         </Form.Item>

// // //         {/* Submit */}
// // //         <div className="sm:col-span-2 text-right">
// // //           <Button type="primary" htmlType="submit" loading={loading}>
// // //             {isEditMode ? "Update" : "Create"}
// // //           </Button>
// // //         </div>
// // //       </Form>
// // //     </div>
// // //   );
// // // };

// // // export default UserForm;

// // import React, { useState, useEffect } from "react";
// // import {
// //   Form,
// //   Input,
// //   Select,
// //   Upload,
// //   Button,
// //   DatePicker,
// //   InputNumber,
// //   Row,
// //   Col,
// //   Tag,
// // } from "antd";
// // import { UploadOutlined } from "@ant-design/icons";
// // import dayjs from "dayjs";

// // const { Option } = Select;

// // interface UserFormProps {
// //   initialValues?: any;
// //   onSubmit: (values: any) => void;
// //   isEditMode?: boolean;
// //   loading?: boolean;
// // }

// // const UserForm: React.FC<UserFormProps> = ({
// //   initialValues,
// //   onSubmit,
// //   isEditMode = false,
// //   loading = false,
// // }) => {
// //   const [form] = Form.useForm();
// //   const [isCustom, setIsCustom] = useState(false);

// //   /* ---------- HANDLE EDIT PREFILL ---------- */
// //   useEffect(() => {
// //     if (initialValues?.subscriptionPeriod === "custom") setIsCustom(true);
// //   }, [initialValues]);

// //   /* ---------- SUBSCRIPTION CHANGE ---------- */
// //   const handleSubscriptionChange = (value: string) => {
// //     setIsCustom(value === "custom");
// //     if (value !== "custom") form.setFieldValue("customDate", undefined);
// //   };

// //   /* ---------- SUBMIT ---------- */
// //   const handleFinish = (values: any) => {
// //     let subscriptionStartDate = initialValues?.subscriptionStartDate;
// //     let subscriptionEndDate = initialValues?.subscriptionEndDate;

// //     if (!isEditMode) {
// //       subscriptionStartDate = new Date().toISOString();
// //       if (values.subscriptionPeriod === "halfyearly")
// //         subscriptionEndDate = dayjs().add(6, "month").toISOString();
// //       else if (values.subscriptionPeriod === "yearly")
// //         subscriptionEndDate = dayjs().add(1, "year").toISOString();
// //       else if (values.subscriptionPeriod === "custom")
// //         subscriptionEndDate = values.customDate?.toISOString();
// //     }

// //     const payload = {
// //       ...values,
// //       firstName: values.firstName,
// //       lastName: values.lastName,
// //       noOfChairs: Number(values.noOfChairs),
// //       isActive: values.status === "active",
// //       subscriptionStartDate,
// //       subscriptionEndDate,
// //     };

// //     onSubmit(payload);
// //   };

// //   /* ---------- INITIAL VALUES ---------- */
// //   const getInitialValues = () => {
// //     if (!initialValues) return {};
// //     return {
// //       firstName: initialValues.firstName,
// //       lastName: initialValues.lastName,
// //       email: initialValues.email,
// //       phone: initialValues.phone,
// //       address: initialValues.address,
// //       status: initialValues.isActive ? "active" : "inactive",
// //       subscriptionPeriod: initialValues.subscriptionPeriod,
// //       noOfChairs: initialValues.noOfChairs,
// //       customDate: initialValues.subscriptionEndDate
// //         ? dayjs(initialValues.subscriptionEndDate)
// //         : undefined,
// //     };
// //   };

// //   return (
// //     <div className="bg-white p-6 rounded-xl shadow-md">
// //       <Form
// //         layout="vertical"
// //         form={form}
// //         onFinish={handleFinish}
// //         initialValues={getInitialValues()}
// //         className="grid grid-cols-1 sm:grid-cols-2 gap-6"
// //       >
// //         {/* First Name */}
// //         <Form.Item
// //           label="First Name"
// //           name="firstName"
// //           rules={[{ required: true, message: "First name is required" }]}
// //         >
// //           <Input size="large" placeholder="Enter first name" />
// //         </Form.Item>

// //         {/* Last Name */}
// //         <Form.Item
// //           label="Last Name"
// //           name="lastName"
// //           rules={[{ required: true, message: "Last name is required" }]}
// //         >
// //           <Input size="large" placeholder="Enter last name" />
// //         </Form.Item>

// //         {/* Email */}
// //         <Form.Item
// //           label="Email"
// //           name="email"
// //           rules={[
// //             { required: true, message: "Email is required" },
// //             { type: "email", message: "Invalid email" },
// //           ]}
// //         >
// //           <Input size="large" placeholder="Enter email" />
// //         </Form.Item>

// //         {/* Password */}
// //         {!isEditMode && (
// //           <Form.Item
// //             label="Password"
// //             name="password"
// //             rules={[
// //               { required: true, message: "Password is required" },
// //               {
// //                 pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
// //                 message: "1 uppercase & 1 number required",
// //               },
// //             ]}
// //             className="sm:col-span-2"
// //           >
// //             <Input.Password size="large" placeholder="Enter password" />
// //           </Form.Item>
// //         )}

// //         {/* Phone */}
// //         <Form.Item
// //           label="Phone"
// //           name="phone"
// //           rules={[
// //             { required: true },
// //             { pattern: /^[6-9]\d{9}$/, message: "Invalid phone number" },
// //           ]}
// //         >
// //           <Input size="large" maxLength={10} placeholder="Enter phone number" />
// //         </Form.Item>

// //         {/* Address */}
// //         <Form.Item
// //           label="Address"
// //           name="address"
// //           rules={[{ required: true, min: 5, message: "Enter valid address" }]}
// //           className="sm:col-span-2"
// //         >
// //           <Input size="large" placeholder="Enter address" />
// //         </Form.Item>

// //         {/* Status */}
// //         <Form.Item label="Status" name="status" rules={[{ required: true }]}>
// //           <Select size="large">
// //             <Option value="active">Active</Option>
// //             <Option value="inactive">Inactive</Option>
// //           </Select>
// //         </Form.Item>

// //         {/* Subscription */}
// //         <Form.Item
// //           label="Subscription Period"
// //           name="subscriptionPeriod"
// //           rules={[{ required: true }]}
// //         >
// //           <Select size="large" onChange={handleSubscriptionChange}>
// //             <Option value="halfyearly">
// //               <Tag color="blue">Half-Yearly</Tag>
// //             </Option>
// //             <Option value="yearly">
// //               <Tag color="green">Yearly</Tag>
// //             </Option>
// //           </Select>
// //         </Form.Item>

// //         {/* Custom Date */}
// //         {isCustom && (
// //           <Form.Item
// //             label="Custom End Date"
// //             name="customDate"
// //             rules={[{ required: true, message: "Select end date" }]}
// //           >
// //             <DatePicker size="large" style={{ width: "100%" }} />
// //           </Form.Item>
// //         )}

// //         {/* No of Chairs */}
// //         <Form.Item
// //           label="Number of Chairs"
// //           name="noOfChairs"
// //           rules={[
// //             { required: true },
// //             {
// //               validator: (_, value) =>
// //                 value > 0
// //                   ? Promise.resolve()
// //                   : Promise.reject("Minimum 1 chair required"),
// //             },
// //           ]}
// //         >
// //           <InputNumber
// //             min={1}
// //             size="large"
// //             style={{ width: "100%" }}
// //             placeholder="Enter number of chairs"
// //           />
// //         </Form.Item>

// //         {/* Image */}
// //         <Form.Item
// //           label="Image"
// //           name="image"
// //           valuePropName="fileList"
// //           getValueFromEvent={(e: any) => e?.fileList}
// //           rules={[
// //             {
// //               validator: (_, fileList) => {
// //                 if (isEditMode) return Promise.resolve();
// //                 if (!fileList?.length) return Promise.reject("Upload image");
// //                 return Promise.resolve();
// //               },
// //             },
// //           ]}
// //           className="sm:col-span-2"
// //         >
// //           <Upload
// //             beforeUpload={() => false}
// //             listType="picture-card"
// //             maxCount={1}
// //           >
// //             <UploadOutlined />
// //           </Upload>
// //         </Form.Item>

// //         {/* Submit */}
// //         <div className="sm:col-span-2 text-right">
// //           <Button type="primary" htmlType="submit" size="large" loading={loading}>
// //             {isEditMode ? "Update" : "Create"}
// //           </Button>
// //         </div>
// //       </Form>
// //     </div>
// //   );
// // };

// // export default UserForm;

// import React, { useEffect, useState } from "react";
// import {
//   Form,
//   Input,
//   Select,
//   Upload,
//   Button,
//   DatePicker,
//   InputNumber,
//   Card,
//   Row,
//   Col,
//   Space,
//   Tag,
// } from "antd";
// import { UploadOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";

// const { Option } = Select;

// interface UserFormProps {
//   initialValues?: any;
//   onSubmit: (values: any) => void;
//   isEditMode?: boolean;
//   loading?: boolean;
// }

// const UserForm: React.FC<UserFormProps> = ({
//   initialValues,
//   onSubmit,
//   isEditMode = false,
//   loading = false,
// }) => {
//   const [form] = Form.useForm();
//   const [isCustom, setIsCustom] = useState(false);

//   useEffect(() => {
//     if (initialValues?.subscriptionPeriod === "custom") setIsCustom(true);
//   }, [initialValues]);

//   const handleSubscriptionChange = (value: string) => {
//     setIsCustom(value === "custom");
//     if (value !== "custom") form.setFieldValue("customDate", undefined);
//   };

//   const handleFinish = (values: any) => {
//     let subscriptionStartDate = initialValues?.subscriptionStartDate;
//     let subscriptionEndDate = initialValues?.subscriptionEndDate;

//     if (!isEditMode) {
//       subscriptionStartDate = new Date().toISOString();
//       if (values.subscriptionPeriod === "halfyearly")
//         subscriptionEndDate = dayjs().add(6, "month").toISOString();
//       else if (values.subscriptionPeriod === "yearly")
//         subscriptionEndDate = dayjs().add(1, "year").toISOString();
//       else if (values.subscriptionPeriod === "custom")
//         subscriptionEndDate = values.customDate?.toISOString();
//     }

//     const payload = {
//       ...values,
//       firstName: values.firstName,
//       lastName: values.lastName,
//       noOfChairs: Number(values.noOfChairs),
//       isActive: values.status === "active",
//       subscriptionStartDate,
//       subscriptionEndDate,
//     };

//     onSubmit(payload);
//   };

//   const getInitialValues = () => {
//     if (!initialValues) return {};
//     return {
//       firstName: initialValues.firstName,
//       lastName: initialValues.lastName,
//       email: initialValues.email,
//       phone: initialValues.phone,
//       address: initialValues.address,
//       status: initialValues.isActive ? "active" : "inactive",
//       subscriptionPeriod: initialValues.subscriptionPeriod,
//       noOfChairs: initialValues.noOfChairs,
//       customDate: initialValues.subscriptionEndDate
//         ? dayjs(initialValues.subscriptionEndDate)
//         : undefined,
//     };
//   };

//   return (
//     <Card className="shadow-lg rounded-2xl p-6">
//       <Form
//         form={form}
//         layout="vertical"
//         initialValues={getInitialValues()}
//         onFinish={handleFinish}
//         className="space-y-6"
//       >
//         <Row gutter={24}>
//           {/* Left Column */}
//           <Col xs={24} sm={12} className="space-y-4">
//             <Form.Item
//               label="First Name"
//               name="firstName"
//               rules={[{ required: true, message: "First name required" }]}
//             >
//               <Input size="large" placeholder="Enter first name" prefix={<UserOutlined />} />
//             </Form.Item>

//             <Form.Item
//               label="Last Name"
//               name="lastName"
//               rules={[{ required: true, message: "Last name required" }]}
//             >
//               <Input size="large" placeholder="Enter last name" prefix={<UserOutlined />} />
//             </Form.Item>

//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[
//                 { required: true, message: "Email required" },
//                 { type: "email", message: "Invalid email" },
//               ]}
//             >
//               <Input size="large" placeholder="Enter email" prefix={<MailOutlined />} />
//             </Form.Item>

//             {!isEditMode && (
//               <Form.Item
//                 label="Password"
//                 name="password"
//                 rules={[
//                   { required: true, message: "Password required" },
//                   {
//                     pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
//                     message: "1 uppercase & 1 number required",
//                   },
//                 ]}
//               >
//                 <Input.Password size="large" placeholder="Enter password" />
//               </Form.Item>
//             )}

//             <Form.Item
//               label="Phone"
//               name="phone"
//               rules={[
//                 { required: true },
//                 { pattern: /^[6-9]\d{9}$/, message: "Invalid phone number" },
//               ]}
//             >
//               <Input size="large" placeholder="Enter phone number" prefix={<PhoneOutlined />} />
//             </Form.Item>

//             <Form.Item
//               label="Address"
//               name="address"
//               rules={[{ required: true, min: 5, message: "Enter valid address" }]}
//             >
//               <Input size="large" placeholder="Enter address" />
//             </Form.Item>

//             <Form.Item label="Status" name="status" rules={[{ required: true }]}>
//               <Select size="large">
//                 <Option value="active">Active</Option>
//                 <Option value="inactive">Inactive</Option>
//               </Select>
//             </Form.Item>
//           </Col>

//           {/* Right Column */}
//           <Col xs={24} sm={12} className="space-y-4">
//             <Form.Item
//               label="Subscription Period"
//               name="subscriptionPeriod"
//               rules={[{ required: true }]}
//             >
//               <Select size="large" onChange={handleSubscriptionChange}>
//                 <Option value="halfyearly">
//                   <Tag color="blue">Half-Yearly</Tag>
//                 </Option>
//                 <Option value="yearly">
//                   <Tag color="green">Yearly</Tag>
//                 </Option>
//               </Select>
//             </Form.Item>

//             {isCustom && (
//               <Form.Item
//                 label="Custom End Date"
//                 name="customDate"
//                 rules={[{ required: true, message: "Select end date" }]}
//               >
//                 <DatePicker size="large" style={{ width: "100%" }} />
//               </Form.Item>
//             )}

//             <Form.Item
//               label="Number of Chairs"
//               name="noOfChairs"
//               rules={[
//                 { required: true },
//                 {
//                   validator: (_, value) =>
//                     value > 0
//                       ? Promise.resolve()
//                       : Promise.reject("Minimum 1 chair required"),
//                 },
//               ]}
//             >
//               <InputNumber
//                 min={1}
//                 size="large"
//                 placeholder="Enter number of chairs"
//                 style={{ width: "100%" }}
//               />
//             </Form.Item>

//             <Form.Item
//               label="Upload Image"
//               name="image"
//               valuePropName="fileList"
//               getValueFromEvent={(e: any) => e?.fileList}
//             >
//               <Upload
//                 beforeUpload={() => false}
//                 listType="picture-card"
//                 maxCount={1}
//                 style={{ width: "100%" }}
//               >
//                 <UploadOutlined /> Upload
//               </Upload>
//             </Form.Item>
//           </Col>
//         </Row>

//         <div className="text-right">
//           <Button type="primary" htmlType="submit" size="large" loading={loading}>
//             {isEditMode ? "Update User" : "Create User"}
//           </Button>
//         </div>
//       </Form>
//     </Card>
//   );
// };

// export default UserForm;

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  DatePicker,
  InputNumber,
  Card,
  Row,
  Col,
  Tag,
} from "antd";
import { UploadOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

interface UserFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  isEditMode?: boolean;
  loading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  isEditMode = false,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    if (initialValues?.subscriptionPeriod === "custom") setIsCustom(true);
  }, [initialValues]);

  const handleSubscriptionChange = (value: string) => {
    setIsCustom(value === "custom");
    if (value !== "custom") form.setFieldValue("customDate", undefined);
  };

  const handleFinish = (values: any) => {
    let subscriptionStartDate = initialValues?.subscriptionStartDate;
    let subscriptionEndDate = initialValues?.subscriptionEndDate;

    if (!isEditMode) {
      subscriptionStartDate = new Date().toISOString();
      if (values.subscriptionPeriod === "halfyearly")
        subscriptionEndDate = dayjs().add(6, "month").toISOString();
      else if (values.subscriptionPeriod === "yearly")
        subscriptionEndDate = dayjs().add(1, "year").toISOString();
      else if (values.subscriptionPeriod === "custom")
        subscriptionEndDate = values.customDate?.toISOString();
    }

    const payload = {
      ...values,
      noOfChairs: Number(values.noOfChairs),
      isActive: values.status === "active",
      subscriptionStartDate,
      subscriptionEndDate,
    };

    onSubmit(payload);
  };

  const getInitialValues = () => {
    if (!initialValues) return {};
    return {
      fullName: initialValues.fullName,
      email: initialValues.email,
      phone: initialValues.phone,
      address: initialValues.address,
      status: initialValues.isActive ? "active" : "inactive",
      subscriptionPeriod: initialValues.subscriptionPeriod,
      noOfChairs: initialValues.noOfChairs,
      customDate: initialValues.subscriptionEndDate
        ? dayjs(initialValues.subscriptionEndDate)
        : undefined,
    };
  };

  return (
    <Card className="shadow-lg rounded-2xl p-6">
      <Form
        form={form}
        layout="vertical"
        initialValues={getInitialValues()}
        onFinish={handleFinish}
        className="space-y-6"
      >
        <Row gutter={24}>
          {/* Left Column */}
          <Col xs={24} sm={12} className="space-y-4">
            {/* Full Name */}
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Full name is required" },
                { min: 3, message: "Minimum 3 characters required" },
              ]}
            >
              <Input size="large" placeholder="Enter full name" prefix={<UserOutlined />} />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input size="large" placeholder="Enter email" prefix={<MailOutlined />} />
            </Form.Item>

            {/* Password */}
            {!isEditMode && (
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password is required" },
                  {
                    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message: "1 uppercase & 1 number required",
                  },
                ]}
              >
                <Input.Password size="large" placeholder="Enter password" />
              </Form.Item>
            )}

            {/* Phone */}
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true },
                { pattern: /^[6-9]\d{9}$/, message: "Invalid phone number" },
              ]}
            >
              <Input size="large" placeholder="Enter phone number" prefix={<PhoneOutlined />} />
            </Form.Item>

            {/* Address */}
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, min: 5, message: "Enter valid address" }]}
            >
              <Input size="large" placeholder="Enter address" />
            </Form.Item>

            {/* Status */}
            <Form.Item label="Status" name="status" rules={[{ required: true }]}>
              <Select size="large">
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Right Column */}
          <Col xs={24} sm={12} className="space-y-4">
            {/* Subscription */}
            <Form.Item
              label="Subscription Period"
              name="subscriptionPeriod"
              rules={[{ required: true }]}
            >
              <Select size="large" onChange={handleSubscriptionChange}>
                <Option value="halfyearly">
                  <Tag color="blue">Half-Yearly</Tag>
                </Option>
                <Option value="yearly">
                  <Tag color="green">Yearly</Tag>
                </Option>
              </Select>
            </Form.Item>

            {isCustom && (
              <Form.Item
                label="Custom End Date"
                name="customDate"
                rules={[{ required: true, message: "Select end date" }]}
              >
                <DatePicker size="large" style={{ width: "100%" }} />
              </Form.Item>
            )}

            {/* Number of Chairs */}
            <Form.Item
              label="Number of Chairs"
              name="noOfChairs"
              rules={[
                { required: true },
                {
                  validator: (_, value) =>
                    value > 0
                      ? Promise.resolve()
                      : Promise.reject("Minimum 1 chair required"),
                },
              ]}
            >
              <InputNumber
                min={1}
                size="large"
                placeholder="Enter number of chairs"
                style={{ width: "100%" }}
              />
            </Form.Item>

            {/* Image */}
            <Form.Item
              label="Upload Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => e?.fileList}
            >
              <Upload
                beforeUpload={() => false}
                listType="picture-card"
                maxCount={1}
                style={{ width: "100%" }}
              >
                <UploadOutlined /> Upload
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        {/* Submit Button */}
        <div className="text-right">
          <Button type="primary" htmlType="submit" size="large" loading={loading}>
            {isEditMode ? "Update User" : "Create User"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default UserForm;
