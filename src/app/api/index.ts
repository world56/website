import request from "@/utils/request";

import type { Post } from "@prisma/client";
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

/**
 * @name getPosts 获取 “帖子” 列表
 */
export function getPosts(params: TypeCommon.PageTurning) {
  return request<TypeCommon.Response<Post>>(`/api/post`, {
    method: "GET",
    params,
  });
}

/**
 * @name insertPost 新增 “帖子”
 */
export function insertPost(data: Omit<Post, "createTime" | "updateTime">) {
  return request<boolean>("/api/post", {
    method: "POST",
    data,
  });
}

/**
 * @name deletePost 删除 “帖子”
 */
export function deletePost(params: TypeCommon.PrimaryID) {
  return request<boolean>("/api/post", {
    method: "DELETE",
    params,
  });
}
