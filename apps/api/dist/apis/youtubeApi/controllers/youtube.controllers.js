"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteYoutubeVideo = exports.updateYoutubeVideo = exports.getYoutubeVideosByDate = exports.getYoutubeVideoById = exports.getAllYoutubeVideos = exports.createYoutubeVideo = void 0;
const youtube_services_1 = __importDefault(require("../services/youtube.services"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const createYoutubeVideo = async (req, res) => {
    try {
        const addedBy = req.user._id;
        const { title, videoUrl } = req.body;
        // FIXED: Use absolute URL for video paths with HTTPS
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const videoPath = req.file
            ? `${process.env.URL}/uploads/videos/${req.file.filename}`
            : undefined;
        if (!videoUrl && !req.file) {
            return res.status(400).json({
                success: false,
                error: "You must provide a video file or a YouTube URL.",
            });
        }
        const newVideo = await youtube_services_1.default.create({
            title,
            videoUrl: videoUrl || undefined,
            videoPath,
            addedBy,
        });
        res.status(201).json({ success: true, data: newVideo });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createYoutubeVideo = createYoutubeVideo;
/**
 * Get all YouTube videos
 */
// export const getAllYoutubeVideos = async (_req: Request, res: Response) => {
// 	try {
// 		const videos = await YoutubeService.getAll();
// 		res.status(200).json({ success: true, data: videos });
// 	} catch (error) {
// 		res.status(500).json({ success: false, error: (error as Error).message });
// 	}
// };
const getAllYoutubeVideos = async (req, res) => {
    try {
        let videos;
        const subAdminId = req.user.id;
        if (req.user.role === "admin") {
            videos = await youtube_services_1.default.getAll(subAdminId);
            res.status(200).json({ success: true, data: videos });
        }
        const addedBy = req.user.subAdminId;
        videos = await youtube_services_1.default.getAll(new mongoose_1.default.Types.ObjectId(addedBy));
        res.status(200).json({ success: true, data: videos });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllYoutubeVideos = getAllYoutubeVideos;
/**
 * Get a single video by ID
 */
const getYoutubeVideoById = async (req, res) => {
    try {
        const video = await youtube_services_1.default.getById(req.params.id);
        if (!video) {
            return res
                .status(404)
                .json({ success: false, message: "Video not found" });
        }
        res.status(200).json({ success: true, data: video });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getYoutubeVideoById = getYoutubeVideoById;
/**
 * Get videos by a specific date
 */
const getYoutubeVideosByDate = async (req, res) => {
    try {
        const videos = await youtube_services_1.default.getByDate(req.params.date);
        res.status(200).json({ success: true, data: videos });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getYoutubeVideosByDate = getYoutubeVideosByDate;
/**
 * Update an existing video
 * Allows updating title, YouTube URL, or replacing the uploaded video file
 */
const updateYoutubeVideo = async (req, res) => {
    try {
        const { title, videoUrl } = req.body;
        // FIXED: Use absolute URL for video paths with HTTPS
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const videoPath = req.file
            ? `${process.env.URL}/uploads/videos/${req.file.filename}`
            : undefined;
        // Get the existing video to check current sources
        const existingVideo = await youtube_services_1.default.getById(req.params.id);
        if (!existingVideo) {
            return res.status(404).json({
                success: false,
                message: "Video not found",
            });
        }
        // FIXED: More flexible validation
        const hasNewYouTubeUrl = videoUrl !== undefined && videoUrl !== "";
        const hasNewVideoFile = videoPath !== undefined;
        const hasExistingYouTubeUrl = existingVideo.videoUrl;
        const hasExistingVideoFile = existingVideo.videoPath;
        // If no new source provided AND no existing source exists, then it's invalid
        if (!hasNewYouTubeUrl &&
            !hasNewVideoFile &&
            !hasExistingYouTubeUrl &&
            !hasExistingVideoFile) {
            return res.status(400).json({
                success: false,
                error: "You must provide a video file or a YouTube URL.",
            });
        }
        // Prepare update data
        const updateData = { title };
        // Handle YouTube URL
        if (hasNewYouTubeUrl) {
            updateData.videoUrl = videoUrl;
            // If switching from file to YouTube URL, clear the file path
            if (hasExistingVideoFile) {
                updateData.videoPath = undefined;
                // Delete the old file
                if (existingVideo.videoPath) {
                    // Extract filename from the full URL path
                    const filename = existingVideo.videoPath.split("/").pop();
                    if (filename) {
                        const filePath = path_1.default.join(__dirname, "../../../../uploads/videos/", filename);
                        fs_1.default.unlink(filePath, (err) => {
                            if (err) {
                                console.error("Error deleting old file:", err.message);
                            }
                            else {
                                console.log(`🗑️ Deleted old file: ${filePath}`);
                            }
                        });
                    }
                }
            }
        }
        else if (videoUrl === "") {
            // If YouTube URL is explicitly set to empty string, clear it
            updateData.videoUrl = undefined;
        }
        // If no YouTube URL provided, keep the existing one
        // Handle video file
        if (hasNewVideoFile) {
            updateData.videoPath = videoPath;
            // If switching from YouTube URL to file, clear the YouTube URL
            if (hasExistingYouTubeUrl) {
                updateData.videoUrl = undefined;
            }
            // Delete old file if replacing
            if (existingVideo.videoPath && existingVideo.videoPath !== videoPath) {
                // Extract filename from the full URL path
                const filename = existingVideo.videoPath.split("/").pop();
                if (filename) {
                    const oldFilePath = path_1.default.join(__dirname, "../../../../uploads/videos/", filename);
                    fs_1.default.unlink(oldFilePath, (err) => {
                        if (err) {
                            console.error("Error deleting old file:", err.message);
                        }
                        else {
                            console.log(`🗑️ Deleted old file: ${oldFilePath}`);
                        }
                    });
                }
            }
        }
        // If no new file uploaded, keep the existing file path
        console.log("Update data:", updateData);
        const updated = await youtube_services_1.default.updateById(req.params.id, updateData);
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Video not found",
            });
        }
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        console.error("Update error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
exports.updateYoutubeVideo = updateYoutubeVideo;
/**
 * Delete a video by ID
 */
const deleteYoutubeVideo = async (req, res) => {
    try {
        const deleted = await youtube_services_1.default.deleteById(req.params.id);
        if (!deleted) {
            return res
                .status(404)
                .json({ success: false, message: "Video not found" });
        }
        if (deleted.videoPath) {
            // Extract filename from the full URL path
            const filename = deleted.videoPath.split("/").pop();
            if (filename) {
                const filePath = path_1.default.join(__dirname, "../../../../uploads/videos/", filename);
                fs_1.default.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Error deleting file:", err.message);
                    }
                    else {
                        console.log(`🗑️ Deleted file: ${filePath}`);
                    }
                });
            }
        }
        res
            .status(200)
            .json({ success: true, message: "Video deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteYoutubeVideo = deleteYoutubeVideo;
