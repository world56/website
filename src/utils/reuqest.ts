import { extend } from "umi-request";

import type { ResponseError } from "umi-request";

async function errorHandler(res: ResponseError) {
  console.log(1);
  return Promise.reject(res.response);
}

const request = extend({
  errorHandler,
  timeout: 1000 * 20,
});

request.interceptors.request.use(
  (url, options) => {
    const IS_SERVER = typeof window === "undefined";
    return {
      url: IS_SERVER ? `http://127.0.0.1:${process.env.PORT}${url}` : url,
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
      const error = String(e);
      console.log("@-error-request", error);
      return Promise.reject(e);
    }
  },
  {
    global: true,
  },
);

export default request;
