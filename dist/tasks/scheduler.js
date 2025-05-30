"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleTask = scheduleTask;
const cron = __importStar(require("node-cron"));
const client_1 = require("../core/client");
const operations_1 = require("../core/operations");
const notify_1 = require("../notify");
function scheduleTask(task) {
    cron.schedule(task.schedule, async () => {
        console.log(`执行任务: ${task.transport.command} ${task.transport.args.join(' ')}`);
        try {
            // 创建并连接客户端
            const { client, transport } = await (0, client_1.createAndConnectClient)(task.transport);
            // 执行操作并收集结果
            const results = [];
            for (const operation of task.operations) {
                try {
                    const result = await (0, operations_1.executeOperation)(client, operation);
                    results.push({ operation, result });
                }
                catch (opErr) {
                    results.push({ operation, error: opErr.message });
                }
            }
            // 断开连接
            await transport.close();
            // 发送通知
            await (0, notify_1.sendNotification)(task.notify, results);
        }
        catch (err) {
            console.error('任务执行失败:', err);
            // 发送错误通知
            await (0, notify_1.sendNotification)(task.notify, { error: err.message });
        }
    });
}
