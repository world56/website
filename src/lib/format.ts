import type { NextRequest } from "next/server";

/**
 * @name dateToTime 转换时间
 */
export function dateToTime(isoDateString?: string | Date) {
  if (!isoDateString) return "-";
  const date = new Date(isoDateString);
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Shanghai", // 北京时间所在时区
  });
}

/**
  @name getClientIP 获取客户端IP（IPv4 和 IPv6）
 */
export function getClientIP(request: NextRequest): {
  ipv4: string | null;
  ipv6: string | null;
} {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ips = forwarded?.split(",").map((ip) => ip.trim()) || [];
    const isIPv4 = (ip: string) => /^\d{1,3}(\.\d{1,3}){3}$/.test(ip);
    const isIPv6 = (ip: string) => /^[a-fA-F0-9:]+$/.test(ip);
    const ipv4 =
      ips.find((ip) => isIPv4(ip)) ||
      (isIPv4(request.ip || "") ? request.ip : null);
    const ipv6 =
      ips.find((ip) => isIPv6(ip)) ||
      (isIPv6(request.ip || "") ? request.ip : null);
    return { ipv4: ipv4 || null, ipv6: ipv6 || null };
  } catch (error) {
    return { ipv4: null, ipv6: null };
  }
}
