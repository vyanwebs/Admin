"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentAfter10Minutes = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const dayjs_1 = __importDefault(require("dayjs"));
const appointment_model_1 = __importDefault(require("../appointmentApi/models/appointment.model"));
const inAppNotification_model_1 = require("../inAppNotification/models/inAppNotification.model");
const chairs_model_1 = require("../salonCharisApi/model/chairs.model");
const cancelAppointmentAfter10Minutes = () => {
    node_cron_1.default.schedule("0 0 * * *", async () => {
        try {
            const now = (0, dayjs_1.default)();
            const threshold = now.subtract(10, "minute").toISOString();
            const expiredAppointments = await appointment_model_1.default.find({
                appointmentStatus: "Pending",
                fromDateTime: { $lte: threshold },
            });
            for (const appointment of expiredAppointments) {
                // send notification
                await inAppNotification_model_1.InAppNotifications.create({
                    message: `Your appointment scheduled on ${(0, dayjs_1.default)(appointment.fromDateTime)
                        .tz("Asia/Kolkata")
                        .format("DD-MMM-YYYY [at]  hh:mm A")} has expired. Please reschedule the appointment.`,
                    userId: appointment.userId,
                });
                await chairs_model_1.ChairsModel.findOneAndUpdate({
                    subAdminId: appointment.subAdminId,
                    chairNumber: appointment.chairNo,
                }, { isChairAvailable: true }, { new: true });
                // delete or update status
                await appointment_model_1.default.findByIdAndDelete(appointment._id);
            }
            if (expiredAppointments.length)
                console.log(`Deleted ${expiredAppointments.length} expired appointments`);
        }
        catch (error) {
            console.error("Cron job error:", error);
        }
    });
};
exports.cancelAppointmentAfter10Minutes = cancelAppointmentAfter10Minutes;
