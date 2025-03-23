import getClientI18n from "@/lib/language";
import { isVoid, keepAliveSignin } from "./utils";

export const BASE_URL = `http://127.0.0.1:${process.env.PORT || 3000}`;

async function showErrorMessage(e?: unknown) {
  if (typeof window === "undefined") {
    console.log("@-request-error", e);
  } else {
    const t = await getClientI18n();
    const { toast } = await import("sonner");
    const code = (e as Response)?.status;
    switch (code) {
      case 429:
        return toast.warning(t('hint.req429'));
      case 401:
        keepAliveSignin();
        return toast.warning(t('hint.req401'));
      default:
        return toast.error(t('hint.reqError'));
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
    const URL = typeof window === "undefined" ? `${BASE_URL}${url}` : url;
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
