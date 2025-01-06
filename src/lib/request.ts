import { toast } from "sonner";
import { isVoid } from "./utils";

export const BASE_URL = `http://127.0.0.1:${process.env.PORT || 3000}`;

export function isServer() {
  return typeof window === "undefined";
}

function showErrorMessage(e?: unknown) {
  if (isServer()) {
    console.log("request error", e);
  } else {
    if ((e as Response).status === 429) {
      toast.warning("亲，操作频繁，先歇会重试哦");
    } else {
      toast.error("请求异常，请检查后重试");
    }
  }
}

interface TypeRequestOptions
  extends Omit<RequestInit, "body" | "method" | "headers"> {
  method?: "GET" | "POST" | "PUT" | "DELETE" | (string & {});
  data?: any;
  params?: object | URLSearchParams;
  headers?: HeadersInit & Record<string, string>;
}

/**
 * @name request 发送请求
 * @description 兼容 Edge Runtime 环境
 * @see https://nextjs.org/docs/app/api-reference/edge
 */
export default async function request<T = {}>(
  url: string,
  options: TypeRequestOptions,
) {
  try {
    let query = "";
    if (options.params) {
      query = new URLSearchParams(
        Object.fromEntries(
          Object.entries(options.params).filter(([_k, v]) => !isVoid(v)),
        ),
      ).toString();
      if (query) query = `?${query}`;
    }
    if (!options.method) {
      options.method = "GET";
    }
    let body: FormData | string;
    const CONTENT_TYPE = options.headers?.["contentType"];
    if (CONTENT_TYPE === "multipart/form-data") {
      body = options.data;
    } else {
      body = JSON.stringify(options.data);
    }
    const URL = isServer() ? `${BASE_URL}${url}` : url;
    const res = await fetch(`${URL}${query}`, { ...options, body });
    if (res.status === 200) {
      const data = await res.json();
      return Promise.resolve<T>(data);
    } else {
      showErrorMessage(res);
      return Promise.reject();
    }
  } catch (e) {
    showErrorMessage(e);
    return Promise.reject(e);
  }
}
