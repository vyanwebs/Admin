import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

interface Props {
  expiryDate: string; // e.g. "2025-01-31T00:00:00Z"
}

const SubscriptionTimer: React.FC<Props> = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const expiry = dayjs(expiryDate);
    const startCountdown = expiry.subtract(1, "month");

    const interval = setInterval(() => {
      const now = dayjs();

      if (now.isBefore(startCountdown)) {
        setTimeLeft(""); // timer not visible yet
        return;
      }

      const diff = expiry.diff(now);

      if (diff <= 0) {
        setTimeLeft(" Subscription expired");
        clearInterval(interval);
      } else {
        const dur = dayjs.duration(diff);
        setTimeLeft(
          `${dur.days()}d ${dur.hours()}h ${dur.minutes()}m ${dur.seconds()}s`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!timeLeft) return null; // hidden until 1 month before expiry

  return (
    <div
      style={{
        background: "#fff1f0",
        border: "1px solid #ffa39e",
        padding: "16px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ color: "#cf1322", margin: 0 }}>⏳ Subscription Expires In:</h3>
      <h2 style={{ color: "#cf1322", margin: 0 }}>{timeLeft}</h2>
    </div>
  );
};

export default SubscriptionTimer;
