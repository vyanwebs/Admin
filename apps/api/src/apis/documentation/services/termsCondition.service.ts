import mongoose from "mongoose";
import TermsCondition, { ITermsCondition } from "../models/termsCondition.model";

class TermsConditionService {
  async createOrUpdate(data: {
    title: string;
    content: string;
    accepted: boolean;
    addedBy: mongoose.Types.ObjectId;
  }): Promise<ITermsCondition> {
    let doc = await TermsCondition.findOne({ addedBy: data.addedBy });

    if (doc) {
      doc.title = data.title;
      doc.content = data.content;
      doc.accepted = data.accepted;
      await doc.save();
      return doc;
    }

    const newDoc = new TermsCondition(data);
    return newDoc.save();
  }

  async getOne(addedBy: mongoose.Types.ObjectId): Promise<ITermsCondition | null> {
    return TermsCondition.findOne({ addedBy });
  }
}

export default new TermsConditionService();
