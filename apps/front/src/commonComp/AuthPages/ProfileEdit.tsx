// // // // import React, { useState, useEffect } from 'react';
// // // // import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// // // // import { updateUserProfile, updateProfile } from '../../redux/Slice/authSlice';
// // // // import { Form, Input, Button, Select, DatePicker, Switch, message, Card, Space } from 'antd';
// // // // import AvatarUpload from './AvatarUpload';
// // // // import dayjs from 'dayjs';
// // // // // import type { IUser, Gender, ThemePreference } from '../../redux/types/auth.types';

// // // // // const { TextArea } = Input;
// // // // const { Option } = Select;

// // // // const ProfileEdit: React.FC = () => {
// // // //   const dispatch = useAppDispatch();
// // // //   const { user, loading } = useAppSelector((state) => state.auth);
// // // //   const [form] = Form.useForm();
// // // //   const [avatarLoading, setAvatarLoading] = useState(false);

// // // //   // Set form initial values
// // // //   // useEffect(() => {
// // // //   //   console.log(avatarLoading)
// // // //   //   if (user) {
// // // //   //     form.setFieldsValue({
// // // //   //       ...user,
// // // //   //       dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
// // // //   //       // Handle nested preferences
// // // //   //       ...(user.preferences ? {
// // // //   //         theme: user.preferences.theme,
// // // //   //         language: user.preferences.language,
// // // //   //         emailNotifications: user.preferences.notifications?.email,
// // // //   //         pushNotifications: user.preferences.notifications?.push,
// // // //   //         smsNotifications: user.preferences.notifications?.sms,
// // // //   //       } : {})
// // // //   //     });
// // // //   //   }
// // // //   // }, [user, form]);

// // // // useEffect(() => {
// // // //   if (!user) return;

// // // //   form.setFieldsValue({
// // // //     firstName: user.firstName,
// // // //     lastName: user.lastName,
// // // //     email: user.email,
// // // //     phone: user.phone,
// // // //     role: user.role,
// // // //     isVerified: user.isVerified,
// // // //     isActive: user.isActive,
// // // //     subscriptionType: user.subscriptionType,
// // // //     subscriptionStatus: user.subscriptionStatus,
// // // //     gender: user.gender,
// // // //     dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
// // // //   });
// // // //   // ❗ run ONLY once when user id changes
// // // // }, [user?.id]);



// // // //   const handleAvatarUpload = async (file: File) => {
// // // //     try {
// // // //       setAvatarLoading(true);
// // // //       const formData = new FormData();
// // // //       formData.append('avatar', file);
// // // //       await dispatch(updateProfile(formData)).unwrap();
// // // //       message.success('Avatar updated successfully');
// // // //     } catch (error) {
// // // //       message.error('Failed to update avatar');
// // // //     } finally {
// // // //       setAvatarLoading(false);
// // // //     }
// // // //   };

// // // //   const onFinish = async (values: any) => {
// // // //     try {
// // // //       // Transform the values to match the API expected format
// // // //       const payload = {
// // // //         ...values,
// // // //         dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : undefined,
// // // //         preferences: {
// // // //           theme: values.theme,
// // // //           language: values.language,
// // // //           notifications: {
// // // //             email: values.emailNotifications,
// // // //             push: values.pushNotifications,
// // // //             sms: values.smsNotifications
// // // //           }
// // // //         }
// // // //       };

// // // //       await dispatch(updateUserProfile(payload)).unwrap();
// // // //       message.success('Profile updated successfully');
// // // //     } catch (error) {
// // // //       message.error('Failed to update profile');
// // // //     }
// // // //   };

// // // //   // Fields that should be disabled for editing
// // // // //   const disabledFields = ['email', 'role', 'isVerified', 'isActive', 'subscriptionType', 'subscriptionStatus'];

// // // //   return (
// // // //     <Card title="Edit Profile" className="p-0">
// // // //       <div className="w-full flex flex-col justify-center items-center">
// // // //         {/* Left Column - Avatar */}
// // // //         <div className="w-full md:w-1/3 flex flex-col items-center">
// // // //           <AvatarUpload
// // // //             currentAvatar={typeof user?.avatar === 'string' ? user.avatar : user?.avatar?.url}
// // // //             onUpload={handleAvatarUpload}
// // // //             size={150}
// // // //           />
// // // //           <p className="mt-4 text-gray-500 text-center">
// // // //             Click on the avatar to upload a new image
// // // //           </p>
// // // //         </div>

