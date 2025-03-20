// 入口模块
const config = require('./config');
const print = require('./print');
const delay = require('./delay');

/**
 * 运行该函数，会逐字打印config.js中的文本
 * 打印每个字的间隔在config.js已有配置
 */
async function run() {
  let index = 0;
  while(index < config.text.length){
    print(index);
    await delay(config.wordDuration);
    index++;
  }
}

run();