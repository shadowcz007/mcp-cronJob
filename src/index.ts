const fs = require('fs');
const cron = require('node-cron'); 
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');
const { sendNotification } = require('./notify/index');
// 获取命令行参数中的配置文件路径
const configPath = process.argv[2];
if (!configPath) {
  console.error('请提供配置文件路径');
  process.exit(1);
}

// 读取并解析配置文件
let config;
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (err) {
  console.error('读取或解析配置文件失败:', err);
  process.exit(1);
}

// 遍历任务并设置定时器
config.tasks.forEach(task => {
  cron.schedule(task.schedule, async () => {
    console.log(`执行任务: ${task.transport.command} ${task.transport.args.join(' ')}`);
    
    // 创建 StdioClientTransport 实例
    const transport = new StdioClientTransport({
      command: task.transport.command,
      args: task.transport.args
    });
    
    // 创建 Client 实例
    const client = new Client({
      name: 'cron-job-client',
      version: '1.0.0'
    });
    
    try {
      // 连接到 transport
      await client.connect(transport);
      
      // 执行操作并收集结果
      const results = [];
      for (const operation of task.operations) {
        try {
          const result = await executeOperation(client, operation);
          results.push({ operation, result });
        } catch (opErr) {
          results.push({ operation, error: opErr.message });
        }
      }
      
      // 断开连接
      await transport.close();
      
      // 发送通知
      await sendNotification(task.notify, results);
    } catch (err) {
      console.error('任务执行失败:', err);
      // 发送错误通知
      await sendNotification(task.notify, { error: err.message });
    }
  });
});

// 执行操作的函数
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

// 提示程序已启动
console.log('定时任务已设置');