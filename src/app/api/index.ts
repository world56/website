import request from "@/utils/reuqest";

import type { TypeCommon } from "@/interface/common";

/**
 * @name getBasicDetails 获取 “网站、个人基本信息”
 */
export function getBasicDetails() {
  return request<TypeCommon.BasisDTO>(`/api/basic`, { method: "GET" });
}

/** @name updateBasicDetails 编辑 “网站、个人基本信息” */
export function updateBasicDetails(data: TypeCommon.BasisDTO) {
  return request(`/api/basic`, {
    method: "POST",
    data,
  });
}
