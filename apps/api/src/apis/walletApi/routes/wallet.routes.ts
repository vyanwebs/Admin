import { Router } from "express";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { addToWallet } from "../controllers/wallet.controller";
const router = Router();
router.put("/", protect, addToWallet);
export default router;
