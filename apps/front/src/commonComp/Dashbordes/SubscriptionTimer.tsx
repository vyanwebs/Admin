// // // // // // ====================== SubscriptionTimer.tsx ======================

// // // // // import React, { useEffect, useState } from "react";
// // // // // import dayjs from "dayjs";
// // // // // import duration from "dayjs/plugin/duration";

// // // // // dayjs.extend(duration);

// // // // // interface Props {
// // // // //   expiryDate: string | null;
// // // // // }

// // // // // const SubscriptionTimer: React.FC<Props> = ({ expiryDate }) => {
// // // // //   const [timeLeft, setTimeLeft] = useState<string>("");

// // // // //   useEffect(() => {
// // // // //     if (!expiryDate) return;

// // // // //     const updateTimer = () => {
// // // // //       const now = dayjs();
// // // // //       const expiry = dayjs(expiryDate);

// // // // //       const diff = expiry.diff(now);

// // // // //       if (diff <= 0) {
// // // // //         setTimeLeft("Subscription Expired");
// // // // //         return;
// // // // //       }

// // // // //       const dur = dayjs.duration(diff);

// // // // //       const days = Math.floor(dur.asDays());
// // // // //       const hours = dur.hours();
// // // // //       const minutes = dur.minutes();
// // // // //       const seconds = dur.seconds();

// // // // //       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
// // // // //     };

// // // // //     updateTimer(); // Run immediately
// // // // //     const interval = setInterval(updateTimer, 1000); // update every second

// // // // //     return () => clearInterval(interval);
// // // // //   }, [expiryDate]);

// // // // //   return (
// // // // //     <div
// // // // //       style={{
// // // // //         background: "#fff1f0",
// // // // //         border: "1px solid #ffa39e",
// // // // //         padding: "15px",
// // // // //         borderRadius: "12px",
// // // // //         marginBottom: "20px",
// // // // //       }}
// // // // //     >
// // // // //       <h3 style={{ margin: 0, color: "#cf1322" }}>⏳ Subscription Expires In:</h3>
// // // // //       <h2 style={{ margin: 0, color: "#cf1322" }}>{timeLeft}</h2>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SubscriptionTimer;


// // // // import React, { useEffect, useState } from "react";
// // // // import dayjs from "dayjs";
// // // // import duration from "dayjs/plugin/duration";

// // // // dayjs.extend(duration);

// // // // interface Props {
// // // //   expiryDate: string | null;
// // // // }

// // // // const SubscriptionTimer: React.FC<Props> = ({ expiryDate }) => {
// // // //   const [timeLeft, setTimeLeft] = useState<string>("");

// // // //   useEffect(() => {
// // // //     if (!expiryDate) return;

// // // //     const updateTimer = () => {
// // // //       const now = dayjs();
// // // //       const expiry = dayjs(expiryDate);

// // // //       const diff = expiry.diff(now);

// // // //       if (diff <= 0) {
// // // //         setTimeLeft("Subscription Expired");
// // // //         return;
// // // //       }

// // // //       const dur = dayjs.duration(diff);

// // // //       const days = Math.floor(dur.asDays());
// // // //       const hours = dur.hours();
// // // //       const minutes = dur.minutes();
// // // //       const seconds = dur.seconds();

// // // //       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
// // // //     };

// // // //     updateTimer(); 
// // // //     const interval = setInterval(updateTimer, 1000);

// // // //     return () => clearInterval(interval);
// // // //   }, [expiryDate]);

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         background: "#fff1f0",
// // // //         border: "1px solid #ffa39e",
// // // //         padding: "15px",
// // // //         borderRadius: "12px",
// // // //         marginBottom: "20px",
// // // //       }}
// // // //     >
// // // //       <h3 style={{ margin: 0, color: "#cf1322" }}>
// // // //         ⏳ Subscription Expires In:
// // // //       </h3>
// // // //       <h2 style={{ margin: 0, color: "#cf1322" }}>{timeLeft}</h2>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SubscriptionTimer;

// // // import React, { useEffect, useState } from "react";
// // // import dayjs from "dayjs";

