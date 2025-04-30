const axios = require('axios');
// jquery的核心逻辑包，支持所有环境，可用于将一个html字符串转换为jquery对象，并通过jquery对象完成后续操作
const cheerio = require('cheerio');

async function getMoviesHtml(){
  const resp = await axios.get('https://movie.douban.com/chart');
  return resp.data;
}

function getMovie(tr){
  const imgSrc = tr.find('a.nbg img').attr('src');
  const name = tr.find('div.pl2 a').text().replace(/\s/g, "").split('/')[0];
  const desc = tr.find('div.pl2 > p').text();
  return {
    imgSrc,
    name,
    desc
  }
}

async function getMoviesData(){
  const movies = [];
  const html = await getMoviesHtml();
  const $ = cheerio.load(html);
  const trs = $('tr.item');
  for(let i = 0; i < trs.length; i++){
    const tr = trs[i]; // dom对象
    const $tr = $(tr); // jquery对象
    movies.push(getMovie($tr));
  }
  return movies;
}

module.exports = getMoviesData;