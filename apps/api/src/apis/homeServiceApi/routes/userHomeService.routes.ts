import express from "express";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { createUserHomeService } from "../controllers/userHomeService.model";

const router = express.Router();

// User booking API
router.post("/book-service", protect, createUserHomeService);

export default router;
