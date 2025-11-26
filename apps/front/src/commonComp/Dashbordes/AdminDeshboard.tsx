import React, { useEffect } from "react";
import { Card, Row, Col, Statistic, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
	fetchUsers,
	resetUserState,
} from "../../redux/Slice/useSliceForAdmin/userSlice";
import { UserOutlined, TeamOutlined, CrownOutlined } from "@ant-design/icons";
import SubscriptionTimer from "./SubscriptionTimer"; 
// import dayjs from "dayjs";
const AdminDashboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const { users, loading, error } = useAppSelector((state) => state.users);

	// ✅ assuming logged-in subadmin info stored in localStorage or Redux
	//const subAdmin = JSON.parse(localStorage.getItem("user") || "{}");
	//const expiryDate = subAdmin?.expireDate;
	const expiryDate = "2025-11-25T00:00:00.000Z"; 

	useEffect(() => {
		const req = dispatch(fetchUsers());
		return () => req.abort();
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(resetUserState());
		}
	}, [error, dispatch]);

	const totalUsers = users.length;
	const totalAdmins = users.filter((u) => u.role === "admin").length;
	const totalSubAdmins = users.filter(
		(u) => (u.role as string) === "subadmin"
	).length;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

			{/* ✅ Show Timer Only if expiryDate is available */}
			{expiryDate && <SubscriptionTimer expiryDate={expiryDate} />}

			<Row gutter={[16, 16]}>
				<Col xs={24} sm={12} md={8}>
					<Card bordered={false}>
						<Statistic
							title="Total Users"
							value={totalUsers}
							prefix={<UserOutlined />}
							loading={loading}
						/>
					</Card>
				</Col>
{/* 
				<Col xs={24} sm={12} md={8}>
					<Card bordered={false}>
						<Statistic
							title="Total Subadmins"
							value={totalSubAdmins}
							prefix={<TeamOutlined />}
							loading={loading}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={8}>
					<Card bordered={false}>
						<Statistic
							title="Total Admins"
							value={totalAdmins}
							prefix={<CrownOutlined />}
							loading={loading}
						/>
					</Card>
				</Col> */}
			</Row>
		</div>
	);
};

export default AdminDashboard;