// // // //         {/* Right Column - Form */}
// // // //         <div className="w-full md:w-2/3">
// // // //           <Form
// // // //             form={form}
// // // //             layout="vertical"
// // // //             onFinish={onFinish}
// // // //             className='p-0'
// // // //             initialValues={{
// // // //               theme: 'light',
// // // //               language: 'en',
// // // //               emailNotifications: true,
// // // //               pushNotifications: false,
// // // //               smsNotifications: false
// // // //             }}
// // // //           >
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // // //               {/* Basic Information */}
// // // //               <Form.Item
// // // //                 label="First Name"
// // // //                 name="firstName"
// // // //                 rules={[{ required: true, message: 'Please input your first name!' }]}
// // // //               >
// // // //                 <Input />
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="Last Name"
// // // //                 name="lastName"
// // // //                 rules={[{ required: true, message: 'Please input your last name!' }]}
// // // //               >
// // // //                 <Input />
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="Email"
// // // //                 name="email"
// // // //               >
// // // //                 <Input disabled />
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="Phone"
// // // //                 name="phone"
// // // //               >
// // // //                 <Input />
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="Date of Birth"
// // // //                 name="dateOfBirth"
// // // //               >
// // // //                 <DatePicker className="w-full" />
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="Gender"
// // // //                 name="gender"
// // // //               >
// // // //                 <Select>
// // // //                   <Option value="male">Male</Option>
// // // //                   <Option value="female">Female</Option>
// // // //                   <Option value="other">Other</Option>
// // // //                   <Option value="prefer-not-to-say">Prefer not to say</Option>
// // // //                 </Select>
// // // //               </Form.Item>

// // // //               {/* Account Information (disabled) */}
// // // //               <Form.Item
// // // //                 label="Role"
// // // //                 name="role"
// // // //               >
// // // //                 <Input disabled />
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="Verified"
// // // //                 name="isVerified"
// // // //                 valuePropName="checked"
// // // //               >
// // // //                 <Switch disabled />
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="Account Status"
// // // //                 name="isActive"
// // // //                 valuePropName="checked"
// // // //               >
// // // //                 <Switch disabled />
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="Subscription Type"
// // // //                 name="subscriptionType"
// // // //               >
// // // //                 <Input disabled />
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="Subscription Status"
// // // //                 name="subscriptionStatus"
// // // //               >
// // // //                 <Input disabled />
// // // //               </Form.Item>
// // // //             </div>

// // // //             {/* <Divider orientation="left">Preferences</Divider>

// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //               <Form.Item
// // // //                 label="Theme"
// // // //                 name="theme"
// // // //               >
// // // //                 <Select>
// // // //                   <Option value="light">Light</Option>
// // // //                   <Option value="dark">Dark</Option>
// // // //                   <Option value="system">System</Option>
// // // //                 </Select>
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="Language"
// // // //                 name="language"
// // // //               >
// // // //                 <Input />
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="Email Notifications"
// // // //                 name="emailNotifications"
// // // //                 valuePropName="checked"
// // // //               >
// // // //                 <Switch />
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="Push Notifications"
// // // //                 name="pushNotifications"
// // // //                 valuePropName="checked"
// // // //               >
// // // //                 <Switch />
// // // //               </Form.Item>

// // // //               <Form.Item
// // // //                 label="SMS Notifications"
// // // //                 name="smsNotifications"
// // // //                 valuePropName="checked"
// // // //               >
// // // //                 <Switch />
// // // //               </Form.Item>
// // // //             </div>

// // // //             <Form.Item
// // // //               label="Bio"
// // // //               name="bio"
// // // //             >
// // // //               <TextArea rows={4} />
// // // //             </Form.Item> */}

// // // //             <Form.Item>
// // // //               <Space>
// // // //                 <Button 
// // // //                   type="primary" 
// // // //                   htmlType="submit" 
// // // //                   loading={loading}
// // // //                 >
// // // //                   Update Profile
// // // //                 </Button>
// // // //                 <Button htmlType="button" onClick={() => form.resetFields()}>
// // // //                   Reset
// // // //                 </Button>
// // // //               </Space>
// // // //             </Form.Item>
// // // //           </Form>
// // // //         </div>
// // // //       </div>
// // // //     </Card>
// // // //   );
// // // // };

