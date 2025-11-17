"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotificationByNotificationId = exports.getNotificationByUserId = void 0;
const inAppNotification_model_1 = require("../models/inAppNotification.model");
const getNotificationByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await inAppNotification_model_1.InAppNotifications.find({ userId });
        if (!notifications) {
            return res
                .status(201)
                .json({ success: true, message: "No notifications found" });
        }
        return res.status(200).json({
            success: true,
            message: "Notifications fetched Successfully",
            data: notifications,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, error: error.message });
    }
};
exports.getNotificationByUserId = getNotificationByUserId;
const deleteNotificationByNotificationId = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notifications = await inAppNotification_model_1.InAppNotifications.findByIdAndDelete(notificationId);
        if (!notifications) {
            return res
                .status(201)
                .json({ success: true, message: "No notification found" });
        }
        return res.status(200).json({
            success: true,
            message: "Notification deleted successfully!!",
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, error: error.message });
    }
};
exports.deleteNotificationByNotificationId = deleteNotificationByNotificationId;
