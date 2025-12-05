// // ====================== SubscriptionTimer.tsx ======================

// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import duration from "dayjs/plugin/duration";

// dayjs.extend(duration);

// interface Props {
//   expiryDate: string | null;
// }

// const SubscriptionTimer: React.FC<Props> = ({ expiryDate }) => {
//   const [timeLeft, setTimeLeft] = useState<string>("");

//   useEffect(() => {
//     if (!expiryDate) return;

//     const updateTimer = () => {
//       const now = dayjs();
//       const expiry = dayjs(expiryDate);

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

//     updateTimer(); // Run immediately
//     const interval = setInterval(updateTimer, 1000); // update every second

//     return () => clearInterval(interval);
//   }, [expiryDate]);

//   return (
//     <div
//       style={{
//         background: "#fff1f0",
//         border: "1px solid #ffa39e",
//         padding: "15px",
//         borderRadius: "12px",
//         marginBottom: "20px",
//       }}
//     >
//       <h3 style={{ margin: 0, color: "#cf1322" }}>⏳ Subscription Expires In:</h3>
//       <h2 style={{ margin: 0, color: "#cf1322" }}>{timeLeft}</h2>
//     </div>
//   );
// };

// export default SubscriptionTimer;


import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

interface Props {
  expiryDate: string | null;
}

const SubscriptionTimer: React.FC<Props> = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!expiryDate) return;

    const updateTimer = () => {
      const now = dayjs();
      const expiry = dayjs(expiryDate);

      const diff = expiry.diff(now);

      if (diff <= 0) {
        setTimeLeft("Subscription Expired");
        return;
      }

      const dur = dayjs.duration(diff);

      const days = Math.floor(dur.asDays());
      const hours = dur.hours();
      const minutes = dur.minutes();
      const seconds = dur.seconds();

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer(); 
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return (
    <div
      style={{
        background: "#fff1f0",
        border: "1px solid #ffa39e",
        padding: "15px",
        borderRadius: "12px",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ margin: 0, color: "#cf1322" }}>
        ⏳ Subscription Expires In:
      </h3>
      <h2 style={{ margin: 0, color: "#cf1322" }}>{timeLeft}</h2>
    </div>
  );
};

export default SubscriptionTimer;