// // // // export default ProfileEdit;


// // // import React, { useEffect, useState } from "react";
// // // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // // import { updateUserProfile, updateProfile } from "../../redux/Slice/authSlice";
// // // import {
// // //   Form,
// // //   Input,
// // //   Button,
// // //   Select,
// // //   DatePicker,
// // //   Switch,
// // //   message,
// // //   Card,
// // //   Space,
// // // } from "antd";
// // // import AvatarUpload from "./AvatarUpload";
// // // import dayjs from "dayjs";

// // // const { Option } = Select;

// // // const ProfileEdit: React.FC = () => {
// // //   const dispatch = useAppDispatch();
// // //   const { user, loading } = useAppSelector((state) => state.auth);
// // //   const [form] = Form.useForm();
// // //   const [avatarLoading, setAvatarLoading] = useState(false);

// // //   /* ===========================
// // //      SET FORM VALUES (ONCE)
// // //      =========================== */
// // //   useEffect(() => {
// // //     if (!user?.id) return;

// // //     form.setFieldsValue({
// // //       firstName: user.firstName || "",
// // //       lastName: user.lastName || "",
// // //       email: user.email || "",
// // //       phone: user.phone || "",
// // //       gender: user.gender || undefined,
// // //       role: user.role || "",
// // //       isVerified: user.isVerified || false,
// // //       isActive: user.isActive || false,
// // //       subscriptionType: user.subscriptionType || "",
// // //       subscriptionStatus: user.subscriptionStatus || "",
// // //       dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,

// // //       // preferences (safe defaults)
// // //       theme: user.preferences?.theme ?? "light",
// // //       language: user.preferences?.language ?? "en",
// // //       emailNotifications: user.preferences?.notifications?.email ?? true,
// // //       pushNotifications: user.preferences?.notifications?.push ?? false,
// // //       smsNotifications: user.preferences?.notifications?.sms ?? false,
// // //     });
// // //   }, [user?.id]); // 🔥 VERY IMPORTANT

// // //   /* ===========================
// // //      AVATAR UPLOAD
// // //      =========================== */
// // //   const handleAvatarUpload = async (file: File) => {
// // //     try {
// // //       setAvatarLoading(true);
// // //       const formData = new FormData();
// // //       formData.append("avatar", file);

// // //       await dispatch(updateProfile(formData)).unwrap();
// // //       message.success("Avatar updated successfully");
// // //     } catch (error) {
// // //       message.error("Failed to update avatar");
// // //     } finally {
// // //       setAvatarLoading(false);
// // //     }
// // //   };

// // //   /* ===========================
// // //      FORM SUBMIT
// // //      =========================== */
// // //   const onFinish = async (values: any) => {
// // //     try {
// // //       const payload = {
// // //         firstName: values.firstName,
// // //         lastName: values.lastName,
// // //         phone: values.phone,
// // //         gender: values.gender,
// // //         dateOfBirth: values.dateOfBirth
// // //           ? values.dateOfBirth.toISOString()
// // //           : undefined,
// // //         preferences: {
// // //           theme: values.theme,
// // //           language: values.language,
// // //           notifications: {
// // //             email: values.emailNotifications,
// // //             push: values.pushNotifications,
// // //             sms: values.smsNotifications,
// // //           },
// // //         },
// // //       };

// // //       await dispatch(updateUserProfile(payload)).unwrap();
// // //       message.success("Profile updated successfully");
// // //     } catch (error) {
// // //       message.error("Failed to update profile");
// // //     }
// // //   };

// // //   return (
// // //     <Card title="Edit Profile">
// // //       <div className="w-full flex flex-col items-center gap-6">
// // //         {/* Avatar */}
// // //         <AvatarUpload
// // //           currentAvatar={
// // //             typeof user?.avatar === "string"
// // //               ? user.avatar
// // //               : user?.avatar?.url
// // //           }
// // //           onUpload={handleAvatarUpload}
// // //           loading={avatarLoading}
// // //           size={150}
// // //         />

