import { loadConfig } from './config';
import { scheduleTask } from './tasks/scheduler';

// 获取命令行参数中的配置文件路径
const configPath = process.argv[2];

try {
  // 加载配置
  const config = loadConfig(configPath);
  
  // 遍历任务并设置定时器
  config.tasks.forEach(scheduleTask);
  
  // 提示程序已启动
  console.log('定时任务已设置');
} catch (err) {
  console.error(err.message);
  process.exit(1);
}