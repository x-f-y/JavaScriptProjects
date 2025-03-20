import $ from 'jquery';
import styles from './index.module.less';
import { getMovies } from "@/api/movie";
import { createMovieTags } from "../list";

let container;

/**
 * 初始化函数，负责创建容器
 */
function init() {
  container = $('<div>').addClass(styles.pager).appendTo('#app');
}

init();

/**
 * 根据传入的当前页码、页容量、总记录数，创建分页区域的标签
 * @params page 当前页码
 * @params limit 页容量
 * @params total 总记录数
 */
export function createPagers(page, limit, total) {
  /**
   * 辅助函数，负责帮忙创建一个页码标签
   * @params text 标签的文本
   * @params status 标签的状态，空字符串-普通状态，disabled-禁用状态，active-选中状态
   * @params targetPage 点击之后跳转的目标页码
  */
  function createTag(text, status, targetPage) {
    const span = $('<span>').text(text).appendTo(container);
    const className = styles[status];
    span.addClass(className);
    if(status === ''){
      span.on('click', async function(){
        // 重新拿数据
        const resp = await getMovies(targetPage, limit);
        // 重新生成电影列表
        createMovieTags(resp.data.movieList);
        // 重新生成分页区域
        createPagers(targetPage, limit, resp.data.movieTotal);
      });
    }
  }

  container.empty();
  const maxPageNumber = Math.ceil(total / limit); // 最大页码
  const maxCount = 10; // 最多显示的页码数量
  // 1. 创建首页标签
  createTag('首页', page === 1 ? 'disabled' : '', 1);
  // 2. 创建上一页标签
  createTag('<<', page === 1 ? 'disabled' : '', page - 1);
  // 3. 创建数字页码标签
  let minPage = Math.floor(page - maxCount / 2);
  if(minPage < 1){
    minPage = 1;
  }
  let maxPage = minPage + maxCount - 1;
  if(maxPage > maxPageNumber){
    maxPage = maxPageNumber;
  }
  for(let i = minPage; i <= maxPage; i++){
    createTag(i, i === page ? 'active' : '', i);
  }
  // 4. 创建下一页标签
  createTag('>>', page === maxPageNumber ? 'disabled' : '', page + 1);
  // 5. 创建尾页标签
  createTag('尾页', page === maxPageNumber ? 'disabled' : '', maxPageNumber);
}