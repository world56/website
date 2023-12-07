import { ENUM_COMMON } from "@/enum/common";

import type { Msg, Post, Tag } from "@prisma/client";

export namespace TypeCommon {
  /**
   * @name TypePrimaryID 主键
   * @description 本项目全部用uuid
   */
  export interface PrimaryID {
    id?: string;
  }

  export interface Sign extends Record<"account" | "password", string> {}

  /**
   * @name PageTurning 翻页参数
   * @param current 当前页码
   * @param pageSize 每页数量
   */
  export type PageTurning = Record<"current" | "pageSize", number>;

  /**
   * @name Response 返回列表
   */
  export interface Response<T> extends PageTurning {
    list: T[];
    /** @param total 总数量 */
    readonly total: number;
  }

  /**
   * @name Basis 网站、个人基本信息
   * @param title 网站标题
   * @param icon 您的头像
   * @param name 您的姓名
   * @param position 您的岗位
   * @param profile 个人简介
   */
  export interface BasisDTO<T = Tag>
    extends Record<"title" | "icon" | "name" | "position" | "profile", string> {
    type: ENUM_COMMON.TAG;
    /** @param forTheRecord 网站备案号 */
    forTheRecord?: string;
    /**
     * @param items 用户联系面板
     * @description 固定五个
     */
    items: T[];
    /** @param skills 个人技能 */
    skills: T[];
  }

  /**
   * @name QueryPosts 查询 “文本” 列表
   */
  export interface QueryPosts
    extends PageTurning,
      Partial<Pick<Post, "title" | "type" | "status">> {}


  /**
   * @name DeletePost 删除 “文本”
   */
  export interface DeletePost extends Pick<Post, "id" | "type"> {}

  /**
   * @name QueryMessages 查询 “消息” 列表
   */
  export interface QueryMessages
    extends PageTurning,
      Partial<Pick<Msg, "read">> {
    /** @param startTime 开始时间 */
    startTime?: Date;
    /** @param endTime 结束时间 */
    endTime?: Date;
  }

  /**
   * @name File 文件列表
   */
  export interface File {
    /**
     * @param type 文件类型
     */
    type: ENUM_COMMON.UPLOAD_FILE_TYPE;
    /**
     * @param url 文件地址
     */
    url: string;
  }

  /**
   * @name ISR 按需渲染
   */
  export interface ISR {
    /**
     * @param path 路径
     */
    path: string;
    /**
     * @param 类型
     */
    type?: "layout" | "page";
  }
}
