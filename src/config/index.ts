const fs = require('fs');

interface TransportConfig {
  command: string;
  args: string[];
}

interface Operation {
  type: string;
  name?: string;
  arguments?: any;
  uri?: string;
}

interface TaskConfig {
  schedule: string;
  transport: TransportConfig;
  operations: Operation[];
  notify: any;
}

interface Config {
  tasks: TaskConfig[];
}

export function loadConfig(configPath: string): Config {
  if (!configPath) {
    throw new Error('请提供配置文件路径');
  }

  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return config;
  } catch (err) {
    throw new Error(`读取或解析配置文件失败: ${err.message}`);
  }
}

export type { Config, TaskConfig, Operation, TransportConfig }; 