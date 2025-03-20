import { createMovieTags } from "./list";
import { createPagers } from "./pager";
import { getMovies } from "@/api/movie";

async function init(){
  // 获取电影数据
  const resp = await getMovies(1, 30);
  // 创建电影列表
  createMovieTags(resp.data.movieList);
  // 创建分页区域
  createPagers(1, 30, resp.data.movieTotal);
}

init();