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
     * @param PANEL 个人信息标签
     */
    PANEL,
    /**
     * @param SKILL 个人技能标签
     */
    SKILL,
  }

  /**
   * @name RESOURCE 资源类型
   */
  export enum RESOURCE {
    /**
     * @param UNKNOWN 未知
     */
    UNKNOWN = -1,
    /**
     * @param IMAGE 图像
     */
    IMAGE,
    /**
     * @param VIDEO 音频
     */
    AUDIO,
    /**
     * @param VIDEO 视频
     */
    VIDEO,
  }

  /**
   * @name USER_TYPE 用户类型
   * @description 当前仅支持管理员
   */
  export enum USER_TYPE {
    /**
     * @param ADMIN 管理员
     */
    ADMIN,
    /**
     * @param OTHER 其他类型 未知 🤷‍♂️
     */
    OTHER,
  }

  /**
   * @name POST_TYPE 文本类型
   */
  export enum POST_TYPE {
    /**
     * @param project 项目、成果
     */
    PROJECTS = "projects",
    /**
     * @param NOTES 笔记
     */
    NOTES = "notes",
    /**
     * @param LIFE 生活
     */
    LIFE = "life",
  }

  /**
   * @name LOG 日志类型
   */
  export enum LOG {
    /**
     * @param LOGIN 管理员登陆
     */
    LOGIN,
    /**
     * @param ACCESS 访客访问
     */
    ACCESS,
    /**
     * @param PASSWORD 修改密码
     */
    PASSWORD,
  }
}
