import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../redux/Slice/authSlice";
import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";
import SubscriptionTimer from "./SubscriptionTimer";
import dayjs from "dayjs";
import { Card, Row, Col, Statistic, Typography } from "antd";
import type { IUser } from "../../redux/types/usera.types";

const { Title } = Typography;

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
    <div style={{ padding: "30px" }}>
      <Title level={2} style={{ marginBottom: 20 }}>
        Welcome, {user?.firstName || "Admin"}!
      </Title>

      {showTimer && expiryDate && (
        <Card
          style={{
            marginBottom: 30,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            background: "#fffbe6",
            cursor: "default",
          }}
        >
          <SubscriptionTimer expiryDate={expiryDate} />
        </Card>
      )}

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            onClick={() => navigate("/admin/totalusers")}
            style={{
              borderRadius: 12,
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <Statistic
              title="Total Users"
              value={normalUsers.length}
              valueStyle={{ color: "#1890ff", fontSize: 36 }}
            />
          </Card>
        </Col>

        {/* Future cards can be added here, e.g., total subadmins, active subscriptions */}
      </Row>
    </div>
  );
};

export default AdminDashboard;
