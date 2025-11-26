import { Request, Response } from "express";
import { TermsCondition } from "../models/termsCondition.model";
import { termsConditionSchema } from "../validators/termsCondition.validator";

export const createOrUpdateTerms = async (req: Request, res: Response) => {
  try {
    const addedBy = (req as any).user?._id;

    const validated = termsConditionSchema.parse({
      title: req.body.title,
      content: req.body.content,
      accepted: req.body.accepted ?? false,
    });

    let doc = await TermsCondition.findOne();

    if (doc) {
      doc.title = validated.title;
      doc.content = validated.content;
      doc.accepted = validated.accepted;
      doc.updatedAt = new Date();
      doc.addedBy = addedBy;

      await doc.save();

      return res.status(200).json({
        message: "Terms & Conditions updated",
        data: doc,
      });
    }

    doc = await TermsCondition.create({
      ...validated,
      addedBy,
    });

    return res.status(201).json({
      message: "Terms & Conditions created",
      data: doc,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.errors || error.message });
  }
};

export const getTerms = async (_req: Request, res: Response) => {
  try {
    const doc = await TermsCondition.findOne();
    if (!doc)
      return res.status(404).json({ message: "No Terms & Conditions found" });

    return res.status(200).json({ data: doc });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