// // // interface Props {
// // //   expiryDate: string | null;
// // // }

// // // const SubscriptionTimer: React.FC<Props> = ({ expiryDate }) => {
// // //   const [timeLeft, setTimeLeft] = useState<string>("");

// // //   useEffect(() => {
// // //     if (!expiryDate) return;

// // //     const updateTimer = () => {
// // //       const now = dayjs();
// // //       const expiry = dayjs(expiryDate);

// // //       let diffInSeconds = expiry.diff(now, "second");

// // //       if (diffInSeconds <= 0) {
// // //         setTimeLeft("Subscription Expired");
// // //         return;
// // //       }

// // //       const days = Math.floor(diffInSeconds / (24 * 60 * 60));
// // //       diffInSeconds %= 24 * 60 * 60;

// // //       const hours = Math.floor(diffInSeconds / (60 * 60));
// // //       diffInSeconds %= 60 * 60;

// // //       const minutes = Math.floor(diffInSeconds / 60);
// // //       const seconds = diffInSeconds % 60;

// // //       setTimeLeft(
// // //         `${days}d ${hours.toString().padStart(2, "0")}h ` +
// // //         `${minutes.toString().padStart(2, "0")}m ` +
// // //         `${seconds.toString().padStart(2, "0")}s`
// // //       );
// // //     };

// // //     updateTimer();
// // //     const interval = setInterval(updateTimer, 1000);

// // //     return () => clearInterval(interval);
// // //   }, [expiryDate]);

// // //   return (
// // //     <div
// // //       style={{
// // //         background: "#fff1f0",
// // //         border: "1px solid #ffa39e",
// // //         padding: "15px",
// // //         borderRadius: "12px",
// // //         marginBottom: "20px",
// // //       }}
// // //     >
// // //       <h3 style={{ margin: 0, color: "#cf1322" }}>
// // //         ⏳ Subscription Expires In:
// // //       </h3>
// // //       <h2 style={{ margin: 0, color: "#cf1322" }}>{timeLeft}</h2>
// // //     </div>
// // //   );
// // // };

// // // export default SubscriptionTimer;

// // import React, { useEffect, useState } from "react";
// // import dayjs from "dayjs";
// // import duration from "dayjs/plugin/duration";

// // dayjs.extend(duration);

// // interface Props {
// //   expiryDate: string | null;
// // }

// // const SubscriptionTimer: React.FC<Props> = ({ expiryDate }) => {
// //   const [timeLeft, setTimeLeft] = useState<string>("");
// //   const [showTimer, setShowTimer] = useState(false);

// //   useEffect(() => {
// //     if (!expiryDate) return;

// //     const expiry = dayjs(expiryDate);

// //     // ✅ expiry se 1 month pehle ka date
// //     const timerStartDate = expiry.subtract(1, "month");

// //     const updateTimer = () => {
// //       const now = dayjs();

// //       // ❌ Abhi 1 month baaki hai → timer mat dikhao
// //       if (now.isBefore(timerStartDate)) {
// //         setShowTimer(false);
// //         return;
// //       }

// //       // ✅ 1 month ke andar aa gaye → timer dikhao
// //       setShowTimer(true);

// //       const diff = expiry.diff(now);

// //       if (diff <= 0) {
// //         setTimeLeft("Subscription Expired");
// //         return;
// //       }

// //       const dur = dayjs.duration(diff);

// //       const days = Math.floor(dur.asDays());
// //       const hours = dur.hours();
// //       const minutes = dur.minutes();
// //       const seconds = dur.seconds();

// //       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
// //     };

// //     updateTimer();
// //     const interval = setInterval(updateTimer, 1000);

// //     return () => clearInterval(interval);
// //   }, [expiryDate]);

// //   // ❌ 1 month se pehle kuch bhi mat dikhao
// //   if (!showTimer) return null;

