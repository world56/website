/**
 * @name dateToTime 转换时间
 */
export function dateToTime(isoDateString: string | Date) {
  const date = new Date(isoDateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Shanghai' // 北京时间所在时区
  });
}
