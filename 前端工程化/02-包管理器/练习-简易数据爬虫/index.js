const fs = require('fs');
const getMoviesData = require('./getMovies');

getMoviesData().then(movies => {
  fs.writeFile('movies.json', JSON.stringify(movies), function(err){
    if(err){
      console.log('失败！', err.message);
      return;
    }
    console.log('成功！');
  })
});