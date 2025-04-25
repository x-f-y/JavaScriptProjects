define(function(require, exports, module){
  const config = require('./config.js');
  const delay = require('./delay.js');
  const print = require('./print.js');

  async function run(){
    let index = 0;
    while(index < config.text.length){
      print(index);
      await delay(config.wordDuration);
      index++;
    }
  }

  run();
});