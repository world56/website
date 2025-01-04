import request from "@/lib/request";

import { BASE_URL } from "@/lib/request";

import type { TypeCommon } from "@/interface/common";
import type { Log, Msg, Post, Tag, User, Resource } from "@prisma/client";

/**
 * @name API_RESOURCE 静态资源获取
 */
export const API_RESOURCE = `${BASE_URL}/api/resource/`;

/**
 * @name getBasicDetails 获取 “网站、个人基本信息”
 */
export function getBasicDetails() {
  return request<TypeCommon.BasisDTO>(`/api/auth/basic`, { method: "GET" });
}

/** @name updateBasicDetails 编辑 “网站、个人基本信息” */
export function updateBasicDetails(
  data: Partial<TypeCommon.BasisDTO<Partial<Tag>>>,
) {
  return request(`/api/auth/basic`, {
    method: "POST",
    data,
  });
}

/**
 * @name getPosts 获取 “帖子” 列表
 */
export function getPosts(params: TypeCommon.QueryPosts) {
  return request<TypeCommon.Response<Post>>(`/api/auth/post`, {
    method: "GET",
    params,
  });
}

/**
 * @name getPosts 获取 “帖子” 列表
 */
export function getClientPosts(params: TypeCommon.QueryPosts) {
  return request<TypeCommon.Response<Post>>(`/api/post`, {
    method: "GET",
    params,
  });
}

/**
 * @name getPost 获取 “帖子” 列表
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
  return request<boolean>("/api/auth//post", {
    method: "POST",
    data,
  });
}

/**
 * @name updatePost 编辑 “帖子”
 */
export function updatePost(data: TypeCommon.UpdatePost) {
  return request<boolean>("/api/auth/post", {
    method: "PUT",
    data,
  });
}

/**
 * @name deletePost 删除 “帖子”
 */
export function deletePost(params: TypeCommon.DeletePost) {
  return request<Post>(`/api/auth/post`, {
    method: "DELETE",
    params,
  });
}

/**
 * @name updatePostStatus 变更 “帖子” 状态
 */
export function updatePostStatus({ id, status }: Pick<Post, "id" | "status">) {
  return request<Post>(`/api/auth/post/${id}`, {
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
  return request<TypeCommon.Response<Msg>>(`/api/auth/msg`, {
    method: "GET",
    params,
  });
}

/**
 * @name insertMessage 新增 “消息”
 */
export function insertMessage(data: Omit<Msg, "id" | "read" | "createTime">) {
  return request<boolean>("/api/msg", {
    method: "POST",
    data,
  });
}

/**
 * @name deletePost 删除 “留言”
 */
export function deleteMessage(params: TypeCommon.PrimaryID) {
  return request<Post>(`/api/auth/msg`, {
    method: "DELETE",
    params,
  });
}

/**
 * @name readMessage 标记 “留言” 已读
 */
export function readMessage(data: TypeCommon.PrimaryID) {
  return request<boolean>(`/api/auth/msg`, {
    method: "PUT",
    data,
  });
}

/**
 * @name upload 上传文件
 */
export function uploadFile(data: FormData) {
  return request<Pick<Resource, "name" | "path" | "size">>(`/api/auth/upload`, {
    data,
    method: "POST",
    headers: { contentType: "multipart/form-data" },
  });
}

/**
 * @name existAdmin 是否存在管理员
 */
export function existAdmin() {
  return request<boolean>(`/api/exists`, {
    method: "GET",
    cache: "no-store",
  });
}

/**
 * @name signIn 验证管理员
 */
export function signIn(data: Pick<User, "account" | "password">) {
  return request<boolean>(`/api/signin`, {
    data,
    method: "POST",
  });
}

/**
 * @name register 注册管理员（个人主页所有者）
 */
export function register(data: Pick<User, "account" | "password">) {
  return request<boolean>(`/api/register`, {
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
 * @name updatePwd 新增日志
 */
export function insertLog(
  data: Pick<Log, "type" | "ipv4" | "ipv6"> & {
    key: string;
    description?: string;
  },
) {
  return request<boolean>(`/api/log`, {
    method: "POST",
    data,
  });
}

/**
 * @name getLogs 获取系统日志
 */
export function getLogs(
  params: TypeCommon.PageTurning &
    Partial<Pick<Log, "type">> &
    Partial<Record<"startTime" | "endTime", number | string>>,
) {
  return request<TypeCommon.Response<Log>>(`/api/auth/logs`, {
    method: "GET",
    params,
  });
}

/**
 * @name pageRevalidate ISR
 */
export function pageRevalidate(data: TypeCommon.ISR) {
  return request<object>(`/api/revalidate`, {
    data,
    method: "PUT",
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
