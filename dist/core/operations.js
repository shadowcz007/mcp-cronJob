"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeOperation = executeOperation;
async function executeOperation(client, operation) {
    switch (operation.type) {
        case 'listPrompts':
            return await client.listPrompts();
        case 'getPrompt':
            return await client.getPrompt({
                name: operation.name,
                arguments: operation.arguments
            });
        case 'listResources':
            return await client.listResources();
        case 'readResource':
            return await client.readResource({
                uri: operation.uri
            });
        case 'listTools':
            return await client.listTools();
        case 'callTool':
            return await client.callTool({
                name: operation.name,
                arguments: operation.arguments
            });
        default:
            throw new Error(`未知的操作类型: ${operation.type}`);
    }
}
