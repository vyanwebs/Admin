// import { IOurService } from "../types/ourservice.type";
// import OurService from "../models/ourservice.model";

// class OurServiceService {
  
//   // CREATE
//   async create(data: {
//     serviceName: string;
//     price: number;
//     title: string;
//     highlights: string[];
//     extra: string;
//     imageUrl: string;
//     addedBy: string;
//     estimatedTime: number;
//     category: string;
//     gender?: string;
//   }): Promise<IOurService> {
//     const newService = new OurService(data);
//     return newService.save();
//   }

//   // GET ALL BY USER
//   async getByUser(userId: string): Promise<IOurService[]> {
//     return OurService.find({ addedBy: userId })
//       .populate("addedBy", "name email")
//       .sort({ createdAt: -1 });
//   }

//   // GET BY ID
//   async getById(id: string): Promise<IOurService | null> {
//     return OurService.findById(id);
//   }

//   // UPDATE
//   async updateById(
//     id: string,
//     data: {
//       serviceName?: string;
//       price?: number;
//       title?: string;
//       highlights?: string[];
//       extra?: string;
//       estimatedTime?: number;
//       category?: string;
//       gender?: string;
//       imageUrl?: string;
//     }
//   ): Promise<IOurService | null> {
//     return OurService.findByIdAndUpdate(id, data, { new: true });
//   }

//   // DELETE
//   async deleteById(id: string): Promise<IOurService | null> {
//     return OurService.findByIdAndDelete(id);
//   }

// }

// export default new OurServiceService();


import { IOurService } from "../types/ourservice.type";
import OurService from "../models/ourservice.model";

class OurServiceService {
  // CREATE
  async create(data: {
    serviceName: string;
    price: number;
    title: string;
    highlights: string[];
    extra: string;
    imageUrl: string;
    addedBy: string;
    estimatedTime: number;
    category: string;
    gender?: string;
  }): Promise<IOurService> {
    const newService = new OurService(data);
    return newService.save();
  }

  // GET ALL → sabko accessible
  async getAll(): Promise<IOurService[]> {
    return OurService.find().populate("addedBy", "name email").sort({ createdAt: -1 });
  }

  // GET BY ID
  async getById(id: string): Promise<IOurService | null> {
    return OurService.findById(id).populate("addedBy", "name email");
  }

  // UPDATE
  async updateById(
    id: string,
    data: {
      serviceName?: string;
      price?: number;
      title?: string;
      highlights?: string[];
      extra?: string;
      estimatedTime?: number;
      category?: string;
      gender?: string;
      imageUrl?: string;
    }
  ): Promise<IOurService | null> {
    return OurService.findByIdAndUpdate(id, data, { new: true });
  }

  // DELETE
  async deleteById(id: string): Promise<IOurService | null> {
    return OurService.findByIdAndDelete(id);
  }
}

export default new OurServiceService();
