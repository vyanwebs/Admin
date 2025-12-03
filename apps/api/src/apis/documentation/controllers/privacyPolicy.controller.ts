// import { Request, Response } from "express";
// import { PrivacyPolicy } from "../models/privacyPolicy.model";
// import { privacyPolicySchema } from "../validators/privacyPolicy.validator";

// export const createOrUpdatePrivacy = async (req: Request, res: Response) => {
//   try {
//     const validated = privacyPolicySchema.parse({
//       title: req.body.title,
//       content: req.body.content,
//     });

//     let doc = await PrivacyPolicy.findOne();
//     if (doc) {
//       doc.title = validated.title;
//       doc.content = validated.content;
//       await doc.save();
//       return res.status(200).json({ message: "Privacy Policy updated", data: doc });
//     }

//     doc = await PrivacyPolicy.create(validated);
//     return res.status(201).json({ message: "Privacy Policy created", data: doc });
//   } catch (error: any) {
//     return res.status(400).json({ message: error.errors || error.message });
//   }
// };

// export const getPrivacy = async (_req: Request, res: Response) => {
//   try {
//     const doc = await PrivacyPolicy.findOne();
//     if (!doc) return res.status(404).json({ message: "No Privacy Policy found" });
//     return res.status(200).json({ data: doc });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };


// import { Request, Response } from "express";
// import { PrivacyPolicy } from "../models/privacyPolicy.model";
// import { privacyPolicySchema } from "../validators/privacyPolicy.validator";

// export const createOrUpdatePrivacy = async (req: Request, res: Response) => {
//   try {
//     const addedBy = (req as any).user?._id;

//     const validated = privacyPolicySchema.parse({
//       title: req.body.title,
//       content: req.body.content,
//     });

//     let doc = await PrivacyPolicy.findOne();

//     if (doc) {
//       doc.title = validated.title;
//       doc.content = validated.content;
//       doc.updatedAt = new Date();
//       doc.addedBy = addedBy;
//       await doc.save();

//       return res.status(200).json({
//         message: "Privacy Policy updated",
//         data: doc,
//       });
//     }

//     doc = await PrivacyPolicy.create({
//       ...validated,
//       addedBy,
//     });

//     return res.status(201).json({
//       message: "Privacy Policy created",
//       data: doc,
//     });
//   } catch (error: any) {
//     return res.status(400).json({ message: error.errors || error.message });
//   }
// };

// export const getPrivacy = async (_req: Request, res: Response) => {
//   try {
//     const doc = await PrivacyPolicy.findOne();
//     if (!doc)
//       return res.status(404).json({ message: "No Privacy Policy found" });

//     return res.status(200).json({ data: doc });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };



// import { Request, Response } from "express";
// import PrivacyPolicyService from "../services/privacyPolicy.service";
// import { privacyPolicySchema } from "../validators/privacyPolicy.validator";

// export const createOrUpdatePrivacy = async (req: Request, res: Response) => {
//   try {
//     const customReq = req as any;
//     const addedBy = customReq.user?._id;

//     if (!addedBy) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const validated = privacyPolicySchema.parse(req.body);

//     const doc = await PrivacyPolicyService.createOrUpdate({
//       ...validated,
//       addedBy,
//     });

//     return res.status(200).json({
//       message: "Privacy Policy saved successfully",
//       data: doc,
//     });
//   } catch (error: any) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// export const getPrivacy = async (req: Request, res: Response) => {
//   try {
//     const customReq = req as any;
//     const addedBy = customReq.user?._id;

//     if (!addedBy) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const doc = await PrivacyPolicyService.getOne(addedBy);

//     if (!doc) {
//       return res.status(404).json({ message: "No Privacy Policy found" });
//     }

//     return res.status(200).json({ data: doc });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };



// import { Request, Response } from "express";
// import PrivacyPolicyService from "../services/privacyPolicy.service";
// import multer from "multer";
// import mongoose from "mongoose";

// const upload = multer({ storage: multer.memoryStorage() });

// // ⭐ Create / Update Middleware (same style as About Us)
// export const createOrUpdatePrivacyMiddleware = [
// upload.none(),

// async (req: Request, res: Response) => {
// try {
// const customReq = req as any;
// const addedBy = customReq.user?._id;

//   if (!addedBy) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const { title, content } = req.body;

//   const saved = await PrivacyPolicyService.createOrUpdate({
//     title,
//     content,
//     addedBy: new mongoose.Types.ObjectId(addedBy),
//   });

//   return res.status(200).json({
//     message: "Privacy Policy saved",
//     data: saved,
//   });
// } catch (error: any) {
//   return res.status(500).json({ message: error.message });
// }

// },
// ];

// // ⭐ GET Privacy Policy
// export const getPrivacy = async (req: Request, res: Response) => {
// try {
// const customReq = req as any;
// const addedBy = customReq.user?._id;

// if (!addedBy) {
//   return res.status(401).json({ message: "Unauthorized" });
// }

// const doc = await PrivacyPolicyService.getOne(
//   new mongoose.Types.ObjectId(addedBy)
// );

// if (!doc) {
//   return res.status(404).json({ message: "No Privacy Policy found" });
// }

// return res.status(200).json({ data: doc });

// } catch (error: any) {
// return res.status(500).json({ message: error.message });
// }
// };


import { Request, Response } from "express";
import PrivacyPolicyService from "../services/privacyPolicy.service";
import multer from "multer";
import mongoose from "mongoose";

const upload = multer({ storage: multer.memoryStorage() });

// ✅ Create / Update Privacy Policy
export const createOrUpdatePrivacyMiddleware = [
  upload.none(),
  async (req: Request, res: Response) => {
    try {
      const customReq = req as any;
      const addedBy = customReq.user?._id;

      if (!addedBy) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { title, content } = req.body;

      const saved = await PrivacyPolicyService.createOrUpdate({
        title,
        content,
        addedBy: new mongoose.Types.ObjectId(addedBy),
      });

      return res.status(200).json({
        message: "Privacy Policy saved",
        data: saved,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
];

// ✅ Get Privacy Policy
export const getPrivacy = async (req: Request, res: Response) => {
  try {
    const customReq = req as any;
    const addedBy = customReq.user?._id;

    if (!addedBy) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const doc = await PrivacyPolicyService.getOne(
      new mongoose.Types.ObjectId(addedBy)
    );

    if (!doc) {
      return res.status(404).json({ message: "No Privacy Policy found" });
    }

    return res.status(200).json({ data: doc });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
