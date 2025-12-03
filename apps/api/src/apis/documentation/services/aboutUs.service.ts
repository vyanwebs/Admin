import mongoose from "mongoose";
import AboutUs, { IAboutUs } from "../models/aboutUs.model";

class AboutUsService {
  async createOrUpdate(data: {
    title: string;
    content: string;
    addedBy: mongoose.Types.ObjectId;
  }): Promise<IAboutUs> {
    let doc = await AboutUs.findOne({ addedBy: data.addedBy });

    if (doc) {
      doc.title = data.title;
      doc.content = data.content;
      await doc.save();
      return doc;
    }

    const newDoc = new AboutUs(data);
    return newDoc.save();
  }

  async getByUser(addedBy: mongoose.Types.ObjectId): Promise<IAboutUs | null> {
    return AboutUs.findOne({ addedBy });
  }
}

export default new AboutUsService();
