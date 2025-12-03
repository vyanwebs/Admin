// import { Request, Response } from "express";
// import { AboutUs } from "../models/aboutUs.model";
// import { aboutUsSchema } from "../validators/aboutUs.validator";

// export const createOrUpdateAboutUs = async (req: Request, res: Response) => {
//   try {
//     const customReq = req as any;
//     const addedBy = customReq.user?._id;

//     if (!addedBy) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const validated = aboutUsSchema.parse({
//       title: req.body.title,
//       content: req.body.content,
//     });

//     let doc = await AboutUs.findOne();

//     if (doc) {
//       doc.title = validated.title;
//       doc.content = validated.content;
//       doc.updatedAt = new Date();
//       doc.addedBy = addedBy;
//       await doc.save();

//       return res.status(200).json({ message: "About Us updated", data: doc });
//     }

//     // Create new
//     doc = await AboutUs.create({
//       ...validated,
//       addedBy,
//     });

//     return res.status(201).json({ message: "About Us created", data: doc });
//   } catch (error: any) {
//     return res.status(400).json({ message: error.errors || error.message });
//   }
// };

// export const getAboutUs = async (_req: Request, res: Response) => {
//   try {
//     const doc = await AboutUs.findOne();
//     if (!doc) return res.status(404).json({ message: "No About Us found" });
//     return res.status(200).json({ data: doc });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// import { Request, Response } from "express";
// import { AboutUs } from "../models/aboutUs.model";


// export const createOrUpdateAboutUs = async (req: Request, res: Response) => {
//   const customReq = req as any;

//   try {
//     const addedBy = customReq.user?._id; // ⭐ SAME AS OFFER

//     if (!addedBy) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const { title, content } = req.body;

//     let doc = await AboutUs.findOne();

//     if (doc) {
//       doc.title = title;
//       doc.content = content;
//       doc.addedBy = addedBy;       
//       await doc.save();

//       return res.status(200).json({
//         message: "About Us updated",
//         data: doc,
//       });
//     }

//     const newDoc = await AboutUs.create({
//       title,
//       content,
//       addedBy,                     
//     });

//     return res.status(201).json({
//       message: "About Us created",
//       data: newDoc,
//     });

//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const getAboutUs = async (_req: Request, res: Response) => {
//   try {
//     const doc = await AboutUs.findOne();
//     if (!doc) return res.status(404).json({ message: "No About Us found" });
//     return res.status(200).json({ data: doc });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

import { Request, Response } from "express";
import AboutUsService from "../services/aboutUs.service";
import mongoose from "mongoose";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const createOrUpdateAboutUsMiddleware = [
  upload.none(),

  async (req: Request, res: Response) => {
    const customReq = req as any;

    try {
      const addedBy = customReq.user?._id;

      if (!addedBy) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { title, content } = req.body;

      const saved = await AboutUsService.createOrUpdate({
        title,
        content,
        addedBy: new mongoose.Types.ObjectId(addedBy),
      });

      return res.status(200).json({
        message: "About Us saved",
        data: saved,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
];

export const getAboutUs = async (req: Request, res: Response) => {
  try {
    const customReq = req as any;
    const addedBy = customReq.user?._id;

    if (!addedBy) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const doc = await AboutUsService.getByUser(
      new mongoose.Types.ObjectId(addedBy)
    );

    if (!doc) return res.status(404).json({ message: "No About Us found" });

    return res.status(200).json({ data: doc });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
