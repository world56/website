import type { NextRequest } from "next/server";

/**
 * @name dateToTime 转换时间（自动适配用户的本地时区和语言）
 */
export function dateToTime(isoDateString?: string | Date) {
  if (!isoDateString) return "-";
  const date = new Date(isoDateString);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; 
  const userLocale = navigator.language || "zh-CN"; 
  return date.toLocaleString(userLocale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: userTimeZone,
  });
}


/**
  @name getClientIP 获取客户端IP
  @description 访客 IP 可能因代理服务器、CDN、负载均衡、NAT 网络或隐私工具（如 VPN、Tor 浏览器）等多种因素而受到影响，其准确性难以完全保证，仅供参考。
 */
export function getClientIP(req: NextRequest) {
  const { headers } = req;
  const realIP = headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  const forwardedIP = headers.get("x-forwarded-for")?.split(",")?.at(0);
  if (forwardedIP) {
    return forwardedIP;
  }
  return "UNKNOWN";
}
