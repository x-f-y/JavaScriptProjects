import axios from 'axios';
import showMessage from '@/utils/showMessage';

const instance = axios.create();
instance.interceptors.response.use(function(resp){
  if(resp.data.code !== 0){
    // 有错误
    showMessage({
      content: resp.data.msg,
      type: 'error',
      duration: 1500
    });
    return null;
  }
  return resp.data.data;
});

export default instance;