# mcp-cronJob
本程序使用 node-cron 根据配置文件中的调度时间触发任务，通过 StdioClientTransport 执行指定的命令，并利用 Client 执行一系列操作（例如 listPrompts、getPrompt 等）。操作完成后，结果将被发送到配置的通知地址。