// //   return (
// //     <div
// //       style={{
// //         background: "#fff1f0",
// //         border: "1px solid #ffa39e",
// //         padding: "15px 20px",
// //         borderRadius: "12px",
// //         display: "inline-block",
// //       }}
// //     >
// //       <h4 style={{ margin: 0, color: "#cf1322" }}>
// //         ⏳ Subscription expires in
// //       </h4>
// //       <h2 style={{ margin: 0, color: "#cf1322" }}>
// //         {timeLeft}
// //       </h2>
// //     </div>
// //   );
// // };

// // export default SubscriptionTimer;

// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import duration from "dayjs/plugin/duration";

// dayjs.extend(duration);

// interface Props {
//   expiryDate: string | null;
// }

// const SubscriptionTimer: React.FC<Props> = ({ expiryDate }) => {
//   const [timeLeft, setTimeLeft] = useState<string | null>(null);
// const [status, setStatus] = useState<"normal" | "warning" | "critical" | "expired">("normal");

//   useEffect(() => {
//     if (!expiryDate) return;

//     const expiry = dayjs(expiryDate);
//     const startDate = expiry.subtract(1, "month"); // ✅ 1 month before

//    const updateTimer = () => {
//     const now = dayjs();
//     if (now.isBefore(startDate)) {
//       setTimeLeft(null);
//       setStatus("normal");
//       return;
//     }

//      const diff = expiry.diff(now);
//     if (diff <= 0) {
//       setTimeLeft("Subscription Expired");
//       setStatus("expired");
//       return;
//     }

//      const dur = dayjs.duration(diff);
//     const days = Math.floor(dur.asDays());
//     const hours = dur.hours();
//     const minutes = dur.minutes();
//     const seconds = dur.seconds();


//           setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);

//     };
//  if (days <= 7) setStatus("critical");       // 🔴 Red blinking
//     else if (days <= 15) setStatus("warning"); // 🟠 Warning
//     else setStatus("normal");
//   };
//    updateTimer();
//   const interval = setInterval(updateTimer, 1000);
//   return () => clearInterval(interval);
// }, [expiryDate]);

//   // ❌ 1 month se pehle kuch bhi render nahi hoga
//   if (!timeLeft) return null;

//   return (
//     <div
//       style={{
//         background: "#fff1f0",
//         border: "1px solid #ffa39e",
//         padding: "16px 20px",
//         borderRadius: "12px",
//         marginBottom: "20px",
//       }}
//     >
//       <h3 style={{ margin: 0, color: "#cf1322" }}>
//         ⏳ Subscription Expires In
//       </h3>
//       <h2 style={{ margin: "4px 0 0", color: "#cf1322" }}>
//         {timeLeft}
//       </h2>
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
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [status, setStatus] = useState<"normal" | "warning" | "critical" | "expired">("normal");

  useEffect(() => {
    if (!expiryDate) return;

    const expiry = dayjs(expiryDate);
    const startDate = expiry.subtract(1, "month"); // 1 month before expiry

    const updateTimer = () => {
      const now = dayjs();

      if (now.isBefore(startDate)) {
        setTimeLeft(null); // Timer not started yet
        setStatus("normal");
        return;
      }

      const diff = expiry.diff(now);
      if (diff <= 0) {
        setTimeLeft("Subscription Expired");
        setStatus("expired");
        return;
      }

      const dur = dayjs.duration(diff);
      const days = Math.floor(dur.asDays());
      const hours = dur.hours();
      const minutes = dur.minutes();
      const seconds = dur.seconds();

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      // ===== Status logic =====
      if (days <= 7) setStatus("critical");       // 🔴 Red blinking
      else if (days <= 15) setStatus("warning"); // 🟠 Warning
      else setStatus("normal");
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!timeLeft) return null; // Don't render before timer starts

  return (
    <div
      style={{
        background: "#fff1f0",
        border: "1px solid #ffa39e",
        padding: "16px 20px",
        borderRadius: "12px",
        marginBottom: "20px",
        animation: status === "critical" ? "blink 1s infinite" : undefined,
      }}
    >
      <h3 style={{ margin: 0, color: "#cf1322" }}>⏳ Subscription Expires In</h3>
      <h2 style={{ margin: "4px 0 0", color: "#cf1322" }}>{timeLeft}</h2>

      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default SubscriptionTimer;
