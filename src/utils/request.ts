import { message } from "antd";
import { stringify } from "qs";

import type { IStringifyOptions } from "qs";

type ExpandRequest = Parameters<typeof fetch>;
type TypeRequest<
  T extends ExpandRequest = ExpandRequest,
  R = {
    data?: object;
    params?: object | URLSearchParams;
    requestType?: "json" | "form";
  },
> = [T[0], (T[1] extends object ? Omit<T[1], "body"> & R : T[1]) & R];

function isServer() {
  return typeof window === "undefined";
}

function format(
  params: object | URLSearchParams,
  arrayFormat: IStringifyOptions["arrayFormat"] = "repeat",
) {
  return stringify(params, {
    arrayFormat,
    strictNullHandling: true,
  });
}

/**
 * @name Request 请求
 * @description next.js 对 fetch API进行了扩展
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
 */
async function Request<T = any>(...[url, options]: TypeRequest) {
  const METHOD = options?.method?.toLocaleUpperCase() || "GET";
  const QUERY = options?.params ? `?${format(options.params)}` : "";
  const REWRITE_URL = `${url}${QUERY}`;
  const REQUEST_TYPE = options.requestType || "json";
  const HTTP_URL = isServer()
    ? `http://127.0.0.1:${process.env.PORT}${REWRITE_URL}`
    : REWRITE_URL;
  try {
    let body;
    let contentType = "application/json;charset=UTF-8";
    if (options.data) {
      if (REQUEST_TYPE === "json") {
        body = JSON.stringify(options.data);
        contentType = "application/json;charset=UTF-8";
      } else {
        body = format(options.data, "repeat");
        contentType = "application/x-www-form-urlencoded;charset=UTF-8";
      }
    }
    const res = await fetch(HTTP_URL, {
      method: METHOD,
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": contentType,
        ...options.headers,
      },
      body,
    });
    switch (res.status) {
      case 200:
        return (await res.json()) as T;
      case 401:
        if (!isServer()) {
          message.error("身份异常");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
        return Promise.reject();
      default:
        return Promise.reject();
    }
  } catch (error) {
    console.log("@-error", error);
    return Promise.reject();
  }
}

export default Request;
