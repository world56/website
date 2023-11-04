import request from "@/utils/request";

import type { Msg, Post } from "@prisma/client";
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
export function getPosts(params: TypeCommon.QueryPosts) {
  return request<TypeCommon.Response<Post>>(`/api/post`, {
    method: "GET",
    params,
  });
}

/**
 * @name getPost 获取 “帖子” 单个
 */
export function getPost(params: TypeCommon.PrimaryID) {
  return request<Post>(`/api/post/${params.id}`, {
    method: "GET",
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
  return request<Post>(`/api/post/${params.id}`, {
    method: "DELETE",
  });
}

/**
 * @name updatePost 编辑 “帖子”
 */
export function updatePost(data: Omit<Post, "createTime" | "updateTime">) {
  return request<boolean>("/api/post", {
    method: "PUT",
    data,
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
export function getMessages(params: TypeCommon.PageTurning) {
  return request<TypeCommon.Response<Msg>>(`/api/message`, {
    method: "GET",
    params,
  });
}

/**
 * @name insertMessage 新增 “消息”
 */
export function insertMessage(data: Omit<Msg, "id" | "read" | "createTime">) {
  return request<boolean>("/api/message", {
    method: "POST",
    data,
  });
}

/**
 * @name deletePost 删除 “帖子”
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
