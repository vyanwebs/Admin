import { Router } from "express";
import {
	createCart,
	getAllCartItems,
	getCartItemById,
	updateCartItem,
	deleteCartItem,
} from "../controllers/cart.controller";
import { upload } from "../../mediaApi/services/multerConfig";
import { protect } from "../../userApi/middlewares/auth.middleware";

const router = Router();
router.post("/", upload.single("image"), createCart);
router.get("/", protect, getAllCartItems);
router.get("/:id", getCartItemById);
router.put("/:id", upload.single("image"), updateCartItem);
router.delete("/:id", protect, deleteCartItem);

export default router;