// // //         {/* Form */}
// // //         <Form
// // //           form={form}
// // //           layout="vertical"
// // //           onFinish={onFinish}
// // //           className="w-full"
// // //         >
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // //             <Form.Item
// // //               label="First Name"
// // //               name="firstName"
// // //               rules={[{ required: true, message: "First name is required" }]}
// // //             >
// // //               <Input />
// // //             </Form.Item>

// // //             <Form.Item
// // //               label="Last Name"
// // //               name="lastName"
// // //               rules={[{ required: true, message: "Last name is required" }]}
// // //             >
// // //               <Input />
// // //             </Form.Item>

// // //             <Form.Item label="Email" name="email">
// // //               <Input disabled />
// // //             </Form.Item>

// // //             <Form.Item label="Phone" name="phone">
// // //               <Input />
// // //             </Form.Item>

// // //             <Form.Item label="Date of Birth" name="dateOfBirth">
// // //               <DatePicker className="w-full" />
// // //             </Form.Item>

// // //             <Form.Item label="Gender" name="gender">
// // //               <Select allowClear>
// // //                 <Option value="male">Male</Option>
// // //                 <Option value="female">Female</Option>
// // //                 <Option value="other">Other</Option>
// // //               </Select>
// // //             </Form.Item>

// // //             <Form.Item label="Role" name="role">
// // //               <Input disabled />
// // //             </Form.Item>

// // //             <Form.Item
// // //               label="Verified"
// // //               name="isVerified"
// // //               valuePropName="checked"
// // //             >
// // //               <Switch disabled />
// // //             </Form.Item>

// // //             <Form.Item
// // //               label="Account Active"
// // //               name="isActive"
// // //               valuePropName="checked"
// // //             >
// // //               <Switch disabled />
// // //             </Form.Item>

// // //             <Form.Item label="Subscription Type" name="subscriptionType">
// // //               <Input disabled />
// // //             </Form.Item>

// // //             <Form.Item label="Subscription Status" name="subscriptionStatus">
// // //               <Input disabled />
// // //             </Form.Item>
// // //           </div>

// // //           <Form.Item className="mt-6">
// // //             <Space>
// // //               <Button
// // //                 type="primary"
// // //                 htmlType="submit"
// // //                 loading={loading}
// // //               >
// // //                 Update Profile
// // //               </Button>

// // //               <Button onClick={() => form.resetFields()}>
// // //                 Reset
// // //               </Button>
// // //             </Space>
// // //           </Form.Item>
// // //         </Form>
// // //       </div>
// // //     </Card>
// // //   );
// // // };

// // // export default ProfileEdit;

// // import React, { useEffect, useState } from "react";
// // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // import { updateUserProfile, updateProfile } from "../../redux/Slice/authSlice";
// // import {
// //   Form,
// //   Input,
// //   Button,
// //   Select,
// //   DatePicker,
// //   Switch,
// //   message,
// //   Card,
// //   Space,
// // } from "antd";
// // import AvatarUpload from "./AvatarUpload";
// // import dayjs from "dayjs";

// // const { Option } = Select;

// // const ProfileEdit: React.FC = () => {
// //   const dispatch = useAppDispatch();
// //   const { user, loading } = useAppSelector((state) => state.auth);
// //   const [form] = Form.useForm();
// //   const [avatarLoading, setAvatarLoading] = useState(false);

// //   /* ===========================
// //      SET FORM VALUES (ONCE)
// //      =========================== */
// //   useEffect(() => {
// //     if (!user?.id) return;

// //     form.setFieldsValue({
// //       firstName: user.firstName || "",
// //       lastName: user.lastName || "",
// //       email: user.email || "",
// //       phone: user.phone || "",
// //       gender: user.gender || undefined,
// //       role: user.role || "",
// //       isVerified: user.isVerified || false,
// //       isActive: user.isActive || false,
// //       subscriptionType: user.subscriptionType || "",
// //       subscriptionStatus: user.subscriptionStatus || "",
// //       dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,

// //       // preferences (safe defaults)
// //       theme: user.preferences?.theme ?? "light",
// //       language: user.preferences?.language ?? "en",
// //       emailNotifications: user.preferences?.notifications?.email ?? true,
// //       pushNotifications: user.preferences?.notifications?.push ?? false,
// //       smsNotifications: user.preferences?.notifications?.sms ?? false,
// //     });
// //   }, [user?.id]); // 🔥 VERY IMPORTANT

