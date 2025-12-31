import { Router } from "express";
import {
	createAppointment,
	getAppointmentById,
	updateAppointment,
	deleteAppointment,
	getAppointmentsByUserId,
	verifyAppointmentCode,
	getChairsBySubAdminId,
	getChairsByDateTime,
	getAppointmentsByAdminId,
	createPackageAppointment,
	updatePackageAppointment,
	createHomeAppointment,
} from "../controllers/appointment.controller";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import { getAvailableServices } from "../../ourserviceApi/controllers/ourservice.controller";

const router = Router();

router.post("/", protect, createAppointment);
router.get("/", protect, authorizeRole("admin"), getAppointmentsByAdminId);
router.get("/fetch-by-userId/:userId", protect, getAppointmentsByUserId);
router.get("/get-services", protect, getAvailableServices);
router.get("/get-chairs", protect, getChairsBySubAdminId);
router.get("/chairs/:date/:time", protect, getChairsByDateTime);
router.get("/:id", getAppointmentById);
router.put("/:id", protect, updateAppointment);
router.delete("/:id", protect, deleteAppointment);
router.post("/package-appointment", protect, createPackageAppointment);
router.post("/home-appointment", protect, createHomeAppointment);
router.patch("/package-appointment/:id", protect, updatePackageAppointment);
router.post(
	"/verify-appointment",
	protect,
	authorizeRole("admin"),
	verifyAppointmentCode
);

export default router;
