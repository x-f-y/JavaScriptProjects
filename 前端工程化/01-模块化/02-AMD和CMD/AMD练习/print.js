define(['./config.js'], function(config){
  function print(index){
    console.clear();
    const txt = config.text.substring(0, index + 1);
    console.log(txt);
  }

  return print;
});