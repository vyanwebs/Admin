"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("../controller/notification.controller");
const router = express_1.default.Router();
router.get("/get-all-notifications-by-userId/:userId", notification_controller_1.getNotificationByUserId);
router.delete("/delete-notification-by-notificationId/:notificationId", notification_controller_1.deleteNotificationByNotificationId);
exports.default = router;
