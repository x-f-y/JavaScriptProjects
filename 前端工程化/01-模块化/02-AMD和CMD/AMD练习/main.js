define(['./config.js', './print.js', './delay.js'], function(config, print, delay){
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