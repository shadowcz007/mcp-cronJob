"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndConnectClient = createAndConnectClient;
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/client/stdio.js");
async function createAndConnectClient(transportConfig) {
    const transport = new stdio_js_1.StdioClientTransport({
        command: transportConfig.command,
        args: transportConfig.args
    });
    const client = new index_js_1.Client({
        name: 'cron-job-client',
        version: '1.0.0'
    });
    await client.connect(transport);
    return { client, transport };
}
