import { Router } from "express";
import { protect } from "../../userApi/middlewares/auth.middleware";
import {
	addToWallet,
	getWalletTransactions,
} from "../controllers/wallet.controller";
const router = Router();
router.put("/", protect, addToWallet);
router.get("/", protect, getWalletTransactions);
export default router;
