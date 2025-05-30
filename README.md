# mcp-cronJob

本程序使用 node-cron 根据配置文件中的调度时间触发任务，通过 StdioClientTransport 执行指定的命令，并利用 Client 执行一系列操作（例如 listPrompts、getPrompt 等）。操作完成后，结果将被发送到配置的通知地址。

## 功能特点

- 基于 node-cron 的定时任务调度
- 支持多种 MCP (Model Context Protocol) 操作
  - listPrompts：列出所有可用的提示
  - getPrompt：获取特定提示
  - listResources：列出所有资源
  - readResource：读取特定资源
  - listTools：列出所有工具
  - callTool：调用特定工具
- 灵活的通知系统
  - 支持桌面通知 
  - 支持自定义 webhook 通知

## 安装

```bash
npm install
```

## 配置说明

配置文件采用 JSON 格式，结构如下：

```json
{
  "tasks": [
    {
      "schedule": "*/5 * * * *",  // cron 表达式
      "transport": {
        "command": "your-command",
        "args": ["arg1", "arg2"]
      },
      "operations": [
        {
          "type": "listPrompts"
        },
        {
          "type": "getPrompt",
          "name": "prompt-name",
          "arguments": {}
        }
        // ... 其他操作
      ],
      "notify": [
        {
          "type": "desktop",
          "title": "通知标题"
        },
        {
          "type": "email",
          "to": "example@example.com",
          "subject": "通知主题"
        },
        {
          "url": "https://your-webhook-url"
        }
      ]
    }
  ]
}
```

### 支持的操作类型

- `listPrompts`: 列出所有提示
- `getPrompt`: 获取特定提示（需要 name 和 arguments）
- `listResources`: 列出所有资源
- `readResource`: 读取特定资源（需要 uri）
- `listTools`: 列出所有工具
- `callTool`: 调用特定工具（需要 name 和 arguments）

### 通知配置

支持以下通知方式：

1. 桌面通知
```json
{
  "type": "desktop",
  "title": "通知标题"
}
```


## 使用方法

运行程序：

```bash
node dist/index.js path/to/your/config.json
```

## 开发

1. 安装依赖
```bash
npm install
```

2. 编译 TypeScript
```bash
npm run build
```

3. 运行
```bash
npm start -- path/to/your/config.json
```

## 注意事项

- 确保配置文件中的 cron 表达式格式正确
- 检查命令和参数的正确性
- 确保通知配置的有效性

## 许可证

Apache
