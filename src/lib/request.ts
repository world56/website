import { toast } from "sonner";
import { extend } from "umi-request";

import type { ResponseError } from "umi-request";

export function isServer() {
  return typeof window === "undefined";
}

async function errorHandler(res: ResponseError) {
  return Promise.reject(res.response);
}

function showErrorMessage() {
  if (isServer()) {
    console.log("showErrorMessage");
  } else {
    toast.error("请求失败");
  }
}

const request = extend({
  errorHandler,
  timeout: 1000 * 30,
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
      if (res.status === 200) {
        const data = await res.clone().json();
        return Promise.resolve(data);
      } else {
        showErrorMessage();
        return Promise.reject();
      }
    } catch (e) {
      showErrorMessage();
      return Promise.reject(e);
    }
  },
  {
    global: true,
  },
);

export default request;
