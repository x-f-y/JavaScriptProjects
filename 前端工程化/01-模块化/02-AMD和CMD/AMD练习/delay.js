define([], function(){
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  return delay;
});