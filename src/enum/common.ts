export namespace ENUM_COMMON {
  /** 
   * @name STATUS 状态
   */
  export enum STATUS {
    /** 
     * @param DISABLE 禁用
     */
    DISABLE,
    /** 
     * @parma ENABLE 启用
     */
    ENABLE,
  }

  /** 
   * @name TAG 标签类型
   */
  export enum TAG {
    /** 
     * @param PERSONAL_PANEL 个人信息标签
     */
    PERSONAL_PANEL,
    /** 
     * @param PERSONAL_PANEL 个人技能标签
     */
    PERSONAL_SKILL,
  }

  /**
   * @name POST_TYPE 帖子类型
   */
  export enum POST_TYPE {
    /** 
     * @param OPEN 分享
     */
    OPEN,
    /** 
     * @param SHARE 开源
     */
    SHARE,
  }

  /**
   * @name UPLOAD_FILE_TYPE 上传文件的类型
   * @description 文本编辑器
   */
  export enum UPLOAD_FILE_TYPE {
    /**
     * @param IMAGE 图片
     */
    IMAGE,
    /**
     * @param VIDEO 视频
     */
    VIDEO,
  }

  /**
   * @name USER_TYPE 用户类型
   * @description 当前仅支持管理员
   */
  export enum USER_TYPE{
    /**
     * @param ADMIN 管理员
     */
    ADMIN,
    /**
     * @param OTHER 其他类型 未知 🤷‍♂️
     */
    OTHER
  }
}
