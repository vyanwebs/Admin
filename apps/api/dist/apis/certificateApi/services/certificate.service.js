"use strict";
// import Certificate from "../models/certificate.model";
// import { ICertificate } from "../types/certificate.types";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// class CertificateService {
//   async create(title: string, imageUrl: string, addedBy: string): Promise<ICertificate> {
//     const cert = new Certificate({ title, imageUrl, addedBy });
//     return cert.save();
//   }
//   async getByUser(userId: string): Promise<ICertificate[]> {
//     return Certificate.find({ addedBy: userId }).sort({ createdAt: -1 });
//   }
//   async deleteById(id: string): Promise<ICertificate | null> {
//     return Certificate.findByIdAndDelete(id);
//   }
//   async getById(id: string): Promise<ICertificate | null> {
//     return Certificate.findById(id);
//   }
// }
// export default new CertificateService();
const certificate_model_1 = __importDefault(require("../models/certificate.model"));
class CertificateService {
    async create(title, imageUrl, addedBy) {
        const cert = new certificate_model_1.default({ title, imageUrl, addedBy });
        return cert.save();
    }
    // OPTION 1 → All certificates
    // async getAll(): Promise<ICertificate[]> {
    //   return Certificate.find().sort({ createdAt: -1 });
    // }
    async getAll(addedBy) {
        return certificate_model_1.default.find({ addedBy }).sort({ createdAt: -1 });
    }
    async deleteById(id) {
        return certificate_model_1.default.findByIdAndDelete(id);
    }
    async getById(id) {
        return certificate_model_1.default.findById(id);
    }
}
exports.default = new CertificateService();
