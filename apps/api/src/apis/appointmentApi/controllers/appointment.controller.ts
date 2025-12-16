import { Request, Response } from "express";
import appointmentService from "../services/appointment.services";
import appointmentModel from "../models/appointment.model";
import User from "../../userApi/models/User.model";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { InAppNotifications } from "../../inAppNotification/models/inAppNotification.model";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import Package from "../../packageApi/models/packages.model";
import { ChairsModel } from "../../salonChairsApi/model/chairs.model";
import OurService from "../../ourserviceApi/models/ourservice.model";
import Appointment from "../../appointmentApi/models/appointment.model";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { WalletTransaction } from "../../walletApi/model/wallet.transaction.model";

dayjs.extend(customParseFormat);

dayjs.extend(utc);
dayjs.extend(timezone);
export const createAppointment = async (req: Request, res: Response) => {
	try {
		const userId = String(req.user._id);
		const email = (await User.findById(userId))?.email;

		const rawTime = String(req.body.time).trim();

		if (rawTime === "24:00" || rawTime.startsWith("24")) {
			return res.status(403).json({
				success: false,
				message: "You can't book an appointment at this time",
			});
		}
		let time = dayjs(rawTime, "HH:mm", true);

		const start = dayjs("08:00", "HH:mm");
		const end = dayjs("23:00", "HH:mm");

		if (time.isBefore(start) || time.isAfter(end)) {
			return res.status(403).json({
				success: false,
				message: "You can't book an appointment at this time",
			});
		}

		const data = await appointmentService.create(req.body, userId, email!);
		res.status(201).json({
			success: true,
			message: "Appointment created successfully",
			data,
		});
	} catch (error: any) {
		res
			.status(500)
			.json({ success: false, error: error.message || "Something went wrong" });
	}
};
export const getAppointmentsByAdminId = async (req: Request, res: Response) => {
	try {
		const userId = req.user.id;
		const data = await appointmentService.getAll(userId);
		const formattedAppointments = data.map((item) => ({
			...item.toObject(),
			fromDateTime: dayjs(item.fromDateTime)
				.tz("Asia/Kolkata")
				.format("DD-MM-YYYY hh:mm A"),
			toDateTime: dayjs(item.toDateTime)
				.tz("Asia/Kolkata")
				.format("DD-MM-YYYY hh:mm A"),
		}));
		res.status(200).json({ success: true, data: formattedAppointments });
	} catch (error) {
		res.status(500).json({ success: false, error });
	}
};

export const getAppointmentById = async (req: Request, res: Response) => {
	try {
		const data = await appointmentService.getById(req.params.id);
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

		const fromIST = dayjs(data.fromDateTime ?? "")
			.tz("Asia/Kolkata")
			.format("DD-MM-YYYY hh:mm A");
		const toIST = dayjs(data.toDateTime ?? "")
			.tz("Asia/Kolkata")
			.format("DD-MM-YYYY hh:mm A");
		res.status(200).json({
			success: true,
			...data.toObject(),
			fromDateTime: fromIST,
			toDateTime: toIST,
		});
	} catch (error) {
		res.status(500).json({ success: false, error });
	}
};

export const updateAppointment = async (req: Request, res: Response) => {
	try {
		const userId = String(req.user.id);
		console.log(userId);
		const data = await appointmentService.updateById(
			req.params.id,
			req.body,
			userId
		);
		if (!data)
			return res
				.status(404)
				.json({ success: false, message: "Appointment not found" });

		res.status(200).json({
			success: true,
			message: "Appointment updated successfully",
			data,
		});
	} catch (error) {
		res.status(500).json({ success: false, error: (error as Error).message });
	}
};

export const deleteAppointment = async (req: Request, res: Response) => {
	try {
		const data = await appointmentService.deleteById(req.params.id);
		if (!data)
			return res
				.status(404)
				.json({ success: false, message: "Appointment not found" });
		res
			.status(200)
			.json({ success: true, message: "Appointment deleted successfully" });
	} catch (error) {
		res.status(500).json({ success: false, error });
	}
};

