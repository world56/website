import { ENUM_COMMON } from "@/enum/common";

import type { Tag } from "@prisma/client";

export namespace TypeCommon {
  /**
   * @name TypePrimaryID 主键
   * @description 本项目全部用uuid
   */
  export interface PrimaryID {
    id?: string;
  }

  /**
   * @name PageTurning 翻页参数
   * @param currentPage 当前页码
   * @param pageSize 每页数量
   */
  export type PageTurning = Record<"currentPage" | "pageSize", number>;

  /**
   * @name Response 返回列表
   */
  export interface Response<T> extends PageTurning {
    list: T[];
    /** @param count 总数量 */
    readonly count: number;
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
}