// //   /* ===========================
// //      AVATAR UPLOAD
// //      =========================== */
// //   const handleAvatarUpload = async (file: File) => {
// //     try {
// //       setAvatarLoading(true);
// //       const formData = new FormData();
// //       formData.append("avatar", file);

// //       await dispatch(updateProfile(formData)).unwrap();
// //       message.success("Avatar updated successfully");
// //     } catch (error) {
// //       message.error("Failed to update avatar");
// //     } finally {
// //       setAvatarLoading(false);
// //     }
// //   };

// //   /* ===========================
// //      FORM SUBMIT
// //      =========================== */
// //   const onFinish = async (values: any) => {
// //     try {
// //       const payload = {
// //         firstName: values.firstName,
// //         lastName: values.lastName,
// //         phone: values.phone,
// //         gender: values.gender,
// //         dateOfBirth: values.dateOfBirth
// //           ? values.dateOfBirth.toISOString()
// //           : undefined,
// //         preferences: {
// //           theme: values.theme,
// //           language: values.language,
// //           notifications: {
// //             email: values.emailNotifications,
// //             push: values.pushNotifications,
// //             sms: values.smsNotifications,
// //           },
// //         },
// //       };

// //       await dispatch(updateUserProfile(payload)).unwrap();
// //       message.success("Profile updated successfully");
// //     } catch (error) {
// //       message.error("Failed to update profile");
// //     }
// //   };

// //   return (
// //     <Card title="Edit Profile">
// //       <div className="w-full flex flex-col items-center gap-6">
// //         {/* Avatar */}
// //         <AvatarUpload
// //           currentAvatar={
// //             typeof user?.avatar === "string"
// //               ? user.avatar
// //               : user?.avatar?.url
// //           }
// //           onUpload={handleAvatarUpload}
// //           loading={avatarLoading}
// //           size={150}
// //         />

// //         {/* Form */}
// //         <Form
// //           form={form}
// //           layout="vertical"
// //           onFinish={onFinish}
// //           className="w-full"
// //         >
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //             <Form.Item
// //               label="First Name"
// //               name="firstName"
// //               rules={[{ required: true, message: "First name is required" }]}
// //             >
// //               <Input />
// //             </Form.Item>

// //             <Form.Item
// //               label="Last Name"
// //               name="lastName"
// //               rules={[{ required: true, message: "Last name is required" }]}
// //             >
// //               <Input />
// //             </Form.Item>

// //             <Form.Item label="Email" name="email">
// //               <Input disabled />
// //             </Form.Item>

// //             <Form.Item label="Phone" name="phone">
// //               <Input />
// //             </Form.Item>

// //             <Form.Item label="Date of Birth" name="dateOfBirth">
// //               <DatePicker className="w-full" />
// //             </Form.Item>

// //             <Form.Item label="Gender" name="gender">
// //               <Select allowClear>
// //                 <Option value="male">Male</Option>
// //                 <Option value="female">Female</Option>
// //                 <Option value="other">Other</Option>
// //               </Select>
// //             </Form.Item>

// //             <Form.Item label="Role" name="role">
// //               <Input disabled />
// //             </Form.Item>

// //             <Form.Item
// //               label="Verified"
// //               name="isVerified"
// //               valuePropName="checked"
// //             >
// //               <Switch disabled />
// //             </Form.Item>

// //             <Form.Item
// //               label="Account Active"
// //               name="isActive"
// //               valuePropName="checked"
// //             >
// //               <Switch disabled />
// //             </Form.Item>

// //             <Form.Item label="Subscription Type" name="subscriptionType">
// //               <Input disabled />
// //             </Form.Item>

// //             <Form.Item label="Subscription Status" name="subscriptionStatus">
// //               <Input disabled />
// //             </Form.Item>
// //           </div>

// //           <Form.Item className="mt-6">
// //             <Space>
// //               <Button
// //                 type="primary"
// //                 htmlType="submit"
// //                 loading={loading}
// //               >
// //                 Update Profile
// //               </Button>

