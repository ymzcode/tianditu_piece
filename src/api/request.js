import axios from "axios";

// 设置接口超时时间
axios.defaults.timeout = 60000;

//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // 配置请求头
    config.headers = {
      "Content-Type": "application/json;charset=UTF-8", // 传参方式json
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      return Promise.reject(response.data);
    } else {
      window.$message.warning("网络连接异常，看看控制台吧！");
    }
  }
);

// 封装 GET POST 请求并导出
export function request(params) {
  // 设置 url params type 的默认值
  return new Promise((resolve, reject) => {
    const promise = axios(params);
    //处理返回
    promise
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
