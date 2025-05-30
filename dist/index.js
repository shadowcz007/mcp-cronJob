"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const scheduler_1 = require("./tasks/scheduler");
// 获取命令行参数中的配置文件路径
const configPath = process.argv[2];
try {
    // 加载配置
    const config = (0, config_1.loadConfig)(configPath);
    // 遍历任务并设置定时器
    config.tasks.forEach(scheduler_1.scheduleTask);
    // 提示程序已启动
    console.log('定时任务已设置');
}
catch (err) {
    console.error(err.message);
    process.exit(1);
}
