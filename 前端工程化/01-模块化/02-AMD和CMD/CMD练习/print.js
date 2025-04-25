define(function(require, exports, module){
  const config = require('./config.js');
  
  function print(index){
    console.clear();
    const txt = config.text.substring(0, index + 1);
    console.log(txt);
  }

  module.exports = print;
});