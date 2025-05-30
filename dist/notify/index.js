"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = sendNotification;
const desktop_1 = require("./desktop");
const email_1 = require("./email");
// 发送通知的函数
async function sendNotification(notifyConfigs, data) {
    console.log(JSON.stringify(data, null, 2));
    for (const notifyConfig of notifyConfigs) {
        if (notifyConfig.type === 'desktop') {
            (0, desktop_1.sendDesktopNotification)(notifyConfig.title, JSON.stringify(data, null, 2));
        }
        else if (notifyConfig.type === 'email') {
            await (0, email_1.sendEmailNotification)(notifyConfig.to, notifyConfig.subject, JSON.stringify(data, null, 2));
        }
        else {
            await fetch(notifyConfig.url || notifyConfig, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
}
