"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChairsByDateTime = exports.getChairsBySubAdminId = exports.verifyAppointmentCode = exports.getAppointmentsByUserId = exports.deleteAppointment = exports.updateAppointment = exports.getAppointmentById = exports.getAppointments = exports.createAppointment = void 0;
const appointment_services_1 = __importDefault(require("../services/appointment.services"));
const appointment_model_1 = __importDefault(require("../models/appointment.model"));
const User_model_1 = __importDefault(require("../../userApi/models/User.model"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const inAppNotification_model_1 = require("../../inAppNotification/models/inAppNotification.model");
const customParseFormat_js_1 = __importDefault(require("dayjs/plugin/customParseFormat.js"));
const chairs_model_1 = require("../../salonCharisApi/model/chairs.model");
dayjs_1.default.extend(customParseFormat_js_1.default);
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
const createAppointment = async (req, res) => {
    var _a;
    try {
        const userId = String(req.user._id);
        const email = (_a = (await User_model_1.default.findById(userId))) === null || _a === void 0 ? void 0 : _a.email;
        const rawTime = String(req.body.time).trim();
        if (rawTime === "24:00" || rawTime.startsWith("24")) {
            return res.status(403).json({
                success: false,
                message: "You can't book an appointment at this time",
            });
        }
        let time = (0, dayjs_1.default)(rawTime, "HH:mm", true);
        const start = (0, dayjs_1.default)("08:00", "HH:mm");
        const end = (0, dayjs_1.default)("23:00", "HH:mm");
        if (time.isBefore(start) || time.isAfter(end)) {
            return res.status(403).json({
                success: false,
                message: "You can't book an appointment at this time",
            });
        }
        const data = await appointment_services_1.default.create(req.body, userId, email);
        res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            data,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: error.message || "Something went wrong" });
    }
};
exports.createAppointment = createAppointment;
const getAppointments = async (req, res) => {
    try {
        const data = await appointment_services_1.default.getAll();
        const formattedAppointments = data.map((item) => ({
            ...item.toObject(),
            fromDateTime: (0, dayjs_1.default)(item.fromDateTime)
                .tz("Asia/Kolkata")
                .format("DD-MM-YYYY hh:mm A"),
            toDateTime: (0, dayjs_1.default)(item.toDateTime)
                .tz("Asia/Kolkata")
                .format("DD-MM-YYYY hh:mm A"),
        }));
        res.status(200).json({ success: true, data: formattedAppointments });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
};
exports.getAppointments = getAppointments;
const getAppointmentById = async (req, res) => {
    var _a, _b;
    try {
        const data = await appointment_services_1.default.getById(req.params.id);
        if (!data)
            return res
                .status(404)
                .json({ success: false, message: "Appointment not found" });
        // const fromIST = new Date(data.fromDateTime ?? "").toLocaleString("en-In", {
        // 	timeZone: "Asia/Kolkata",
        // });
        // const toIST = new Date(data.toDateTime ?? "").toLocaleString("en-In", {
        // 	timeZone: "Asia/Kolkata",
        // });
        const fromIST = (0, dayjs_1.default)((_a = data.fromDateTime) !== null && _a !== void 0 ? _a : "")
            .tz("Asia/Kolkata")
            .format("DD-MM-YYYY hh:mm A");
        const toIST = (0, dayjs_1.default)((_b = data.toDateTime) !== null && _b !== void 0 ? _b : "")
            .tz("Asia/Kolkata")
            .format("DD-MM-YYYY hh:mm A");
        res.status(200).json({
            success: true,
            ...data.toObject(),
            fromDateTime: fromIST,
            toDateTime: toIST,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
};
exports.getAppointmentById = getAppointmentById;
const updateAppointment = async (req, res) => {
    try {
        const data = await appointment_services_1.default.updateById(req.params.id, req.body);
        if (!data)
            return res
                .status(404)
                .json({ success: false, message: "Appointment not found" });
        res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
};
exports.updateAppointment = updateAppointment;
const deleteAppointment = async (req, res) => {
    try {
        const data = await appointment_services_1.default.deleteById(req.params.id);
        if (!data)
            return res
                .status(404)
                .json({ success: false, message: "Appointment not found" });
        res
            .status(200)
            .json({ success: true, message: "Appointment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
};
exports.deleteAppointment = deleteAppointment;
const getAppointmentsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await appointment_model_1.default.find({ userId });
        if (appointments.length === 0) {
            return res
                .status(204)
                .json({ success: true, message: "No Appointment Booked Yet!!" });
        }
        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            data: appointments,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAppointmentsByUserId = getAppointmentsByUserId;
// verify appointment code
const verifyAppointmentCode = async (req, res) => {
    try {
        const { appointmentCode, email } = req.body;
        const appointment = await appointment_model_1.default.findOneAndUpdate({
            appointmentCode,
            email,
            appointmentStatus: { $ne: "Accepted" },
        }, { appointmentStatus: "Accepted" });
        if (appointment) {
            await inAppNotification_model_1.InAppNotifications.create({
                message: `Your appointment has been confirmed for ${(0, dayjs_1.default)(appointment.fromDateTime).format("DD-MMM-YY")} at ${(0, dayjs_1.default)(appointment.fromDateTime)
                    .tz("Asia/Kolkata")
                    .format("hh:mm A")}.`,
                userId: req.user._id,
            });
            return res
                .status(200)
                .json({ success: true, message: "Appointment Confirmed!!" });
        }
        const existing = await appointment_model_1.default.findOne({ appointmentCode, email });
        if ((existing === null || existing === void 0 ? void 0 : existing.appointmentStatus) === "Accepted") {
            return res
                .status(409)
                .json({ success: false, message: "Appointment already approved" });
        }
        return res
            .status(403)
            .json({ success: false, message: "Incorrect Credentials" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, error: error.message });
    }
};
exports.verifyAppointmentCode = verifyAppointmentCode;
const getChairsBySubAdminId = async (req, res) => {
    try {
        const user = req.user;
        const chairs = await chairs_model_1.ChairsModel.find({ subAdminId: user.subAdminId });
        return res.status(200).json({
            success: true,
            message: "Chairs Fetched Successfully",
            data: chairs,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, error: error.message });
    }
};
exports.getChairsBySubAdminId = getChairsBySubAdminId;
const getChairsByDateTime = async (req, res) => {
    try {
        const user = req.user;
        console.log(user);
        const { date, time } = req.params;
        if (!date || !time) {
            return res.status(400).json({
                success: false,
                message: "Date and time are required",
            });
        }
        // Build fromDateTime
        const from = new Date(`${date}T${time}:00+05:30`);
        // FIXED duration — keep simple (10 mins or 30 mins)
        const durationMinutes = 10;
        const to = new Date(from);
        to.setMinutes(to.getMinutes() + durationMinutes);
        console.log("subadminId", user.subAdminId);
        // Find overlapping appointments
        const overlappingAppointments = await appointment_model_1.default.find({
            subAdminId: user.subAdminId,
            fromDateTime: { $lt: to },
            toDateTime: { $gt: from },
        });
        const bookedChairs = overlappingAppointments.map((a) => Number(a.chairNo));
        const chairs = await chairs_model_1.ChairsModel.find({ subAdminId: user.subAdminId });
        const result = chairs.map((chair) => ({
            ...chair.toObject(),
            isChairAvailable: !bookedChairs.includes(Number(chair.chairNumber)),
        }));
        return res.status(200).json({
            success: true,
            message: "Chairs fetched successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
exports.getChairsByDateTime = getChairsByDateTime;
