// import { Router } from "express";
// import { createOrUpdatePrivacy, getPrivacy } from "../controllers/privacyPolicy.controller";
// import { upload } from "../../mediaApi/services/multerConfig";

// const router = Router();
// router.post("/", upload.none(), createOrUpdatePrivacy);
// router.get("/", getPrivacy);

// export default router;
import { Router } from "express";
import { createOrUpdatePrivacy, getPrivacy } from "../controllers/privacyPolicy.controller";
import { upload } from "../../mediaApi/services/multerConfig";
import { protect } from "../../userApi/middlewares/auth.middleware";

const router = Router();

router.post("/", protect, upload.none(), createOrUpdatePrivacy);
router.get("/", getPrivacy);

export default router;
