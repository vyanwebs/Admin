import mongoose from "mongoose";
import Offer, { IOffer } from "../models/offer.model";

class OfferService {
  async create(data: {
    title: string;
    discount: string;
    date: string;
    description?: string;
    gender: string;
    imageUrl: string;
    addedBy: mongoose.Types.ObjectId;
  }): Promise<IOffer> {
    const newOffer = new Offer(data);
    return newOffer.save();
  }

  async getAll(addedBy: mongoose.Types.ObjectId): Promise<IOffer[]> {
    return Offer.find({ addedBy }).sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IOffer | null> {
    return Offer.findById(id);
  }

  async updateById(id: string, data: Partial<IOffer>): Promise<IOffer | null> {
    return Offer.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<IOffer | null> {
    return Offer.findByIdAndDelete(id);
  }
}

export default new OfferService();
