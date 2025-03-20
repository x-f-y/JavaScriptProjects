import axios from "axios";

export async function getMovies(page, limit){
  // 绝对路径，省略了协议、主机名和端口号，直接使用当前页面的协议、主机名和端口号，即http://localhost:8080/api/movies
  const resp = await axios.get("/api/movies", {
    params: {
      page,
      size: limit
    }
  });
  return resp.data;
}