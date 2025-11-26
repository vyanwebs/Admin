import { Router } from "express";
import { createOrUpdateTerms, getTerms } from "../controllers/termsCondition.controller";
import { upload } from "../../mediaApi/services/multerConfig";
//import { protect } from "../../middleware/auth.middleware"; // same as About Us
import { protect } from "../../userApi/middlewares/auth.middleware";

const router = Router();

router.post("/", protect, upload.none(), createOrUpdateTerms);
router.get("/", getTerms);

export default router;
