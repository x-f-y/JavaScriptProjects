import request from './request';

/**
 * 获取标语
 */
export async function getBanners(){
  return await request.get('/api/banner');
}