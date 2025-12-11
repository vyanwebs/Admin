import { Router } from "express";
import { protect } from "../../userApi/middlewares/auth.middleware";
import {
	buyProduct,
	deleteOrderByOrderId,
	editProductOrderById,
	getAllProductOrders,
	getOrderByOrderId,
	getOrdersBySubAdminId,
} from "../controller/order.controller";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
const router = Router();
router.post("/create-order", protect, buyProduct);
router.patch("/update-order/:orderId", protect, editProductOrderById);
router.get("/get-user-orders", protect, getAllProductOrders);
router.get(
	"/admin-get-user-orders",
	protect,
	authorizeRole("admin"),
	getOrdersBySubAdminId
);
router.get("/get-user-order-by-order-id/:orderId", protect, getOrderByOrderId);
router.delete(
	"/delete-user-order-by-order-id/:orderId",
	protect,
	deleteOrderByOrderId
);

export default router;
