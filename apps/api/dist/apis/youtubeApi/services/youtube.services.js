"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const youtube_models_1 = __importDefault(require("../models/youtube.models"));
class YoutubeService {
    async create(data) {
        const video = new youtube_models_1.default(data);
        return video.save();
    }
    // async getAll(): Promise<IYoutubeVideo[]> {
    //   return YoutubeVideo.find().sort({ createdAt: -1 });
    // }
    async getAll(addedBy) {
        return youtube_models_1.default.find({ addedBy }).sort({ createdAt: -1 });
    }
    async getById(id) {
        return youtube_models_1.default.findById(id);
    }
    async getByDate(date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        return youtube_models_1.default.find({
            uploadedAt: { $gte: startOfDay, $lte: endOfDay },
        }).sort({ createdAt: -1 });
    }
    async updateById(id, data) {
        return youtube_models_1.default.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
    }
    async deleteById(id) {
        return youtube_models_1.default.findByIdAndDelete(id);
    }
}
exports.default = new YoutubeService();
