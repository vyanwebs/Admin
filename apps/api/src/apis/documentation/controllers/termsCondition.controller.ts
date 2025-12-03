// import { Request, Response } from "express";
// import { TermsCondition } from "../models/termsCondition.model";
// import { termsConditionSchema } from "../validators/termsCondition.validator";

// export const createOrUpdateTerms = async (req: Request, res: Response) => {
//   try {
//     const addedBy = (req as any).user?._id;

//     const validated = termsConditionSchema.parse({
//       title: req.body.title,
//       content: req.body.content,
//       accepted: req.body.accepted ?? false,
//     });

//     let doc = await TermsCondition.findOne();

//     if (doc) {
//       doc.title = validated.title;
//       doc.content = validated.content;
//       doc.accepted = validated.accepted;
//       doc.updatedAt = new Date();
//       doc.addedBy = addedBy;

//       await doc.save();

//       return res.status(200).json({
//         message: "Terms & Conditions updated",
//         data: doc,
//       });
//     }

//     doc = await TermsCondition.create({
//       ...validated,
//       addedBy,
//     });

//     return res.status(201).json({
//       message: "Terms & Conditions created",
//       data: doc,
//     });
//   } catch (error: any) {
//     return res.status(400).json({ message: error.errors || error.message });
//   }
// };

// export const getTerms = async (_req: Request, res: Response) => {
//   try {
//     const doc = await TermsCondition.findOne();
//     if (!doc)
//       return res.status(404).json({ message: "No Terms & Conditions found" });

//     return res.status(200).json({ data: doc });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

import { Request, Response, NextFunction } from "express";
import TermsConditionService from "../services/termsCondition.service";
import { termsConditionSchema } from "../validators/termsCondition.validator";
import mongoose from "mongoose";

// ⭐ Middleware (validation + service call)  
export const createOrUpdateTermsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customReq = req as any;
    const addedBy: mongoose.Types.ObjectId = customReq.user?._id;

    if (!addedBy) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const validated = termsConditionSchema.parse(req.body);

    const doc = await TermsConditionService.createOrUpdate({
      ...validated,
      addedBy,
    });

    customReq.terms = doc;
    next();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// ⭐ Controller (only sends response)
export const createOrUpdateTerms = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Terms & Conditions saved successfully",
    data: (req as any).terms,
  });
};

// ⭐ GET
export const getTerms = async (req: Request, res: Response) => {
  try {
    const customReq = req as any;
    const addedBy = customReq.user?._id;

    const doc = await TermsConditionService.getOne(addedBy);

    if (!doc) return res.status(404).json({ message: "No Terms found" });

    return res.status(200).json({ data: doc });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
