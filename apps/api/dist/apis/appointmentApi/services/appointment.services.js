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
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
class AppointmentService {
    // async create(
    // 	data: Partial<IAppointment>,
    // 	userId: string,
    // 	email: string
    // ): Promise<IAppointment> {
    // 	const appointmentCode = `NAU${nanoid(4).toUpperCase()}`;
    // 	const user = await User.findById(userId);
    // 	const servicesArray = data.services
    // 		? Array.isArray(data.services)
    // 			? data.services
    // 			: JSON.parse(data.services)
    // 		: [];
    // 	const matchedServices = await ourserviceModel.find({
    // 		serviceName: { $in: servicesArray },
    // 	});
    // 	const totalEstimatedTime = matchedServices.reduce(
    // 		(sum, s) => sum + Number(s.estimatedTime || 0),
    // 		10
    // 	);
    // 	// parse IST time properly
    // 	const from = new Date(`${data.date}T${data.time}:00+05:30`);
    // 	const to = new Date(from);
    // 	to.setMinutes(to.getMinutes() + totalEstimatedTime);
    // 	// format to ISO (stored in UTC internally)
    // 	const formattedFromDateTime = from.toISOString();
    // 	const formattedToDateTime = to.toISOString();
    // 	const existingAppointment = await ChairsModel.findOne({
    // 		chairNumber: data.chairNo,
    // 		subAdminId: user?.subAdminId,
    // 		isChairAvailable: false,
    // 	});
    // 	if (existingAppointment) {
    // 		throw new Error("An appointment already exists during this time range.");
    // 	}
    // 	const appointment = new Appointment({
    // 		...data,
    // 		fromDateTime: formattedFromDateTime,
    // 		toDateTime: formattedToDateTime,
    // 		email,
    // 		userId,
    // 		appointmentCode,
    // 		subAdminId: user?.subAdminId,
    // 	});
    // 	const status = await ChairsModel.findOneAndUpdate(
    // 		{
    // 			$and: [
    // 				{ subAdminId: new mongoose.Types.ObjectId(appointment.subAdminId) },
    // 				{ chairNumber: Number(data.chairNo) },
    // 			],
    // 		},
    // 		{ isChairAvailable: false },
    // 		{ new: true }
    // 	);
    // 	console.log("status", status);
    // 	await InAppNotifications.create({
    // 		message: `Your appointment has been booked for ${dayjs(
    // 			formattedFromDateTime
    // 		)
    // 			.tz("Asia/Kolkata")
    // 			.format("DD-MMM-YY")} at ${dayjs(formattedFromDateTime)
    // 			.tz("Asia/Kolkata")
    // 			.format("hh:mm A")}.`,
    // 		userId,
    // 	});
    // 	return appointment.save();
    // }
    async create(data, userId, email) {
        const appointmentCode = `NAU${(0, nanoid_1.nanoid)(4).toUpperCase()}`;
        const user = await User_model_1.default.findById(userId);
        // 1️⃣ Parse services
        const servicesArray = data.services
            ? Array.isArray(data.services)
                ? data.services
                : JSON.parse(data.services)
            : [];
        const matchedServices = await ourservice_model_1.default.find({
            serviceName: { $in: servicesArray },
        });
        const totalEstimatedTime = matchedServices.reduce((sum, s) => sum + Number(s.estimatedTime || 0), 10);
        // 2️⃣ Build from/to based on service duration
        const from = new Date(`${data.date}T${data.time}:00+05:30`);
        const to = new Date(from);
        to.setMinutes(to.getMinutes() + totalEstimatedTime);
        const formattedFromDateTime = from.toISOString();
        const formattedToDateTime = to.toISOString();
        // 3️⃣ Correct overlap logic (MUST MATCH GET API)
        const overlappingAppointments = await appointment_model_1.default.find({
            subAdminId: user === null || user === void 0 ? void 0 : user.subAdminId,
            chairNo: data.chairNo,
            fromDateTime: { $lt: formattedToDateTime },
            toDateTime: { $gt: formattedFromDateTime },
        });
        if (overlappingAppointments.length > 0) {
            throw new Error("This chair is already booked in this time range.");
        }
        // 4️⃣ Create appointment
        const appointment = new appointment_model_1.default({
            ...data,
            fromDateTime: formattedFromDateTime,
            toDateTime: formattedToDateTime,
            email,
            userId,
            chairNo: Number(data.chairNo),
            appointmentCode,
            subAdminId: user === null || user === void 0 ? void 0 : user.subAdminId,
        });
        // 5️⃣ Notification
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