export const getAppointmentsByUserId = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const appointments = await appointmentModel.find({ userId });
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
	} catch (error) {
		res.status(500).json({ success: false, error: (error as Error).message });
	}
};

// verify appointment code

export const verifyAppointmentCode = async (req: Request, res: Response) => {
	try {
		const { appointmentCode, email } = req.body;
		const appointment = await appointmentModel.findOneAndUpdate(
			{
				appointmentCode,
				email,
				appointmentStatus: { $ne: "Accepted" },
			},
			{ appointmentStatus: "Accepted" }
		);
		if (appointment) {
			await InAppNotifications.create({
				message: `Your appointment has been confirmed for ${dayjs(
					appointment.fromDateTime
				).format("DD-MMM-YY")} at ${dayjs(appointment.fromDateTime)
					.tz("Asia/Kolkata")
					.format("hh:mm A")}.`,
				userId: req.user._id,
			});

			return res
				.status(200)
				.json({ success: true, message: "Appointment Confirmed!!" });
		}
		const existing = await appointmentModel.findOne({ appointmentCode, email });
		if (existing?.appointmentStatus === "Accepted") {
			return res
				.status(409)
				.json({ success: false, message: "Appointment already approved" });
		}

		return res
			.status(403)
			.json({ success: false, message: "Incorrect Credentials" });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

export const getChairsBySubAdminId = async (req: Request, res: Response) => {
	try {
		const user = req.user;
		const chairs = await ChairsModel.find({ subAdminId: user.subAdminId });
		return res.status(200).json({
			success: true,
			message: "Chairs Fetched Successfully",
			data: chairs,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

export const getChairsByDateTime = async (req: Request, res: Response) => {
	try {
		const user = req.user;
		console.log(user);
		const { date, time } = req.params;
		console.log("user000000", user);

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

		console.log("subadminIddd", user.subAdminId);
		// Find overlapping appointments
		const overlappingAppointments = await appointmentModel.find({
			subAdminId: user.subAdminId,
			fromDateTime: { $lt: to },
			toDateTime: { $gt: from },
		});

		const bookedChairs = overlappingAppointments.map((a: any) =>
			Number(a.chairNo)
		);

		const chairs = await ChairsModel.find({ subAdminId: user.subAdminId });

		const result = chairs.map((chair) => ({
			...chair.toObject(),
			isChairAvailable: !bookedChairs.includes(Number(chair.chairNumber)),
		}));

		return res.status(200).json({
			success: true,
			message: "Chairs fetched successfully",
			data: result,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: (error as Error).message,
		});
	}
};

export const createPackageAppointment = async (req: Request, res: Response) => {
	const txn = await mongoose.startSession();
	txn.startTransaction();

	try {
		const userId = String(req.user._id);
		const user = await User.findById(userId).session(txn);
		if (!user) throw new Error("User not found");

		const email = user.email;

		/* ---------- TIME VALIDATION ---------- */
		const rawTime = String(req.body.time).trim();

		if (rawTime === "24:00" || rawTime.startsWith("24")) {
			return res.status(403).json({
				success: false,
				message: "You can't book an appointment at this time",
			});
		}

		const time = dayjs(rawTime, "HH:mm", true);
		const start = dayjs("08:00", "HH:mm");
		const end = dayjs("23:00", "HH:mm");

		if (time.isBefore(start) || time.isAfter(end)) {
			return res.status(403).json({
				success: false,
				message: "You can't book an appointment at this time",
			});
		}

		/* ---------- PACKAGE + SERVICES ---------- */
		let finalServices: string[] = [];
		let totalAmount = 0;
		let totalDuration = 0;
		// ✅ Extra services

		const packageNames = req.body.packageName
			? Array.isArray(req.body.packageName)
				? req.body.packageName
				: String(req.body.packageName).split(",")
			: [];

		const servicesArray = req.body.services
			? Array.isArray(req.body.services)
				? req.body.services
				: JSON.parse(req.body.services)
			: [];

		if (packageNames.length) {
			const packages = await Package.find({
				title: { $in: packageNames },
			}).session(txn);

			if (packages.length !== packageNames.length) {
				throw new Error("One or more packages not found");
			}

			packages.forEach((pkg) => {
				totalAmount += pkg.price;
				totalDuration += pkg.estimatedTime;
				finalServices.push(...pkg.services);
			});
		}

		if (servicesArray.length) {
			const matchedServices = await OurService.find({
				serviceName: { $in: servicesArray },
			}).session(txn);

			if (matchedServices.length !== servicesArray.length) {
				throw new Error("One or more services are invalid");
			}

			matchedServices.forEach((s: any) => {
				totalAmount += s.price;
				totalDuration += s.estimatedTime;
				finalServices.push(s.serviceName);
			});
		}

		finalServices = [...new Set(finalServices)];

		/* ---------- WALLET CHECK ---------- */
		if ((user.wallet ?? 0) < totalAmount) {
			throw new Error("You don't have enough money in your wallet!!");
		}

		/* ---------- TIME RANGE ---------- */
		const from = new Date(`${req.body.date}T${req.body.time}:00+05:30`);
		const to = new Date(from);
		to.setMinutes(to.getMinutes() + totalDuration + 10);

		const fromDateTime = from.toISOString();
		const toDateTime = to.toISOString();

		/* ---------- OVERLAP CHECK ---------- */
		const overlapping = await Appointment.find({
			subAdminId: user.subAdminId,
			chairNo: req.body.chairNo,
			fromDateTime: { $lt: toDateTime },
			toDateTime: { $gt: fromDateTime },
		}).session(txn);

		if (overlapping.length > 0) {
			throw new Error("This chair is already booked in this time range.");
		}

		/* ---------- CREATE APPOINTMENT ---------- */
		const appointmentCode = `NAU${nanoid(4).toUpperCase()}`;

		const appointment = await Appointment.create(
			[
				{
					...req.body,
					services: finalServices,
					fromDateTime,
					toDateTime,
					email,
					userId,
					chairNo: Number(req.body.chairNo),
					subAdminId: user.subAdminId,
					appointmentAmount: totalAmount,
					estimatedTime: totalDuration,
					appointmentType: "Package",
					appointmentCode,
				},
			],
			{ session: txn }
		);

		/* ---------- WALLET + TXN ---------- */
		await User.findByIdAndUpdate(
			userId,
			{ $inc: { wallet: -totalAmount } },
			{ session: txn }
		);

		const walletTxn = await WalletTransaction.create(
			[
				{
					title: "Package Service Appointment",
					price: `- ₹${totalAmount}`,
					date: Date.now(),
					userId,
					color: "red",
				},
			],
			{ session: txn }
		);

		await Appointment.findByIdAndUpdate(
			appointment[0]._id,
			{ walletTxnId: walletTxn[0]._id },
			{ session: txn }
		);

		/* ---------- NOTIFICATION ---------- */
		await InAppNotifications.create(
			[
				{
					message: `Your appointment has been booked for ${dayjs(fromDateTime)
						.tz("Asia/Kolkata")
						.format("DD-MMM-YY")} at ${dayjs(fromDateTime)
						.tz("Asia/Kolkata")
						.format("hh:mm A")}. Your appointment code is ${appointmentCode}`,
					userId,
				},
			],
			{ session: txn }
		);

		await txn.commitTransaction();
		txn.endSession();

		res.status(201).json({
			success: true,
			message: "Appointment created successfully",
			data: appointment[0],
		});
	} catch (error: any) {
		await txn.abortTransaction();
		txn.endSession();

		res.status(500).json({
			success: false,
			error: error.message || "Something went wrong",
		});
	}
};

export const updatePackageAppointment = async (req: Request, res: Response) => {
	const txn = await mongoose.startSession();
	txn.startTransaction();

	try {
		const appointmentId = req.params.id;
		const userId = String(req.user._id);

		const user = await User.findById(userId).session(txn);
		if (!user) throw new Error("User not found");

		const appointment = await Appointment.findById(appointmentId).session(txn);
		if (!appointment) throw new Error("Appointment not found");

		/* ---------- REFUND OLD AMOUNT ---------- */
		// await User.findByIdAndUpdate(
		// 	userId,
		// 	{ $inc: { wallet: appointment.appointmentAmount } },
		// 	{ session: txn }
		// );

		/* ---------- TIME VALIDATION ---------- */
		const rawTime = String(req.body.time).trim();
		if (rawTime.startsWith("24")) {
			throw new Error("Invalid appointment time");
		}

		/* ---------- PACKAGE + SERVICES ---------- */
		let finalServices: string[] = [];
		let totalAmount = 0;
		let totalDuration = 0;

		if (!req.body.packageName) {
			return res
				.status(400)
				.json({ success: false, message: "Package is not selected" });
		}

		if (req.body.packageName) {
			const pkg = await Package.findOne({
				title: req.body.packageName,
			}).session(txn);

			if (!pkg) throw new Error("Package not found");

			totalAmount += pkg.price;
			totalDuration += pkg.estimatedTime;
			finalServices.push(...pkg.services);
		}

		const servicesArray = req.body.services
			? Array.isArray(req.body.services)
				? req.body.services
				: JSON.parse(req.body.services)
			: [];

		if (servicesArray.length) {
			const matchedServices = await OurService.find({
				serviceName: { $in: servicesArray },
			}).session(txn);

			if (matchedServices.length !== servicesArray.length) {
				throw new Error("Invalid services");
			}

			matchedServices.forEach((s) => {
				totalAmount += s.price;
				totalDuration += s.estimatedTime;
				finalServices.push(s.serviceName);
			});
		}

		finalServices = [...new Set(finalServices)];

		/* ---------- TIME RANGE ---------- */
		const from = new Date(`${req.body.date}T${req.body.time}:00+05:30`);
		const to = new Date(from);
		to.setMinutes(to.getMinutes() + totalDuration + 10);

		const fromDateTime = from.toISOString();
		const toDateTime = to.toISOString();

		/* ---------- OVERLAP CHECK (exclude self) ---------- */
		const overlapping = await Appointment.find({
			_id: { $ne: appointmentId },
			subAdminId: appointment.subAdminId,
			chairNo: req.body.chairNo,
			fromDateTime: { $lt: toDateTime },
			toDateTime: { $gt: fromDateTime },
		}).session(txn);

		if (overlapping.length) {
			throw new Error("Chair already booked in this time slot");
		}

		/* ---------- WALLET ADJUSTMENT ---------- */
		const walletDiff = appointment.appointmentAmount! - totalAmount;

		if ((user.wallet ?? 0) + walletDiff < 0) {
			throw new Error("Insufficient wallet balance");
		}

		await User.findByIdAndUpdate(
			userId,
			{ $inc: { wallet: walletDiff } },
			{ session: txn }
		);

		/* ---------- UPDATE APPOINTMENT ---------- */
		const updated = await Appointment.findByIdAndUpdate(
			appointmentId,
			{
				...req.body,
				services: finalServices,
				fromDateTime,
				toDateTime,
				appointmentAmount: totalAmount,
				estimatedTime: totalDuration,
				appointmentType: "Package",
			},
			{ new: true, session: txn }
		);

		/* ---------- UPDATE SAME WALLET TXN ---------- */
		await WalletTransaction.findByIdAndUpdate(
			appointment.walletTxnId,
			{
				price: `- ₹${totalAmount}`,
				date: Date.now(),
			},
			{ session: txn }
		);

		await txn.commitTransaction();
		txn.endSession();

		res.status(200).json({
			success: true,
			message: "Appointment updated successfully",
			data: updated,
		});
	} catch (error: any) {
		await txn.abortTransaction();
		txn.endSession();

		res.status(500).json({
			success: false,
			error: error.message || "Something went wrong",
		});
	}
};
