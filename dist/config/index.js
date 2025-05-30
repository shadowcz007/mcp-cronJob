"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
const fs = require('fs');
function loadConfig(configPath) {
    if (!configPath) {
        throw new Error('请提供配置文件路径');
    }
    try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        return config;
    }
    catch (err) {
        throw new Error(`读取或解析配置文件失败: ${err.message}`);
    }
}