// //               <Button onClick={() => form.resetFields()}>
// //                 Reset
// //               </Button>
// //             </Space>
// //           </Form.Item>
// //         </Form>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default ProfileEdit;



// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { updateUserProfile, updateProfile } from "../../redux/Slice/authSlice";
// import {
//   Form,
//   Input,
//   Button,
//   Select,
//   DatePicker,
//   Switch,
//   message,
//   Card,
//   Space,
// } from "antd";
// import AvatarUpload from "./AvatarUpload";
// import dayjs from "dayjs";

// const { Option } = Select;

// const ProfileEdit: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { user, loading } = useAppSelector((state) => state.auth);
//   const [form] = Form.useForm();
//   const [avatarLoading, setAvatarLoading] = useState(false);

//   /* ===========================
//      SET FORM VALUES (ON LOAD)
//      =========================== */
//   useEffect(() => {
//     if (!user?.id) return;

//     form.setFieldsValue({
//       fullName:
//         user.fullName ||
//         `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),

//       firstName: user.firstName || "",
//       lastName: user.lastName || "",
//       email: user.email || "",
//       phone: user.phone || "",
//       gender: user.gender || undefined,
//       role: user.role || "",
//       isVerified: user.isVerified ?? false,
//       isActive: user.isActive ?? false,
//       subscriptionType: user.subscriptionType || "",
//       subscriptionStatus: user.subscriptionStatus || "",
//       dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
//     });
//   }, [user?.id, form]);

//   /* ===========================
//      AUTO UPDATE FULL NAME
//      =========================== */
//   const firstName = Form.useWatch("firstName", form);
//   const lastName = Form.useWatch("lastName", form);

//   useEffect(() => {
//     if (firstName || lastName) {
//       form.setFieldsValue({
//         fullName: `${firstName ?? ""} ${lastName ?? ""}`.trim(),
//       });
//     }
//   }, [firstName, lastName, form]);

//   /* ===========================
//      AVATAR UPLOAD
//      =========================== */
//   const handleAvatarUpload = async (file: File) => {
//     try {
//       setAvatarLoading(true);
//       const formData = new FormData();
//       formData.append("avatar", file);

//       await dispatch(updateProfile(formData)).unwrap();
//       message.success("Avatar updated successfully");
//     } catch {
//       message.error("Failed to update avatar");
//     } finally {
//       setAvatarLoading(false);
//     }
//   };

//   /* ===========================
//      FORM SUBMIT
//      =========================== */
//   const onFinish = async (values: any) => {
//     try {
//       const payload = {
//         firstName: values.firstName,
//         lastName: values.lastName,
//         phone: values.phone,
//         gender: values.gender,
//         dateOfBirth: values.dateOfBirth
//           ? values.dateOfBirth.toISOString()
//           : undefined,
//       };

//       await dispatch(updateUserProfile(payload)).unwrap();
//       message.success("Profile updated successfully");
//     } catch {
//       message.error("Failed to update profile");
//     }
//   };

//   return (
//     <Card title="Edit Profile">
//       <div className="w-full flex flex-col items-center gap-6">
//         {/* Avatar */}
//         <AvatarUpload
//           currentAvatar={
//             typeof user?.avatar === "string"
//               ? user.avatar
//               : user?.avatar?.url
//           }
//           onUpload={handleAvatarUpload}
//           loading={avatarLoading}
//           size={150}
//         />

//         {/* Form */}
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//           className="w-full"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {/* Full Name (Read Only) */}
//             <Form.Item
//               label="Full Name"
//               name="fullName"
//               rules={[{ required: true }]}
//             >
//               <Input disabled />
//             </Form.Item>

//             <Form.Item
//               label="First Name"
//               name="firstName"
//               rules={[{ required: true, message: "First name is required" }]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="Last Name"
//               name="lastName"
//               rules={[{ required: true, message: "Last name is required" }]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item label="Email" name="email">
//               <Input disabled />
//             </Form.Item>

//             <Form.Item label="Phone" name="phone">
//               <Input />
//             </Form.Item>

//             <Form.Item label="Date of Birth" name="dateOfBirth">
//               <DatePicker className="w-full" />
//             </Form.Item>

