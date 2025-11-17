"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete7daysOldNotifications = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const dayjs_1 = __importDefault(require("dayjs"));
const inAppNotification_model_1 = require("../inAppNotification/models/inAppNotification.model");
const delete7daysOldNotifications = () => {
    node_cron_1.default.schedule("0 0 * * *", async () => {
        try {
            const sevenDaysAgo = (0, dayjs_1.default)().subtract(7, "day").toDate();
            const result = await inAppNotification_model_1.InAppNotifications.deleteMany({
                updatedAt: { $lte: sevenDaysAgo },
            });
            console.log(`Deleted ${result.deletedCount} old notifications`);
        }
        catch (error) {
            console.error("Error deleting old notifications:", error);
        }
    });
};
exports.delete7daysOldNotifications = delete7daysOldNotifications;
