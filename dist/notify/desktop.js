"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDesktopNotification = sendDesktopNotification;
const node_notifier_1 = __importDefault(require("node-notifier"));
function sendDesktopNotification(title, message) {
    node_notifier_1.default.notify({
        title,
        message,
        sound: true,
        wait: false
    }, (err, response) => {
        if (err)
            console.error('桌面通知失败:', err);
        else
            console.log('桌面通知发送成功');
    });
}
