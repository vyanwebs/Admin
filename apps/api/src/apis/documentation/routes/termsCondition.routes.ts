// import { Router } from "express";
// import { createOrUpdateTerms, getTerms } from "../controllers/termsCondition.controller";
// import { upload } from "../../mediaApi/services/multerConfig";
// //import { protect } from "../../middleware/auth.middleware"; // same as About Us
// import { protect } from "../../userApi/middlewares/auth.middleware";

// const router = Router();

// router.post("/", protect, upload.none(), createOrUpdateTerms);
// router.get("/", getTerms);

// export default router;


import { Router } from "express";
import {
  getTerms,
  createOrUpdateTermsMiddleware,
  createOrUpdateTerms,
} from "../controllers/termsCondition.controller";

import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import { upload } from "../../mediaApi/services/multerConfig";

const router = Router();

router.post(
  "/",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.none(),   // ⭐ REQUIRED FOR FORM DATA
  createOrUpdateTermsMiddleware,
  createOrUpdateTerms
);

router.get(
  "/",
  protect,
  authorizeRole("admin", "superadmin", "user"),
  getTerms
);

export default router;
