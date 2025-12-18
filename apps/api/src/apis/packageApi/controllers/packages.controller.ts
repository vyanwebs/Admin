import { Request, Response } from "express";
import Package from "../models/packages.model";
import mongoose from "mongoose";
import OurServices from "../../ourserviceApi/models/ourservice.model";

export const createPackage = async (req: Request, res: Response) => {
	try {
		const user = (req as any).user;

		let services: string[] = [];

		if (typeof req.body.services === "string") {
			services = JSON.parse(req.body.services);
		} else if (Array.isArray(req.body.services)) {
			services = req.body.services;
		}

		console.log("🚀 ~ createPackage ~ services:", services);

		const existingServices = await OurServices.find({
			serviceName: { $in: services },
		}).select("serviceName price estimatedTime");

		if (existingServices.length !== services.length) {
			return res.status(400).json({
				success: false,
				message: "One or more services do not exist",
			});
		}

		// 3️⃣ Calculate total price & time
		let totalAmount = 0;
		let totalDuration = 0;

		const validServiceNames = existingServices.map((s) => s.serviceName);

		existingServices.forEach((s) => {
			(totalAmount += s.price), (totalDuration += s.estimatedTime);
		});

		if (!user?._id) {
			return res.status(400).json({
				success: false,
				message: "User authentication failed",
			});
		}

		const addedBy = new mongoose.Types.ObjectId(user._id);

		const imageUrl = req.file
			? `${process.env.URL}/uploads/images/${req.file.filename}`
			: "";

		const newPackage = new Package({
			title: req.body.title,
			price: totalAmount,
			estimatedTime: totalDuration,
			services: validServiceNames,
			about: req.body.about,
			discount: req.body.discount,
			review: req.body.review,
			rating: req.body.rating,
			gender: req.body.gender,
			image: imageUrl,
			addedBy,
		});

		const saved = await newPackage.save();
		res.status(201).json({ success: true, data: saved });
	} catch (err: any) {
		res.status(500).json({ success: false, error: err.message });
	}
};

// export const getAllPackages = async (req: Request, res: Response) => {
//   try {
//     const packages = await Package.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: packages });
//   } catch (err: any) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

export const getAllPackages = async (req: Request, res: Response) => {
	try {
		let packages;
		const subAdminId = req.user.id; // admin or the main user id

		// If admin → get packages added by this admin
		if (req.user.role === "admin") {
			packages = await Package.find({ addedBy: subAdminId }).sort({
				createdAt: -1,
			});
			return res.status(200).json({ success: true, data: packages });
		}

		// If subadmin → get packages using its mapped subAdminId
		const addedBy = req.user.subAdminId;

		packages = await Package.find({
			addedBy: new mongoose.Types.ObjectId(addedBy),
		}).sort({ createdAt: -1 });

		res.status(200).json({ success: true, data: packages });
	} catch (err: any) {
		res.status(500).json({ success: false, error: err.message });
	}
};

export const getPackageById = async (req: Request, res: Response) => {
	try {
		const pkg = await Package.findById(req.params.id);
		if (!pkg)
			return res
				.status(404)
				.json({ success: false, message: "Package not found" });

		res.status(200).json({ success: true, data: pkg });
	} catch (err: any) {
		res.status(500).json({ success: false, error: err.message });
	}
};

export const updatePackage = async (req: Request, res: Response) => {
	try {
		const imageUrl = req.file
			? `${process.env.URL}/uploads/images/${req.file.filename}`
			: req.body.image;

		// 1️⃣ Validate services (serviceName)
		let services: string[] | undefined;
		let totalAmount: number | undefined;
		let totalDuration: number | undefined;

		if (req.body.services) {
			if (typeof req.body.services === "string") {
				services = JSON.parse(req.body.services);
			} else if (Array.isArray(req.body.services)) {
				services = req.body.services;
			}

			const existingServices = await OurServices.find({
				serviceName: { $in: services },
			}).select("serviceName price estimatedTime");

			if (existingServices.length === 0) {
				return res
					.status(403)
					.json({ success: false, message: "Service Provided doesn't exists" });
			}

			// 3️⃣ Recalculate price & time
			totalAmount = 0;
			totalDuration = 0;

			existingServices.forEach((s) => {
				totalAmount! += Number(s.price);
				totalDuration! += Number(s.estimatedTime);
			});

			services = existingServices.map((s) => s.serviceName);
		}

		// 2️⃣ Replace services array

		const updated = await Package.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
				...(services && { services }),
				...(totalAmount !== undefined && { price: totalAmount }),
				...(totalDuration !== undefined && { estimatedTime: totalDuration }),
				image: imageUrl,
			},
			{ new: true }
		);

		if (!updated)
			return res
				.status(404)
				.json({ success: false, message: "Package not found" });

		res.status(200).json({ success: true, data: updated });
	} catch (err: any) {
		res.status(500).json({ success: false, error: err.message });
	}
};

export const deletePackage = async (req: Request, res: Response) => {
	try {
		const deleted = await Package.findByIdAndDelete(req.params.id);
		if (!deleted)
			return res
				.status(404)
				.json({ success: false, message: "Package not found" });

		res
			.status(200)
			.json({ success: true, message: "Package deleted successfully" });
	} catch (err: any) {
		res.status(500).json({ success: false, error: err.message });
	}
};
