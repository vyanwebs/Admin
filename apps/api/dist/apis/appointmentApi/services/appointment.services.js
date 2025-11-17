"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inAppNotification_model_1 = require("../../inAppNotification/models/inAppNotification.model");
const ourservice_model_1 = __importDefault(require("../../ourserviceApi/models/ourservice.model"));
const appointment_model_1 = __importDefault(require("../models/appointment.model"));
const nanoid_1 = require("nanoid");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const User_model_1 = __importDefault(require("../../userApi/models/User.model"));
const chairs_model_1 = require("../../salonCharisApi/model/chairs.model");
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
class AppointmentService {
    async create(data, userId, email) {
        const appointmentCode = `NAU${(0, nanoid_1.nanoid)(4).toUpperCase()}`;
        const user = await User_model_1.default.findById(userId);
        const servicesArray = data.services
            ? Array.isArray(data.services)
                ? data.services
                : JSON.parse(data.services)
            : [];
        const matchedServices = await ourservice_model_1.default.find({
            serviceName: { $in: servicesArray },
        });
        const totalEstimatedTime = matchedServices.reduce((sum, s) => sum + Number(s.estimatedTime || 0), 10);
        // parse IST time properly
        const from = new Date(`${data.date}T${data.time}:00+05:30`);
        const to = new Date(from);
        to.setMinutes(to.getMinutes() + totalEstimatedTime);
        // format to ISO (stored in UTC internally)
        const formattedFromDateTime = from.toISOString();
        const formattedToDateTime = to.toISOString();
        const existingAppointment = await chairs_model_1.ChairsModel.findOne({
            chairNumber: data.chairNo,
            subAdminId: user === null || user === void 0 ? void 0 : user.subAdminId,
            isChairAvailable: false,
        });
        if (existingAppointment) {
            throw new Error("An appointment already exists during this time range.");
        }
        const appointment = new appointment_model_1.default({
            ...data,
            fromDateTime: formattedFromDateTime,
            toDateTime: formattedToDateTime,
            email,
            userId,
            appointmentCode,
            subAdminId: user === null || user === void 0 ? void 0 : user.subAdminId,
        });
        await chairs_model_1.ChairsModel.findOneAndUpdate({
            $and: [{ subAdminId: user === null || user === void 0 ? void 0 : user.subAdminId }, { chairNumber: data.chairNo }],
        }, { isChairAvailable: false }, { new: true });
        await inAppNotification_model_1.InAppNotifications.create({
            message: `Your appointment has been booked for ${(0, dayjs_1.default)(formattedFromDateTime)
                .tz("Asia/Kolkata")
                .format("DD-MMM-YY")} at ${(0, dayjs_1.default)(formattedFromDateTime)
                .tz("Asia/Kolkata")
                .format("hh:mm A")}.`,
            userId,
        });
        return appointment.save();
    }
    async getAll() {
        return appointment_model_1.default.find().sort({ createdAt: -1 });
    }
    async getById(id) {
        return appointment_model_1.default.findById(id);
    }
    async updateById(id, data) {
        const appointmentCode = `NAU${(0, nanoid_1.nanoid)(4).toUpperCase()}`;
        const servicesArray = data.services
            ? Array.isArray(data.services)
                ? data.services
                : JSON.parse(data.services)
            : [];
        const matchedServices = await ourservice_model_1.default.find({
            serviceName: { $in: servicesArray },
        });
        const totalEstimatedTime = matchedServices.reduce((sum, s) => sum + Number(s.estimatedTime || 0), 10);
        // parse IST time properly
        const from = new Date(`${data.date}T${data.time}:00+05:30`);
        const to = new Date(from);
        to.setMinutes(to.getMinutes() + totalEstimatedTime);
        // format to ISO (stored in UTC internally)
        const formattedFromDateTime = from.toISOString();
        const formattedToDateTime = to.toISOString();
        return appointment_model_1.default.findByIdAndUpdate(id, {
            ...data,
            fromDateTime: formattedFromDateTime,
            toDateTime: formattedToDateTime,
            appointmentStatus: "Pending",
            appointmentCode: appointmentCode,
        }, { new: true });
    }
    async deleteById(id) {
        return appointment_model_1.default.findByIdAndDelete(id);
    }
}
exports.default = new AppointmentService();
