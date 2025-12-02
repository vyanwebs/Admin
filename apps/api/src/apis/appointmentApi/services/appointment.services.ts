import { InAppNotifications } from "../../inAppNotification/models/inAppNotification.model";
import ourserviceModel from "../../ourserviceApi/models/ourservice.model";
import Appointment, { IAppointment } from "../models/appointment.model";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import User from "../../userApi/models/User.model";

import { ChairsModel } from "../../salonChairsApi/model/chairs.model";
import mongoose from "mongoose";

dayjs.extend(utc);
dayjs.extend(timezone);

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

	async create(
		data: Partial<IAppointment>,
		userId: string,
		email: string
	): Promise<IAppointment> {
		const appointmentCode = `NAU${nanoid(4).toUpperCase()}`;
		const user = await User.findById(userId);

		// 1️⃣ Parse services
		const servicesArray = data.services
			? Array.isArray(data.services)
				? data.services
				: JSON.parse(data.services)
			: [];

		const matchedServices = await ourserviceModel.find({
			serviceName: { $in: servicesArray },
		});

		const totalEstimatedTime = matchedServices.reduce(
			(sum, s) => sum + Number(s.estimatedTime || 0),
			10
		);

		const totalServiceAmount = matchedServices.reduce(
			(sum, s) => sum + Number(s.price || 0),
			0
		);

		if ((user?.wallet ?? 0) < totalServiceAmount) {
			throw new Error("You don't have enough money in your wallet!!");
		}

		// 2️⃣ Build from/to based on service duration
		const from = new Date(`${data.date}T${data.time}:00+05:30`);
		const to = new Date(from);
		to.setMinutes(to.getMinutes() + totalEstimatedTime);

		const formattedFromDateTime = from.toISOString();
		const formattedToDateTime = to.toISOString();

		// 3️⃣ Correct overlap logic (MUST MATCH GET API)
		const overlappingAppointments = await Appointment.find({
			subAdminId: user?.subAdminId,
			chairNo: data.chairNo,
			fromDateTime: { $lt: formattedToDateTime },
			toDateTime: { $gt: formattedFromDateTime },
		});

		if (overlappingAppointments.length > 0) {
			throw new Error("This chair is already booked in this time range.");
		}

		// 4️⃣ Create appointment
		const appointment = new Appointment({
			...data,
			fromDateTime: formattedFromDateTime,
			toDateTime: formattedToDateTime,
			email,
			userId,
			chairNo: Number(data.chairNo),
			appointmentCode,
			subAdminId: user?.subAdminId,
			appointmentAmount: totalServiceAmount,
		});

		// 5️⃣ Notification
		await InAppNotifications.create({
			message: `Your appointment has been booked for ${dayjs(
				formattedFromDateTime
			)
				.tz("Asia/Kolkata")
				.format("DD-MMM-YY")} at ${dayjs(formattedFromDateTime)
				.tz("Asia/Kolkata")
				.format("hh:mm A")}.`,
			userId,
		});

		if (appointment) {
			await User.findByIdAndUpdate(
				userId,
				{ $inc: { wallet: -totalServiceAmount } },
				{ new: true }
			);
		}

		return appointment.save();
	}

	async getAll(): Promise<IAppointment[]> {
		return Appointment.find().sort({ createdAt: -1 });
	}

	async getById(id: string): Promise<IAppointment | null> {
		return Appointment.findById(id);
	}

	async updateById(
		id: string,
		data: Partial<IAppointment>,
		userId: string
	): Promise<IAppointment | null> {
		const appointmentCode = `NAU${nanoid(4).toUpperCase()}`;

		const oldAppointment = await Appointment.findById(id);
		if (!oldAppointment) throw new Error("Appointment not found");

		const oldAmount = oldAppointment.appointmentAmount ?? 0;

		// 2️⃣ Refund old amount
		const userAmount = await User.findByIdAndUpdate(
			userId,
			{ $inc: { wallet: oldAmount } },
			{ new: true }
		);

		const updatedUser = await User.findById(userId);
		if (!updatedUser) throw new Error("User not found after refund");
		const servicesArray = data.services
			? Array.isArray(data.services)
				? data.services
				: JSON.parse(data.services)
			: [];
		const matchedServices = await ourserviceModel.find({
			serviceName: { $in: servicesArray },
		});
		const totalEstimatedTime = matchedServices.reduce(
			(sum, s) => sum + Number(s.estimatedTime || 0),
			10
		);

		const totalServiceAmount = matchedServices.reduce(
			(sum, s) => sum + Number(s.price || 0),
			0
		);

		if ((updatedUser?.wallet ?? 0) < totalServiceAmount) {
			throw new Error("You don't have enough money in your wallet!!");
		}

		// parse IST time properly
		const from = new Date(`${data.date}T${data.time}:00+05:30`);
		const to = new Date(from);
		to.setMinutes(to.getMinutes() + totalEstimatedTime);

		// format to ISO (stored in UTC internally)
		const formattedFromDateTime = from.toISOString();
		const formattedToDateTime = to.toISOString();
		const appointment = await Appointment.findByIdAndUpdate(
			id,
			{
				...data,
				fromDateTime: formattedFromDateTime,
				toDateTime: formattedToDateTime,
				appointmentStatus: "Pending",
				appointmentCode: appointmentCode,
				appointmentAmount: totalServiceAmount,
			},
			{ new: true }
		);
		if (appointment) {
			const newAmount = await User.findByIdAndUpdate(
				userId,
				{ $inc: { wallet: -totalServiceAmount } },
				{ new: true }
			);
		}
		return appointment;
	}

	async deleteById(id: string): Promise<IAppointment | null> {
		return Appointment.findByIdAndDelete(id);
	}
}

export default new AppointmentService();
