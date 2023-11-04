import { message } from "antd";
import { extend } from "umi-request";

import type { ResponseError } from "umi-request";

export function isServer() {
  return typeof window === "undefined";
}

async function errorHandler(res: ResponseError) {
  return Promise.reject(res.response);
}

const request = extend({
  errorHandler,
  timeout: 1000 * 20,
});

request.interceptors.request.use(
  (url, options) => {
    return {
      url: isServer() ? `http://127.0.0.1:${process.env.PORT}${url}` : url,
      options,
    };
  },
  { global: true },
);

request.interceptors.response.use(
  async (res) => {
    try {
      const data = await res.clone().json();
      return data;
    } catch (e) {
      !isServer() && message.error('请求失败');
      return Promise.reject(e);
    }
  },
  {
    global: true,
  },
);

export default request;
