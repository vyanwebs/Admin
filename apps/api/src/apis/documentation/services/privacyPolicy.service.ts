// import mongoose from "mongoose";
// import PrivacyPolicy, { IPrivacyPolicy } from "../models/privacyPolicy.model";

// class PrivacyPolicyService {
//   async createOrUpdate(data: {
//     title: string;
//     content: string;
//     addedBy: mongoose.Types.ObjectId;
//   }): Promise<IPrivacyPolicy> {
//     let doc = await PrivacyPolicy.findOne({ addedBy: data.addedBy });

//     if (doc) {
//       doc.title = data.title;
//       doc.content = data.content;
//       await doc.save();
//       return doc;
//     }

//     const newDoc = new PrivacyPolicy(data);
//     return newDoc.save();
//   }

//   async getOne(addedBy: mongoose.Types.ObjectId): Promise<IPrivacyPolicy | null> {
//     return PrivacyPolicy.findOne({ addedBy });
//   }
// }

// export default new PrivacyPolicyService();

// import mongoose from "mongoose";
// import PrivacyPolicy, { IPrivacyPolicy } from "../models/privacyPolicy.model";

// class PrivacyPolicyService {
// async createOrUpdate(data: {
// title: string;
// content: string;
// addedBy: mongoose.Types.ObjectId;
// }): Promise {
// let doc = await PrivacyPolicy.findOne({ addedBy: data.addedBy });

// if (doc) {
//   doc.title = data.title;
//   doc.content = data.content;
//   await doc.save();
//   return doc;
// }

// const newDoc = new PrivacyPolicy(data);
// return newDoc.save();

// }

// async getOne(addedBy: mongoose.Types.ObjectId): Promise<IPrivacyPolicy | null> {
// return PrivacyPolicy.findOne({ addedBy });
// }
// }

// export default new PrivacyPolicyService();


import mongoose from "mongoose";
import PrivacyPolicy, { IPrivacyPolicy } from "../models/privacyPolicy.model";

class PrivacyPolicyService {
  // Create or Update
  async createOrUpdate(data: {
    title: string;
    content: string;
    addedBy: mongoose.Types.ObjectId;
  }): Promise<IPrivacyPolicy> {

    // Type-safe findOne
    let doc = await PrivacyPolicy.findOne<IPrivacyPolicy>({ addedBy: data.addedBy });

    if (doc) {
      doc.title = data.title;
      doc.content = data.content;
      await doc.save();
      return doc;
    }

    const newDoc = new PrivacyPolicy(data);
    return newDoc.save();
  }

  // Get one Privacy Policy
  async getOne(addedBy: mongoose.Types.ObjectId): Promise<IPrivacyPolicy | null> {
    return PrivacyPolicy.findOne<IPrivacyPolicy>({ addedBy });
  }
}

export default new PrivacyPolicyService();
