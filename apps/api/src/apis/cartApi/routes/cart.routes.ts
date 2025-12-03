import { Router } from "express";
import {
	createCart,
	getAllCartItems,
	getCartItemById,
	updateCartItem,
	deleteCartItem,
} from "../controllers/cart.controller";
import { upload } from "../../mediaApi/services/multerConfig";
<<<<<<< HEAD
=======
import { protect } from "../../userApi/middlewares/auth.middleware";
>>>>>>> b42ad895a5e21b8837a06bc225a4e6d8cd0ca969

const router = Router();
router.post("/", upload.single("image"), createCart);
router.get("/", protect, getAllCartItems);
router.get("/:id", getCartItemById);
router.put("/:id", upload.single("image"), updateCartItem);
router.delete("/:id", protect, deleteCartItem);

export default router;
