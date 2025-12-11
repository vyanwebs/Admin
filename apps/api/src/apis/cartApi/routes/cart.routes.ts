import { Router } from "express";
import {
	createCart,
	getAllCartItems,
	getCartItemById,
	updateCartItem,
	deleteCartItem,
	deleteAllCartItems,
	cartPayment,
} from "../controllers/cart.controller";
import { upload } from "../../mediaApi/services/multerConfig";
import { protect } from "../../userApi/middlewares/auth.middleware";

const router = Router();
router.post("/", protect, upload.single("image"), createCart);
router.post("/make-payment", protect, upload.single("image"), cartPayment);
router.get("/", protect, getAllCartItems);
router.get("/:id", protect, getCartItemById);
router.patch("/:id", protect, upload.single("image"), updateCartItem);
router.delete("/delete-all", protect, deleteAllCartItems);
router.delete("/:id", protect, deleteCartItem);

export default router;
