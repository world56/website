import request from "@/lib/request";

import type { TypeCommon } from "@/interface/common";
import type { Msg, Post, Tag, User } from "@prisma/client";

/**
 * @name getBasicDetails 获取 “网站、个人基本信息”
 */
export function getBasicDetails() {
  return request<TypeCommon.BasisDTO>(`/api/basic`, { method: "GET" });
}

/** @name updateBasicDetails 编辑 “网站、个人基本信息” */
export function updateBasicDetails(
  data: Partial<TypeCommon.BasisDTO<Partial<Tag>>>,
) {
  return request(`/api/basic`, {
    method: "POST",
    data,
  });
}

/**
 * @name getPosts 获取 “帖子” 列表
 */
export function getPosts(params: TypeCommon.QueryPosts) {
  return request<TypeCommon.Response<Post>>(`/api/post`, {
    method: "GET",
    params,
  });
}

/**
 * @name getPost 获取 “帖子” 单个
 */
export function getPost(
  params: Pick<Post, "id"> & Partial<Pick<Post, "status">>,
) {
  return request<Post>(`/api/post/${params.id}`, {
    method: "GET",
  });
}

/**
 * @name insertPost 新增 “帖子”
 */
export function insertPost(data: TypeCommon.UpdatePost) {
  return request<boolean>("/api/post", {
    method: "POST",
    data,
  });
}

/**
 * @name updatePost 编辑 “帖子”
 */
export function updatePost(data: TypeCommon.UpdatePost) {
  return request<boolean>("/api/post", {
    method: "PUT",
    data,
  });
}

/**
 * @name deletePost 删除 “帖子”
 */
export function deletePost(params: TypeCommon.DeletePost) {
  return request<Post>(`/api/post`, {
    method: "DELETE",
    params,
  });
}

/**
 * @name updatePostStatus 变更 “帖子” 状态
 */
export function updatePostStatus({ id, status }: Pick<Post, "id" | "status">) {
  return request<Post>(`/api/post/${id}`, {
    method: "PUT",
    data: { status },
  });
}

/**
 * @name getMessage 查询 “留言” 列表
 */
export function getMessages(
  params: TypeCommon.PageTurning & Partial<Pick<Msg, "read">>,
) {
  return request<TypeCommon.Response<Msg>>(`/api/message`, {
    method: "GET",
    params,
  });
}

/**
 * @name insertMessage 新增 “消息”
 */
export function insertMessage(data: Omit<Msg, "id" | "read" | "createTime">) {
  return request<boolean>("/api/contact", {
    method: "POST",
    data,
  });
}

/**
 * @name deletePost 删除 “留言”
 */
export function deleteMessage(params: TypeCommon.PrimaryID) {
  return request<Post>(`/api/message`, {
    method: "DELETE",
    params,
  });
}

/**
 * @name readMessage 标记 “留言” 已读
 */
export function readMessage(data: TypeCommon.PrimaryID) {
  return request<boolean>(`/api/message`, {
    method: "PUT",
    data,
  });
}

/**
 * @name upload 上传文件
 */
export function uploadFiles(data: FormData) {
  return request<TypeCommon.File[]>(`/api/upload`, {
    data,
    method: "POST",
    headers: { contentType: "multipart/form-data" },
  });
}

/**
 * @name existAdmin 是否存在管理员
 */
export function existAdmin() {
  return request<boolean>(`/api/auth`, {
    method: "GET",
    cache: "no-store",
  });
}

/**
 * @name signIn 验证管理员
 */
export function signIn(data: Pick<User, "account" | "password">) {
  return request<boolean>(`/api/auth/signin`, {
    data,
    method: "POST",
  });
}

/**
 * @name register 注册管理员（个人主页所有者）
 */
export function register(data: Pick<User, "account" | "password">) {
  return request<boolean>(`/api/auth/register`, {
    data,
    method: "POST",
  });
}

/**
 * @name updatePwd 修改管理员密码
 */
export function updatePwd(data: Record<"password" | "newPassword", string>) {
  return request<boolean>(`/api/auth/password`, {
    method: "PUT",
    data,
  });
}

/**
 * @name pageRevalidate ISR
 */
export function pageRevalidate(data: TypeCommon.ISR) {
  return request<object>(`/api/revalidate`, {
    data,
    method: "POST",
  });
}

/**
 * @name _pageRevalidate ISR
 * @description 临时方案，app-route并不能支持嵌套动态路由参数的增量再生成，先用api-route解决，太哈批了
 * @see https://github.com/vercel/next.js/issues/49387
 * @see https://www.reddit.com/r/nextjs/comments/1859wqm/app_router_cache_revalidatepath_nightmare
 * @see https://www.reddit.com/r/nextjs/comments/13fodef/revalidatepath_not_working_for_dynamic_routes
 */
export function _pageRevalidate(params: TypeCommon.ISR) {
  return request<object>(`/api/_revalidate`, {
    params,
    method: "PUT",
  });
}