//             <Form.Item label="Gender" name="gender">
//               <Select allowClear>
//                 <Option value="male">Male</Option>
//                 <Option value="female">Female</Option>
//                 <Option value="other">Other</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item label="Role" name="role">
//               <Input disabled />
//             </Form.Item>

//             <Form.Item
//               label="Verified"
//               name="isVerified"
//               valuePropName="checked"
//             >
//               <Switch disabled />
//             </Form.Item>

//             <Form.Item
//               label="Account Active"
//               name="isActive"
//               valuePropName="checked"
//             >
//               <Switch disabled />
//             </Form.Item>

//             <Form.Item label="Subscription Type" name="subscriptionType">
//               <Input disabled />
//             </Form.Item>

//             <Form.Item label="Subscription Status" name="subscriptionStatus">
//               <Input disabled />
//             </Form.Item>
//           </div>

//           <Form.Item className="mt-6">
//             <Space>
//               <Button type="primary" htmlType="submit" loading={loading}>
//                 Update Profile
//               </Button>

//               <Button onClick={() => form.resetFields()}>Reset</Button>
//             </Space>
//           </Form.Item>
//         </Form>
//       </div>
//     </Card>
//   );
// };

// export default ProfileEdit;



import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateUserProfile, updateProfile } from "../../redux/Slice/authSlice";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Switch,
  message,
  Card,
  Space,
} from "antd";
import AvatarUpload from "./AvatarUpload";
import dayjs from "dayjs";

const { Option } = Select;

const ProfileEdit: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [avatarLoading, setAvatarLoading] = useState(false);

  /* ===========================
     SET FORM VALUES
     =========================== */
  useEffect(() => {
    if (!user?._id) return;

    form.setFieldsValue({
      fullName:
        user.fullName ||
        `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      email: user.email || "",
      phone: user.phone || "",
      gender: user.gender || undefined,
      role: user.role || "",
      isVerified: user.isVerified ?? false,
      isActive: user.isActive ?? false,
      subscriptionType: user.subscriptionType || "",
      subscriptionStatus: user.subscriptionStatus || "",
      dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
    });
  }, [user?._id, form]);

  /* ===========================
     AVATAR UPLOAD
     =========================== */
  const handleAvatarUpload = async (file: File) => {
    try {
      setAvatarLoading(true);
      const formData = new FormData();
      formData.append("avatar", file);

      await dispatch(updateProfile(formData)).unwrap();
      message.success("Avatar updated successfully");
    } catch {
      message.error("Failed to update avatar");
    } finally {
      setAvatarLoading(false);
    }
  };

  /* ===========================
     FORM SUBMIT
     =========================== */
  const onFinish = async (values: any) => {
    try {
      const fullName: string = values.fullName.trim();

      // 🔥 Split full name for backend (NO backend change)
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      const payload = {
        firstName,
        lastName,
        phone: values.phone,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth
          ? values.dateOfBirth.toISOString()
          : undefined,
      };

      await dispatch(updateUserProfile(payload)).unwrap();
      message.success("Profile updated successfully");
    } catch {
      message.error("Failed to update profile");
    }
  };

  return (
    <Card title="Edit Profile">
      <div className="w-full flex flex-col items-center gap-6">
        {/* Avatar */}
        <AvatarUpload
          currentAvatar={
            typeof user?.avatar === "string"
              ? user.avatar
              : user?.avatar?.url
          }
          onUpload={handleAvatarUpload}
          loading={avatarLoading}
          size={150}
        />

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* ✅ ONLY FULL NAME */}
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Full name is required" },
              ]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>

            <Form.Item label="Date of Birth" name="dateOfBirth">
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item label="Gender" name="gender">
              <Select allowClear>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Role" name="role">
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Verified"
              name="isVerified"
              valuePropName="checked"
            >
              <Switch disabled />
            </Form.Item>

            <Form.Item
              label="Account Active"
              name="isActive"
              valuePropName="checked"
            >
              <Switch disabled />
            </Form.Item>

            <Form.Item label="Subscription Type" name="subscriptionType">
              <Input disabled />
            </Form.Item>

            <Form.Item label="Subscription Status" name="subscriptionStatus">
              <Input disabled />
            </Form.Item>
          </div>

          <Form.Item className="mt-6">
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update Profile
              </Button>

              <Button onClick={() => form.resetFields()}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default ProfileEdit;
